"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Scan, X } from "lucide-react"

interface ProductGalleryProps {
  images: { src: string; alt: string }[]
  badgeNumber?: string
  hotspots?: { x: number; y: number; label: string; info: string }[]
}

export function ProductGallery({ images, badgeNumber = "011", hotspots = [] }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isXRay, setIsXRay] = useState(false)

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-3">
      {/* Main Product Stage (NEON TUNNEL PORTAL) */}
      <div
        className="relative overflow-hidden bg-black aspect-[3/4] group border border-white/5"
        style={{ perspective: "1000px" }}
      >
        {/* Smooth Background Vibe (Aurora/Mesh Gradient) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
          <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-[var(--accent)]/30 rounded-full blur-[120px] animate-[aurora_20s_infinite_alternate_ease-in-out]" />
          <div className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-[var(--accent)]/15 rounded-full blur-[120px] animate-[aurora_25s_infinite_alternate-reverse_ease-in-out]" style={{ animationDelay: '-5s' }} />
        </div>

        {/* Top Vibe: Aurora Flare */}
        <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-[var(--accent)]/20 to-transparent blur-[40px] pointer-events-none opacity-50 z-10" />

        {/* Gold Backdrop Glow (Keep behind) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[var(--accent)]/10 rounded-full blur-[100px] pointer-events-none animate-[glowPulse_6s_infinite_ease-in-out]" />

        {/* Main Product Image */}
        <div className={cn(
          "relative w-full h-full animate-[float_8s_infinite_ease-in-out] z-20 transition-all duration-700",
          isXRay ? "brightness-[1.2] contrast-[1.2] hue-rotate-[10deg] saturate-[1.5]" : ""
        )}>
          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            fill
            className={cn(
              "object-cover transition-all duration-1000 group-hover:scale-105",
              isXRay ? "filter brightness-150 drop-shadow-[0_0_30px_rgba(200,169,110,0.4)]" : "brightness-[1.1] drop-shadow-[0_20px_60px_rgba(0,0,0,1)]"
            )}
            priority
          />
          
          {/* X-Ray Tech Overlay Layer */}
          <div className={cn(
             "absolute inset-0 z-30 pointer-events-none transition-opacity duration-700 delay-300",
             isXRay ? "opacity-100" : "opacity-0"
          )}>
             {/* Tech Grid Lines */}
             <div className="absolute inset-0 bg-[#c8a96e]/10 mix-blend-overlay opacity-30" 
                  style={{ backgroundImage: 'linear-gradient(#c8a96e 1px, transparent 1px), linear-gradient(90deg, #c8a96e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             
             {/* Tech Hotspots */}
             {hotspots.map((spot, i) => (
                <div 
                  key={i}
                  className="absolute pointer-events-auto group/spot"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                   {/* Radar Pulse */}
                   <div className="absolute -translate-x-1/2 -translate-y-1/2 size-8 bg-[var(--accent)]/40 rounded-full animate-ping" />
                   <div className="relative -translate-x-1/2 -translate-y-1/2 size-3 bg-[var(--accent)] rounded-full shadow-[0_0_20px_var(--accent)] cursor-help border border-black" />
                   
                   {/* Tooltip */}
                   <div className="absolute top-4 left-4 min-w-[180px] bg-black/90 backdrop-blur-xl border border-[var(--accent)]/30 p-4 rounded-xl opacity-0 group-hover/spot:opacity-100 transition-all duration-300 translate-y-2 group-hover/spot:translate-y-0 shadow-2xl z-40">
                      <div className="text-[10px] font-black uppercase tracking-[3px] text-[var(--accent)] mb-1">{spot.label}</div>
                      <div className="text-[12px] text-white/60 font-medium leading-tight">{spot.info}</div>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Background Layer: Product ID Typography (Refined Jersey Outline) */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-10">
          <div className="relative transform -rotate-6 scale-110">
            <h1
              className="text-[28vw] font-black tracking-[-0.05em] uppercase leading-none opacity-[0.28]"
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.6)',
                color: 'transparent',
                textShadow: '0 0 40px rgba(200,169,110,0.2)'
              }}
            >
              {badgeNumber}
            </h1>
            {/* Scan Line Animation (Subtle) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/30 to-transparent h-[100%] w-[2px] left-1/2 -translate-x-1/2"
              style={{ animation: 'digitalScan 4s infinite ease-in-out' }}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/60 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] hover:scale-110 active:scale-95 cursor-pointer z-30"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/60 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] hover:scale-110 active:scale-95 cursor-pointer z-30"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-6 left-6 text-[10px] tracking-[4px] uppercase text-white/40 font-bold bg-black/40 backdrop-blur-sm px-4 py-2 border border-white/5">
          {activeIndex + 1} <span className="text-[var(--accent)]">/</span> {images.length}
        </div>

        {/* X-Ray Toggle Button */}
        <button
          onClick={() => setIsXRay(!isXRay)}
          className={cn(
            "absolute top-6 right-6 z-40 px-5 py-2.5 rounded-full border flex items-center gap-3 transition-all duration-500 cursor-pointer overflow-hidden group/btn",
            isXRay 
              ? "bg-[var(--accent)] border-[var(--accent)] text-black shadow-[0_0_30px_rgba(200,169,110,0.5)]" 
              : "bg-black/60 border-white/10 text-white/60 hover:border-[var(--accent)]/50 hover:text-white"
          )}
        >
          {isXRay ? <X className="size-4" /> : <Scan className="size-4 animate-pulse" />}
          <span className="text-[10px] font-black uppercase tracking-[4px]">
            {isXRay ? "EXIT SCAN" : "SCAN TECH"}
          </span>
          {/* Animated Background Glow */}
          {!isXRay && <div className="absolute inset-x-[-100%] inset-y-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover/btn:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />}
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative w-24 h-24 overflow-hidden transition-all cursor-pointer border",
              activeIndex === index
                ? "border-[var(--accent)] scale-[1.02]"
                : "border-white/10 opacity-40 hover:opacity-100"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-[center_top]"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
