"use client"

import Image from "next/image"
import { Instagram, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"

export function SubscriptionStrip() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const { applyDiscount } = useCart();

  return (
    <section className="relative w-full bg-black border-y border-[var(--accent)]/20 overflow-hidden shadow-[0_0_60px_rgba(200,169,110,0.05)]">
      <div 
        onMouseMove={handleMouseMove}
        className="liquid-glow relative px-6 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16"
      >
        {/* Visual Identity */}
        <div className="flex items-center gap-6 group">
          <div className="relative size-16 md:size-24 bg-white/[0.02] border border-white/5 rounded-[18px] flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:border-[var(--accent)]/30 group-hover:shadow-[0_0_40px_rgba(200,169,110,0.15)]">
             <Image 
               src="/images/logo.png" 
               alt="DeltaWear" 
               width={48} 
               height={48} 
               className="grayscale brightness-150 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-3"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-[28px] md:text-[42px] font-black uppercase tracking-[-2px] text-white leading-none">
              Join the <span className="text-[var(--accent)] italic">Alliance</span>
            </h3>
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[3px] text-white/40">Connect for elite logistics</p>
          </div>
        </div>

        {/* Promo Messaging */}
        <div className="flex-1 max-w-2xl text-center md:text-left">
           <div className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full mb-6 animate-pulse">
              <Instagram className="size-3.5 text-[var(--accent)]" />
              <span className="text-[10px] font-black uppercase tracking-[3px] text-[var(--accent)]">Digital Exclusive</span>
           </div>
           <p className="text-[16px] md:text-[22px] font-bold text-white/90 leading-[1.1] uppercase tracking-tighter">
             Follow <span className="text-white font-black underline decoration-[var(--accent)] decoration-2 underline-offset-8">@DeltaWearTN</span>
             <br className="hidden md:block" /> 
             and secure a <span className="text-[var(--accent)] font-black text-[20px] md:text-[32px] px-2 italic">5% Remise</span> for your next drop.
           </p>
        </div>

        {/* CTA Button */}
        <a
          href="https://www.instagram.com/deltaweartn/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={applyDiscount}
          className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[4px] text-[13px] rounded-[14px] overflow-hidden transition-all duration-500 hover:bg-[var(--accent)] hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
        >
          <span className="relative z-10 flex items-center gap-4">
            Subscribe Now
            <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-2" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
        </a>
      </div>
      
      {/* Decorative Branding */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/[0.01] pointer-events-none select-none uppercase tracking-[-0.05em]">
        DeltaWear
      </div>

      {/* Border Lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent opacity-30" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20" />
    </section>
  )
}
