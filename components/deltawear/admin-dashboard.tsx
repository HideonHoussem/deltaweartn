"use client"

import { useState, useEffect } from "react"

interface Order {
  id: string
  date: string
  name: string
  phone: string
  city: string
  address: string
  size: string
  qty: string
  note: string
  status: "new" | "confirmed" | "delivered"
}

export function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (isOpen) {
      const stored = JSON.parse(localStorage.getItem("dw_orders") || "[]")
      setOrders(stored)
    }
  }, [isOpen])

  const updateStatus = (index: number, status: string) => {
    const updated = [...orders]
    updated[index].status = status as Order["status"]
    setOrders(updated)
    localStorage.setItem("dw_orders", JSON.stringify(updated))
  }

  const deleteOrder = (index: number) => {
    if (!confirm("Delete this order?")) return
    const updated = orders.filter((_, i) => i !== index)
    setOrders(updated)
    localStorage.setItem("dw_orders", JSON.stringify(updated))
  }

  const revenue = orders.reduce((s, o) => s + parseFloat(o.qty || "1") * 39, 0)
  const newCount = orders.filter((o) => o.status === "new").length

  const getWhatsAppUrl = (order: Order) => {
    const msg = encodeURIComponent(
      `Bonjour ${order.name.split(" ")[0]}! Votre commande DeltaWear TN (${order.id}) Taille ${order.size} x${order.qty} est confirmee. Livraison dans 2-4 jours. Merci!`
    )
    return `https://wa.me/${order.phone.replace(/[^0-9]/g, "")}?text=${msg}`
  }

  return (
    <>
      {/* Admin Button */}
      <div className="fixed bottom-7 right-7 z-[400]">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#111] border border-white/[0.12] text-white/40 text-[9px] tracking-[4px] uppercase px-5 py-3 cursor-pointer hover:text-white hover:border-white/30 transition-all font-sans"
        >
          ⚙ Orders
        </button>
      </div>

      {/* Admin Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/[0.97] z-[700] overflow-y-auto">
          <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/[0.08]">
              <div className="text-[22px] font-extrabold tracking-[4px] uppercase">
                Orders Dashboard
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-transparent border border-white/[0.12] text-white px-5 py-2.5 text-[9px] tracking-[4px] cursor-pointer font-sans uppercase hover:border-white/30 transition-colors"
              >
                ✕ Close
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-[3px] mb-10">
              <div className="bg-[#0d0d0d] border border-white/[0.08] p-7">
                <div className="text-[40px] font-extralight tracking-[-1px] text-[var(--accent)]">
                  {orders.length}
                </div>
                <div className="text-[9px] tracking-[4px] uppercase text-white/30 mt-1.5">
                  Total Orders
                </div>
              </div>
              <div className="bg-[#0d0d0d] border border-white/[0.08] p-7">
                <div className="text-[40px] font-extralight tracking-[-1px] text-[var(--accent)]">
                  {newCount}
                </div>
                <div className="text-[9px] tracking-[4px] uppercase text-white/30 mt-1.5">
                  New Orders
                </div>
              </div>
              <div className="bg-[#0d0d0d] border border-white/[0.08] p-7">
                <div className="text-[40px] font-extralight tracking-[-1px] text-[var(--accent)]">
                  {revenue.toFixed(3)}
                </div>
                <div className="text-[9px] tracking-[4px] uppercase text-white/30 mt-1.5">
                  Revenue TND
                </div>
              </div>
            </div>

            {/* Orders Table */}
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl opacity-20 mb-4">📭</div>
                <div className="text-[10px] tracking-[5px] uppercase text-white/20">
                  No orders yet
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {["Order ID", "Customer", "Address", "Item", "Status", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="text-[8px] tracking-[5px] uppercase text-white/20 px-4 py-3 text-left border-b border-white/[0.06]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, i) => (
                      <tr key={order.id} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-4 text-[12px] border-b border-white/[0.03] align-middle">
                          <span className="text-[10px] text-[var(--accent)] tracking-[2px]">
                            {order.id}
                          </span>
                          <br />
                          <span className="text-[10px] text-white/25">{order.date}</span>
                        </td>
                        <td className="px-4 py-4 text-[12px] border-b border-white/[0.03] align-middle">
                          <strong>{order.name}</strong>
                          <br />
                          <span className="text-white/40 text-[11px]">{order.phone}</span>
                        </td>
                        <td className="px-4 py-4 text-[12px] border-b border-white/[0.03] align-middle">
                          {order.city}
                          <br />
                          <span className="text-[11px] text-white/30">{order.address}</span>
                        </td>
                        <td className="px-4 py-4 text-[12px] border-b border-white/[0.03] align-middle text-center">
                          <strong>{order.size}</strong> ×{order.qty}
                        </td>
                        <td className="px-4 py-4 text-[12px] border-b border-white/[0.03] align-middle">
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(i, e.target.value)}
                            className="bg-transparent border border-white/10 text-white text-[9px] px-2 py-1.5 font-sans cursor-pointer tracking-[2px]"
                          >
                            <option value="new" className="bg-[#111]">New</option>
                            <option value="confirmed" className="bg-[#111]">Confirmed</option>
                            <option value="delivered" className="bg-[#111]">Delivered</option>
                          </select>
                        </td>
                        <td className="px-4 py-4 text-[12px] border-b border-white/[0.03] align-middle">
                          <a
                            href={getWhatsAppUrl(order)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-transparent border border-[rgba(37,211,102,0.25)] text-[#25D366] text-[8px] tracking-[3px] px-3.5 py-1.5 cursor-pointer font-sans uppercase no-underline hover:bg-[rgba(37,211,102,0.1)] transition-colors"
                          >
                            WhatsApp
                          </a>
                          <button
                            onClick={() => deleteOrder(i)}
                            className="bg-transparent border border-[rgba(255,80,80,0.15)] text-[rgba(255,80,80,0.4)] text-[8px] tracking-[3px] px-3 py-1.5 cursor-pointer font-sans uppercase ml-1.5 hover:border-[rgba(255,80,80,0.5)] hover:text-[rgba(255,80,80,0.9)] transition-all"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
