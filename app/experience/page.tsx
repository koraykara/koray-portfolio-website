import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Briefcase, Calendar, GraduationCap, MapPin, Sparkles } from "lucide-react"
import { roles, education, beyondWork, type Role } from "@/data/experience"

export const metadata: Metadata = {
  title: "Experience | Koray Kara",
  description:
    "Flight Control Software Engineer at Turkish Aerospace. Experience in safety-critical aerospace software, research and full-stack development.",
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const parse = (ym: string) => {
  const [y, m] = ym.split("-").map(Number)
  return { y, m }
}

const formatMonth = (ym: string) => {
  const { y, m } = parse(ym)
  return `${MONTHS[m - 1]} ${y}`
}

// Inclusive month count, like LinkedIn ("Jun 2020 – Aug 2020 · 3 mos").
function monthsBetween(start: string, end: string | null) {
  const s = parse(start)
  const now = new Date()
  const e = end ? parse(end) : { y: now.getFullYear(), m: now.getMonth() + 1 }
  return (e.y - s.y) * 12 + (e.m - s.m) + 1
}

function formatDuration(months: number) {
  const y = Math.floor(months / 12)
  const m = months % 12
  const parts = []
  if (y) parts.push(`${y} ${y === 1 ? "yr" : "yrs"}`)
  if (m) parts.push(`${m} ${m === 1 ? "mo" : "mos"}`)
  return parts.join(" ")
}

const TYPE_STYLES: Record<Role["type"], string> = {
  "Full-time": "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  Research: "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20",
  Internship: "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20",
}

export default function ExperiencePage() {
  const current = roles.find((r) => r.end === null)
  const yearsInAerospace = current ? Math.floor(monthsBetween(current.start, null) / 12) : 0

  const stats = [
    { value: `${yearsInAerospace}+`, label: "years building flight control software" },
    { value: String(roles.length), label: "roles across aerospace, defense & research" },
    { value: "M.Sc.", label: "in Computer Science, Hacettepe University" },
  ]

  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-light mb-6 text-gray-900 dark:text-white">Experience</h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Flight Control Software Engineer at <span className="font-medium text-gray-900 dark:text-white">Turkish Aerospace</span>,
            building real-time, safety-critical software for aerospace platforms. Backed by a B.Sc. and M.Sc. from
            Hacettepe University, research in multimodal learning and medical imaging, and a long-running passion for
            algorithms.
          </p>
        </header>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 sm:mb-20">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 px-6 py-5 text-center sm:text-left"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Work experience */}
        <SectionTitle icon={Briefcase}>Work experience</SectionTitle>
        <ol className="relative mb-20">
          {roles.map((role, i) => (
            <RoleItem key={role.id} role={role} last={i === roles.length - 1} />
          ))}
        </ol>

        {/* Education */}
        <SectionTitle icon={GraduationCap}>Education</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2 mb-20">
          {education.map((d) => (
            <article
              key={d.id}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-7 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">{d.degree}</p>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{d.field}</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">{d.school}</p>
                </div>
                <span className="shrink-0 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 tabular-nums">
                  {d.start} – {d.end}
                </span>
              </div>
              {d.grade && <p className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-200">{d.grade}</p>}
              {d.details && (
                <ul className="mt-3 space-y-2">
                  {d.details.map((t) => (
                    <li key={t} className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {/* Beyond work */}
        <SectionTitle icon={Sparkles}>Beyond work</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-3">
          {beyondWork.map((b) => {
            const body = (
              <>
                <h3 className="font-semibold text-gray-900 dark:text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{b.text}</p>
                {b.cta && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                    {b.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                )}
              </>
            )
            const cls =
              "group block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-all"
            return b.href ? (
              <Link key={b.title} href={b.href} className={`${cls} hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md`}>
                {body}
              </Link>
            ) : (
              <div key={b.title} className={cls}>
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ icon: Icon, children }: { icon: typeof Briefcase; children: React.ReactNode }) {
  return (
    <h2 className="mb-8 flex items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </span>
      {children}
    </h2>
  )
}

function RoleItem({ role, last }: { role: Role; last: boolean }) {
  const isCurrent = role.end === null
  const range = `${formatMonth(role.start)} – ${isCurrent ? "Present" : formatMonth(role.end!)}`
  const duration = formatDuration(monthsBetween(role.start, role.end))

  return (
    <li className="relative grid grid-cols-[3rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-x-4 sm:gap-x-6 pb-10 last:pb-0">
      {/* Rail */}
      {!last && (
        <span aria-hidden className="absolute left-6 sm:left-7 top-14 bottom-0 w-px -translate-x-1/2 bg-gray-200 dark:bg-gray-800" />
      )}
      <div
        className={`relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-gray-200 dark:ring-gray-700 ${role.wideLogo ? "p-1" : "p-2"}`}
        aria-hidden
      >
        {/* Logos stay on white so their brand colors read in dark mode too. */}
        <img src={role.logo} alt="" className="h-full w-full object-contain" />
        {isCurrent && (
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-900 bg-emerald-500" />
          </span>
        )}
      </div>

      <article
        className={`rounded-2xl border bg-white dark:bg-gray-900 p-5 sm:p-7 shadow-sm transition-shadow hover:shadow-lg ${
          isCurrent ? "border-blue-200 dark:border-blue-900/60 ring-1 ring-blue-500/10" : "border-gray-200 dark:border-gray-800"
        }`}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{role.title}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
              {role.companyUrl ? (
                <a
                  href={role.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {role.company}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="font-medium text-gray-700 dark:text-gray-300">{role.company}</span>
              )}
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TYPE_STYLES[role.type]}`}>
                {role.type}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 md:flex-col md:items-end md:text-right">
            <span className="inline-flex items-center gap-1.5 md:justify-end">
              <Calendar className="h-4 w-4 md:hidden" />
              <span className="font-medium text-gray-700 dark:text-gray-300">{range}</span>
            </span>
            <span className="tabular-nums">{duration}</span>
            <span className="inline-flex items-center gap-1.5 md:justify-end">
              <MapPin className="h-4 w-4" />
              {role.location}
            </span>
          </div>
        </div>

        {role.summary && <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{role.summary}</p>}

        <ul className="mt-4 space-y-2.5">
          {role.highlights.map((h) => (
            <li key={h} className="flex gap-3 leading-relaxed text-gray-600 dark:text-gray-300">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {role.skills.map((s) => (
            <span
              key={s}
              className="rounded-md bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              {s}
            </span>
          ))}
          {role.link && (
            <a
              href={role.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {role.link.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </article>
    </li>
  )
}
