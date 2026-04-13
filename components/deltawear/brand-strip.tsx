"use client"

import Image from "next/image"
import { RevealSection } from "./reveal-section"

export function BrandStrip() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <RevealSection className="px-6 md:px-16 py-16 md:py-[100px] bg-[#0a0a0a] border-t border-b border-[var(--border)] flex flex-col md:flex-row items-center gap-16 md:gap-20">
      <div className="flex-1">
        <div className="text-[9px] tracking-[7px] uppercase text-[var(--accent)] mb-4">
          Our Mission
        </div>
        <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-[-1px] uppercase leading-[0.95]">
          BUILT FOR
          <br />
          <em className="font-serif italic font-normal text-[var(--accent)]">
            those who
            <br />
            train.
          </em>
        </h2>
        <p className="mt-6 text-[13px] font-light text-white/35 leading-[1.9] max-w-[400px]">
          DeltaWear TN was built for athletes who refuse to compromise. Tunisian-rooted, globally inspired. 
          Every piece in our collection is a statement — wear your dedication.
        </p>
        <div className="mt-10">
          <button
            onClick={() => scrollToSection("order")}
            className="px-12 py-4 bg-[var(--accent)] text-[var(--black)] text-[9px] tracking-[6px] uppercase font-bold hover:translate-y-[-2px] hover:shadow-[0_12px_40px_rgba(200,169,110,0.25)] transition-all cursor-pointer"
          >
            Get Yours Now
          </button>
        </div>
      </div>
      <Image
        src="/images/hero-model.jpg"
        alt="DeltaWear TN Brand"
        width={380}
        height={480}
        className="w-full md:w-[380px] h-[320px] md:h-[480px] object-cover object-[center_15%] brightness-90 flex-shrink-0"
      />
    </RevealSection>
  )
}
