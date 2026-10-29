import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import { projects } from "@/data/projects"
import { PageHeader } from "@/components/section-heading"
import { ProjectsView } from "./projects-view"

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Research and engineering projects by Koray Kara: region-aware super-resolution for medical image segmentation, multimodal video understanding, machine learning and full-stack web applications.",
  path: "/projects",
})

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Projects"
          intro="Research and engineering work, ordered by technical depth and how much of it is my own. Team and course projects are labelled as such."
        />
        <ProjectsView projects={projects} />
      </div>
    </div>
  )
}
