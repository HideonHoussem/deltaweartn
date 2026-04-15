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
        "fixed inset-0 bg-[var(--black)] z-[8888] flex items-center justify-center flex-col gap-6 transition-opacity duration-[800ms]",
        isGone && "opacity-0 pointer-events-none"
      )}
    >
      <div className="w-16 h-16 opacity-0 animate-[loaderPop_0.6s_0.3s_forwards] flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="DeltaWear Logo"
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
        />
      </div>
      <div className="w-[200px] h-[1px] bg-white/10">
        <div className="h-full bg-[var(--white)] w-0 animate-[loaderBar_1.4s_0.5s_ease_forwards]" />
      </div>
      <div className="text-[12px] tracking-[8px] text-white/70 animate-[loaderPop_0.6s_0.8s_forwards] opacity-0 font-bold">
        BUILT DIFFERENT
      </div>
    </div>
  )
}
