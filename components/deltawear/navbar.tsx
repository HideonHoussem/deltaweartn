"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 md:px-16 py-5 md:py-7 transition-all duration-400",
        scrolled && "bg-[rgba(5,5,5,0.92)] backdrop-blur-[20px] py-4 md:py-[18px] border-b border-[var(--border)]"
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/images/logo.png"
          alt="DeltaWear Logo"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
        <span className="text-[13px] font-bold tracking-[6px] uppercase text-[var(--white)]">
          DeltaWear
        </span>
      </div>

      <div className="hidden md:flex gap-11">
        {[
          { label: "Collection", id: "products" },
          { label: "Features", id: "features" },
          { label: "FAQ", id: "faq" },
          { label: "Order", id: "order" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-[10px] font-medium tracking-[5px] uppercase text-white/45 hover:text-white transition-colors relative group cursor-pointer bg-transparent border-none"
          >
            {item.label}
            <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:block text-[9px] tracking-[4px] text-[var(--accent)] uppercase border border-[rgba(200,169,110,0.3)] px-3.5 py-1.5">
          Free Delivery
        </div>
        <button
          onClick={() => scrollToSection("order")}
          className="text-[9px] tracking-[4px] uppercase bg-[var(--white)] text-[var(--black)] px-4 md:px-[22px] py-2 md:py-2.5 font-bold hover:bg-[var(--accent)] hover:scale-[1.02] transition-all cursor-pointer"
        >
          Order Now
        </button>
      </div>
    </nav>
  )
}
