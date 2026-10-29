"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X } from "lucide-react"
import { navItems } from "@/lib/site"

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

export function Navbar() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  // Close the menu on navigation and with Escape.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <header className="fixed top-0 left-0 md:left-20 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-700/50">
      <nav aria-label="Main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Koray Kara
          </Link>

          {/* Desktop links: only from lg up so they never crowd on tablets */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                    {active && <span aria-hidden className="absolute inset-x-2.5 -bottom-[13px] h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {/* Same size before and after mount, so nothing shifts */}
              {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
            </button>

            <button
              type="button"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="lg:hidden border-t border-gray-200/60 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg motion-safe:animate-fade-in"
      >
        <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-2 sm:px-6">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    active
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
