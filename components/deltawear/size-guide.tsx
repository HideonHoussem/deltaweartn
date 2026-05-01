"use client"

import { useState } from "react"
import { X, Ruler } from "lucide-react"
import { cn } from "@/lib/utils"

const sizeData = [
  { size: "S", chest: "86-91", waist: "71-76", hips: "86-91", height: "165-170" },
  { size: "M", chest: "91-97", waist: "76-81", hips: "91-97", height: "170-175" },
  { size: "L", chest: "97-102", waist: "81-86", hips: "97-102", height: "175-180" },
  { size: "XL", chest: "102-107", waist: "86-91", hips: "102-107", height: "180-185" },
  { size: "XXL", chest: "107-112", waist: "91-97", hips: "107-112", height: "185-190" },
]

export function SizeGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState("L")

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-[12px] tracking-[2px] uppercase text-white/60 hover:text-[var(--accent)] transition-colors cursor-pointer font-medium"
      >
        <Ruler className="w-3.5 h-3.5" />
        Size Guide
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease]"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[var(--border)] overflow-hidden animate-[fadeSlideUp_0.4s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div>
                <h3 className="text-[18px] font-bold tracking-[-0.5px] uppercase mb-1">
                  Size Guide
                </h3>
                <p className="text-[12px] tracking-[2px] uppercase text-white/60 font-medium">
                  All measurements in centimeters
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center border border-[var(--border)] hover:bg-[var(--accent)] hover:text-[var(--black)] hover:border-[var(--accent)] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Size Selection */}
            <div className="p-6 border-b border-[var(--border)]">
              <div className="text-[12px] tracking-[4px] uppercase text-white/70 mb-3 font-bold">
                Select Your Size
              </div>
              <div className="flex gap-2">
                {sizeData.map((item) => (
                  <button
                    key={item.size}
                    onClick={() => setSelectedSize(item.size)}
                    className={cn(
                      "w-12 h-12 flex items-center justify-center border text-[11px] tracking-[1px] font-medium transition-all cursor-pointer",
                      selectedSize === item.size
                        ? "bg-[var(--accent)] text-[var(--black)] border-[var(--accent)]"
                        : "border-[var(--border)] hover:border-[var(--accent)]"
                    )}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Table */}
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left text-[11px] tracking-[4px] uppercase text-white/70 pb-4 font-bold">
                      Size
                    </th>
                    <th className="text-center text-[11px] tracking-[4px] uppercase text-white/70 pb-4 font-bold">
                      Chest
                    </th>
                    <th className="text-center text-[11px] tracking-[4px] uppercase text-white/70 pb-4 font-bold">
                      Waist
                    </th>
                    <th className="text-center text-[11px] tracking-[4px] uppercase text-white/70 pb-4 font-bold">
                      Hips
                    </th>
                    <th className="text-center text-[11px] tracking-[4px] uppercase text-white/70 pb-4 font-bold">
                      Height
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((item) => (
                    <tr
                      key={item.size}
                      className={cn(
                        "border-b border-[var(--border)] transition-colors",
                        selectedSize === item.size && "bg-[rgba(200,169,110,0.08)]"
                      )}
                    >
                      <td className="py-4">
                        <span
                          className={cn(
                            "text-[13px] font-semibold",
                            selectedSize === item.size && "text-[var(--accent)]"
                          )}
                        >
                          {item.size}
                        </span>
                      </td>
                      <td className="text-center text-[12px] text-white/90 py-4 font-medium">
                        {item.chest}
                      </td>
                      <td className="text-center text-[12px] text-white/90 py-4 font-medium">
                        {item.waist}
                      </td>
                      <td className="text-center text-[12px] text-white/90 py-4 font-medium">
                        {item.hips}
                      </td>
                      <td className="text-center text-[12px] text-white/90 py-4 font-medium">
                        {item.height}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tips */}
            <div className="p-6 bg-[#080808] border-t border-[var(--border)]">
              <div className="text-[12px] tracking-[3px] uppercase text-[var(--accent)] mb-3 font-bold">
                Fit Tips
              </div>
              <ul className="space-y-2 text-[11px] text-white/80 leading-relaxed font-medium">
                <li>• Compression fit - designed to be tight for muscle support</li>
                <li>• If between sizes, choose the larger size for a less compressive fit</li>
                <li>• Measure over underwear for the most accurate results</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
