"use client"

import { useState, useEffect } from "react"
import { useCart, CartItem } from "@/lib/cart-context"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet"
import { Minus, Plus, Trash2, ShieldCheck, Truck, Globe, MapPin, Phone, User, ChevronRight } from "lucide-react"

const governorates = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja",
  "Jendouba", "Kef", "Siliana", "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan",
  "Kasserine", "Sidi Bouzid", "Gabès", "Medenine", "Tataouine", "Gafsa", "Tozeur", "Kébili"
]

function validatePhone(phone: string): boolean {
  return /^[234579][0-9]{7}$/.test(phone.replace(/\s/g, ""))
}

export function CartDrawer() {
  const { 
    isOpen, 
    closeCart, 
    items, 
    updateQty, 
    removeFromCart, 
    totalPrice, 
    rawTotalPrice,
    totalItems,
    hasDiscount,
    clearCart 
  } = useCart()

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    city: "",
    address: "",
    note: ""
  })

  const [phoneError, setPhoneError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "phone") setPhoneError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { fname, lname, phone, city, address } = formData
    
    if (!fname || !lname || !phone || !city || !address) {
      alert("Please fill in all required fields.")
      return
    }
    
    if (!validatePhone(phone)) {
      setPhoneError("Enter a valid Tunisian number (8 digits)")
      return
    }

    if (items.length === 0) return

    setLoading(true)

    const payload = {
      ...formData,
      product: items.map(i => `${i.productName} [${i.size}] (x${i.qty})`).join(" + ") + (hasDiscount ? " [-5% ALLIANCE DISCOUNT]" : ""),
      size: items[0].size,
      qty: items.reduce((acc, item) => acc + item.qty, 0).toString(),
      fullOrder: items 
    }

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Submission failed")

      setSubmitted(true)
      clearCart()
    } catch (err) {
      alert("Failed to place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent 
        className="bg-[#050505] border-l-[var(--border)] sm:max-w-[100vw] lg:max-w-[1150px] w-full overflow-y-auto p-0 hide-scrollbar"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>DeltaWear Shopping Bag</SheetTitle>
          <SheetDescription>Review your selected performance gear and complete your high-end purchase.</SheetDescription>
        </SheetHeader>

        {!submitted ? (
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left Column: Premium Inventory View */}
            <div className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto">
              <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[var(--accent)]" />
                  <span className="text-[10px] font-black uppercase tracking-[5px] text-[var(--accent)]">DeltaInventory</span>
                </div>
                <h2 className="text-[42px] md:text-[56px] font-black tracking-[-3px] text-white uppercase leading-none">
                  Shopping<br />Bag
                  <span className="text-[var(--accent)] ml-2 italic">.{totalItems}</span>
                </h2>
              </header>

              {items.length === 0 ? (
                <div className="py-32 flex flex-col items-center justify-center border border-white/5 bg-white/[0.02] rounded-[32px] animate-in fade-in zoom-in duration-1000">
                  <div className="size-24 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-10 text-white/10 group-hover:scale-110 transition-transform duration-700">
                     <Image 
                       src="/images/logo.png" 
                       alt="Delta" 
                       width={48} 
                       height={48} 
                       className="grayscale brightness-150 opacity-40"
                     />
                  </div>
                  <p className="text-white/20 text-[12px] uppercase tracking-[6px] font-bold mb-10 text-center px-10">
                    Your collection is empty
                  </p>
                  
                  <div className="flex flex-col gap-4 w-full px-12">
                    <button 
                      onClick={() => {
                        closeCart();
                        setTimeout(() => {
                          const el = document.getElementById('products');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 400);
                      }} 
                      className="group relative overflow-hidden w-full py-5 border border-[var(--accent)] rounded-full transition-all duration-500 hover:scale-[1.02]"
                    >
                      <div className="absolute inset-0 bg-[var(--accent)] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="relative z-10 text-[var(--accent)] group-hover:text-black text-[12px] font-black uppercase tracking-[4px] transition-colors duration-500">
                        Explore Drop 001
                      </span>
                    </button>

                    <button 
                      className="group relative overflow-hidden w-full py-5 border border-white/10 rounded-full transition-all duration-500 opacity-60 hover:opacity-100 hover:border-white/30"
                    >
                      <span className="relative z-10 text-white/30 group-hover:text-white text-[12px] font-black uppercase tracking-[4px] transition-colors duration-500">
                        Explore Drop 002 <span className="text-[8px] opacity-40 font-medium tracking-tight ml-1">(Coming Soon)</span>
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  {items.map((item, idx) => (
                    <div 
                      key={item.id} 
                      className="group flex flex-col sm:flex-row gap-6 md:gap-8 items-start animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      {/* Product Visual */}
                      <div className="w-full sm:w-32 h-44 bg-[#0a0a0a] rounded-[16px] overflow-hidden shrink-0 border border-white/5 relative group-hover:border-[var(--accent)]/30 transition-colors duration-500 liquid-glow"
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                          e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                        }}
                      >
                        <Image 
                          src={item.image} 
                          alt={item.productName} 
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Product Intel */}
                      <div className="flex-1 w-full space-y-4 py-1">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-[20px] md:text-[24px] font-black text-white uppercase tracking-tighter leading-none mb-3 group-hover:text-[var(--accent)] transition-colors">
                              {item.productName}
                            </h3>
                            <div className="flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-widest">
                              <span>Size: {item.size}</span>
                              <div className="size-1 rounded-full bg-white/10" />
                              <span>Model: {item.productId.slice(-4).toUpperCase()}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[22px] font-black text-white tracking-tighter">
                              {item.price.toFixed(3)}
                            </span>
                            <span className="text-[10px] font-black text-white/30 ml-1">DT</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center bg-white/[0.03] rounded-full border border-white/10 p-1">
                            <button 
                              onClick={() => updateQty(item.id, -1)}
                              className="size-9 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-[14px] font-black text-white w-10 text-center">
                              {item.qty}
                            </span>
                            <button 
                              onClick={() => updateQty(item.id, 1)}
                              className="size-9 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 group/del transition-all"
                          >
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover/del:text-red-500 transition-colors">Remove</span>
                            <Trash2 className="w-4 h-4 text-white/10 group-hover/del:text-red-500 transition-colors" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Boutique Checkout Form */}
            <div className="w-full lg:w-[480px] bg-[#080808] border-t lg:border-t-0 lg:border-l border-white/5 relative overflow-hidden flex flex-col p-6 md:p-10 lg:p-12 animate-in fade-in duration-1000">
              
              {/* Ultra-Subtle Background Depth */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] right-[-10%] size-[40%] bg-[var(--accent)]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-5%] left-[-5%] size-[30%] bg-white/5 rounded-full blur-[80px]" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <header className="mb-6 mt-4 md:mt-6">
                  <h2 className="text-[24px] md:text-[28px] font-black text-white uppercase tracking-tighter leading-none mb-1.5">
                    Shipping<br />Information
                  </h2>
                  <p className="text-[9px] font-black text-[var(--accent)] tracking-[2.5px] uppercase">One step closer to performance</p>
                </header>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-6">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <CreativeBoutiqueInput 
                        name="fname" 
                        label="First Name" 
                        icon={User}
                        value={formData.fname} 
                        onChange={handleChange} 
                      />
                      <CreativeBoutiqueInput 
                        name="lname" 
                        label="Last Name" 
                        icon={User}
                        value={formData.lname} 
                        onChange={handleChange} 
                      />
                    </div>
                    
                    <CreativeBoutiqueInput 
                      name="address" 
                      label="Shipping Address" 
                      icon={MapPin}
                      value={formData.address} 
                      onChange={handleChange} 
                    />
 
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className={cn(
                          "relative group creative-input rounded-[14px] transition-all duration-500 overflow-hidden liquid-glow",
                          formData.city && "border-[var(--accent)]/30"
                        )}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                          e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                        }}
                      >
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-[var(--accent)]/50 transition-colors">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <label className={cn(
                          "absolute left-12 transition-all pointer-events-none uppercase font-black tracking-[2px] transition-all duration-300",
                          formData.city ? "top-3 text-[7px] text-[var(--accent)]" : "top-5 text-[10px] text-white/30"
                        )}>
                          Governorate
                        </label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const next = e.currentTarget.closest('form')?.querySelector('input[name="phone"]') as HTMLElement;
                              if (next) next.focus();
                            }
                          }}
                          className="w-full bg-transparent px-12 pt-7 pb-3 text-[12px] font-bold text-white outline-none appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black">Choose...</option>
                          {governorates.map(gov => <option key={gov} value={gov} className="bg-black">{gov.toUpperCase()}</option>)}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                           <ChevronRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                      
                      <CreativeBoutiqueInput 
                        name="phone" 
                        label="Mobile Phone" 
                        type="tel"
                        icon={Phone}
                        value={formData.phone} 
                        onChange={handleChange} 
                        error={!!phoneError}
                      />
                    </div>
                    {phoneError && <p className="text-red-500 text-[9px] font-black uppercase tracking-wider ml-5 animate-shake">{phoneError}</p>}
                  </div>

                  {/* Summary & Totals */}
                  <div className="pt-6 mt-4 border-t border-white/5 space-y-2.5">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[2.5px]">
                      <span className="text-white/20">Cart Subtotal</span>
                      <span className="text-white tracking-widest">{totalPrice.toFixed(3)} DT</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[2.5px]">
                      <span className="text-white/20">Logistics</span>
                      <span className="text-[var(--accent)] tracking-widest">Complimentary</span>
                    </div>

                    {hasDiscount && (
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[2.5px] animate-in slide-in-from-left duration-500">
                        <span className="text-[var(--accent)]">Alliance Discount (5%)</span>
                        <span className="text-[var(--accent)] tracking-widest">
                          -{(rawTotalPrice - totalPrice).toFixed(3)} DT
                        </span>
                      </div>
                    )}
                    
                    {/* The Order Total Card with Modern Border */}
                    <div className="order-total-card mt-5 !p-6 flex flex-col justify-center min-h-[90px] liquid-glow"
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                          e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                        }}
                    >
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[4px]">Order Total</span>
                        <div className="text-right">
                          <span className="text-[34px] font-black text-white tracking-tighter leading-none">
                            {totalPrice.toFixed(3)}
                          </span>
                          <span className="text-[12px] font-black text-[var(--accent)] ml-2 tracking-widest uppercase italic">DT</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || items.length === 0}
                      className="w-full relative group h-[68px] bg-[var(--accent)] text-black font-black uppercase tracking-[4.5px] text-[12px] rounded-[14px] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 mt-5 shadow-[0_15px_40px_rgba(200,169,110,0.15)] overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {loading ? 'Processing...' : 'Complete Purchase'}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1.2 transition-transform" />
                      </span>
                    </button>
                    
                    <div className="flex justify-center items-center gap-8 pt-6 text-white/5 uppercase font-black text-[8px] tracking-[3px]">
                       SECURE
                       <div className="w-1 h-1 rounded-full bg-white/10" />
                       FAST
                       <div className="w-1 h-1 rounded-full bg-white/10" />
                       GLOBAL
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-black">
            <div className="relative mb-12">
              <div className="size-32 bg-[var(--accent)] rounded-full flex items-center justify-center animate-in zoom-in spin-in-12 duration-1000 shadow-[0_0_80px_rgba(200,169,110,0.4)]">
                <ShieldCheck className="w-16 h-16 text-black" />
              </div>
              <div className="absolute -inset-6 border border-[var(--accent)]/10 rounded-full animate-ping duration-[3s]" />
            </div>
            
            <h2 className="text-[48px] md:text-[64px] font-black text-white uppercase tracking-tighter leading-none mb-6">
              Order<br /><span className="text-[var(--accent)]">Confirmed</span>
            </h2>
            <p className="text-white/40 text-[14px] md:text-[16px] max-w-[420px] mb-12 font-medium leading-relaxed uppercase tracking-[3px]">
              Your gear is in queue. Expect a briefing call within 24h.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                closeCart()
              }}
              className="px-14 py-6 bg-white text-black font-black uppercase tracking-[4px] text-[13px] rounded-full hover:bg-[var(--accent)] transition-all shadow-2xl"
            >
              Back to HQ
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

function CreativeBoutiqueInput({ name, label, value, onChange, icon: Icon, type = "text", error }: any) {
  const [focused, setFocused] = useState(false)
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = (e.target as HTMLElement).closest('form');
      if (!form) return;
      
      const elements = Array.from(form.querySelectorAll('input, select, textarea')) as HTMLElement[];
      const index = elements.indexOf(e.target as HTMLElement);
      if (index > -1 && index < elements.length - 1) {
        elements[index + 1].focus();
      } else if (index === elements.length - 1) {
        // If it's the last one, we can either submit or blurring
        (e.target as HTMLElement).blur();
      }
    }
  }

  return (
    <div 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }}
      className={cn(
      "creative-input rounded-[14px] transition-all duration-500 overflow-hidden relative group liquid-glow",
      focused && "focused-border bg-white/[0.04]",
      error && "border-red-500/50",
      value && !focused && "border-[var(--accent)]/30"
    )}>
      {/* Scanning Shimmer Effect */}
      {focused && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent -translate-x-full animate-shimmer" />
        </div>
      )}

      <div className="relative z-10 flex items-center">
        {Icon && (
          <div className={cn(
            "pl-5 transition-colors duration-500",
            focused ? "text-[var(--accent)]" : value ? "text-[var(--accent)]/50" : "text-white/10"
          )}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div className="flex-1">
          <label className={cn(
            "absolute transition-all pointer-events-none uppercase font-black tracking-[2px] z-20",
            Icon ? "left-12" : "left-5",
            focused || value ? "top-3 text-[7px] text-[var(--accent)]" : "top-5 text-[10px] text-white/30"
          )}>
            {label}
          </label>
          <div className={cn("pt-7 pb-3", Icon ? "pl-12 pr-5" : "px-5")}>
            <input
              type={type}
              name={name}
              value={value}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              className="w-full bg-transparent text-[13px] font-bold text-white outline-none placeholder:text-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
