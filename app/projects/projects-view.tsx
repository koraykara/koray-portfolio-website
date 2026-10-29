"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import type { Project } from "@/data/projects"
import { ProjectCard } from "@/components/project-card"
import { FilterChips } from "@/components/filter-chips"

export function ProjectsView({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All")

  const categories = Array.from(new Set(projects.flatMap((p) => p.categories))).sort()
  const options = [
    { value: "All", label: "All", count: projects.length },
    ...categories.map((c) => ({ value: c, label: c, count: projects.filter((p) => p.categories.includes(c)).length })),
  ]

  const visible = category === "All" ? projects : projects.filter((p) => p.categories.includes(category))
  const featured = visible.filter((p) => p.featured)
  const others = visible.filter((p) => !p.featured)

  return (
    <>
      <FilterChips label="Filter projects by category" options={options} value={category} onChange={setCategory} />
      <p className="mt-4 mb-10 text-center text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>

      {featured.length > 0 && (
        <section aria-labelledby="featured-projects" className="mb-16">
          <h2 id="featured-projects" className="mb-6 flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-white">
            <Star className="h-5 w-5 text-yellow-500" aria-hidden />
            Featured
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section aria-labelledby="more-projects">
          <h2 id="more-projects" className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            More projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
