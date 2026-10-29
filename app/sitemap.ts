import type { MetadataRoute } from "next"
import { navItems, site } from "@/lib/site"

// Required for `output: "export"`: generate sitemap.xml at build time.
export const dynamic = "force-static"

const priority: Record<string, number> = { "/": 1, "/experience": 0.9, "/projects": 0.9, "/about": 0.8, "/blogs": 0.7 }

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return navItems.map(({ href }) => ({
    url: href === "/" ? site.url : `${site.url}${href}`,
    lastModified,
    changeFrequency: href === "/videos" ? "weekly" : "monthly",
    priority: priority[href] ?? 0.6,
  }))
}
