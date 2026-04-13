"use client"

import { useEffect, useState } from "react"
import { Flame } from "lucide-react"

// Set your actual restock target date here
const RESTOCK_DATE = new Date("2026-05-01T00:00:00")

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const stock = 0
  const maxStock = 50

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = RESTOCK_DATE.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const stockPercentage = (stock / maxStock) * 100

  return (
    <div className="bg-[#0a0a0a] border border-[var(--border)] p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="w-4 h-4 text-[var(--accent)]" />
        <span className="text-[10px] tracking-[4px] uppercase text-[var(--accent)] font-semibold">
          Restocking Soon
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Mins" },
          { value: timeLeft.seconds, label: "Secs" },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <div className="bg-[#111] border border-[var(--border)] py-3 px-2 mb-2">
              <span className="text-[28px] md:text-[36px] font-extralight tracking-[-1px]">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[8px] tracking-[3px] uppercase text-white/40">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] tracking-[3px] uppercase text-white/50">Stock Status</span>
          <span className="text-[11px] font-semibold text-red-400">Out of Stock</span>
        </div>
        <div className="h-1.5 bg-[#1a1a1a] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500"
            style={{ width: `${stockPercentage}%` }}
          />
        </div>
        <p className="text-[10px] text-white/35 leading-relaxed">
          <span className="text-red-400 font-semibold">Currently sold out.</span> New stock arriving May 1st.
          Stay tuned for restocking updates!
        </p>
      </div>
    </div>
  )
}
