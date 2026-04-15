"use client"

import { RevealSection } from "./reveal-section"
import { AnimateOnScroll } from "./scroll-animations"

const features = [
  {
    num: "01",
    title: "4-Way Stretch",
    desc: "Engineered fabric moves in every direction with your body. Zero restrictions, maximum performance.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Moisture Wicking",
    desc: "Advanced hydrophobic weave pulls sweat away from skin instantly. Stay dry. Stay focused.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Compression Fit",
    desc: "Graduated compression supports muscle groups during heavy training. Recover faster.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Free Delivery TN",
    desc: "Free shipping to every governorate in Tunisia. Order today, delivered in 2-4 business days.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
]

export function Features() {
  return (
    <RevealSection id="features" className="border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feat, i) => (
        <AnimateOnScroll
          key={i}
          animation="fadeUp"
          delay={i * 100}
          className={`p-10 md:p-14 group hover:bg-[#0a0a0a] transition-colors duration-500 ${
            i < features.length - 1 ? "border-b sm:border-b-0 sm:border-r lg:border-r border-[var(--border)]" : ""
          } ${i === 1 ? "sm:border-r-0 lg:border-r" : ""}`}
        >
          <div className="text-[var(--accent)] mb-5 opacity-60 group-hover:opacity-100 transition-opacity">
            {feat.icon}
          </div>
          <div className="text-[12px] tracking-[4px] text-[var(--accent)] mb-3 font-bold">
            {feat.num}
          </div>
          <div className="text-[18px] font-bold tracking-[1px] uppercase mb-3 leading-[1.2]">
            {feat.title}
          </div>
          <div className="text-[13px] font-normal text-white/70 leading-[1.9] group-hover:text-white/80 transition-colors">
            {feat.desc}
          </div>
        </AnimateOnScroll>
      ))}
    </RevealSection>
  )
}
