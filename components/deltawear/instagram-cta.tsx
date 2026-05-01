"use client"

import { useEffect, useRef, useState } from "react"
import { Instagram } from "lucide-react"

export function InstagramCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-16 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 animate-[shimmer_3s_ease-in-out_infinite]" />
      
      {/* Floating orbs animation */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#833AB4]/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#F77737]/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FD1D1D]/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Animated Instagram icon */}
        <div
          className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] mb-8 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 rotate-[-20deg]"
          }`}
          style={{
            boxShadow: "0 0 60px rgba(253, 29, 29, 0.4)",
          }}
        >
          <Instagram className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>

        {/* Heading with staggered animation */}
        <h2
          className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[var(--white)]">Follow Us on </span>
          <span className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent">
            Instagram
          </span>
        </h2>

        {/* Subheading */}
        <p
          className={`text-white/40 text-lg md:text-xl mb-10 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Join our community and stay updated with the latest drops, behind-the-scenes content, and exclusive offers.
        </p>

        {/* Animated handle */}
        <div
          className={`inline-block mb-8 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-2xl md:text-3xl font-bold tracking-wider bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent animate-[glow_2s_ease-in-out_infinite]">
            @deltaweartn
          </span>
        </div>

        {/* CTA Button with hover animation */}
        <div
          className={`transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://www.instagram.com/deltaweartn/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(253,29,29,0.5)]"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F77737] via-[#FD1D1D] to-[#833AB4] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <Instagram className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="relative z-10">Follow @deltaweartn</span>
          </a>
        </div>

        {/* Stats with staggered reveal */}
        <div
          className={`flex flex-wrap justify-center gap-8 md:gap-16 mt-12 transition-all duration-700 delay-[600ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { label: "Followers", value: "Growing" },
            { label: "Posts", value: "Daily" },
            { label: "Community", value: "Active" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center transition-all duration-500"
              style={{ transitionDelay: `${700 + index * 100}ms` }}
            >
              <div className="text-xl md:text-2xl font-bold text-[var(--accent)]">
                {stat.value}
              </div>
              <div className="text-sm text-white/40 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent transition-all duration-1000 delay-700 ${
          isVisible ? "w-1/2 opacity-100" : "w-0 opacity-0"
        }`}
      />
    </section>
  )
}
