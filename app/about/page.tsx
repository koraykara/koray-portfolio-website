import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Building2, Cpu, GraduationCap, MapPin, Brain, ShieldCheck, Workflow } from "lucide-react"
import { pageMetadata, site } from "@/lib/site"
import { education, roles } from "@/data/experience"
import { focusAreas, skillGroups } from "@/data/skills"
import { monthsBetween } from "@/lib/dates"

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Koray Kara is a Flight Control Software Engineer at Turkish Aerospace (TUSAŞ) with a B.Sc. and M.Sc. from Hacettepe University, working on safety-critical real-time software and AI research in medical imaging.",
  path: "/about",
})

const FOCUS_ICONS = {
  "safety-critical": ShieldCheck,
  "real-time": Cpu,
  "model-based": Workflow,
  "ai-research": Brain,
} as const

export default function AboutPage() {
  const current = roles.find((r) => r.end === null)!
  const years = Math.floor(monthsBetween(current.start, null) / 12)
  const msc = education.find((d) => d.id === "msc")!
  const bsc = education.find((d) => d.id === "bsc")!

  const quickInfo = [
    { icon: Building2, title: "Turkish Aerospace", text: "TUSAŞ · since 2021", tint: "text-blue-600 dark:text-blue-400" },
    { icon: GraduationCap, title: "Hacettepe University", text: "B.Sc. & M.Sc.", tint: "text-purple-600 dark:text-purple-400" },
    { icon: MapPin, title: site.location, text: "Based in", tint: "text-emerald-600 dark:text-emerald-400" },
    { icon: Brain, title: "AI research", text: "Medical image segmentation", tint: "text-pink-600 dark:text-pink-400" },
  ]

  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <section aria-labelledby="about-title" className="mb-16 sm:mb-20 grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16 motion-safe:animate-fade-in-up">
          <div className="flex justify-center">
            <div className="relative h-56 w-56 sm:h-72 sm:w-72">
              <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 motion-safe:animate-spin-slow" />
              <div className="absolute inset-2 overflow-hidden rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-900">
                <Image src="/koray.jpeg" alt="Portrait of Koray Kara" width={320} height={320} className="h-full w-full object-cover" priority />
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h1 id="about-title" className="text-4xl sm:text-5xl font-light tracking-tight text-gray-900 dark:text-white">
              About{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Koray Kara
              </span>
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300">
              {site.jobTitle} at {site.employer.name}
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 mx-auto lg:mx-0">
              {site.description}
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-2xl mx-auto lg:mx-0">
              {quickInfo.map(({ icon: Icon, title, text, tint }) => (
                <li
                  key={title}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 text-left shadow-sm"
                >
                  <Icon className={`h-5 w-5 shrink-0 ${tint}`} aria-hidden />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Biography */}
        <section aria-labelledby="bio-title" className="mb-16 sm:mb-20">
          <div className="rounded-3xl border-0 bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 p-6 sm:p-10 lg:p-12 shadow-xl">
            <h2 id="bio-title" className="mb-6 text-center text-3xl font-semibold text-gray-900 dark:text-white">
              About me
            </h2>
            <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                I am a <strong className="text-gray-900 dark:text-white">Flight Control Software Engineer at Turkish Aerospace (TUSAŞ)</strong>,
                where for {years}+ years I have been building <strong className="text-gray-900 dark:text-white">real-time, safety-critical software</strong>{" "}
                for advanced aerospace platforms in <strong className="text-gray-900 dark:text-white">C++</strong>, following{" "}
                <strong className="text-gray-900 dark:text-white">DO-178C</strong> processes on real-time operating systems such as Green Hills INTEGRITY.
              </p>
              <p>
                I hold a <strong className="text-gray-900 dark:text-white">{bsc.degree} in {bsc.field}</strong> ({bsc.start}–{bsc.end}) and an{" "}
                <strong className="text-gray-900 dark:text-white">{msc.degree} in {msc.field}</strong> ({msc.start}–{msc.end}), both from Hacettepe
                University. My M.Sc. thesis studied <strong className="text-gray-900 dark:text-white">region-aware super-resolution for medical image segmentation</strong>{" "}
                on MRI and CT data.
              </p>
              <p>
                Before Turkish Aerospace I interned at <strong className="text-gray-900 dark:text-white">ASELSAN</strong> and{" "}
                <strong className="text-gray-900 dark:text-white">TÜBİTAK BİLGEM</strong>, and worked as an undergraduate research fellow on a
                TÜBİTAK multimodal learning project. Outside work I solve algorithm problems and teach them through{" "}
                <Link href="/videos" className="font-medium text-blue-700 dark:text-blue-400 underline underline-offset-2 hover:no-underline">
                  YouTube videos
                </Link>{" "}
                and{" "}
                <Link href="/blogs" className="font-medium text-blue-700 dark:text-blue-400 underline underline-offset-2 hover:no-underline">
                  articles
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Focus areas */}
        <section aria-labelledby="focus-title" className="mb-16 sm:mb-20">
          <div className="mb-10 text-center">
            <h2 id="focus-title" className="text-3xl font-semibold text-gray-900 dark:text-white">What I work on</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {focusAreas.map((area) => {
              const Icon = FOCUS_ICONS[area.id as keyof typeof FOCUS_ICONS] ?? Cpu
              return (
                <article
                  key={area.id}
                  className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{area.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{area.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {area.tags.map((t) => (
                      <li key={t} className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        {/* Technical toolkit */}
        <section aria-labelledby="toolkit-title">
          <div className="mb-10 text-center">
            <h2 id="toolkit-title" className="text-3xl font-semibold text-gray-900 dark:text-white">Technical toolkit</h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">Grouped by where I use them.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.title} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">{g.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1 text-sm text-gray-800 dark:text-gray-200"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700"
            >
              See my experience
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
