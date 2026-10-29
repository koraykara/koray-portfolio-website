import type { Metadata } from "next"
import { photos } from "@/data/photos"
import { PhotographyView } from "./photography-view"
import { pageMetadata } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Photography",
  description: "Travel photos by Koray Kara from New York, San Francisco, Los Angeles and Munich.",
  path: "/photography",
})

export default function PhotographyPage() {
  return <PhotographyView photos={photos} />
}
