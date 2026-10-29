import Link from "next/link"
import { ArrowRight } from "lucide-react"

/** Consistent section header: eyebrow, title, optional intro and a "see all" link. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  href,
  linkLabel,
  id,
}: {
  eyebrow?: string
  title: string
  intro?: string
  href?: string
  linkLabel?: string
  id?: string
}) {
  return (
    <div className="mb-8 sm:mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">{eyebrow}</p>
        )}
        <h2 id={id} className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        {intro && <p className="mt-3 text-lg leading-relaxed text-gray-600 dark:text-gray-400">{intro}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </div>
  )
}

/** Page header used at the top of inner pages. */
export function PageHeader({ title, intro, children }: { title: string; intro?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="text-center mb-12 sm:mb-16 motion-safe:animate-fade-in-up">
      <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-5 text-gray-900 dark:text-white">{title}</h1>
      {intro && (
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">{intro}</p>
      )}
      {children}
    </header>
  )
}
