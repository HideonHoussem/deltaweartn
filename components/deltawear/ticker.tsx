export function Ticker() {
  const items = [
    "La Bella Tradizione",
    "Delta Collection",
    "Curva Nord 95",
    "Club Africain",
    "Since 1920",
    "Timeless Design",
    "Stand Together",
    "La Nostra Storia",
  ]

  return (
    <div className="overflow-hidden border-t border-b border-[var(--border)] py-4 bg-[var(--background)]">
      <div className="flex animate-[ticker_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-12 pr-12">
            <span className="text-[11px] tracking-[6px] uppercase text-white/70 font-medium">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-50" />
          </div>
        ))}
      </div>
    </div>
  )
}
