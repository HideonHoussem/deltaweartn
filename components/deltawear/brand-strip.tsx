"use client"

import Image from "next/image"
import { RevealSection } from "./reveal-section"
import { ArrowRight, Box, Zap } from "lucide-react"

export function BrandStrip() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <RevealSection className="px-6 md:px-16 py-24 md:py-[180px] bg-[#050505] border-y border-[var(--border)] relative overflow-hidden">
      {/* Background Architectural Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />
      
      <div className="relative max-w-5xl mx-auto text-center">
        
        {/* Centered Mission Content */}
        <div className="z-10 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[1px] bg-[var(--accent)]/50" />
            <span className="text-[10px] font-black uppercase tracking-[12px] text-[var(--accent)]">Philosophy 01</span>
            <div className="w-12 h-[1px] bg-[var(--accent)]/50" />
          </div>

          {/* SPEED-GLITCH TYPOGRAPHY */}
          <div className="mb-16 relative group">
            <h2 
              className="text-[clamp(60px,12vw,160px)] font-black uppercase leading-[0.75] select-none text-center tracking-[-0.08em] relative flex flex-col items-center"
              style={{ transform: "skewX(-22deg)" }}
            >
              <span 
                className="relative z-10"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "repeating-linear-gradient(to bottom, #fff, #fff 1.2px, transparent 1.2px, transparent 2.4px)"
                }}
              >
                We Are
              </span>
              
              <span 
                 className="relative z-20 mt-2"
                 style={{
                   WebkitBackgroundClip: "text",
                   WebkitTextFillColor: "transparent",
                   backgroundImage: "repeating-linear-gradient(to bottom, #c8a96e, #c8a96e 1.2px, transparent 1.2px, transparent 2.4px)"
                 }}
              >
                Builders
              </span>
            </h2>
            
            {/* Ambient Background Word */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 text-[25vw] font-black text-white/[0.04] uppercase tracking-[-0.1em] select-none pointer-events-none">
              DELTA
            </div>
          </div>

          <div className="max-w-xl mx-auto">
             <p className="text-[14px] md:text-[16px] text-white/40 leading-relaxed font-medium uppercase tracking-[2px]">
               Anatomic compression designed for the elite athlete.
               <br />
               Tunisian rooted. Globally synchronized.
             </p>
          </div>
        </div>

      </div>
    </RevealSection>
  )
}
