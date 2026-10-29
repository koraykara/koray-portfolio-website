import type { Metadata } from "next"
import { pageMetadata, site } from "@/lib/site"
import { blogPosts } from "@/data/blog"
import { PageHeader } from "@/components/section-heading"
import { BlogView } from "./blog-view"

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Articles by Koray Kara on Java design patterns, object-oriented programming and data structures & algorithms, published on Medium.",
  path: "/blogs",
})

export default function BlogsPage() {
  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Blog"
          intro={
            <>
              Notes on design patterns, software fundamentals and algorithms. All articles are published on{" "}
              <a
                href={site.links.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-700 dark:text-blue-400 underline underline-offset-2 hover:no-underline"
              >
                Medium
              </a>
              .
            </>
          }
        />
        <BlogView posts={blogPosts} />
      </div>
    </div>
  )
}
