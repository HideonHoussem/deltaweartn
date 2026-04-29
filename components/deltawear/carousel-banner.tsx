"use client"

import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function CarouselBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
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
    
    // Optional auto-play could be added here
  }, [emblaApi])

  const slides = [
    "/images/slider-bg.jpg",
    "/images/lefriki-hero.jpg",
    "/images/product-main.jpg",
    "/images/hero-model.jpg"
  ]

  return (
    <div className="relative w-full h-[500px] md:h-[700px] group border-y border-white/5 bg-black">
      {/* Viewport */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((src, i) => (
            <div className="relative flex-[0_0_100%] min-w-0 h-full" key={i}>
              <Image 
                src={src} 
                fill 
                className="object-cover" 
                alt={`Slide ${i + 1}`} 
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={scrollPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      
      <button 
        onClick={scrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Pagination Dots (like the provided image) */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === selectedIndex 
                ? "bg-white w-3 h-3 md:w-3.5 md:h-3.5 shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                : "bg-white/40 hover:bg-white/70 w-2 h-2 md:w-2.5 md:h-2.5"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
