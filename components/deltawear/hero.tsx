"use client"

import Image from "next/image"

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="h-screen relative flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-model.jpg"
          alt="DeltaWear TN Hero"
          fill
          className="object-cover object-[center_25%] animate-[heroZoom_12s_ease_forwards]"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,5,5,0.82)] via-[rgba(5,5,5,0.2)] to-[rgba(5,5,5,0.6)]" />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Hero Content */}
      <div className="relative z-[2] px-6 md:px-16 pb-[70px] md:pb-[90px] max-w-[900px]">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-7 opacity-0 animate-[fadeSlideUp_0.8s_0.4s_forwards]">
          <div className="w-10 h-[1px] bg-[var(--accent)]" />
          <div className="text-[9px] tracking-[7px] uppercase text-[var(--accent)]">
            Drop 001 · Now Available · Tunisia
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(64px,10vw,148px)] font-black leading-[0.88] tracking-[-2px] uppercase opacity-0 animate-[fadeSlideUp_0.9s_0.6s_forwards]">
          BUILT
          <br />
          <em className="block font-serif italic font-normal text-[clamp(44px,7vw,108px)] text-white/[0.18] tracking-normal">
            Different.
          </em>
        </h1>

        {/* Description */}
        <p className="mt-8 text-[13px] font-light text-white/45 leading-[1.9] max-w-[440px] tracking-[0.5px] opacity-0 animate-[fadeSlideUp_0.9s_0.8s_forwards]">
          Performance compression wear engineered for athletes who don&apos;t settle. 
          Moisture-wicking technology, 4-way stretch fabric — made for the grind.
        </p>

        {/* Actions */}
        <div className="mt-11 flex items-center gap-5 opacity-0 animate-[fadeSlideUp_0.9s_1s_forwards]">
          <button
            onClick={() => scrollToSection("products")}
            className="px-8 md:px-12 py-4 bg-[var(--accent)] text-[var(--black)] text-[9px] tracking-[6px] uppercase font-bold hover:translate-y-[-2px] hover:shadow-[0_12px_40px_rgba(200,169,110,0.25)] transition-all cursor-pointer"
          >
            Shop Collection
          </button>
          <button
            onClick={() => scrollToSection("order")}
            className="px-8 md:px-12 py-4 border border-white/20 text-[var(--white)] text-[9px] tracking-[6px] uppercase font-medium bg-transparent hover:border-white/60 transition-colors cursor-pointer"
          >
            Order Now →
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute right-6 md:right-16 bottom-[70px] md:bottom-[90px] z-[2] hidden md:flex flex-col gap-8 opacity-0 animate-[fadeIn_0.9s_1.2s_forwards]">
        {[
          { num: "001", label: "Drop" },
          { num: "24h", label: "Response" },
          { num: "TN", label: "Free Delivery" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-right">
              <div className="text-4xl font-extralight tracking-[-1px] leading-none">{stat.num}</div>
              <div className="text-[9px] tracking-[4px] text-white/30 uppercase mt-1">{stat.label}</div>
            </div>
            {i < 2 && <div className="w-10 h-[1px] bg-white/10 self-end mt-4" />}
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2.5 opacity-25 animate-[fadeIn_1s_1.5s_both]">
        <div className="w-[1px] h-[50px] bg-gradient-to-b from-transparent to-white animate-[pulse_2s_infinite]" />
        <span className="text-[8px] tracking-[5px] uppercase">Scroll</span>
      </div>
    </section>
  )
}
