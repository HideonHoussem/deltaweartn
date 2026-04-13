"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

interface Order {
  id: string
  date: string
  name: string
  phone: string
  city: string
  address: string
  size: string
  qty: string | number
  note: string
  status: "new" | "confirmed" | "delivered"
}

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.")
      return
    }
    setLoading(true)
    setError("")

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError("Incorrect email or password.")
      setLoading(false)
    } else {
      onLogin()
    }
  }

  return (
    <div className="min-h-screen bg-[var(--black)] flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        <div className="flex flex-col items-center mb-12">
          <Image
            src="/images/logo.png"
            alt="DeltaWear"
            width={48}
            height={48}
            className="w-12 h-12 object-contain mb-4 opacity-80"
          />
          <div className="text-[10px] tracking-[8px] uppercase text-white/30">Admin Access</div>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-[8px] tracking-[5px] uppercase text-white/25 mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setError(""); setEmail(e.target.value) }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoFocus
              placeholder="admin@deltawear.tn"
              className="w-full bg-[#0d0d0d] border border-[var(--border)] text-[var(--white)] px-4 py-3.5 text-[13px] font-light outline-none focus:border-[var(--accent)] transition-all placeholder:text-white/15"
            />
          </div>
          <div>
            <label className="block text-[8px] tracking-[5px] uppercase text-white/25 mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setError(""); setPassword(e.target.value) }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="••••••••"
              className="w-full bg-[#0d0d0d] border border-[var(--border)] text-[var(--white)] px-4 py-3.5 text-[13px] font-light outline-none focus:border-[var(--accent)] transition-all placeholder:text-white/15"
            />
          </div>
        </div>

        {error && (
          <p className="text-[11px] text-red-400/80 mb-4 text-center tracking-[1px]">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 bg-[var(--accent)] text-[var(--black)] text-[9px] tracking-[6px] uppercase font-extrabold hover:translate-y-[-1px] hover:shadow-[0_12px_30px_rgba(200,169,110,0.2)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Enter Dashboard"}
        </button>

        <p className="text-center text-[9px] tracking-[3px] uppercase text-white/15 mt-8">
          DeltaWear TN · Private Area
        </p>
      </div>
    </div>
  )
}

// ─── Dashboard Screen ─────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<"all" | "new" | "confirmed" | "delivered">("all")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
    if (!error && data) setOrders(data as Order[])
    setLoading(false)
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const updateStatus = async (orderId: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", orderId)
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: status as Order["status"] } : o))
  }

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Delete this order?")) return
    await supabase.from("orders").delete().eq("id", orderId)
    setOrders(prev => prev.filter(o => o.id !== orderId))
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  const revenue = orders.reduce((s, o) => s + Number(o.qty || 1) * 39, 0)
  const newCount = orders.filter((o) => o.status === "new").length
  const confirmedCount = orders.filter((o) => o.status === "confirmed").length

  const filtered = orders.filter((o) => {
    const matchFilter = filter === "all" || o.status === filter
    const matchSearch =
      !search ||
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.city.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const statusColor = (s: string) => {
    if (s === "new") return "text-[var(--accent)] border-[rgba(200,169,110,0.3)]"
    if (s === "confirmed") return "text-blue-400 border-blue-400/30"
    return "text-green-400 border-green-400/30"
  }

  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      <header className="border-b border-[var(--border)] px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 bg-[rgba(5,5,5,0.95)] backdrop-blur-[20px] z-50">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="DeltaWear" width={28} height={28} className="w-7 h-7 object-contain opacity-70" />
          <div>
            <div className="text-[13px] font-bold tracking-[4px] uppercase">DeltaWear TN</div>
            <div className="text-[8px] tracking-[4px] uppercase text-white/25">Orders Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchOrders} className="text-[9px] tracking-[4px] uppercase text-white/30 border border-white/10 px-4 py-2 hover:text-white hover:border-white/30 transition-all cursor-pointer">
            Refresh
          </button>
          <button onClick={handleLogout} className="text-[9px] tracking-[4px] uppercase text-white/30 border border-white/10 px-4 py-2 hover:text-white hover:border-white/30 transition-all cursor-pointer">
            Logout
          </button>
        </div>
      </header>

      <main className="px-6 md:px-12 py-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] mb-10">
          {[
            { label: "Total Orders", value: orders.length, accent: true },
            { label: "New", value: newCount, accent: false },
            { label: "Confirmed", value: confirmedCount, accent: false },
            { label: "Revenue TND", value: revenue.toFixed(3), accent: false },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0d0d0d] border border-[var(--border)] p-6 md:p-8">
              <div className={`text-[36px] md:text-[44px] font-extralight tracking-[-1px] ${stat.accent ? "text-[var(--accent)]" : "text-[var(--white)]"}`}>
                {stat.value}
              </div>
              <div className="text-[8px] tracking-[4px] uppercase text-white/25 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            {(["all", "new", "confirmed", "delivered"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`text-[9px] tracking-[3px] uppercase px-4 py-2 border transition-all cursor-pointer ${filter === f ? "bg-[var(--accent)] text-[var(--black)] border-[var(--accent)] font-bold" : "border-[var(--border)] text-white/40 hover:border-white/25 hover:text-white/70"}`}>
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search name, phone, city, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#0d0d0d] border border-[var(--border)] text-[var(--white)] px-4 py-2 text-[12px] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-white/20"
          />
        </div>

        {loading ? (
          <div className="text-center py-24 border border-[var(--border)]">
            <div className="text-[10px] tracking-[6px] uppercase text-white/15">Loading orders...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-[var(--border)]">
            <div className="text-[10px] tracking-[6px] uppercase text-white/15">
              {orders.length === 0 ? "No orders yet" : "No results found"}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[var(--border)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {["Order", "Customer", "Delivery", "Item", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-[8px] tracking-[4px] uppercase text-white/20 px-5 py-4 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b border-[var(--border)] hover:bg-white/[0.015] transition-colors">
                    <td className="px-5 py-4 align-middle">
                      <div className="text-[10px] text-[var(--accent)] tracking-[2px] font-mono">{order.id}</div>
                      <div className="text-[10px] text-white/20 mt-0.5">{order.date}</div>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <div className="text-[13px] font-medium">{order.name}</div>
                      <div className="text-[11px] text-white/35 mt-0.5">{order.phone}</div>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <div className="text-[12px]">{order.city}</div>
                      <div className="text-[11px] text-white/30 mt-0.5 max-w-[180px] truncate">{order.address}</div>
                      {order.note && <div className="text-[10px] text-[var(--accent)]/60 mt-0.5 italic">{order.note}</div>}
                    </td>
                    <td className="px-5 py-4 align-middle text-center">
                      <div className="text-[14px] font-medium">{order.size}</div>
                      <div className="text-[10px] text-white/30">×{order.qty}</div>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`bg-transparent border text-[9px] tracking-[2px] uppercase px-3 py-1.5 cursor-pointer outline-none transition-colors ${statusColor(order.status)}`}
                      >
                        <option value="new" className="bg-[#111] text-white">New</option>
                        <option value="confirmed" className="bg-[#111] text-white">Confirmed</option>
                        <option value="delivered" className="bg-[#111] text-white">Delivered</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="border border-[rgba(255,80,80,0.15)] text-[rgba(255,80,80,0.4)] text-[8px] tracking-[2px] px-3 py-1.5 uppercase cursor-pointer hover:border-[rgba(255,80,80,0.5)] hover:text-[rgba(255,80,80,0.9)] transition-all"
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

        {filtered.length > 0 && (
          <div className="text-[9px] tracking-[3px] uppercase text-white/20 mt-4 text-right">
            {filtered.length} order{filtered.length !== 1 ? "s" : ""} shown
          </div>
        )}
      </main>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (authed === null) return null

  return authed
    ? <Dashboard onLogout={() => setAuthed(false)} />
    : <LoginScreen onLogin={() => setAuthed(true)} />
}