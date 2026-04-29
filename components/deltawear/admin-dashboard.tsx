"use client"

import { useState } from "react"
import { Lock, Trash2, CheckCircle2, Package, TrendingUp, RefreshCw, X, ShoppingBag, ChevronRight, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { PRODUCTS } from "@/lib/products-data"
import { cn } from "@/lib/utils"

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

type Tab = "orders" | "catalog"

export function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [pin, setPin] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<Tab>("orders")

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
      if (err.message.includes("Unauthorized")) setIsAuthorized(false)
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
      fetchOrders()
    } catch (err: any) { alert(err.message) }
  }

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Permanently delete this order?")) return
    try {
      const res = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, orderId })
      })
      if (!res.ok) throw new Error("Delete failed")
      fetchOrders()
    } catch (err: any) { alert(err.message) }
  }

  const revenue = orders.reduce((s, o) => s + (Number(o.qty) || 1) * 49, 0)
  const newCount = orders.filter((o) => o.status === "new").length
  const deliveredCount = orders.filter((o) => o.status === "delivered").length

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
        className="bg-white border border-gray-200 text-gray-400 text-[9px] tracking-[4px] uppercase px-6 py-3.5 rounded-full cursor-pointer hover:text-black hover:border-black transition-all font-bold flex items-center gap-3 shadow-lg group"
      >
        <Lock className="w-3 h-3 group-hover:scale-110 transition-transform" />
        HQ Access
      </button>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-gray-50 z-[999] overflow-hidden flex flex-col font-sans text-black">
      {/* Header */}
      <div className="p-6 md:px-12 md:py-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-10 bg-black rounded-xl flex items-center justify-center">
            <Package className="size-5 text-white" />
          </div>
          <div>
            <h2 className="text-[18px] md:text-[20px] font-bold tracking-tight text-black leading-none">Management Console</h2>
            <p className="text-[10px] text-gray-400 tracking-[1px] uppercase mt-1">
              Status: {isAuthorized ? "Authenticated" : "Locked"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all"
        >
          <X className="size-5" />
        </button>
      </div>

      {!isAuthorized ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center max-w-xl mx-auto">
          <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mb-8">
            <Lock className="size-8 text-gray-300" />
          </div>
          <h3 className="text-[24px] font-bold mb-2">Access Restricted</h3>
          <p className="text-[13px] text-gray-400 mb-10">Enter your secure PIN to access DeltaWear intelligence.</p>
          <div className="w-full space-y-4">
            <input
              type="password"
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchOrders()}
              className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 text-center text-[24px] tracking-[10px] focus:border-black outline-none transition-all"
            />
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="w-full py-4 bg-black text-white font-bold uppercase tracking-[2px] text-[12px] rounded-xl hover:bg-gray-900 transition-all"
            >
              {loading ? "Verifying..." : "Access Console"}
            </button>
          </div>
          {error && <p className="mt-6 text-red-500 text-[11px] font-bold uppercase">{error}</p>}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-[1400px] mx-auto">

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Orders", val: orders.length, icon: Package },
                { label: "Pending", val: newCount, icon: RefreshCw },
                { label: "Completed", val: deliveredCount, icon: CheckCircle2 },
                { label: "Total Revenue", val: `${revenue.toFixed(3)} DT`, icon: TrendingUp },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-gray-200 p-6 rounded-[20px] shadow-sm relative overflow-hidden group">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[1px] mb-2">{stat.label}</div>
                  <div className="text-[28px] font-bold text-black">{stat.val}</div>
                  <stat.icon className="absolute bottom-6 right-6 size-5 text-gray-100 group-hover:text-gray-200 transition-colors" />
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
              {(["orders", "catalog"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[1px] transition-all flex items-center gap-2",
                    activeTab === tab
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {tab === "orders" ? <Package className="size-3.5" /> : <ShoppingBag className="size-3.5" />}
                  {tab}
                </button>
              ))}
            </div>

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[1px]">ID</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[1px]">Customer</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[1px]">Location</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[1px]">Details</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[1px]">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[1px] text-right">Logistics</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-20 text-center text-gray-300 italic text-sm">No operations detected</td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-6">
                              <div className="font-bold text-sm text-black">#{order.id.slice(-6).toUpperCase()}</div>
                              <div className="text-[10px] text-gray-400">{order.date}</div>
                            </td>
                            <td className="px-6 py-6">
                              <div className="font-bold text-sm text-black uppercase">{order.name}</div>
                              <div className="text-[11px] text-gray-500 font-medium">{order.phone}</div>
                            </td>
                            <td className="px-6 py-6">
                              <div className="text-sm font-bold text-gray-700">{order.city}</div>
                              <div className="text-[11px] text-gray-400 line-clamp-1">{order.address}</div>
                            </td>
                            <td className="px-6 py-6">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-600 uppercase">{order.size}</span>
                                <span className="text-[11px] text-gray-400 font-bold">x{order.qty}</span>
                              </div>
                              <div className="text-[10px] text-gray-400 uppercase font-medium line-clamp-1">{order.product}</div>
                            </td>
                            <td className="px-6 py-6">
                              <select
                                value={order.status}
                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                className={cn(
                                  "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[1px] border outline-none cursor-pointer",
                                  order.status === "new" && "bg-blue-50 text-blue-600 border-blue-100",
                                  order.status === "confirmed" && "bg-amber-50 text-amber-600 border-amber-100",
                                  order.status === "delivered" && "bg-emerald-50 text-emerald-600 border-emerald-100"
                                )}
                              >
                                <option value="new">New</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </td>
                            <td className="px-6 py-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={getWhatsAppUrl(order)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="size-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all"
                                >
                                  <CheckCircle2 size={16} />
                                </a>
                                <button
                                  onClick={() => deleteOrder(order.id)}
                                  className="size-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Catalog Tab */}
            {activeTab === "catalog" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.map((product) => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-[24px] overflow-hidden group hover:shadow-md transition-all">
                    <div className="relative aspect-square bg-gray-50 border-b border-gray-100 overflow-hidden">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0].src}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="size-10 text-gray-200" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-[16px] uppercase">{product.name}</h3>
                          <div className="flex gap-2 mt-1">
                            <span className="text-[10px] text-gray-400 font-bold uppercase">{product.color}</span>
                          </div>
                        </div>
                        <div className="font-bold text-[18px] text-black">{product.price} <span className="text-[10px] text-gray-400">TND</span></div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {product.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-[9px] font-bold text-gray-400 uppercase">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
