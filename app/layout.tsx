import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { sharedOpenGraph, sharedTwitter, site } from "@/lib/site"
import { education } from "@/data/experience"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
})

const defaultTitle = `${site.name} | ${site.headline}`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Koray Kara",
    "software engineer",
    "flight control software",
    "safety-critical software",
    "real-time systems",
    "embedded C++",
    "DO-178C",
    "Turkish Aerospace",
    "computer vision",
    "deep learning",
    "medical image segmentation",
    "super-resolution",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: { ...sharedOpenGraph, title: defaultTitle, description: site.description, url: "/" },
  twitter: { ...sharedTwitter, title: defaultTitle, description: site.description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
}

// Structured data: who the site is about, and the site itself.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}/koray.jpeg`,
      jobTitle: site.jobTitle,
      description: site.description,
      worksFor: { "@type": "Organization", name: site.employer.name, url: site.employer.url },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Hacettepe University" },
      hasCredential: education.map((d) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: `${d.degree} in ${d.field}`,
        recognizedBy: { "@type": "CollegeOrUniversity", name: d.school },
      })),
      address: { "@type": "PostalAddress", addressLocality: "Ankara", addressCountry: "TR" },
      knowsAbout: [...site.expertise, "DO-178C", "Model-based development"],
      sameAs: [site.links.github, site.links.linkedin, site.links.medium, site.links.youtube],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 md:ml-20 min-w-0">
              <Navbar />
              <main id="main" tabIndex={-1} className="pt-16 pb-16 md:pb-0 focus:outline-none">
                <div className="page-transition">{children}</div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
