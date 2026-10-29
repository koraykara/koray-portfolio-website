import { ExternalLink, FileText, FlaskConical, Github } from "lucide-react"
import type { Project, ProjectKind } from "@/data/projects"

const KIND_STYLES: Record<ProjectKind, string> = {
  Research: "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20",
  "Client project": "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  "Personal project": "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20",
  "Course project": "bg-gray-100 text-gray-700 ring-gray-500/20 dark:bg-gray-500/10 dark:text-gray-300 dark:ring-gray-400/20",
  "Team project": "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
}

export function KindBadge({ kind }: { kind: ProjectKind }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${KIND_STYLES[kind]}`}>
      {kind}
    </span>
  )
}

/** Cover image, or a typographic panel for research without a public figure. */
function Cover({ project, tall }: { project: Project; tall?: boolean }) {
  const h = tall ? "h-52 sm:h-60" : "h-44"
  if (project.image) {
    return (
      <div className={`relative ${h} overflow-hidden bg-gray-100 dark:bg-gray-800`}>
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
      </div>
    )
  }
  return (
    <div
      className={`relative ${h} overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center`}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="relative flex flex-col items-center gap-3 text-white">
        <FlaskConical className="h-10 w-10" />
        <span className="text-sm font-semibold uppercase tracking-[0.2em]">Research</span>
      </div>
    </div>
  )
}

function LinkButton({ href, icon: Icon, label, primary }: { href: string; icon: typeof Github; label: string; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
        primary
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden />
      {label}
    </a>
  )
}

export function ProjectLinks({ project }: { project: Project }) {
  if (!project.github && !project.live && !project.paper) return null
  return (
    <div className="flex flex-wrap gap-2">
      {project.live && <LinkButton href={project.live} icon={ExternalLink} label="Live site" primary />}
      {project.paper && <LinkButton href={project.paper.href} icon={FileText} label={project.paper.label} primary={!project.live} />}
      {project.github && <LinkButton href={project.github} icon={Github} label="Source" />}
    </div>
  )
}

export function ProjectCard({ project, variant = "compact" }: { project: Project; variant?: "featured" | "compact" }) {
  const featured = variant === "featured"
  const tech = featured ? project.tech : project.tech.slice(0, 4)
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/70 motion-safe:hover:-translate-y-1">
      <Cover project={project} tall={featured} />
      <div className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-7" : "p-5 sm:p-6"}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <KindBadge kind={project.kind} />
          {project.year && <span className="tabular-nums">{project.year}</span>}
        </div>
        <h3 className={`mt-3 font-semibold leading-snug text-gray-900 dark:text-white ${featured ? "text-xl" : "text-lg"}`}>
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {featured ? project.description : project.summary}
        </p>
        {featured && project.contribution && (
          <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400 italic">{project.contribution}</p>
        )}
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {tech.map((t) => (
            <li key={t} className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
              {t}
            </li>
          ))}
          {!featured && project.tech.length > tech.length && (
            <li className="rounded-md px-1 py-1 text-xs text-gray-500 dark:text-gray-400">+{project.tech.length - tech.length}</li>
          )}
        </ul>
        <div className="mt-auto pt-5">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}
