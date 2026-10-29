"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Camera, ChevronLeft, ChevronRight, MapPin, Calendar, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Photo } from "@/data/photos"

const COUNTRIES: Record<Photo["country"], { flag: string; label: string }> = {
  USA: { flag: "🇺🇸", label: "USA" },
  Germany: { flag: "🇩🇪", label: "Germany" },
}

const monthYear = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" })
const formatMonth = (iso: string) => monthYear.format(new Date(iso))

function dateRange(list: Photo[]) {
  const dates = list.map((p) => p.date).sort()
  const first = formatMonth(dates[0])
  const last = formatMonth(dates[dates.length - 1])
  if (first === last) return first
  // "August – September 2025" when the year matches
  const [m1, y1] = first.split(" ")
  const [m2, y2] = last.split(" ")
  return y1 === y2 ? `${m1} – ${m2} ${y2}` : `${first} – ${last}`
}

const unique = <T,>(list: T[]) => [...new Set(list)]

export function PhotographyView({ photos }: { photos: Photo[] }) {
  const [country, setCountry] = useState<Photo["country"] | "All">("All")
  const [city, setCity] = useState<string>("All")
  const [openId, setOpenId] = useState<string | null>(null)

  const countries = unique(photos.map((p) => p.country))
  const cities = country === "All" ? [] : unique(photos.filter((p) => p.country === country).map((p) => p.city))

  const visible = useMemo(
    () => photos.filter((p) => (country === "All" || p.country === country) && (city === "All" || p.city === city)),
    [photos, country, city],
  )

  // One section per country, in the order they appear in the data.
  const groups = unique(visible.map((p) => p.country)).map((c) => ({
    country: c,
    photos: visible.filter((p) => p.country === c),
  }))

  const selectCountry = (c: Photo["country"] | "All") => {
    setCountry(c)
    setCity("All")
  }

  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-light mb-6 text-gray-900 dark:text-white">Photography</h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Capturing moments, emotions, and the beauty of the world through my lens. A collection of my favorite shots
            from travels and daily life.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-10 sm:mb-12 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter by country">
            <Chip active={country === "All"} onClick={() => selectCountry("All")} count={photos.length}>
              All
            </Chip>
            {countries.map((c) => (
              <Chip
                key={c}
                active={country === c}
                onClick={() => selectCountry(c)}
                count={photos.filter((p) => p.country === c).length}
              >
                <span aria-hidden>{COUNTRIES[c].flag}</span> {COUNTRIES[c].label}
              </Chip>
            ))}
          </div>
          {cities.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-top-1 duration-300" role="tablist" aria-label="Filter by city">
              {["All", ...cities].map((c) => (
                <Chip key={c} small active={city === c} onClick={() => setCity(c)}>
                  {c === "All" ? "All cities" : c}
                </Chip>
              ))}
            </div>
          )}
        </div>

        {/* Galleries */}
        <div className="space-y-16">
          {groups.map((g) => (
            <section key={g.country} aria-labelledby={`trip-${g.country}`}>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div>
                  <h2 id={`trip-${g.country}`} className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
                    <span aria-hidden className="mr-2">
                      {COUNTRIES[g.country].flag}
                    </span>
                    {COUNTRIES[g.country].label}
                  </h2>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">{unique(g.photos.map((p) => p.city)).join(" · ")}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {dateRange(g.photos)} · {g.photos.length} {g.photos.length === 1 ? "photo" : "photos"}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                {g.photos.map((p, i) => (
                  <PhotoTile key={p.id} photo={p} priority={i < 4} onOpen={() => setOpenId(p.id)} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Equipment Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">My Equipment</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Camera className="h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold mb-2">Camera</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Canon EOS R5</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">L</span>
                </div>
                <h3 className="font-semibold mb-2">Primary Lens</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">24-70mm f/2.8L</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">E</span>
                </div>
                <h3 className="font-semibold mb-2">Editing</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Lightroom & Photoshop</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {openId && <Lightbox photos={visible} openId={openId} onChange={setOpenId} onClose={() => setOpenId(null)} />}
    </div>
  )
}

function Chip({
  active,
  onClick,
  count,
  small,
  children,
}: {
  active: boolean
  onClick: () => void
  count?: number
  small?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border font-medium transition-all ${
        small ? "px-3.5 py-1 text-xs" : "px-4 py-1.5 text-sm"
      } ${
        active
          ? "bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900 shadow-md"
          : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
      }`}
    >
      {children}
      {count !== undefined && <span className={`text-xs ${active ? "opacity-70" : "text-gray-400"}`}>{count}</span>}
    </button>
  )
}

function PhotoTile({ photo, priority, onOpen }: { photo: Photo; priority: boolean; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50"
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      aria-label={`Open ${photo.title}`}
    >
      <img
        src={photo.thumb}
        alt={photo.title}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <span className="block text-sm sm:text-base font-semibold text-white leading-tight line-clamp-2">{photo.title}</span>
        <span className="mt-1 flex items-center gap-1 text-xs text-white/80">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{photo.city}</span>
        </span>
      </span>
    </button>
  )
}

function Lightbox({
  photos,
  openId,
  onChange,
  onClose,
}: {
  photos: Photo[]
  openId: string
  onChange: (id: string) => void
  onClose: () => void
}) {
  const index = Math.max(0, photos.findIndex((p) => p.id === openId))
  const photo = photos[index]
  const touchX = useRef<number | null>(null)

  const go = useCallback(
    (step: number) => onChange(photos[(index + step + photos.length) % photos.length].id),
    [index, photos, onChange],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") go(1)
      else if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, onClose])

  useEffect(() => {
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = overflow
    }
  }, [])

  // Warm up the neighbours so next/previous feels instant.
  useEffect(() => {
    for (const step of [1, -1]) {
      const next = photos[(index + step + photos.length) % photos.length]
      if (next) new Image().src = next.src
    }
  }, [index, photos])

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-black/95 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 text-white/80 text-sm">
        <span className="tabular-nums">
          {index + 1} / {photos.length}
        </span>
        <button
          onClick={onClose}
          className="rounded-full p-2 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Close"
          autoFocus
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Image */}
      <div className="relative flex-1 min-h-0">
        {/* Absolute box gives the image a definite height to fit inside. */}
        <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-20">
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-300"
            style={{ backgroundImage: `url(${photo.thumb})`, backgroundSize: "cover" }}
          />
        </div>
        {photos.length > 1 && (
          <>
            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />
          </>
        )}
      </div>

      {/* Caption */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 text-center text-white" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg sm:text-2xl font-semibold">{photo.title}</h2>
        <p className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {photo.place}, {photo.city}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatMonth(photo.date)}
          </span>
        </p>
        <p className="mt-2 mx-auto max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed hidden sm:block">
          {photo.description}
        </p>
      </div>
    </div>
  )
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-2 sm:left-5" : "right-2 sm:right-5"
      } hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition-colors`}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
    >
      <Icon className="h-6 w-6" />
    </button>
  )
}
