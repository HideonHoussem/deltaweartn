"use client"

import { useCart } from "@/lib/cart-context"
import { Check, X } from "lucide-react"
import Image from "next/image"

export function CartPopup() {
  const { showPopup, setShowPopup, lastAddedItem, openCart } = useCart()

  if (!showPopup || !lastAddedItem) return null

  return (
    <div className="fixed bottom-6 right-6 z-[600] w-[320px] bg-[#111] border border-[var(--border)] p-4 shadow-2xl animate-in slide-in-from-right-10 fade-in duration-500">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-[var(--accent)] rounded-full p-1">
            <Check className="w-3 h-3 text-black" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-white">
            Added to Panier
          </span>
        </div>
        <button 
          onClick={() => setShowPopup(false)}
          className="text-white/40 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="w-16 h-16 bg-[#050505] border border-[var(--border)] overflow-hidden">
          <Image 
            src={lastAddedItem.image} 
            alt={lastAddedItem.productName} 
            width={64} 
            height={64} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-[12px] font-bold text-white mb-1 line-clamp-1">
            {lastAddedItem.productName}
          </h4>
          <p className="text-[10px] text-white/50 mb-1">
            Size: {lastAddedItem.size} | Qty: {lastAddedItem.qty}
          </p>
          <p className="text-[12px] font-bold text-[var(--accent)]">
            {lastAddedItem.price.toFixed(3)} DT
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setShowPopup(false)
            openCart()
          }}
          className="bg-white text-black text-[10px] font-bold uppercase py-2.5 transition-all hover:bg-[var(--accent)] cursor-pointer"
        >
          View Panier
        </button>
        <button
          onClick={() => setShowPopup(false)}
          className="border border-white/20 text-white text-[10px] font-bold uppercase py-2.5 transition-all hover:bg-white/10 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
