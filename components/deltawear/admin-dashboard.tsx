"use client"

import { useState, useEffect } from "react"
import { Lock, Trash2, ExternalLink, RefreshCw, X, CheckCircle2, Package, TrendingUp } from "lucide-react"

interface Order {
  id: string
  date: string
  name: string
  phone: string
  city: string
  address: string
  size: string
  qty: number
  note: string
  status: "new" | "confirmed" | "delivered"
  product: string
}

export function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [pin, setPin] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchOrders = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to fetch orders")
      setOrders(data)
      setIsAuthorized(true)
    } catch (err: any) {
      setError(err.message)
      if (err.message.includes("Unauthorized")) {
         setIsAuthorized(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, orderId, status })
      })
      if (!res.ok) throw new Error("Update failed")
      fetchOrders() // Refresh
    } catch (err: any) {
      alert(err.message)
    }
  }

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Permanently delete this order intel?")) return
    try {
      const res = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, orderId })
      })
      if (!res.ok) throw new Error("Delete failed")
      fetchOrders()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const revenue = orders.reduce((s, o) => s + (Number(o.qty) || 1) * 39, 0)
  const newCount = orders.filter((o) => o.status === "new").length

  const getWhatsAppUrl = (order: Order) => {
    const msg = encodeURIComponent(
      `Bonjour ${order.name.split(" ")[0]}! Votre commande DeltaWear TN (${order.id}) Taille ${order.size} x${order.qty} est confirmee. Livraison dans 2-4 jours. Merci!`
    )
    return `https://wa.me/${order.phone.replace(/[^0-9]/g, "")}?text=${msg}`
  }

  if (!isOpen) return (
     <div className="fixed bottom-7 right-7 z-[400]">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#050505] border border-white/[0.08] text-white/30 text-[9px] tracking-[4px] uppercase px-6 py-3.5 rounded-full cursor-pointer hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all font-black flex items-center gap-3 backdrop-blur-xl group"
        >
          <Lock className="w-3 h-3 group-hover:scale-110 transition-transform" />
          HQ Access
        </button>
      </div>
  )

  return (
    <div className="fixed inset-0 bg-black/[0.98] z-[999] overflow-hidden flex flex-col font-sans">
      {/* Header Bar */}
      <div className="p-6 md:px-12 md:py-8 border-b border-white/5 flex items-center justify-between backdrop-blur-3xl">
        <div className="flex items-center gap-4">
          <div className="size-10 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-xl flex items-center justify-center">
             <Package className="size-5 text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-[18px] md:text-[22px] font-black tracking-[-1px] uppercase text-white leading-none">Command Center</h2>
            <p className="text-[10px] text-white/20 tracking-[2px] uppercase mt-1">Status: {isAuthorized ? "Authenticated" : "Awaiting Clearance"}</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="size-12 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:border-white/20 transition-all"
        >
          <X className="size-5" />
        </button>
      </div>

      {!isAuthorized ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center max-w-xl mx-auto">
           <Lock className="size-20 text-white/5 mb-10" />
           <h3 className="text-[28px] font-black uppercase tracking-tighter mb-4">Enter Authorization PIN</h3>
           <p className="text-[12px] text-white/30 uppercase tracking-[3px] mb-12">DeltaWear Internal Access Only</p>
           
           <div className="w-full flex flex-col sm:flex-row gap-4">
              <input 
                type="password"
                placeholder="HQ PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchOrders()}
                className="flex-1 bg-white/[0.02] border border-white/10 rounded-2xl px-10 py-6 text-center text-[18px] tracking-[10px] focus:border-[var(--accent)]/50 focus:bg-white/[0.05] outline-none transition-all"
              />
              <button 
                onClick={fetchOrders}
                disabled={loading}
                className="px-12 py-6 bg-[var(--accent)] text-black font-black uppercase tracking-[4px] text-[12px] rounded-2xl hover:scale-[1.05] active:scale-[0.98] transition-all"
              >
                {loading ? "Decrypting..." : "Decrypt"}
              </button>
           </div>
           {error && <p className="mt-8 text-red-500 text-[10px] font-black uppercase tracking-[2px] animate-shake">{error}</p>}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Stats Modules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
               {[
                 { label: "Total Operations", val: orders.length, icon: Package },
                 { label: "Active Deployments", val: newCount, icon: RefreshCw },
                 { label: "Estimated Revenue", val: `${revenue.toFixed(3)} DT`, icon: TrendingUp },
               ].map((stat, i) => (
                 <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-[32px] liquid-glow relative overflow-hidden group">
                    <stat.icon className="absolute top-8 right-8 size-6 text-white/5 group-hover:text-[var(--accent)]/20 transition-colors" />
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-[4px] mb-4">{stat.label}</div>
                    <div className="text-[42px] font-extralight tracking-[-2px] text-white">{stat.val}</div>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
               ))}
            </div>

            {/* Orders Intelligence */}
            <div className="space-y-4">
               {orders.length === 0 ? (
                 <div className="py-32 text-center border border-dashed border-white/10 rounded-[40px]">
                    <p className="text-white/20 text-[12px] uppercase tracking-[6px]">No logistics data detected</p>
                 </div>
               ) : (
                 <div className="overflow-x-auto pb-20">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                      <thead>
                        <tr className="text-[10px] font-black text-white/20 uppercase tracking-[4px]">
                          <th className="px-8 pb-4">Operational ID</th>
                          <th className="px-8 pb-4">Target Intel</th>
                          <th className="px-8 pb-4">Destination</th>
                          <th className="px-8 pb-4">Asset</th>
                          <th className="px-8 pb-4">Deployment Status</th>
                          <th className="px-8 pb-4 text-right">Logistics</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="group">
                             <td className="bg-white/[0.02] border-y border-l border-white/5 first:rounded-l-[24px] px-8 py-8 transition-colors group-hover:bg-white/[0.04]">
                                <div className="text-[var(--accent)] font-black tracking-[1px] text-[13px] mb-1">{order.id}</div>
                                <div className="text-[9px] text-white/20">{order.date}</div>
                             </td>
                             <td className="bg-white/[0.02] border-y border-white/5 px-8 py-8 group-hover:bg-white/[0.04]">
                                <div className="text-white font-black uppercase text-[15px] mb-1">{order.name}</div>
                                <div className="text-[11px] text-white/40 tracking-widest">{order.phone}</div>
                             </td>
                             <td className="bg-white/[0.02] border-y border-white/5 px-8 py-8 group-hover:bg-white/[0.04]">
                                <div className="text-white/80 font-bold text-[13px] mb-1">{order.city}</div>
                                <div className="text-[11px] text-white/20 uppercase tracking-tight line-clamp-1">{order.address}</div>
                             </td>
                             <td className="bg-white/[0.02] border-y border-white/5 px-8 py-8 group-hover:bg-white/[0.04]">
                                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
                                   <span className="text-[14px] font-black text-white">{order.size}</span>
                                   <div className="w-px h-3 bg-white/10" />
                                   <span className="text-[10px] text-white/40 uppercase font-black">x{order.qty}</span>
                                </div>
                                <div className="mt-2 text-[9px] text-white/10 uppercase tracking-widest line-clamp-1">{order.product}</div>
                             </td>
                             <td className="bg-white/[0.02] border-y border-white/5 px-8 py-8 group-hover:bg-white/[0.04]">
                                <select 
                                  value={order.status}
                                  onChange={(e) => updateStatus(order.id, e.target.value)}
                                  className="bg-black border border-white/10 text-white/60 text-[10px] font-black tracking-[2px] uppercase px-4 py-2 rounded-lg focus:border-[var(--accent)] outline-none cursor-pointer"
                                >
                                   <option value="new">Sector New</option>
                                   <option value="confirmed">Confirmed</option>
                                   <option value="delivered">Delivered</option>
                                </select>
                             </td>
                             <td className="bg-white/[0.02] border-y border-r border-white/5 last:rounded-r-[24px] px-8 py-8 text-right group-hover:bg-white/[0.04]">
                                <div className="flex items-center justify-end gap-3">
                                   <a 
                                      href={getWhatsAppUrl(order)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="size-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all"
                                   >
                                      <CheckCircle2 className="size-5" />
                                   </a>
                                   <button 
                                      onClick={() => deleteOrder(order.id)}
                                      className="size-11 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-black transition-all"
                                   >
                                      <Trash2 className="size-5" />
                                   </button>
                                </div>
                             </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
               )}
            </div>
            
          </div>
        </div>
      )}
    </div>
  )
}
