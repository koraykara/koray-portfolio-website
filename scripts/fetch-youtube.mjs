// Fetches every video, short and playlist from the YouTube channel and writes
// them to data/youtube.json. No API key needed: it reads the public channel pages.
//
// Usage: node scripts/fetch-youtube.mjs
//
// It is incremental: full details (exact date, description, duration) are only
// fetched for videos not already in data/youtube.json. View counts are refreshed
// from the channel listing pages. If anything fails, the existing file is kept
// so the site build still works with the last good snapshot.

import { readFile, writeFile, mkdir } from "node:fs/promises"

const CHANNEL_HANDLE = "@koraykara6270"
const OUT_FILE = new URL("../data/youtube.json", import.meta.url)
const HEADERS = { "Accept-Language": "en-US,en;q=0.9", "User-Agent": "Mozilla/5.0" }

let clientVersion = "2.20261028.01.00"

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// YouTube sometimes returns an empty page or 429 under load, so retry with backoff.
async function getHtml(url, mustContain) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(20000) })
      if (!res.ok) throw new Error(`${res.status} for ${url}`)
      const html = await res.text()
      if (!html.includes(mustContain)) throw new Error(`incomplete page for ${url}`)
      const v = html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)
      if (v) clientVersion = v[1]
      return html
    } catch (err) {
      if (attempt >= 4) throw err
      await sleep(2000 * attempt)
    }
  }
}

function extractJson(html, varName) {
  const start = html.indexOf(`${varName} = `)
  if (start === -1) throw new Error(`${varName} not found`)
  const from = html.indexOf("{", start)
  // Walk braces to find the end of the object (strings may contain braces).
  let depth = 0, inStr = false, esc = false
  for (let i = from; i < html.length; i++) {
    const c = html[i]
    if (inStr) {
      if (esc) esc = false
      else if (c === "\\") esc = true
      else if (c === '"') inStr = false
    } else if (c === '"') inStr = true
    else if (c === "{") depth++
    else if (c === "}" && --depth === 0) return JSON.parse(html.slice(from, i + 1))
  }
  throw new Error(`could not parse ${varName}`)
}

// Collect every value stored under `key` (or any of several keys) inside `node`.
function findAll(node, key, out = []) {
  const keys = Array.isArray(key) ? key : [key]
  if (Array.isArray(node)) node.forEach((n) => findAll(n, keys, out))
  else if (node && typeof node === "object") {
    for (const k of keys) if (k in node) out.push(node[k])
    Object.values(node).forEach((v) => findAll(v, keys, out))
  }
  return out
}

async function browseContinuation(token) {
  const res = await fetch("https://www.youtube.com/youtubei/v1/browse?prettyPrint=false", {
    method: "POST",
    signal: AbortSignal.timeout(20000),
    headers: { ...HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ context: { client: { clientName: "WEB", clientVersion, hl: "en" } }, continuation: token }),
  })
  if (!res.ok) throw new Error(`continuation ${res.status}`)
  return res.json()
}

// Load a listing page and follow "load more" tokens until everything is collected.
async function collectAll(url, key) {
  let data = extractJson(await getHtml(url, "ytInitialData"), "ytInitialData")
  const items = []
  for (let guard = 0; guard < 50; guard++) {
    items.push(...findAll(data, key))
    const token = findAll(data, "continuationCommand").map((c) => c.token).find(Boolean)
    if (!token) break
    await sleep(300)
    data = await browseContinuation(token)
  }
  return items
}

// "1,234 views" / "1.2K views" -> 1234 / 1200
function parseViews(label) {
  const m = String(label ?? "").replace(/,/g, "").match(/([\d.]+)\s*([KMB])?\s*views?/i)
  if (!m) return null
  const mult = { K: 1e3, M: 1e6, B: 1e9 }[(m[2] ?? "").toUpperCase()] ?? 1
  return Math.round(parseFloat(m[1]) * mult)
}

function lockupViews(lockup) {
  const parts = findAll(lockup.metadata, "metadataParts").flat()
  for (const p of parts) {
    const v = parseViews(p.accessibilityLabel ?? p.text?.content)
    if (v !== null) return v
  }
  return null
}

function shortViews(short) {
  return parseViews(short.overlayMetadata?.secondaryText?.content ?? short.accessibilityText)
}

async function getVideoDetails(id) {
  const html = await getHtml(`https://www.youtube.com/watch?v=${id}`, "ytInitialPlayerResponse")
  const player = extractJson(html, "ytInitialPlayerResponse")
  const d = player.videoDetails ?? {}
  const m = player.microformat?.playerMicroformatRenderer ?? {}
  return {
    id,
    title: d.title ?? m.title?.simpleText ?? "",
    description: d.shortDescription ?? "",
    publishedAt: m.publishDate ?? m.uploadDate ?? null,
    durationSeconds: Number(d.lengthSeconds ?? 0),
    views: Number(d.viewCount ?? 0),
  }
}

async function main() {
  const base = `https://www.youtube.com/${CHANNEL_HANDLE}`
  const previous = await readFile(OUT_FILE, "utf8").then(JSON.parse).catch(() => null)
  const previousById = new Map((previous?.videos ?? []).map((v) => [v.id, v]))

  // 1. Listings: which videos/shorts/playlists exist, plus current view counts.
  const listedViews = new Map()

  const videoLockups = (await collectAll(`${base}/videos`, "lockupViewModel")).filter(
    (l) => l.contentType === "LOCKUP_CONTENT_TYPE_VIDEO",
  )
  videoLockups.forEach((l) => listedViews.set(l.contentId, lockupViews(l)))
  const videoIds = [...new Set(videoLockups.map((l) => l.contentId))]

  const shortLockups = await collectAll(`${base}/shorts`, "shortsLockupViewModel")
  const shortIds = []
  for (const s of shortLockups) {
    const id = s.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId
    if (!id || shortIds.includes(id)) continue
    shortIds.push(id)
    listedViews.set(id, shortViews(s))
  }

  const playlistMeta = (await collectAll(`${base}/playlists`, "lockupViewModel"))
    .filter((l) => ["LOCKUP_CONTENT_TYPE_PLAYLIST", "LOCKUP_CONTENT_TYPE_COURSE"].includes(l.contentType))
    .map((l) => ({ id: l.contentId, title: l.metadata?.lockupMetadataViewModel?.title?.content ?? "" }))

  console.log(`Found ${videoIds.length} videos, ${shortIds.length} shorts, ${playlistMeta.length} playlists`)
  if (videoIds.length === 0) throw new Error("no videos found, refusing to overwrite data")

  // 2. Playlist contents (used for the category filter).
  const playlists = []
  for (const p of playlistMeta) {
    let ids = []
    // YouTube occasionally serves a playlist page without its items; retry those.
    for (let attempt = 0; attempt < 3 && ids.length === 0; attempt++) {
      if (attempt > 0) await sleep(2000 * attempt)
      const items = await collectAll(`https://www.youtube.com/playlist?list=${p.id}`, [
        "lockupViewModel",
        "shortsLockupViewModel",
      ])
      ids = [
        ...new Set(
          items
            .map((i) =>
              i.contentType === "LOCKUP_CONTENT_TYPE_VIDEO"
                ? i.contentId
                : i.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId,
            )
            .filter(Boolean),
        ),
      ]
    }
    playlists.push({ ...p, videoIds: ids })
    await sleep(500)
  }

  // 3. Full details only for videos we have not seen before.
  const all = [...videoIds.map((id) => [id, false]), ...shortIds.map((id) => [id, true])]
  const newIds = all.filter(([id]) => !previousById.has(id))
  console.log(`Fetching details for ${newIds.length} new item(s)`)

  const videos = []
  for (const [id, isShort] of all) {
    let v = previousById.get(id)
    if (!v) {
      v = await getVideoDetails(id)
      await sleep(800)
    }
    videos.push({
      ...v,
      views: listedViews.get(id) ?? v.views,
      isShort,
      playlists: playlists.filter((p) => p.videoIds.includes(id)).map((p) => p.id),
    })
  }

  videos.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))

  const result = {
    channel: { handle: CHANNEL_HANDLE, url: base },
    fetchedAt: new Date().toISOString(),
    playlists: playlists
      .filter((p) => p.videoIds.length > 0)
      .map((p) => ({ id: p.id, title: p.title, videoCount: p.videoIds.length })),
    videos,
  }

  await mkdir(new URL("../data/", import.meta.url), { recursive: true })
  await writeFile(OUT_FILE, JSON.stringify(result, null, 2) + "\n")
  console.log(`Wrote ${videos.length} items and ${result.playlists.length} playlists to data/youtube.json`)
}

main().catch((err) => {
  console.warn(`[fetch-youtube] skipped, keeping existing data: ${err.message}`)
  process.exitCode = 0
})
