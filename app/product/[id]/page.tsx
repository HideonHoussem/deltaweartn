"use client"

import React, { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/deltawear/navbar"
import { Footer } from "@/components/deltawear/footer"
import { PRODUCTS } from "@/lib/products-data"
import { ChevronLeft, ChevronRight, Minus, Plus, ChevronDown } from "lucide-react"
import * as Accordion from "@radix-ui/react-accordion"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0]
  const { addToCart, openCart } = useCart()

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)

  const sizes = ["XS", "S", "M", "L", "XL", "2XL"]

  if (!product) return <div>Product not found</div>

  return (
    <main className="min-h-screen bg-[var(--background)] text-white">
      <Navbar />

      <div className="pt-[100px] md:pt-[140px] pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-white/40 mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-white transition-colors">Retro Collection</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_450px] gap-8 md:gap-16 items-start">
          
          {/* 1. Left Thumbnails (Desktop) */}
          <div className="hidden lg:flex flex-col gap-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={cn(
                  "relative aspect-square w-full border transition-all overflow-hidden bg-[#141414]",
                  activeImageIndex === i ? "border-white" : "border-white/5 hover:border-white/20"
                )}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* 2. Main Image display */}
          <div className="relative aspect-[4/5] bg-[#141414] overflow-hidden group">
            <Image
              src={product.images[activeImageIndex].src}
              alt={product.images[activeImageIndex].alt}
              fill
              className="object-cover transition-all duration-700"
              priority
            />
            
            {/* Navigation Arrows */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button 
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white text-black rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white text-black rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* 3. Product Info & Controls */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-white/90 mb-8">
              {product.price} TND
            </p>
            
            <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed mb-10 max-w-lg">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] uppercase tracking-[3px] text-white font-bold">Size</span>
                <button className="text-[10px] uppercase tracking-[2px] text-white/40 hover:text-white transition-colors underline underline-offset-4">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-12 border text-[11px] font-bold transition-all",
                      selectedSize === size
                        ? "bg-white text-black border-white"
                        : "border-white/10 hover:border-white/30 text-white/60"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-10">
              <span className="text-[11px] uppercase tracking-[3px] text-white font-bold block mb-4">Quantity</span>
              <div className="inline-flex items-center border border-white/10 px-4 py-3 gap-6">
                <button 
                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
                   className="text-white/40 hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-bold min-w-[20px] text-center">{quantity}</span>
                <button 
                   onClick={() => setQuantity(quantity + 1)}
                   className="text-white/40 hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Order Now Button */}
            <button 
              onClick={() => {
                addToCart(product, selectedSize, quantity);
                openCart();
              }}
              className="w-full py-5 bg-[#828282] hover:bg-white text-black text-[12px] font-bold uppercase tracking-[4px] transition-all duration-500 mb-12 shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center text-center cursor-pointer"
            >
              Order Now
            </button>

            {/* Accordions */}
            <Accordion.Root type="single" collapsible className="w-full border-t border-white/10">
              <Accordion.Item value="materials" className="border-b border-white/10">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex justify-between items-center py-5 text-[11px] uppercase tracking-[3px] font-bold group">
                    Materials & Care
                    <ChevronDown size={14} className="text-white/40 group-data-[state=open]:rotate-180 transition-transform" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-5 text-[13px] text-white/60 leading-relaxed overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                  Crafted from 100% premium Tunisian cotton. Wash cold, inside out. Hang dry to maintain the integrity of the embroidered crest and fabric texture.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="shipping" className="border-b border-white/10">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex justify-between items-center py-5 text-[11px] uppercase tracking-[3px] font-bold group">
                    Shipping & Return
                    <ChevronDown size={14} className="text-white/40 group-data-[state=open]:rotate-180 transition-transform" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-5 text-[13px] text-white/60 leading-relaxed overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                  We offer worldwide shipping. Returns are accepted within 14 days of delivery. For more details, please visit our help center.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
