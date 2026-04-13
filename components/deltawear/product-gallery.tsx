"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react"

const images = [
  { src: "/images/product-main.jpg", alt: "Front View" },
  { src: "/images/hero-model.jpg", alt: "Lifestyle Shot" },
  { src: "/images/product-detail.jpg", alt: "Detail View" },
]

export function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main Image */}
        <div
          className="relative overflow-hidden bg-[#0a0a0a] aspect-[3/4] cursor-zoom-in group"
          onClick={() => setIsZoomed(true)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            fill
            className="object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4 text-white" />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--accent)] hover:text-[var(--black)] cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--accent)] hover:text-[var(--black)] cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 text-[9px] tracking-[3px] uppercase text-white/60 bg-black/50 backdrop-blur-sm px-3 py-1.5">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-20 h-20 overflow-hidden transition-all cursor-pointer",
                activeIndex === index
                  ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--black)]"
                  : "opacity-50 hover:opacity-100"
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

      {/* Lightbox / Zoomed View */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center animate-[fadeIn_0.2s_ease]"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border border-white/20 hover:bg-[var(--accent)] hover:text-[var(--black)] hover:border-[var(--accent)] transition-all cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 hover:bg-[var(--accent)] hover:text-[var(--black)] hover:border-[var(--accent)] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 hover:bg-[var(--accent)] hover:text-[var(--black)] hover:border-[var(--accent)] transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Zoomed Image */}
          <div
            className="relative w-[90vw] h-[85vh] overflow-hidden cursor-move"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain transition-transform duration-100"
              style={{
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                transform: "scale(1.5)",
              }}
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setActiveIndex(index); }}
                className={cn(
                  "relative w-16 h-16 overflow-hidden transition-all cursor-pointer",
                  activeIndex === index
                    ? "ring-2 ring-[var(--accent)]"
                    : "opacity-40 hover:opacity-100"
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
      )}
    </>
  )
}
