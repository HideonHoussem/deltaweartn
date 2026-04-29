"use client"

import Image from "next/image"

export function SubscriptionStrip() {
  return (
    <section className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Blue Tint */}
      <div className="absolute inset-0 bg-[#081226]">
        <Image
          src="/images/slider-bg.jpg"
          alt="Delta Experience"
          fill
          className="object-cover object-center brightness-[0.35] transition-all duration-1000"
          quality={100}
        />
        {/* Deep Blue Cinematic Overlay */}
        <div className="absolute inset-0 bg-[#081226]/70 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <h2 className="text-white text-4xl md:text-6xl font-serif mb-4 tracking-tight leading-tight">
          Experience Deltaweartn
        </h2>
        <p className="text-white/80 text-[13px] md:text-[15px] mb-8 tracking-[2px] uppercase font-medium">
          Subscribe to our newsletter and get 10% off
        </p>

        <button className="px-12 py-4 border border-white text-white text-[11px] tracking-[4px] uppercase font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-xl">
          Subscribe
        </button>
      </div>
    </section>
  )
}
