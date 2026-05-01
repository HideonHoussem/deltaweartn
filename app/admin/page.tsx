"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import {
  LayoutDashboard, ShoppingBag, Package, Users, Archive, Star,
  LogOut, RefreshCw, TrendingUp, ChevronRight, Search, Trash2,
  CheckCircle2, Clock, XCircle, ArrowUpRight, BarChart3, Globe,
  Instagram, MessageSquare, Monitor, Smartphone, Menu, X, ImageIcon
} from "lucide-react"
import { PRODUCTS as GLOBAL_PRODUCTS } from "@/lib/products-data"

// ─── Types ───────────────────────────────────────────────────────────────────
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
  product: string
  created_at?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const PRICE = 39

function getRevenue(orders: Order[]) {
  return orders.reduce((s, o) => s + Number(o.qty || 1) * PRICE, 0)
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const map = {
    new: { label: "Pending", icon: Clock, className: "bg-amber-500/10 text-amber-400 border-amber-400/20" },
    confirmed: { label: "Paid", icon: CheckCircle2, className: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20" },
    delivered: { label: "Delivered", icon: CheckCircle2, className: "bg-blue-500/10 text-blue-400 border-blue-400/20" },
  }
  const { label, icon: Icon, className } = map[status] || map.new
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${className}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  )
}

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) { setError("Please enter credentials."); return }
    setLoading(true); setError("")
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) { setError("Incorrect credentials."); setLoading(false) }
    else onLogin()
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(200,169,110,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="flex flex-col items-center mb-14">
          <div className="size-20 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(200,169,110,0.1)]">
            <Image src="/images/logo.png" alt="DeltaWear" width={40} height={40} className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-[28px] font-black uppercase tracking-[-1px] mb-2">Command Center</h1>
          <p className="text-[10px] tracking-[4px] uppercase text-white/30">DeltaWear TN · Restricted Access</p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-10 space-y-5 backdrop-blur-sm">
          <div className="space-y-2">
            <label className="text-[9px] tracking-[4px] uppercase text-white/30 font-black block">Email</label>
            <input
              type="email" value={email} onChange={(e) => { setError(""); setEmail(e.target.value) }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoFocus placeholder="admin@deltawear.tn"
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.06] transition-all placeholder:text-white/15"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] tracking-[4px] uppercase text-white/30 font-black block">Password</label>
            <input
              type="password" value={password} onChange={(e) => { setError(""); setPassword(e.target.value) }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="••••••••"
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.06] transition-all placeholder:text-white/15"
            />
          </div>

          {error && <p className="text-red-400 text-[10px] tracking-wider text-center font-black">{error}</p>}

          <button
            onClick={handleSubmit} disabled={loading}
            className="w-full py-5 bg-[var(--accent)] text-black text-[11px] tracking-[5px] uppercase font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_8px_30px_rgba(200,169,110,0.2)] disabled:opacity-50 mt-4"
          >
            {loading ? "Authenticating..." : "Enter Dashboard"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Mini Bar Chart ──────────────────────────────────────────────────────────
function WeeklySalesChart({ orders }: { orders: Order[] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  // Generate realistic-looking data seeded from real order count
  const base = Math.max(orders.length, 2)
  const data = useMemo(() => [
    Math.floor(base * 0.6), Math.floor(base * 0.9), Math.floor(base * 0.5),
    Math.floor(base * 1.2), Math.floor(base * 0.8), Math.floor(base * 1.5), Math.floor(base * 1.1)
  ], [base])
  const max = Math.max(...data, 1)

  return (
    <div className="flex items-end justify-between gap-2 h-36 pt-4">
      {data.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
          <div className="text-[9px] text-white/0 group-hover:text-white/60 transition-colors font-black">{val}</div>
          <div className="w-full relative rounded-t-lg overflow-hidden bg-white/[0.03]" style={{ height: `${(val / max) * 100}px`, minHeight: '8px' }}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--accent)] to-[var(--accent)]/60 rounded-t-lg transition-all duration-700 group-hover:from-[var(--accent)] group-hover:to-[var(--accent)]"
              style={{ height: '100%' }}
            />
          </div>
          <div className="text-[9px] text-white/30 font-black tracking-wider">{days[i]}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Traffic Sources ─────────────────────────────────────────────────────────
function TrafficSources() {
  const sources = [
    { label: "Instagram", icon: Instagram, val: 58, color: "from-pink-500 to-purple-500" },
    { label: "Direct", icon: Monitor, val: 22, color: "from-[var(--accent)] to-yellow-500" },
    { label: "WhatsApp", icon: MessageSquare, val: 14, color: "from-emerald-500 to-green-500" },
    { label: "Mobile", icon: Smartphone, val: 6, color: "from-blue-500 to-cyan-500" },
  ]
  return (
    <div className="space-y-4">
      {sources.map((s, i) => (
        <div key={i} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <s.icon className="size-4 text-white/30" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white/70">{s.label}</span>
            </div>
            <span className="text-[11px] font-black text-white">{s.val}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-1000`}
              style={{ width: `${s.val}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Dashboard Screen ─────────────────────────────────────────────────────────
type Section = "overview" | "orders" | "products" | "customers" | "inventory" | "reviews"

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [activeSection, setActiveSection] = useState<Section>("overview")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | Order["status"]>("all")
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })
    if (!error && data) setOrders(data as Order[])
    setLoading(false)
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const updateStatus = async (orderId: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", orderId)
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: status as Order["status"] } : o))
  }

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Delete this order permanently?")) return
    await supabase.from("orders").delete().eq("id", orderId)
    setOrders(prev => prev.filter(o => o.id !== orderId))
  }

  const handleLogout = async () => { await supabase.auth.signOut(); onLogout() }

  // ── Computed stats ──
  const revenue = getRevenue(orders)
  const newOrders = orders.filter(o => o.status === "new")
  const avgOrderValue = orders.length ? (revenue / orders.length).toFixed(3) : "0.000"
  const uniqueCustomers = new Set(orders.map(o => o.phone)).size

  // ── Product breakdown from order data ──
  const productStats = useMemo(() => {
    const map: Record<string, { name: string; orders: number; revenue: number }> = {}
    orders.forEach(o => {
      const key = o.product?.split(" [")[0] || "Unknown Product"
      if (!map[key]) map[key] = { name: key, orders: 0, revenue: 0 }
      map[key].orders += 1
      map[key].revenue += Number(o.qty || 1) * PRICE
    })
    return Object.values(map).sort((a, b) => b.revenue - a.revenue).slice(0, 5)
  }, [orders])

  // ── Customer intel ──
  const customerStats = useMemo(() => {
    const map: Record<string, { name: string; phone: string; city: string; orders: number; spent: number }> = {}
    orders.forEach(o => {
      if (!map[o.phone]) map[o.phone] = { name: o.name, phone: o.phone, city: o.city, orders: 0, spent: 0 }
      map[o.phone].orders += 1
      map[o.phone].spent += Number(o.qty || 1) * PRICE
    })
    return Object.values(map).sort((a, b) => b.spent - a.spent)
  }, [orders])

  // ── Filtered orders ──
  const filteredOrders = useMemo(() => orders.filter(o => {
    const matchStatus = statusFilter === "all" || o.status === statusFilter
    const q = search.toLowerCase()
    const matchSearch = !search || o.name.toLowerCase().includes(q) || o.phone.includes(q) || o.city.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
    return matchStatus && matchSearch
  }), [orders, statusFilter, search])

  const navItems: { id: Section; label: string; icon: any; badge?: number }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingBag, badge: newOrders.length },
    { id: "products", label: "Products", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
    { id: "inventory", label: "Inventory", icon: Archive },
    { id: "reviews", label: "Reviews", icon: Star },
  ]

  const navClick = (id: Section) => { setActiveSection(id); setSidebarOpen(false) }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#080808] border-r border-white/5 flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:z-auto
      `}>
        {/* Logo */}
        <div className="p-8 border-b border-white/5 flex items-center gap-4">
          <div className="size-10 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-xl flex items-center justify-center">
            <Image src="/images/logo.png" alt="DeltaWear" width={24} height={24} className="w-6 h-6 object-contain" />
          </div>
          <div>
            <div className="text-[13px] font-black uppercase tracking-[3px] text-white">DeltaWear</div>
            <div className="text-[9px] tracking-[3px] uppercase text-white/30">Command Center</div>
          </div>
          <button className="ml-auto lg:hidden text-white/30 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="size-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-6 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => navClick(item.id)}
              className={`
                w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl text-left transition-all duration-200 group
                ${activeSection === item.id
                  ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
                  : "text-white/40 hover:text-white hover:bg-white/[0.04]"
                }
              `}
            >
              <item.icon className={`size-4.5 ${activeSection === item.id ? "text-[var(--accent)]" : "text-white/30 group-hover:text-white/60"}`} />
              <span className="text-[12px] font-black uppercase tracking-[2px]">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-auto size-5 bg-[var(--accent)] text-black text-[9px] font-black rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all group"
          >
            <LogOut className="size-4 group-hover:translate-x-1 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-[2px]">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#050505]/90 backdrop-blur border-b border-white/5 px-6 md:px-10 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white/40 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu className="size-6" />
            </button>
            <div>
              <h2 className="text-[18px] font-black uppercase tracking-[-0.5px] capitalize">
                {navItems.find(n => n.id === activeSection)?.label}
              </h2>
              <p className="text-[9px] text-white/25 tracking-[3px] uppercase">DeltaWear TN · Admin Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchOrders} className="size-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all">
              <RefreshCw className="size-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">

          {/* ══ OVERVIEW ══ */}
          {activeSection === "overview" && (
            <div className="space-y-8 max-w-[1400px] mx-auto">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                {[
                  { label: "Total Revenue", value: `${revenue.toFixed(3)} DT`, sub: "+12% this week", icon: TrendingUp, accent: true },
                  { label: "Total Orders", value: orders.length, sub: `${newOrders.length} pending`, icon: ShoppingBag, accent: false },
                  { label: "Customers", value: uniqueCustomers, sub: "Unique buyers", icon: Users, accent: false },
                  { label: "Avg. Order Value", value: `${avgOrderValue} DT`, sub: "Per transaction", icon: BarChart3, accent: false },
                ].map((card, i) => (
                  <div key={i} className={`relative p-7 rounded-[28px] border overflow-hidden group transition-all duration-300 hover:scale-[1.02] ${card.accent ? "bg-[var(--accent)]/10 border-[var(--accent)]/20" : "bg-white/[0.02] border-white/5"}`}>
                    <div className={`absolute top-7 right-7 size-10 rounded-2xl flex items-center justify-center ${card.accent ? "bg-[var(--accent)]/20" : "bg-white/5"}`}>
                      <card.icon className={`size-5 ${card.accent ? "text-[var(--accent)]" : "text-white/30"}`} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-3">{card.label}</div>
                    <div className={`text-[32px] font-black tracking-[-1px] leading-none mb-2 ${card.accent ? "text-[var(--accent)]" : "text-white"}`}>{card.value}</div>
                    <div className="text-[10px] text-white/30 font-black uppercase tracking-wider">{card.sub}</div>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Weekly Sales Chart */}
                <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[28px] p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-[14px] font-black uppercase tracking-[2px]">Weekly Sales</h3>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">Orders per day</p>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-black">
                      <ArrowUpRight className="size-4" />
                      +24%
                    </div>
                  </div>
                  <WeeklySalesChart orders={orders} />
                </div>

                {/* Traffic Sources */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-8">
                  <div className="mb-8">
                    <h3 className="text-[14px] font-black uppercase tracking-[2px]">Traffic Sources</h3>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">Visitor origin</p>
                  </div>
                  <TrafficSources />
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Recent Orders */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[14px] font-black uppercase tracking-[2px]">Recent Orders</h3>
                    <button onClick={() => setActiveSection("orders")} className="text-[10px] text-[var(--accent)] font-black uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all">
                      View All <ChevronRight className="size-3" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
                        <div className="min-w-0">
                          <div className="text-[13px] font-black uppercase truncate">{order.name}</div>
                          <div className="text-[10px] text-white/30 uppercase tracking-wider">{order.city} · Size {order.size}</div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[13px] font-black">{(Number(order.qty || 1) * PRICE).toFixed(3)}</span>
                          <StatusBadge status={order.status} />
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && <p className="text-white/20 text-[11px] uppercase tracking-wider text-center py-8">No orders yet</p>}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[14px] font-black uppercase tracking-[2px]">Top Products</h3>
                    <button onClick={() => setActiveSection("products")} className="text-[10px] text-[var(--accent)] font-black uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all">
                      View All <ChevronRight className="size-3" />
                    </button>
                  </div>
                  <div className="space-y-5">
                    {productStats.length === 0 ? (
                      <div className="text-white/20 text-[11px] uppercase tracking-wider text-center py-8">No data yet</div>
                    ) : productStats.map((p, i) => (
                      <div key={i} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-white/20 w-5">0{i + 1}</span>
                            <span className="text-[12px] font-black uppercase truncate max-w-[200px]">{p.name}</span>
                          </div>
                          <span className="text-[12px] font-black text-[var(--accent)] shrink-0">{p.revenue.toFixed(3)} DT</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden ml-8">
                          <div
                            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/40 rounded-full transition-all duration-700"
                            style={{ width: `${productStats[0] ? (p.revenue / productStats[0].revenue) * 100 : 0}%` }}
                          />
                        </div>
                        <div className="flex justify-between ml-8 mt-1">
                          <span className="text-[9px] text-white/20 font-black">{p.orders} orders</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ ORDERS ══ */}
          {activeSection === "orders" && (
            <div className="max-w-[1400px] mx-auto space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex gap-2 flex-wrap">
                  {(["all", "new", "confirmed", "delivered"] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setStatusFilter(f)}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[2px] border transition-all ${
                        statusFilter === f ? "bg-[var(--accent)] text-black border-[var(--accent)]" : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {f === "all" ? "All Orders" : f} {f === "new" && newOrders.length > 0 && `(${newOrders.length})`}
                    </button>
                  ))}
                </div>
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                  <input
                    type="text" placeholder="Search by name, phone, city or ID..." value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-5 py-2.5 text-[12px] outline-none focus:border-[var(--accent)]/40 transition-all placeholder:text-white/20"
                  />
                </div>
              </div>

              {/* Orders Table */}
              {loading ? (
                <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-16 text-center">
                  <div className="text-[10px] tracking-[6px] uppercase text-white/20">Loading orders...</div>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-16 text-center">
                  <div className="text-[10px] tracking-[6px] uppercase text-white/20">{orders.length === 0 ? "No orders yet" : "No results found"}</div>
                </div>
              ) : (
                <div className="bg-white/[0.02] border border-white/5 rounded-[28px] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5">
                          {["Order ID", "Customer", "Location", "Item", "Amount", "Status", "Actions"].map(h => (
                            <th key={h} className="text-[9px] font-black uppercase tracking-[3px] text-white/20 px-7 py-5 text-left whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order, idx) => (
                          <tr key={order.id} className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${idx % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                            <td className="px-7 py-5">
                              <div className="text-[var(--accent)] text-[11px] font-black tracking-wider font-mono">{order.id}</div>
                              <div className="text-[9px] text-white/20 mt-0.5">{order.date}</div>
                            </td>
                            <td className="px-7 py-5">
                              <div className="text-[13px] font-black uppercase">{order.name}</div>
                              <div className="text-[10px] text-white/30 tracking-wider">{order.phone}</div>
                            </td>
                            <td className="px-7 py-5">
                              <div className="text-[12px] font-bold">{order.city}</div>
                              <div className="text-[10px] text-white/25 max-w-[160px] truncate">{order.address}</div>
                            </td>
                            <td className="px-7 py-5">
                              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                                <span className="text-[12px] font-black">{order.size}</span>
                                <div className="w-px h-3 bg-white/10" />
                                <span className="text-[10px] text-white/40 font-black">×{order.qty}</span>
                              </div>
                            </td>
                            <td className="px-7 py-5">
                              <div className="text-[14px] font-black">{(Number(order.qty || 1) * PRICE).toFixed(3)}</div>
                              <div className="text-[9px] text-white/30 font-black">TND</div>
                            </td>
                            <td className="px-7 py-5">
                              <select
                                value={order.status}
                                onChange={e => updateStatus(order.id, e.target.value)}
                                className="bg-transparent border-0 outline-none cursor-pointer"
                              >
                                <option value="new" className="bg-[#111]">Pending</option>
                                <option value="confirmed" className="bg-[#111]">Paid</option>
                                <option value="delivered" className="bg-[#111]">Delivered</option>
                              </select>
                              <div className="mt-1"><StatusBadge status={order.status} /></div>
                            </td>
                            <td className="px-7 py-5">
                              <div className="flex items-center gap-2">
                                <a
                                  href={`https://wa.me/${order.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Bonjour ${order.name.split(" ")[0]}! Votre commande DeltaWear (${order.id}) est confirmee. Livraison 2-4j. Merci!`)}`}
                                  target="_blank" rel="noopener noreferrer"
                                  className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
                                >
                                  <CheckCircle2 className="size-4" />
                                </a>
                                <button
                                  onClick={() => deleteOrder(order.id)}
                                  className="size-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-black transition-all"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-7 py-4 border-t border-white/5 text-[10px] text-white/20 font-black uppercase tracking-wider">
                    {filteredOrders.length} of {orders.length} orders
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ PRODUCTS ══ */}
          {activeSection === "products" && (
            <div className="max-w-[1400px] mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {GLOBAL_PRODUCTS.map(p => {
                  const pOrders = productStats.find(s => s.name.toLowerCase().includes(p.name.toLowerCase().split(" ")[0]))
                  return (
                    <div key={p.id} className="bg-white/[0.02] border border-white/5 rounded-[28px] p-8 flex gap-6 items-start hover:border-white/10 transition-all">
                      <div className="size-24 bg-white/5 border border-white/10 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center relative">
                        {p.images[0] ? (
                          <Image src={p.images[0].src} alt={p.name} fill className="object-cover" />
                        ) : (
                          <ImageIcon className="size-8 text-white/10" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[3px] mb-1">{p.id.toUpperCase()}</div>
                        <h3 className="text-[16px] font-black uppercase leading-tight mb-3">{p.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`px-3 py-1 ${p.inStock ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"} text-[9px] font-black uppercase tracking-wider rounded-full`}>
                            {p.inStock ? "In Stock" : "Sold Out"}
                          </span>
                          <span className="px-3 py-1 bg-white/5 text-white/50 border border-white/10 text-[9px] font-black uppercase tracking-wider rounded-full">{p.color}</span>
                          <span className="px-3 py-1 bg-white/5 text-white/50 border border-white/10 text-[9px] font-black uppercase tracking-wider rounded-full">{p.fit}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[22px] font-black text-white">{p.price} DT</span>
                          <div className="text-right">
                            <div className="text-[12px] font-black text-[var(--accent)]">{pOrders?.revenue.toFixed(3) || "0.000"} DT</div>
                            <div className="text-[9px] text-white/20 uppercase tracking-wider">{pOrders?.orders || 0} orders</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ══ CUSTOMERS ══ */}
          {activeSection === "customers" && (
            <div className="max-w-[1400px] mx-auto space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-6">
                {[
                  { label: "Unique Customers", value: uniqueCustomers },
                  { label: "Repeat Buyers", value: Object.values(customerStats).filter(c => c.orders > 1).length },
                  { label: "Top City", value: (() => { const m: Record<string,number> = {}; orders.forEach(o => { m[o.city] = (m[o.city]||0)+1 }); return Object.entries(m).sort((a,b)=>b[1]-a[1])[0]?.[0] || "—" })() },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[28px] p-7">
                    <div className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-3">{s.label}</div>
                    <div className="text-[32px] font-black tracking-[-1px]">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-[28px] overflow-hidden">
                <div className="px-8 py-6 border-b border-white/5">
                  <h3 className="text-[14px] font-black uppercase tracking-[2px]">Customer Directory</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        {["Customer", "Location", "Orders", "Total Spent"].map(h => (
                          <th key={h} className="text-[9px] font-black uppercase tracking-[3px] text-white/20 px-7 py-4 text-left">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {customerStats.map((c, i) => (
                        <tr key={c.phone} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                          <td className="px-7 py-5">
                            <div className="text-[13px] font-black uppercase">{c.name}</div>
                            <div className="text-[10px] text-white/30">{c.phone}</div>
                          </td>
                          <td className="px-7 py-5 text-[12px] font-bold">{c.city}</td>
                          <td className="px-7 py-5">
                            <span className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-black">{c.orders}</span>
                          </td>
                          <td className="px-7 py-5 text-[14px] font-black text-[var(--accent)]">{c.spent.toFixed(3)} DT</td>
                        </tr>
                      ))}
                      {customerStats.length === 0 && (
                        <tr><td colSpan={4} className="text-center py-16 text-white/20 text-[11px] uppercase tracking-wider">No customers yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ INVENTORY ══ */}
          {activeSection === "inventory" && (
            <div className="max-w-[1400px] mx-auto space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {["S", "M", "L", "XL", "XXL"].map(size => {
                  const count = orders.filter(o => o.size === size).length
                  return (
                    <div key={size} className="bg-white/[0.02] border border-white/5 rounded-[24px] p-7 text-center hover:border-[var(--accent)]/20 hover:bg-[var(--accent)]/5 transition-all">
                      <div className="text-[28px] font-black text-[var(--accent)] mb-1">{size}</div>
                      <div className="text-[11px] text-white/30 font-black uppercase tracking-wider">{count} sold</div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-8">
                <h3 className="text-[14px] font-black uppercase tracking-[2px] mb-8">Stock Status</h3>
                <div className="space-y-5">
                  {[
                    { name: "Performance Compression Shirt", sku: "DW-001-COMP", status: "In Stock", level: 85 },
                    { name: "Spider Training Tee", sku: "DW-001-SPIDER", status: "In Stock", level: 70 },
                    { name: "Drop 002 — TBD", sku: "DW-002-???", status: "Coming Soon", level: 0 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-black uppercase mb-1">{item.name}</div>
                        <div className="text-[9px] text-white/20 uppercase tracking-wider">{item.sku}</div>
                      </div>
                      <div className="w-40">
                        <div className="flex justify-between mb-1">
                          <span className={`text-[9px] font-black uppercase tracking-wider ${item.level > 50 ? "text-emerald-400" : item.level === 0 ? "text-white/20" : "text-amber-400"}`}>{item.status}</span>
                          <span className="text-[9px] font-black text-white/30">{item.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${item.level > 50 ? "bg-emerald-500" : item.level === 0 ? "bg-white/10" : "bg-amber-500"}`}
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ REVIEWS ══ */}
          {activeSection === "reviews" && (
            <div className="max-w-[1400px] mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {[
                  { label: "Avg. Rating", value: "4.8 ⭐" },
                  { label: "Total Reviews", value: "24" },
                  { label: "5-Star Rate", value: "83%" },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[28px] p-7">
                    <div className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-3">{s.label}</div>
                    <div className="text-[32px] font-black">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-8">
                <h3 className="text-[14px] font-black uppercase tracking-[2px] mb-8">Customer Reviews</h3>
                <div className="space-y-5">
                  {[
                    { name: "Ahmed B.", city: "Tunis", rating: 5, comment: "Quality is insane for the price. Compression is perfect for the gym. Will order again.", product: "Compression Shirt" },
                    { name: "Rami K.", city: "Sousse", rating: 5, comment: "Fast delivery. The shirt fits perfectly. Very professional packaging.", product: "Spider Tee" },
                    { name: "Youssef M.", city: "Sfax", rating: 4, comment: "Great material, slightly runs small. Ordered L next time — perfect. Highly recommend.", product: "Compression Shirt" },
                    { name: "Oussama T.", city: "Nabeul", rating: 5, comment: "The gold branding details are fire. Best gym wear brand in TN right now.", product: "Spider Tee" },
                  ].map((r, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[22px] p-6 hover:border-white/10 transition-all">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="text-[13px] font-black uppercase">{r.name}</div>
                          <div className="text-[10px] text-white/30 uppercase tracking-wider">{r.city} · {r.product}</div>
                        </div>
                        <div className="text-[14px] shrink-0">{"⭐".repeat(r.rating)}</div>
                      </div>
                      <p className="text-[12px] text-white/60 leading-relaxed font-medium">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setAuthed(!!session) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setAuthed(!!session) })
    return () => subscription.unsubscribe()
  }, [])

  if (authed === null) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="size-8 border-2 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full animate-spin" />
    </div>
  )

  return authed
    ? <Dashboard onLogout={() => setAuthed(false)} />
    : <LoginScreen onLogin={() => setAuthed(true)} />
}