"use client"

import { RevealSection } from "./reveal-section"
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "./scroll-animations"
import { Shield, Zap, Target } from "lucide-react"

export function Philosophy() {
  return (
    <RevealSection 
      id="philosophy" 
      className="relative min-h-[80vh] flex items-center justify-center px-6 md:px-16 py-24 bg-[#050505] overflow-hidden border-b border-[var(--border)]"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.06)_0%,transparent_70%)]" />
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Decorative Architecture */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.02] -translate-y-1/2" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/[0.02] -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Headline Side: Speed-Glitch Typography */}
          <div className="flex-1 text-center lg:text-left">
            <AnimateOnScroll animation="fadeRight" delay={200}>
               <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
                 <div className="w-10 h-[1px] bg-[var(--accent)]" />
                 <span className="text-[10px] font-black uppercase tracking-[8px] text-[var(--accent)]">Philosophy 01</span>
               </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="scaleUp" delay={400}>
              <h2 
                className="text-[clamp(60px,10vw,140px)] font-black uppercase leading-[0.75] tracking-[-0.08em] select-none"
                style={{ transform: "skewX(-18deg)" }}
              >
                <span 
                  className="block relative z-10"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "repeating-linear-gradient(to bottom, #fff, #fff 1.5px, transparent 1.5px, transparent 3px)"
                  }}
                >
                  BUILT ON
                </span>
                <span 
                  className="block relative z-20 mt-2 italic text-[var(--accent)] drop-shadow-[0_0_30px_rgba(200,169,110,0.2)]"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "repeating-linear-gradient(to bottom, #c8a96e, #c8a96e 1.5px, transparent 1.5px, transparent 3px)"
                  }}
                >
                  GRIND.
                </span>
              </h2>
            </AnimateOnScroll>
          </div>

          {/* Manifesto Side: Staggered Reveal */}
          <div className="flex-1 max-w-xl">
            <StaggerContainer className="space-y-12">
              {[
                {
                  icon: Target,
                  title: "Anatomic Precision",
                  desc: "Every seam is strategically mapped to muscle groups. Our compression wear isn't just clothing; it's a structural advantage designed to reduce oscillation and fatigue."
                },
                {
                  icon: Shield,
                  title: "Tunisian Resilience",
                  desc: "Rooted in the grit of our home soil. Engineered to withstand the North African heat and the most intense underground training sessions."
                },
                {
                  icon: Zap,
                  title: "Elite Performance",
                  desc: "No compromises in Drop 001. We use 4-way stretch polymers that return energy with every movement. Speed isn't an option; it's the requirement."
                }
              ].map((item, i) => (
                <StaggerItem key={i} className="flex items-start gap-8 group">
                   <div className="size-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:border-[var(--accent)]/30 transition-colors">
                      <item.icon className="size-6 text-white/20 group-hover:text-[var(--accent)] transition-colors" />
                   </div>
                   <div>
                      <h3 className="text-[18px] font-black uppercase tracking-[2px] mb-3">{item.title}</h3>
                      <p className="text-[14px] text-white/80 leading-relaxed font-black uppercase tracking-tight">
                        {item.desc}
                      </p>
                   </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>
      </div>

      {/* Background Decorative Word */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 text-[25vw] font-black text-white/[0.03] uppercase tracking-[-0.1em] select-none pointer-events-none opacity-40">
        MISSION
      </div>
    </RevealSection>
  )
}
