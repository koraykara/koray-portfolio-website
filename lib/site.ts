// Single source of truth for site-wide identity, links and SEO defaults.

export const site = {
  url: "https://koraykara.dev",
  name: "Koray Kara",
  headline: "Software Engineer | Aerospace Systems & AI Research",
  description:
    "I build reliable, real-time software for safety-critical systems and explore the intersection of artificial intelligence, computer vision, and medical imaging.",
  jobTitle: "Flight Control Software Engineer",
  employer: { name: "Turkish Aerospace", url: "https://www.tusas.com.tr/en" },
  location: "Ankara, Türkiye",
  email: "koray.kara98.kk@gmail.com",
  ogImage: "/og.jpg",
  links: {
    github: "https://github.com/koraykara",
    linkedin: "https://www.linkedin.com/in/koray-kara-424b19146/",
    medium: "https://medium.com/@koray.kara98.kk",
    youtube: "https://www.youtube.com/@koraykara6270",
    instagram: "https://www.instagram.com/koraykara98/",
  },
  expertise: ["C++", "Real-Time Systems", "Safety-Critical Software", "Computer Vision", "Deep Learning", "Medical Imaging"],
} as const

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/photography", label: "Photography" },
  { href: "/connect", label: "Connect" },
] as const

const ogImage = { url: site.ogImage, width: 1200, height: 630, alt: `${site.name}: ${site.headline}` }

export const sharedOpenGraph = {
  type: "website" as const,
  locale: "en_US",
  siteName: site.name,
  images: [ogImage],
}

export const sharedTwitter = {
  card: "summary_large_image" as const,
  images: [ogImage.url],
}

/**
 * Per-page metadata with canonical URL, Open Graph and Twitter cards.
 * Next.js replaces (not merges) nested objects like `openGraph`, so the shared fields are repeated here.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }) {
  const fullTitle = `${title} | ${site.name}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, title: fullTitle, description, url: path },
    twitter: { ...sharedTwitter, title: fullTitle, description },
  }
}
