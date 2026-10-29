"use client"

import { useEffect, useMemo, useState } from "react"
import { Play, Search, X, ExternalLink, Clock, Eye, Calendar, Youtube, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Video = {
  id: string
  title: string
  description: string
  publishedAt: string
  durationSeconds: number
  views: number
  isShort: boolean
  playlists: string[]
}

export type Playlist = { id: string; title: string; count: number }

type Sort = "newest" | "popular" | "oldest"

const PAGE_SIZE = 12
const OTHER = "__other"

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 })
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })

function formatDuration(total: number) {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = String(total % 60).padStart(2, "0")
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`
}

const formatDate = (iso: string) => (iso ? dateFormat.format(new Date(iso)) : "")
const formatViews = (n: number) => `${compact.format(n)} ${n === 1 ? "view" : "views"}`

const thumb = (id: string, size: "hq" | "max" | "short") =>
  `https://i.ytimg.com/vi/${id}/${size === "hq" ? "hqdefault" : size === "max" ? "maxresdefault" : "oardefault"}.jpg`

export function VideosView({
  videos,
  playlists,
  channelUrl,
}: {
  videos: Video[]
  playlists: Playlist[]
  channelUrl: string
}) {
  const longVideos = useMemo(() => videos.filter((v) => !v.isShort), [videos])
  const shorts = useMemo(() => videos.filter((v) => v.isShort), [videos])
  const latest = longVideos[0]
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0)
  const otherCount = longVideos.filter((v) => v.playlists.length === 0).length

  const [playing, setPlaying] = useState<Video | null>(null)
  const [playlist, setPlaylist] = useState<string>("all")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<Sort>("newest")
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr")
    const list = longVideos.filter((v) => {
      if (playlist === OTHER && v.playlists.length > 0) return false
      if (playlist !== "all" && playlist !== OTHER && !v.playlists.includes(playlist)) return false
      return !q || v.title.toLocaleLowerCase("tr").includes(q)
    })
    if (sort === "popular") return [...list].sort((a, b) => b.views - a.views)
    if (sort === "oldest") return [...list].reverse()
    return list
  }, [longVideos, playlist, query, sort])

  // Start from the first page whenever the filters change.
  useEffect(() => setVisible(PAGE_SIZE), [playlist, query, sort])

  const chips = [
    { id: "all", title: "All", count: longVideos.length },
    ...playlists,
    ...(otherCount > 0 ? [{ id: OTHER, title: "Other", count: otherCount }] : []),
  ]

  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-light mb-4 text-gray-900 dark:text-white">Videos</h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Algorithms, data structures, interview prep and career talks, straight from my YouTube channel.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Stat value={longVideos.length} label="videos" />
            <Stat value={shorts.length} label="shorts" />
            <Stat value={playlists.length} label="playlists" />
            <Stat value={compact.format(totalViews)} label="views" />
          </div>
          <Button asChild className="mt-8 rounded-full bg-red-600 hover:bg-red-700 text-white px-6 shadow-lg">
            <a href={`${channelUrl}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer">
              <Youtube className="h-5 w-5 mr-2" />
              Subscribe on YouTube
            </a>
          </Button>
        </header>

        {/* Latest upload */}
        {latest && (
          <section className="mb-16 animate-fade-in-up" aria-labelledby="latest-heading">
            <div className="grid md:grid-cols-5 gap-6 lg:gap-10 items-center rounded-3xl bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-red-100 dark:border-gray-700 p-4 sm:p-6 lg:p-8 shadow-sm">
              <button
                onClick={() => setPlaying(latest)}
                className="md:col-span-3 group relative block w-full aspect-video overflow-hidden rounded-2xl bg-gray-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50"
                aria-label={`Play ${latest.title}`}
              >
                <img
                  src={thumb(latest.id, "max")}
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = thumb(latest.id, "hq")
                  }}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-600 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-8 w-8 sm:h-9 sm:w-9 text-white fill-current ml-1" />
                  </span>
                </span>
                <DurationBadge seconds={latest.durationSeconds} />
              </button>
              <div className="md:col-span-2">
                <p id="latest-heading" className="text-sm font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3">
                  Latest upload
                </p>
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white leading-snug mb-4">
                  {latest.title}
                </h2>
                <Meta video={latest} className="mb-4" />
                {latest.description && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 line-clamp-4">{latest.description}</p>
                )}
                <Button onClick={() => setPlaying(latest)} className="rounded-full bg-red-600 hover:bg-red-700 text-white px-6">
                  <Play className="h-4 w-4 mr-2 fill-current" />
                  Watch now
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Shorts */}
        {shorts.length > 0 && <ShortsRow shorts={shorts} onPlay={setPlaying} />}

        {/* All videos */}
        <section aria-labelledby="all-heading">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
            <h2 id="all-heading" className="text-2xl font-semibold text-gray-900 dark:text-white">
              All videos
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="relative block">
                <span className="sr-only">Search videos</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search videos…"
                  className="h-10 w-full sm:w-64 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                />
              </label>
              <label className="block">
                <span className="sr-only">Sort videos</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-10 w-full sm:w-auto rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/40"
                >
                  <option value="newest">Newest first</option>
                  <option value="popular">Most viewed</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </label>
            </div>
          </div>

          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-8 flex gap-2 overflow-x-auto sm:flex-wrap pb-2 sm:pb-0 scrollbar-none" role="tablist" aria-label="Filter by playlist">
            {chips.map((c) => {
              const active = playlist === c.id
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPlaylist(c.id)}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-red-600 border-red-600 text-white shadow-md"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  }`}
                >
                  {c.title}
                  <span className={`text-xs ${active ? "text-white/80" : "text-gray-400"}`}>{c.count}</span>
                </button>
              )
            })}
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {filtered.slice(0, visible).map((v) => (
                  <VideoCard key={v.id} video={v} onPlay={setPlaying} />
                ))}
              </div>
              <div className="mt-12 flex flex-col items-center gap-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {Math.min(visible, filtered.length)} of {filtered.length} {filtered.length === 1 ? "video" : "videos"}
                </p>
                {visible < filtered.length && (
                  <Button variant="outline" onClick={() => setVisible((n) => n + PAGE_SIZE)} className="rounded-full px-8">
                    Show more
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">No videos match your search.</p>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setQuery("")
                  setPlaylist("all")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </section>
      </div>

      {playing && <PlayerModal video={playing} onClose={() => setPlaying(null)} />}
    </div>
  )
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 px-5 py-3 min-w-[6.5rem]">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  )
}

function DurationBadge({ seconds }: { seconds: number }) {
  if (!seconds) return null
  return (
    <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white tabular-nums">
      {formatDuration(seconds)}
    </span>
  )
}

function Meta({ video, className = "" }: { video: Video; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <Eye className="h-4 w-4" />
        {formatViews(video.views)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-4 w-4" />
        {formatDate(video.publishedAt)}
      </span>
      {!video.isShort && video.durationSeconds > 0 && (
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {formatDuration(video.durationSeconds)}
        </span>
      )}
    </div>
  )
}

function VideoCard({ video, onPlay }: { video: Video; onPlay: (v: Video) => void }) {
  return (
    <button onClick={() => onPlay(video)} className="group text-left focus:outline-none" aria-label={`Play ${video.title}`}>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 ring-red-500/50 group-focus-visible:ring-4">
        <img
          src={thumb(video.id, "hq")}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <Play className="h-5 w-5 text-white fill-current ml-0.5" />
          </span>
        </span>
        <DurationBadge seconds={video.durationSeconds} />
      </div>
      <h3 className="mt-3 font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
        {video.title}
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {formatViews(video.views)} · {formatDate(video.publishedAt)}
      </p>
    </button>
  )
}

function ShortsRow({ shorts, onPlay }: { shorts: Video[]; onPlay: (v: Video) => void }) {
  const [scroller, setScroller] = useState<HTMLDivElement | null>(null)
  const scrollBy = (dir: number) => scroller?.scrollBy({ left: dir * scroller.clientWidth * 0.8, behavior: "smooth" })

  return (
    <section className="mb-16" aria-labelledby="shorts-heading">
      <div className="flex items-center justify-between mb-6">
        <h2 id="shorts-heading" className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-red-600">
            <Play className="h-3.5 w-3.5 text-white fill-current" />
          </span>
          Shorts
        </h2>
        <div className="hidden sm:flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => scrollBy(-1)} aria-label="Scroll shorts left">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => scrollBy(1)} aria-label="Scroll shorts right">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div ref={setScroller} className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none">
        {shorts.map((s) => (
          <button
            key={s.id}
            onClick={() => onPlay(s)}
            className="group snap-start shrink-0 w-36 sm:w-44 text-left focus:outline-none"
            aria-label={`Play ${s.title}`}
          >
            <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 ring-red-500/50 group-focus-visible:ring-4">
              <img
                src={thumb(s.id, "short")}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white line-clamp-3 leading-snug">
                {s.title}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{formatViews(s.views)}</p>
          </button>
        ))}
      </div>
    </section>
  )
}

function PlayerModal({ video, onClose }: { video: Video; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  const watchUrl = video.isShort ? `https://www.youtube.com/shorts/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div
        className={`relative w-full ${video.isShort ? "max-w-sm" : "max-w-5xl"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close video"
          autoFocus
        >
          <X className="h-6 w-6" />
        </button>
        <div
          className={`overflow-hidden rounded-2xl bg-black shadow-2xl ${video.isShort ? "aspect-[9/16] mx-auto" : "aspect-video"}`}
          // Shorts are tall: size by viewport height so the 9:16 box always fits on screen.
          style={video.isShort ? { width: "min(100%, calc(75vh * 9 / 16))" } : undefined}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 text-white">
          <h2 className="text-lg font-semibold leading-snug">{video.title}</h2>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
          >
            Open on YouTube
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
