"use client"

import { RevealSection } from "./reveal-section"

export function ImpactText() {
  const stripedWhite = {
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundImage: "repeating-linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255) 1.5px, transparent 1.5px, transparent 2px)"
  } as React.CSSProperties

  const stripedGold = {
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundImage: "repeating-linear-gradient(var(--accent), var(--accent) 1.5px, transparent 1.5px, transparent 2px)"
  } as React.CSSProperties

  return (
    <RevealSection className="bg-black py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden border-b border-white/5 relative">
      {/* Background Brand Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <span className="text-[30vw] font-black tracking-tighter uppercase italic">Delta</span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Top Tag with Striped Style */}


        <div className="flex flex-col items-center text-center">
        </div>


      </div>
    </RevealSection>
  )
}
