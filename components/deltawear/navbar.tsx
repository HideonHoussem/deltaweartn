"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { ShoppingBag } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { totalItems, openCart } = useCart()
  const isHome = pathname === "/"

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
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="DeltaWear Logo"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
        <span className="text-[11px] md:text-[13px] font-black tracking-[4px] md:tracking-[4px] uppercase text-[var(--white)] whitespace-nowrap">
          DeltaWear
        </span>
      </Link>

      <div className="hidden md:flex gap-11">
        {[
          { label: "Collection", id: "products" },
          { label: "Features", id: "features" },
          { label: "FAQ", id: "faq" },
        ].map((item) => (
          item.type === "link" ? (
            <a 
              key={item.label}
              href={item.id}
              className="flex items-center gap-2 text-[11px] font-black tracking-[2px] uppercase text-[var(--accent)] hover:text-white transition-all relative group cursor-pointer"
            >
              <Lock className="w-3 h-3 group-hover:scale-110 transition-transform" />
              {item.label}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
            </a>
          ) : !isHome ? (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className="text-[11px] font-black tracking-[2px] uppercase text-white/90 hover:text-white transition-colors relative group cursor-pointer"
            >
              {item.label}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
            </Link>
          ) : (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[11px] font-black tracking-[2px] uppercase text-white/90 hover:text-white transition-colors relative group cursor-pointer bg-transparent border-none"
            >
              {item.label}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
            </button>
          )
        ))}
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden lg:block text-[10px] tracking-[4px] text-[var(--accent)] uppercase border border-[rgba(200,169,110,0.3)] px-3.5 py-1.5 font-semibold">
          Free Delivery
        </div>
        
        <button
          id="cart-icon"
          onClick={openCart}
          className="relative group p-2 transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="View Panier"
        >
          <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[var(--accent)] transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-black text-[9px] md:text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
