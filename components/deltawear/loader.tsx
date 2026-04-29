"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Loader() {
  const [isGone, setIsGone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGone(true)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 bg-[#050505] z-[9999] flex items-center justify-center flex-col gap-12 transition-all duration-1000 ease-in-out",
        isGone && "opacity-0 pointer-events-none scale-105"
      )}
    >
      {/* Central Logo with Reveal and Pulse Animation */}
      <div className="animate-loaderPop flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="DeltaWear Logo"
          width={180}
          height={180}
          className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] md:w-[240px] md:h-[240px] animate-logoPulse"
          priority
        />
      </div>

      {/* Sleek Loading Bar */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-[200px] md:w-[300px] h-[2px] bg-white/5 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent w-full animate-loaderBar" />
        </div>
        
        <div className="overflow-hidden">
          <p className="text-[9px] md:text-[11px] tracking-[6px] md:tracking-[10px] text-white/40 uppercase font-bold animate-[fadeSlideUp_0.8s_0.5s_both]">
            Built Different
          </p>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
    </div>
  )
}
