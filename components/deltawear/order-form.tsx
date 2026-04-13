"use client"

import { useState } from "react"
import { RevealSection } from "./reveal-section"

const governorates = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja",
  "Jendouba", "Kef", "Siliana", "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan",
  "Kasserine", "Sidi Bouzid", "Gabès", "Medenine", "Tataouine", "Gafsa", "Tozeur", "Kébili"
]

function validatePhone(phone: string): boolean {
  return /^[234579][0-9]{7}$/.test(phone.replace(/\s/g, ""))
}

export function OrderForm() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    city: "",
    address: "",
    size: "",
    qty: "1",
    note: ""
  })
  const [phoneError, setPhoneError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "phone") setPhoneError("")
  }

  const handleSubmit = async () => {
    const { fname, lname, phone, city, address, size } = formData
    if (!fname || !lname || !phone || !city || !address || !size) {
      alert("Please fill in all required fields.")
      return
    }
    if (!validatePhone(phone)) {
      setPhoneError("Enter a valid Tunisian number (8 digits, e.g. 20 123 456)")
      return
    }

    setLoading(true)

    const order = {
      id: "DW" + Date.now(),
      date: new Date().toLocaleString("fr-TN"),
      name: `${fname} ${lname}`,
      phone: `+216${phone.replace(/\s/g, "")}`,
      city,
      address,
      size,
      qty: Number(formData.qty),
      note: formData.note,
      status: "new" as const
    }

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      let errorMessage = "Something went wrong. Please try again."
      try {
        const data = await res.json()
        if (data.error) errorMessage = data.error
      } catch (err) {
        console.error("Failed to parse error response:", err)
      }
      alert(errorMessage)
      setLoading(false)
      return
    }

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <RevealSection id="order" className="grid md:grid-cols-2 min-h-screen">
      {/* Left Panel */}
      <div className="bg-[#0a0a0a] p-12 md:p-[72px] border-r border-[var(--border)] flex flex-col justify-center">
        <div className="text-[9px] tracking-[7px] uppercase text-[var(--accent)] mb-6">
          Place Your Order
        </div>
        <h2 className="text-[clamp(44px,5vw,72px)] font-black tracking-[-2px] uppercase leading-[0.9] mb-10">
          ORDER
          <br />
          <span className="text-white/[0.12]">NOW.</span>
        </h2>

        <div className="flex flex-col gap-4 mb-12">
          {[
            { icon: "📦", label: "Delivery", value: "Free · All Tunisia · 2–4 days" },
            { icon: "💳", label: "Payment", value: "Cash on Delivery" },
            { icon: "📐", label: "Sizes Available", value: "S · M · L · XL · XXL" },
            { icon: "⚡", label: "Confirmation", value: "We'll call you within 24h" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b border-[var(--border)]">
              <div className="w-8 h-8 border border-[var(--border)] flex items-center justify-center text-[13px] flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="text-[9px] tracking-[4px] uppercase text-white/25 mb-0.5">{item.label}</div>
                <div className="text-[13px] font-medium tracking-[0.5px]">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[var(--gray)] border border-[var(--border)] p-7 flex justify-between items-center">
          <div>
            <div className="text-[9px] tracking-[4px] uppercase text-white/30">Price per piece</div>
            <div className="text-[9px] text-[rgba(200,169,110,0.6)] tracking-[2px] mt-0.5">Free delivery included</div>
          </div>
          <div className="text-[32px] font-extralight tracking-[-1px]">
            39.000 <span className="text-[14px] text-white/30">TND</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="p-10 md:p-16 flex flex-col justify-center bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]">
        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} noValidate>
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--black)] text-[10px] font-bold">1</div>
                <span className="text-[8px] tracking-[6px] uppercase text-white/40">Order Details</span>
              </div>
              <h3 className="text-[32px] md:text-[38px] font-black tracking-[-1px] uppercase leading-[1.1] mb-4">
                Your
                <br />
                <span className="text-[var(--accent)]">Details</span>
              </h3>
              <p className="text-[12px] text-white/40 leading-[1.6]">Fill in your information below to complete your order</p>
            </div>

            {/* Form Container */}
            <div className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "fname", label: "First Name", placeholder: "Ahmed", icon: "👤" },
                  { name: "lname", label: "Last Name", placeholder: "Ben Ali", icon: "👤" },
                ].map((field) => (
                  <div key={field.name} className="group">
                    <label className="block text-[8px] tracking-[4px] uppercase text-white/40 mb-2.5 font-semibold">
                      {field.label} <span className="text-[var(--accent)]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] opacity-40 group-focus-within:opacity-100 transition-opacity">{field.icon}</div>
                      <input
                        type="text"
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name as "fname" | "lname"]}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-white/10 text-[var(--white)] pl-10 pr-4 py-3.5 text-[13px] font-light outline-none focus:bg-white/[0.05] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(200,169,110,0.1)] transition-all placeholder:text-white/15 hover:border-white/20 rounded-lg"
                      />
                      {formData[field.name as "fname" | "lname"] && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Phone Number */}
              <div className="group">
                <label className="block text-[8px] tracking-[4px] uppercase text-white/40 mb-2.5 font-semibold">
                  Phone Number <span className="text-[var(--accent)]">*</span>
                </label>
                <div className="relative flex">
                  <div className="flex items-center px-4 bg-white/[0.02] border border-r-0 border-white/10 text-[12px] text-white/40 tracking-wider shrink-0 rounded-l-lg">
                    +216
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="20 123 456"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={9}
                    className={`flex-1 bg-white/[0.03] border text-[var(--white)] px-4 py-3.5 text-[13px] font-light outline-none transition-all placeholder:text-white/15 rounded-r-lg group-focus-within:bg-white/[0.05] group-focus-within:shadow-[0_0_0_3px_rgba(200,169,110,0.1)] ${phoneError ? "border-red-500/50 focus:border-red-400" : "border-white/10 focus:border-[var(--accent)] hover:border-white/20"}`}
                  />
                </div>
                {phoneError && (
                  <p className="text-red-400/80 text-[10px] mt-2 tracking-wide flex items-center gap-1.5">
                    <span>⚠</span> {phoneError}
                  </p>
                )}
              </div>

              {/* Governorate */}
              <div className="group">
                <label className="block text-[8px] tracking-[4px] uppercase text-white/40 mb-2.5 font-semibold">
                  Governorate <span className="text-[var(--accent)]">*</span>
                </label>
                <div className="relative">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 text-[var(--white)] px-4 py-3.5 text-[13px] font-light outline-none focus:bg-white/[0.05] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(200,169,110,0.1)] transition-all appearance-none cursor-pointer hover:border-white/20 rounded-lg"
                  >
                    <option value="" className="bg-[#111] text-white/50">Select your governorate...</option>
                    {governorates.map((gov) => (
                      <option key={gov} value={gov} className="bg-[#111] text-white">{gov}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="group">
                <label className="block text-[8px] tracking-[4px] uppercase text-white/40 mb-2.5 font-semibold">
                  Full Address <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street number, neighborhood, building..."
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 text-[var(--white)] px-4 py-3.5 text-[13px] font-light outline-none focus:bg-white/[0.05] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(200,169,110,0.1)] transition-all placeholder:text-white/15 hover:border-white/20 rounded-lg"
                />
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-[8px] tracking-[4px] uppercase text-white/40 mb-3 font-semibold">
                  Select Size <span className="text-[var(--accent)]">*</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, size: s })}
                      className={`py-3.5 text-[10px] tracking-[1px] font-bold border rounded-lg transition-all duration-300 cursor-pointer ${
                        formData.size === s
                          ? "bg-[var(--accent)] text-[var(--black)] border-[var(--accent)] shadow-[0_0_20px_rgba(200,169,110,0.3)] scale-105"
                          : "bg-white/[0.02] border-white/10 text-white/60 hover:border-white/30 hover:bg-white/[0.05]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-[8px] tracking-[4px] uppercase text-white/40 mb-2.5 font-semibold">
                  Quantity
                </label>
                <div className="flex items-center border border-white/10 bg-white/[0.02] rounded-lg overflow-hidden hover:border-white/20 transition-all">
                  <button 
                    type="button" 
                    onClick={() => setFormData({ ...formData, qty: String(Math.max(1, Number(formData.qty) - 1)) })} 
                    className="w-14 h-12 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:bg-white/[0.05] transition-all cursor-pointer text-xl font-light"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center text-[16px] font-semibold text-white bg-white/[0.02]">{formData.qty}</div>
                  <button 
                    type="button" 
                    onClick={() => setFormData({ ...formData, qty: String(Math.min(5, Number(formData.qty) + 1)) })} 
                    className="w-14 h-12 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:bg-white/[0.05] transition-all cursor-pointer text-xl font-light"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div className="group">
                <label className="block text-[8px] tracking-[4px] uppercase text-white/40 mb-2.5 font-semibold">
                  Special Requests <span className="text-white/20">(optional)</span>
                </label>
                <textarea
                  name="note"
                  placeholder="Any special requests or notes..."
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 text-[var(--white)] px-4 py-3.5 text-[13px] font-light outline-none focus:bg-white/[0.05] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(200,169,110,0.1)] transition-all placeholder:text-white/15 hover:border-white/20 resize-none h-20 rounded-lg"
                />
              </div>

              {/* Order Summary */}
              {formData.size && (
                <div className="bg-gradient-to-r from-[var(--accent)]/10 to-transparent border border-[var(--accent)]/30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] tracking-[3px] uppercase text-white/50 mb-1">Order Summary</p>
                      <p className="text-[13px] font-semibold text-white">
                        Size <span className="text-[var(--accent)]">{formData.size}</span> × <span className="text-[var(--accent)]">{formData.qty}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-white/40 mb-0.5">Total Price</p>
                      <p className="text-[20px] font-bold text-[var(--accent)]">
                        {(39 * Number(formData.qty)).toFixed(3)} <span className="text-[10px] font-light text-white/30">TND</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[#d4aa7a] text-[var(--black)] text-[10px] tracking-[6px] uppercase font-extrabold rounded-lg hover:shadow-[0_20px_50px_rgba(200,169,110,0.35)] hover:scale-[1.02] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
            >
              {loading ? "Processing Order..." : "Complete Your Order →"}
            </button>

            <p className="text-[10px] text-white/30 text-center mt-4">We'll contact you within 24 hours to confirm</p>
          </form>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 border border-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-7 text-2xl text-[var(--accent)]">
              ✓
            </div>
            <div className="text-[32px] font-extrabold tracking-[3px] uppercase mb-3">Order Placed!</div>
            <p className="text-[13px] font-light text-white/35 leading-[1.8] max-w-[320px] mx-auto">
              Thank you! We will contact you within 24 hours to confirm your order and arrange delivery.
            </p>
            <div className="mt-8 text-[8px] tracking-[5px] uppercase text-white/20">
              DeltaWear TN · Built Different
            </div>
          </div>
        )}
      </div>
    </RevealSection>
  )
}
