import type { Metadata } from "next"
import youtube from "@/data/youtube.json"
import { VideosView, type Video, type Playlist } from "./videos-view"

export const metadata: Metadata = {
  title: "Videos | Koray Kara",
  description: "Every video from Koray Kara's YouTube channel: algorithms, data structures, interview prep and career talks.",
}

// Keep the client bundle small: only send what the page shows.
function shortDescription(text: string) {
  const firstParagraph = text.split(/\n\s*\n/)[0].replace(/\s+/g, " ").trim()
  return firstParagraph.length > 220 ? `${firstParagraph.slice(0, 217).trimEnd()}…` : firstParagraph
}

export default function VideosPage() {
  const videos: Video[] = youtube.videos.map((v) => ({
    id: v.id,
    title: v.title,
    description: shortDescription(v.description),
    publishedAt: v.publishedAt ?? "",
    durationSeconds: v.durationSeconds,
    views: v.views,
    isShort: v.isShort,
    playlists: v.playlists,
  }))

  const playlists: Playlist[] = youtube.playlists
    .map((p) => ({
      id: p.id,
      title: p.title,
      // Count only the long-form videos; shorts have their own row.
      count: videos.filter((v) => !v.isShort && v.playlists.includes(p.id)).length,
    }))
    .filter((p) => p.count > 0)
    .sort((a, b) => b.count - a.count)

  return <VideosView videos={videos} playlists={playlists} channelUrl={youtube.channel.url} />
}
