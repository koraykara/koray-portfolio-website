import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Koray Kara - Software Engineer & Problem Solver",
  description:
    "Personal portfolio of Koray Kara, a passionate software engineer who loves writing code and solving problems.",
  keywords: [
    "software engineer",
    "web developer",
    "full stack developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "portfolio",
    "Koray Kara",
  ],
  authors: [{ name: "Koray Kara" }],
  creator: "Koray Kara",
  openGraph: {
    title: "Koray Kara - Software Engineer & Problem Solver",
    description:
      "Personal portfolio of Koray Kara, a passionate software engineer who loves writing code and solving problems.",
    type: "website",
    locale: "en_US",
    siteName: "Koray Kara Portfolio",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 ml-20">
              <Navbar />
              <main className="pt-16">
                <div className="page-transition">{children}</div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
