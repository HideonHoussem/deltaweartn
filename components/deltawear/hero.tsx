"use client"

import Image from "next/image"
import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", watchDrag: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect() // Set initial state
  }, [emblaApi])

  const slides = [
    { src: "/images/m4.jpeg", type: "cover" },
    { src: "/images/m1.png", type: "cover" },
    { src: "/images/m2.png", type: "cover" },
    { src: "/images/m3.jpeg", type: "cover" }
  ]

  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden group">
      {/* Background Slider with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, i) => (
              <div className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden" key={i}>
                <div className="relative w-full h-full transform transition-transform duration-[2000ms] ease-out group-hover:scale-110">
                  <Image
                    src={slide.src}
                    alt={`Delta Collection Hero ${i + 1}`}
                    fill
                    className="object-cover object-center"
                    priority={i === 0}
                    quality={100}
                    unoptimized={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sophisticated Overlays */}
      <div className="absolute inset-0 z-[1] bg-black/40 mix-blend-multiply" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Main Content Area */}
      <div className="relative z-[10] text-center px-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          <p className="text-[12px] md:text-[14px] font-bold tracking-[8px] uppercase text-white/60 animate-[fadeIn_1.5s_0.2s_both]">
            Aesthetically Engineered
          </p>

          <h1 className="text-[clamp(60px,12vw,140px)] font-serif italic tracking-tighter leading-[0.85] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-[fadeSlideUp_1s_0.4s_both]">
            Delta <span className="text-gradient">Collection</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 animate-[fadeSlideUp_1s_0.8s_both]">
            <button
              onClick={() => scrollToSection("products")}
              className="px-12 py-5 glass hover:bg-white hover:text-black transition-all duration-500 text-[13px] font-bold tracking-[4px] uppercase rounded-full group/btn"
            >
              Shop New Drop
              <span className="inline-block ml-3 transition-transform group-hover/btn:translate-x-2">→</span>
            </button>

            <button
              onClick={() => scrollToSection("philosophy")}
              className="text-[12px] font-bold tracking-[3px] uppercase text-white/70 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1"
            >
              Discover Philosophy
            </button>
          </div>
        </div>
      </div>

      {/* Slider Controls - Minimized and Elegant */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:right-12 md:translate-x-0 z-[20] flex items-center gap-6 animate-[fadeIn_1s_1.2s_both]">
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/10">
          <button onClick={scrollPrev} className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
          </button>
          <div className="flex gap-1.5 md:gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 md:h-1.5 rounded-full transition-all duration-500",
                  i === selectedIndex ? "bg-[var(--accent)] w-6 md:w-8" : "bg-white/20 w-1 md:w-1.5"
                )}
              />
            ))}
          </div>
          <button onClick={scrollNext} className="text-white/60 hover:text-white transition-colors">
            <ChevronRight className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
          </button>
        </div>
      </div>

      {/* Vertical Scroll Hint */}
      <div className="absolute left-12 bottom-12 z-[20] hidden lg:flex flex-col items-center gap-4 animate-[fadeIn_1s_1.5s_both]">
        <span className="text-[10px] tracking-[4px] uppercase vertical-text font-bold text-white/40">Scroll to Explore</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
