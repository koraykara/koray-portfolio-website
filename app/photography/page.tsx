import type { Metadata } from "next"
import { photos } from "@/data/photos"
import { PhotographyView } from "./photography-view"

export const metadata: Metadata = {
  title: "Photography | Koray Kara",
  description: "Travel photos by Koray Kara from the USA and Germany.",
}

export default function PhotographyPage() {
  return <PhotographyView photos={photos} />
}
