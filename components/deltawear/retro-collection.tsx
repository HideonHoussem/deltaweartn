"use client"

import Image from "next/image"
import { RevealSection } from "./reveal-section"

export function RetroCollection() {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <RevealSection className="bg-[var(--background)] py-20 px-6 md:px-12 w-full overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-6 lg:gap-10 items-center">

        {/* Left Image (Tall) */}
        <div className="hidden lg:block relative h-[700px] w-full group overflow-hidden">
          <Image
            src="/images/m5.png"
            alt="Retro Collection Look 1"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center px-4 py-8 lg:py-0 relative">
          {/* Floating Heritage Coordinates */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[9px] tracking-[6px] text-white/20 uppercase font-bold pointer-events-none whitespace-nowrap">
            36.8065° N, 10.1815° E — HERITAGE DNA
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-serif text-white mb-6 tracking-wide drop-shadow-sm">
            Delta Collection
          </h2>
          <p className="text-white/80 text-[13px] md:text-[15px] max-w-md mb-12 leading-relaxed tracking-wide">
            Honors the legacy of Delta through timeless design and the iconic crest.<br /><br />
            For those who have always believed.<br />
            This is not just a collection, it’s belonging.<br />
            Club Africain standing together.
          </p>

          {/* Middle Images Grid */}
          <div className="grid grid-cols-2 gap-4 w-full mb-14">
            <div className="relative aspect-[4/5] w-full group overflow-hidden">
              <Image
                src="/images/m8.png"
                alt="Delta Lifestyle"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative aspect-[4/5] w-full group overflow-hidden">
              <Image
                src="/images/m9.png"
                alt="Delta Details"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <button
            onClick={scrollToProducts}
            className="px-12 py-4 border border-white/30 text-white text-[11px] tracking-[4px] uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            Shop Now
          </button>
        </div>

        {/* Right Image (Tall) */}
        <div className="hidden lg:block relative h-[700px] w-full group overflow-hidden">
          <Image
            src="/images/m7.png"
            alt="Retro Collection Look 2"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

      </div>
    </RevealSection>
  )
}
