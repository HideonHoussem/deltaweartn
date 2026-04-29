"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { ShoppingBag, Menu, X } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems, openCart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const menuItems = [
    { label: "Shop", id: "products" },
    { label: "Vision", id: "philosophy" },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[500] grid grid-cols-3 items-center px-6 md:px-16 py-4 md:py-6 transition-all duration-700",
          scrolled
            ? "glass-dark py-3 md:py-4 border-b border-white/5"
            : "bg-transparent py-6 md:py-8"
        )}
      >
        {/* Left: Mobile Menu Trigger & Desktop Links */}
        <div className="flex items-center justify-start">
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden md:flex items-center gap-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[11px] font-bold tracking-[4px] uppercase transition-all duration-300 text-white/60 hover:text-white relative group cursor-pointer"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent)] group-hover:w-full transition-all duration-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="DeltaWear Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[14px] md:text-[18px] font-serif italic tracking-[2px] text-white">
              DeltaWear
            </span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-6 md:gap-12">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[9px] tracking-[4px] uppercase font-bold text-[var(--accent)]">Tunisia Official</span>
            <span className="text-[8px] tracking-[2px] uppercase text-white/40">Free Express Delivery</span>
          </div>

          <button
            id="cart-icon"
            onClick={openCart}
            className="relative group p-3 glass rounded-full transition-all duration-500 hover:scale-110 hover:border-[var(--accent)]/50 cursor-pointer"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[var(--accent)] transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-black text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in duration-500 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <button 
          className="absolute top-8 right-8 text-white p-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>

        <div className="h-full flex flex-col items-center justify-center gap-12">
          {menuItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-2xl font-serif italic tracking-widest text-white transition-all duration-500 delay-[i*100ms]",
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[6px] uppercase font-bold text-[var(--accent)]">Tunisia Official</span>
            <span className="text-[9px] tracking-[4px] uppercase text-white/30">Elevating the Game Since 1920</span>
          </div>
        </div>
      </div>
    </>
  )
}
