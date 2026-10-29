"use client"

type Option = { value: string; label: string; count?: number }

/** Accessible single-select chip group (toggle buttons with aria-pressed). */
export function FilterChips({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: Option[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-2">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-blue-600 bg-blue-600 text-white shadow-md"
                : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-700 dark:hover:bg-blue-900/20"
            }`}
          >
            {o.label}
            {o.count !== undefined && (
              <span
                className={`rounded-full px-1.5 text-xs tabular-nums ${
                  active ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                }`}
              >
                {o.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
