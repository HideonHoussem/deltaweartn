import Image from "next/image"
import Link from "next/link"
import { Settings2 } from "lucide-react"
import { PRODUCTS } from "@/lib/products-data"
import { RevealSection } from "./reveal-section"

export function Products() {
  return (
    <RevealSection id="products" className="bg-[var(--background)] py-32 px-6 md:px-16 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1500px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20">
          <span className="text-[11px] font-bold tracking-[6px] uppercase text-[var(--accent)] mb-4">Curated Selection</span>
          <h2 className="text-5xl md:text-8xl font-serif text-white tracking-tighter italic mb-12">
            The <span className="text-gradient">Delta</span> Line
          </h2>
          
          {/* Metadata Bar */}
          <div className="w-full flex justify-between items-center border-b border-white/10 pb-8">
            <div className="text-[10px] md:text-[12px] uppercase tracking-[4px] text-white/30 font-bold">
              Showing {PRODUCTS.length} limited editions
            </div>
            
            <button className="flex items-center gap-3 px-6 py-3 glass rounded-full hover:border-[var(--accent)]/50 transition-all group">
              <span className="text-[10px] uppercase tracking-[3px] text-white/60 group-hover:text-white transition-colors">
                Refine Search
              </span>
              <Settings2 size={14} className="text-white/40 group-hover:text-white group-hover:rotate-180 transition-all duration-500" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-16 md:gap-y-28">
          {PRODUCTS.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group cursor-pointer flex flex-col hover-lift" suppressHydrationWarning>
              {/* Image Container with Floating Effect */}
              <div className="relative aspect-[1/1.3] bg-[#0a0a0a] overflow-hidden mb-8 border border-white/5 rounded-2xl transition-all duration-500 group-hover:border-[var(--accent)]/30 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Front Image */}
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-0"
                />
                
                {/* Back Image (Shown on Hover) */}
                {product.images[1] && (
                  <Image
                    src={product.images[1].src}
                    alt={`${product.name} back view`}
                    fill
                    className="object-cover absolute inset-0 opacity-0 scale-105 transition-all duration-1000 group-hover:opacity-100 group-hover:scale-100"
                  />
                )}
                
                {/* Status Badges */}
                {!product.inStock && (
                  <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full z-10">
                    <span className="text-[9px] text-white uppercase tracking-[3px] font-bold">Sold Out</span>
                  </div>
                )}
                
                {/* Hover Reveal Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0 glass rounded-t-2xl">
                   <p className="text-[10px] text-white/60 uppercase tracking-[2px] text-center font-bold">View Details</p>
                </div>
              </div>

              {/* Product Info with Refined Typography */}
              <div className="flex flex-col space-y-2 px-2">
                <h3 className="text-white text-[16px] md:text-[20px] font-serif tracking-tight transition-colors group-hover:text-[var(--accent)]">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-[var(--accent)] text-[14px] md:text-[16px] font-bold tracking-tighter">
                    {product.price} <span className="text-[10px] ml-1 uppercase opacity-60">TND</span>
                  </p>
                  <span className="text-[9px] uppercase tracking-[2px] text-white/30 font-bold">New Season</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </RevealSection>
  )
}

