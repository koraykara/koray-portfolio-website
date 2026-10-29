"use client"

import { useState } from "react"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"
import { formatPostDate, type BlogPost } from "@/data/blog"
import { PostCard } from "@/components/post-card"
import { FilterChips } from "@/components/filter-chips"

export function BlogView({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState("All")

  const categories = Array.from(new Set(posts.map((p) => p.category)))
  const options = [
    { value: "All", label: "All", count: posts.length },
    ...categories.map((c) => ({ value: c, label: c, count: posts.filter((p) => p.category === c).length })),
  ]

  const visible = category === "All" ? posts : posts.filter((p) => p.category === category)
  const [latest, ...rest] = visible

  return (
    <>
      <FilterChips label="Filter articles by category" options={options} value={category} onChange={setCategory} />
      <p className="mt-4 mb-10 text-center text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
        Showing {visible.length} of {posts.length} articles
      </p>

      {latest && (
        <article className="group relative mb-12 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800/60 shadow-sm transition-shadow hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-500">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="order-2 lg:order-1 flex flex-col justify-center p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-300">
                  Latest
                </span>
                <span className="rounded-full bg-white/80 dark:bg-gray-900/60 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                  {latest.category}
                </span>
                {latest.language === "TR" && (
                  <span className="rounded-full bg-white/80 dark:bg-gray-900/60 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                    In Turkish
                  </span>
                )}
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href={latest.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden />
                  {latest.title}
                </a>
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">{latest.excerpt}</p>
              <div className="mt-5 flex items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden />
                  <time dateTime={latest.date}>{formatPostDate(latest.date)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden />
                  {latest.readTime} min read
                </span>
              </div>
              <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md">
                Read on Medium
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </div>
            <div className="order-1 lg:order-2 aspect-[16/9] lg:aspect-auto overflow-hidden bg-white">
              <img src={latest.image} alt="" className="h-full w-full object-contain p-4" />
            </div>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.url} post={post} headingLevel="h2" />
          ))}
        </div>
      )}
    </>
  )
}
