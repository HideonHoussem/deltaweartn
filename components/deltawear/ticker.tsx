export function Ticker() {
  const items = [
    "Built Different",
    "Drop 001",
    "Free Delivery — All Tunisia",
    "4-Way Stretch",
    "Moisture Wicking",
    "Performance Compression",
    "DeltaWear TN",
  ]

  return (
    <div className="overflow-hidden border-t border-b border-[var(--border)] py-4">
      <div className="flex animate-[ticker_22s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8 pr-8">
            <span className="text-[12px] tracking-[6px] uppercase text-white/60 font-medium">{item}</span>
            <span className="w-[3px] h-[3px] rounded-full bg-[var(--accent)] opacity-50" />
          </div>
        ))}
      </div>
    </div>
  )
}
