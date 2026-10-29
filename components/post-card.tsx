import { ArrowUpRight, Calendar, Clock } from "lucide-react"
import { formatPostDate, type BlogPost } from "@/data/blog"

/** Blog card; the whole card is one link to the Medium article. */
export function PostCard({ post, headingLevel: H = "h3" }: { post: BlogPost; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/70 motion-safe:hover:-translate-y-1 focus-within:ring-2 focus-within:ring-blue-500">
      <div className="relative aspect-[16/9] overflow-hidden bg-white dark:bg-gray-100">
        <img
          src={post.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-2 transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {post.category}
        </span>
        {post.language === "TR" && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-gray-800" title="Written in Turkish">
            TR
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readTime} min read
          </span>
        </div>
        <H className="mt-3 text-lg font-semibold leading-snug text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <a href={post.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
            {/* Stretched link: makes the whole card clickable */}
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </a>
        </H>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">{post.excerpt}</p>
        <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
          Read on Medium
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </article>
  )
}
