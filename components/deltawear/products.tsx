"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { RevealSection } from "./reveal-section"
import { ProductGallery } from "./product-gallery"
import { CountdownTimer } from "./countdown-timer"
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "./scroll-animations"

const sizes = ["S", "M", "L", "XL", "XXL"]

export function Products() {
  const [selectedSize, setSelectedSize] = useState("L")

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <RevealSection id="products" className="px-6 md:px-16 py-20 md:py-[140px]">
      {/* Section Intro */}
      <div className="grid md:grid-cols-2 gap-10 items-end mb-20">
        <AnimateOnScroll animation="fadeUp">
          <div className="text-[9px] tracking-[7px] uppercase text-[var(--accent)] mb-4">
            The Collection
          </div>
          <h2 className="text-[clamp(36px,5vw,64px)] font-extrabold tracking-[-1px] uppercase leading-[0.95]">
            Drop 001
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fadeUp" delay={150}>
          <p className="text-[13px] font-light text-white/40 leading-[1.9] max-w-[360px] self-end">
            Our first release. Every detail engineered for maximum performance and minimal distraction. 
            Wear it to the gym. Wear it to the world.
          </p>
        </AnimateOnScroll>
      </div>

      {/* Product Showcase */}
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
        {/* Left: Product Gallery */}
        <AnimateOnScroll animation="fadeRight" delay={100}>
          <ProductGallery />
        </AnimateOnScroll>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-6">
          <AnimateOnScroll animation="fadeLeft" delay={200}>
            {/* Countdown & Stock */}
            <CountdownTimer />
          </AnimateOnScroll>

          {/* Product Info Card */}
          <AnimateOnScroll animation="fadeLeft" delay={300}>
            <div className="bg-[#0d0d0d] border border-[var(--border)] p-8 md:p-10">
              <StaggerContainer staggerDelay={80}>
                <StaggerItem>
                  <div className="text-[8px] tracking-[5px] uppercase text-red-500 mb-5 inline-block border border-red-500/30 px-3 py-1">
                    Out of Stock - Drop 001
                  </div>
                </StaggerItem>
                
                <StaggerItem>
                  <div className="text-[32px] font-extrabold tracking-[-0.5px] leading-[1.05] uppercase mb-3">
                    Performance
                    <br />
                    Compression
                    <br />
                    Shirt
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="text-[11px] font-light text-white/40 tracking-[1px] leading-[1.8] mb-6">
                    Black - Slim Fit
                    <br />
                    4-Way Stretch - Moisture Wicking
                    <br />
                    Raglan Sleeve Construction
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-baseline gap-2.5 mb-2">
                    <span className="text-[38px] font-extralight tracking-[-1px]">39.000</span>
                    <span className="text-[12px] text-white/35 tracking-[2px]">TND</span>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="text-[9px] tracking-[3px] text-white/25 uppercase mb-8">
                    Free delivery - 2-4 days - All Tunisia
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="mb-2.5">
                    <div className="text-[8px] tracking-[4px] uppercase text-white/25">
                      Select Size
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex gap-2 mb-8">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "size-chip w-10 h-10 flex items-center justify-center border text-[10px] tracking-[1px] font-medium transition-all cursor-pointer",
                          selectedSize === size
                            ? "bg-[var(--white)] text-[var(--black)] border-[var(--white)]"
                            : "border-[var(--border)] hover:bg-[var(--white)] hover:text-[var(--black)] hover:border-[var(--white)]"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="bg-red-500/10 border border-red-500/30 p-4 mb-4 text-center">
                    <p className="text-red-400 text-[11px] tracking-wide">
                      The product is currently out of stock. Please wait until it becomes available.
                    </p>
                  </div>
                  <button
                    disabled
                    className="w-full py-[18px] bg-white/10 text-white/30 text-[9px] tracking-[6px] uppercase font-bold cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </AnimateOnScroll>

          {/* Trust Badges */}
          <AnimateOnScroll animation="fadeUp" delay={400}>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "truck", label: "Free Shipping" },
                { icon: "shield", label: "7-Day Exchange" },
                { icon: "check", label: "Quality Guaranteed" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="bg-[#0a0a0a] border border-[var(--border)] p-4 text-center"
                >
                  <div className="text-[var(--accent)] mb-2 flex justify-center">
                    {badge.icon === "truck" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    )}
                    {badge.icon === "shield" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                    {badge.icon === "check" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[8px] tracking-[2px] uppercase text-white/40">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </RevealSection>
  )
}
