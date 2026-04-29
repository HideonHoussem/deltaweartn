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
import { Minus, Plus, X, Truck, User, MapPin, Phone } from "lucide-react"

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
    totalItems,
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
  const [showShipping, setShowShipping] = useState(false)

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

    setLoading(true)

    const payload = {
      ...formData,
      product: items.map(i => `${i.productName} [${i.size}] (x${i.qty})`).join(" + "),
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
    } catch (err: any) {
      alert(`Order Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent 
        side="right"
        className="bg-white text-black sm:max-w-[450px] w-full p-0 flex flex-col border-none shadow-2xl"
      >
        <SheetHeader className="p-6 border-b border-gray-100 flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-[20px] font-bold text-black">
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {!submitted ? (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-gray-400 font-medium">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                      <Image src={item.image} alt={item.productName} width={96} height={96} className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-[16px] leading-tight mb-1">{item.productName}</h3>
                        <p className="text-[13px] text-gray-500 mb-2">{item.size}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-[15px]">{item.price.toFixed(3)} TND</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button onClick={() => updateQty(item.id, -1)} className="px-3 py-1 hover:bg-gray-50">-</button>
                          <span className="px-3 py-1 text-sm font-medium">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="px-3 py-1 hover:bg-gray-50">+</button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[13px] text-gray-400 hover:text-black transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {showShipping && items.length > 0 && (
                <div className="pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                  <h3 className="text-[18px] font-bold mb-6">Shipping Information</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Input name="fname" label="First Name" value={formData.fname} onChange={handleChange} />
                      <Input name="lname" label="Last Name" value={formData.lname} onChange={handleChange} />
                    </div>
                    <Input name="address" label="Address" value={formData.address} onChange={handleChange} />
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:border-black outline-none"
                      >
                        <option value="">Governorate</option>
                        {governorates.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                      <Input name="phone" label="Phone" value={formData.phone} onChange={handleChange} error={phoneError} />
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[16px] font-medium">Subtotal</span>
                <span className="text-[18px] font-bold">{totalPrice.toFixed(3)} TND</span>
              </div>
              <p className="text-[13px] text-gray-500 mb-6">Shipping calculated at checkout</p>
              
              {!showShipping ? (
                <button 
                  onClick={() => setShowShipping(true)}
                  disabled={items.length === 0}
                  className="w-full py-4 bg-black text-white font-bold uppercase tracking-[2px] text-[13px] hover:bg-gray-900 transition-all disabled:opacity-50"
                >
                  Checkout
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={loading || items.length === 0}
                  className="w-full py-4 bg-black text-white font-bold uppercase tracking-[2px] text-[13px] hover:bg-gray-900 transition-all disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="size-20 bg-black rounded-full flex items-center justify-center mb-6">
              <Truck className="text-white" />
            </div>
            <h2 className="text-[28px] font-bold mb-4">Thank you!</h2>
            <p className="text-gray-500 mb-10">Your order has been received. We will contact you soon.</p>
            <button 
              onClick={() => {
                setSubmitted(false)
                setShowShipping(false)
                closeCart()
              }} 
              className="w-full py-4 bg-black text-white font-bold uppercase tracking-[2px] text-[13px] hover:bg-gray-900 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

function Input({ name, label, value, onChange, error, type = "text" }: any) {
  return (
    <div className="space-y-1">
      <input
        type={type}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:border-black outline-none transition-all",
          error && "border-red-500"
        )}
      />
    </div>
  )
}
