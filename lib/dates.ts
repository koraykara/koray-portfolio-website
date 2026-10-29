// Date helpers for "YYYY-MM" strings used in data/experience.ts.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const parse = (ym: string) => {
  const [y, m] = ym.split("-").map(Number)
  return { y, m }
}

export const formatMonth = (ym: string) => {
  const { y, m } = parse(ym)
  return `${MONTHS[m - 1]} ${y}`
}

// Inclusive month count, like LinkedIn ("Jun 2020 – Aug 2020 · 3 mos").
export function monthsBetween(start: string, end: string | null) {
  const s = parse(start)
  const now = new Date()
  const e = end ? parse(end) : { y: now.getFullYear(), m: now.getMonth() + 1 }
  return (e.y - s.y) * 12 + (e.m - s.m) + 1
}

export function formatDuration(months: number) {
  const y = Math.floor(months / 12)
  const m = months % 12
  const parts = []
  if (y) parts.push(`${y} ${y === 1 ? "yr" : "yrs"}`)
  if (m) parts.push(`${m} ${m === 1 ? "mo" : "mos"}`)
  return parts.join(" ")
}
