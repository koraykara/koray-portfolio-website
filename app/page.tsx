import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { site } from "@/lib/site"
import { projects } from "@/data/projects"
import { blogPosts } from "@/data/blog"
import { roles, education } from "@/data/experience"
import { formatMonth, monthsBetween } from "@/lib/dates"
import { SectionHeading } from "@/components/section-heading"
import { ProjectCard } from "@/components/project-card"
import { PostCard } from "@/components/post-card"

export const metadata: Metadata = {
  title: { absolute: `${site.name} | ${site.headline}` },
  description: site.description,
  alternates: { canonical: "/" },
}

const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"

export default function HomePage() {
  const current = roles.find((r) => r.end === null)!
  const years = Math.floor(monthsBetween(current.start, null) / 12)
  const msc = education.find((d) => d.id === "msc")!
  const featured = projects.filter((p) => p.featured).slice(0, 3)
  const latestPosts = blogPosts.slice(0, 3)

  const facts = [
    { value: `${years}+ yrs`, label: "flight control software" },
    { value: msc.degree, label: `${msc.field}, ${msc.end}` },
    { value: `${blogPosts.length}`, label: "technical articles" },
  ]

  return (
    <div className="text-gray-900 dark:text-white">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950"
      >
        {/* Decorative code glyphs (static, hidden from assistive tech) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block select-none font-mono opacity-[0.07] dark:opacity-[0.12]">
          <span className="absolute left-[6%] top-[12%] rotate-12 text-6xl text-blue-600 dark:text-blue-400">{"<>"}</span>
          <span className="absolute right-[8%] top-[18%] -rotate-12 text-5xl text-purple-600 dark:text-purple-400">{"{ }"}</span>
          <span className="absolute bottom-[14%] left-[12%] rotate-45 text-5xl text-pink-600 dark:text-pink-400">{"[]"}</span>
          <span className="absolute bottom-[10%] right-[18%] -rotate-12 text-4xl text-indigo-600 dark:text-indigo-400">{"=>"}</span>
        </div>

        <div className={`${container} relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:py-28`}>
          <div className="order-2 lg:order-1 text-center lg:text-left motion-safe:animate-fade-in-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 dark:border-blue-800/60 bg-white/70 dark:bg-gray-900/60 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {site.jobTitle} at {site.employer.name}
            </p>

            <h1 id="hero-title" className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {site.name}
              </span>
            </h1>
            <p className="mt-4 text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 sm:text-2xl">
              Software Engineer
              <span className="mx-2 font-light text-gray-400 dark:text-gray-500" aria-hidden>|</span>
              <span className="text-blue-700 dark:text-blue-400">Aerospace Systems</span>
              <span className="text-gray-500 dark:text-gray-400"> &amp; </span>
              <span className="text-purple-700 dark:text-purple-400">AI Research</span>
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 lg:mx-0">
              {site.description}
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start" aria-label="Areas of expertise">
              {site.expertise.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/70 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/projects"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl sm:w-auto"
              >
                View projects
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/experience"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-blue-600 px-6 py-2.5 font-semibold text-blue-700 transition-colors hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-400 dark:hover:text-gray-900 sm:w-auto"
              >
                <FileText className="h-4 w-4" aria-hidden />
                Resume
              </Link>
              <div className="flex items-center gap-2">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <Github className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/70 text-[#0A66C2] dark:text-blue-400 transition-colors hover:bg-blue-50 dark:hover:bg-gray-800"
                >
                  <Linkedin className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </div>

            <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4" aria-hidden />
              {site.location}
            </p>
          </div>

          {/* Portrait */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative h-48 w-48 sm:h-60 sm:w-60 lg:h-80 lg:w-80">
              <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-2xl" />
              <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 motion-safe:animate-spin-slow" />
              <div className="absolute inset-[6px] sm:inset-2 overflow-hidden rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-900">
                <Image
                  src="/koray.jpeg"
                  alt="Portrait of Koray Kara"
                  width={320}
                  height={320}
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 240px, 192px"
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick facts */}
        <div className={`${container} relative pb-14 sm:pb-16`}>
          <dl className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-800 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur">
            {facts.map((f) => (
              <div key={f.label} className="px-3 py-4 text-center sm:px-6 sm:py-5">
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-xl font-bold sm:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {f.value}
                </dd>
                <dd className="mt-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Featured projects ───────────────────────────── */}
      <section aria-labelledby="featured-title" className="py-16 sm:py-24">
        <div className={container}>
          <SectionHeading
            id="featured-title"
            eyebrow="Selected work"
            title="Featured projects"
            intro="Research in medical imaging and multimodal learning, alongside software that ships to real users."
            href="/projects"
            linkLabel="All projects"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ──────────────────────────────────── */}
      <section aria-labelledby="experience-title" className="border-y border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950/40 py-16 sm:py-24">
        <div className={container}>
          <SectionHeading
            id="experience-title"
            eyebrow="Career"
            title="Professional experience"
            intro="From defense and research internships to flight control software for aerospace platforms."
            href="/experience"
            linkLabel="Full experience"
          />
          <ol className="grid gap-4 md:grid-cols-2">
            {roles.map((role) => {
              const isCurrent = role.end === null
              return (
                <li
                  key={role.id}
                  className={`flex gap-4 rounded-2xl border bg-white dark:bg-gray-900 p-5 shadow-sm ${
                    isCurrent ? "border-blue-200 dark:border-blue-900/60 md:col-span-2" : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-gray-200 dark:ring-gray-700 ${role.wideLogo ? "p-1" : "p-2"}`}>
                    <img src={role.logo} alt="" loading="lazy" className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{role.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {role.company}
                      <span aria-hidden> · </span>
                      <span className="tabular-nums">
                        {formatMonth(role.start)} – {isCurrent ? "Present" : formatMonth(role.end!)}
                      </span>
                    </p>
                    {isCurrent && role.summary && (
                      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{role.summary}</p>
                    )}
                    {isCurrent && (
                      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Key skills">
                        {role.skills.slice(0, 5).map((s) => (
                          <li key={s} className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ── Latest writing ──────────────────────────────── */}
      <section aria-labelledby="writing-title" className="py-16 sm:py-24">
        <div className={container}>
          <SectionHeading
            id="writing-title"
            eyebrow="Writing"
            title="Latest articles"
            intro="Notes on design patterns, software fundamentals and algorithms, published on Medium."
            href="/blogs"
            linkLabel="All articles"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ─────────────────────────────────── */}
      <section aria-labelledby="contact-title" className="pb-20 sm:pb-24">
        <div className={container}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-12 text-center text-white shadow-xl sm:px-12">
            <h2 id="contact-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Let&apos;s talk about reliable software or AI research
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/85">
              Open to conversations about safety-critical systems, computer vision and medical imaging.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100 sm:w-auto"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Email me
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Connect on LinkedIn
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
