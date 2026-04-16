"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/deltawear/navbar"
import { Footer } from "@/components/deltawear/footer"
import { Lock, ShieldCheck, Zap, Eye, Database, Terminal, ChevronRight, Trophy, Target, Activity } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

export default function VaultPage() {
  const [accessCode, setAccessCode] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [error, setError] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const { hasDiscount } = useCart()
  const [mounted, setMounted] = useState(false)

  // Alliance Status State
  const [rank, setRank] = useState({
    name: "Specialist",
    level: 4,
    xp: 680,
    nextLevelAt: 1000,
    tier: "Gold"
  })

  useEffect(() => {
    setMounted(true)
    const savedAuth = localStorage.getItem("deltawear_vault_auth")
    if (savedAuth === "true") setIsAuthorized(true)
  }, [])

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode.toUpperCase() === "DELTA2024") {
      setIsExiting(true)
      setTimeout(() => {
        setIsAuthorized(true)
        localStorage.setItem("deltawear_vault_auth", "true")
        setIsExiting(false)
      }, 800)
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-[#050505]" />
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      <Navbar />
      
      {!isAuthorized ? (
        <div 
          className={cn(
            "h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.05)_0%,transparent_70%)] transition-all duration-700 ease-in-out",
            isExiting ? "opacity-0 scale-95 blur-2xl" : "opacity-100"
          )}
        >
          <div className="w-full max-w-md bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-1000">
            {/* Decorative Scanline */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                 style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,169,110,0.1) 2px, rgba(200,169,110,0.1) 4px)" }} />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="size-20 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mb-8 border border-[var(--accent)]/20 shadow-[0_0_40px_rgba(200,169,110,0.05)]">
                <Lock className="size-8 text-[var(--accent)]" />
              </div>
              
              <h1 className="text-[24px] font-black uppercase tracking-[8px] mb-2 text-center">Identity Check</h1>
              <p className="text-[10px] uppercase font-black tracking-[4px] text-white/20 mb-10 text-center">Elite access code required</p>

              <form onSubmit={handleAuthorize} className="w-full space-y-6">
                <div className={cn("relative group transition-transform", error && "animate-shake")}>
                  <input 
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="ENTER CODE"
                    className={cn(
                      "w-full bg-white/[0.02] border rounded-2xl px-6 py-5 text-center text-[18px] font-black tracking-[10px] uppercase outline-none transition-all",
                      error ? "border-red-500/50" : "border-white/10 focus:border-[var(--accent)]/50 focus:bg-white/[0.04]"
                    )}
                  />
                  {error && <p className="absolute -bottom-6 left-0 w-full text-center text-[8px] font-black uppercase tracking-[2px] text-red-500">Access Denied</p>}
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-5 bg-[var(--accent)] text-black font-black uppercase tracking-[6px] text-[12px] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(200,169,110,0.2)]"
                >
                  Authenticate
                </button>
              </form>
              
              <div className="mt-12 text-center space-y-2">
                 <p className="text-[8px] font-black text-white/10 uppercase tracking-[4px]">Hint: Establish Year 2024</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="pt-32 pb-24 px-6 md:px-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both"
        >
          <div className="max-w-6xl mx-auto">
            
            {/* Header Status Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-20 border-b border-white/5 pb-12">
              <div className="animate-in fade-in slide-in-from-left duration-1000 delay-300 fill-mode-both">
                <div className="flex items-center gap-3 mb-2">
                  <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[4px] text-white/40">Secure Connection Established</span>
                </div>
                <h1 className="text-[48px] md:text-[72px] font-black uppercase tracking-tighter leading-none">
                  The <span className="text-[var(--accent)] italic">Vault</span>
                </h1>
              </div>
              
              {/* Alliance Status Badge */}
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[24px] flex items-center gap-6 min-w-[280px] animate-in fade-in slide-in-from-right duration-1000 delay-500 fill-mode-both">
                <div className={`size-14 rounded-full flex items-center justify-center ${hasDiscount ? 'bg-[var(--accent)]/20 border-[var(--accent)]/20 shadow-[0_0_20px_rgba(200,169,110,0.1)]' : 'bg-white/5 border-white/5'} border transition-colors duration-1000`}>
                  <ShieldCheck className={`size-6 ${hasDiscount ? 'text-[var(--accent)]' : 'text-white/10'}`} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[3px] text-white/20 mb-1">Alliance Status</p>
                  <p className={`text-[14px] font-black uppercase tracking-tight ${hasDiscount ? 'text-[var(--accent)]' : 'text-white/40'}`}>
                    {hasDiscount ? '5% REMISE ACTIVE' : 'NO ACTIVE REWARDS'}
                  </p>
                </div>
              </div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Tactical Briefing */}
              <div className="lg:col-span-2 space-y-10">
                <div className="bg-[#080808] border border-white/5 p-10 rounded-[40px] relative overflow-hidden group hover:border-[var(--accent)]/20 transition-all duration-700 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both">
                  <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-[var(--accent)]/5 transition-colors duration-700">
                    <Terminal className="size-16" />
                  </div>
                  
                  <h2 className="text-[11px] font-black uppercase tracking-[6px] text-[var(--accent)] mb-8 flex items-center gap-3">
                    <Zap className="size-4 animate-pulse" /> Tactical Briefing 001
                  </h2>
                  
                  <div className="space-y-6 text-[16px] md:text-[18px] text-white/60 leading-relaxed font-medium">
                    <p>
                      Welcome to the Inner Circle. DeltaWear is more than compression gear—it&apos;s a logistical advantage for the modern athlete.
                    </p>
                    <p className="text-white font-bold italic">
                      The "Spider" collection is reaching critical capacity. Deployment of Next-Gen textiles will begin synchronized with our 2024 global release schedule.
                    </p>
                    <p>
                      Your unique connection to this headquarters ensures you are notified before any public announcement. Establish your position.
                    </p>
                  </div>

                  <div className="mt-12 pt-10 border-t border-white/5 flex flex-wrap gap-8 text-[9px] font-black uppercase tracking-[3px] text-white/20">
                    <span className="flex items-center gap-2"><div className="size-1 bg-[var(--accent)] rounded-full" /> Server: TN-DELTA-ALPHA</span>
                    <span>Uptime: 99.9%</span>
                    <span>Encryption: AES-256</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <VaultCard 
                    icon={Database} 
                    title="Asset Tracking" 
                    desc="Monitor the movement of your orders across the national logistics network."
                    label="View Shipments"
                    delay="delay-[900ms]"
                  />
                  <VaultCard 
                    icon={Eye} 
                    title="Intelligence" 
                    desc="Access high-resolution mockups and early sketches for Drop 002."
                    label="Visual Brief"
                    delay="delay-[1100ms]"
                  />
                </div>
              </div>

              {/* Vertical Sidebar: Status & Upcoming Drop */}
              <div className="space-y-10 animate-in fade-in slide-in-from-right duration-1000 delay-[1300ms] fill-mode-both">
                
                {/* Status Dashboard Section */}
                <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[40px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-white/5 opacity-10">
                    <Activity className="size-20" />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-[11px] font-black uppercase tracking-[5px] text-white/30 mb-8">Status Evolution</h3>
                    
                    {/* Rank Badge */}
                    <div className="flex items-center gap-6 mb-10">
                      <div className="relative">
                        <div className="size-20 rounded-full border-2 border-[var(--accent)]/20 flex items-center justify-center p-1">
                          <div className="size-full rounded-full border border-[var(--accent)] flex items-center justify-center bg-[var(--accent)]/5 shadow-[0_0_30px_rgba(200,169,110,0.1)]">
                             <Trophy className="size-8 text-[var(--accent)]" />
                          </div>
                        </div>
                        {/* Level Badge */}
                        <div className="absolute -bottom-1 -right-1 bg-[var(--accent)] text-black text-[10px] font-black size-7 rounded-full flex items-center justify-center border-4 border-[#0a0a0a]">
                          {rank.level}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-[24px] font-black uppercase tracking-tight leading-none mb-1">{rank.name}</div>
                        <div className="text-[10px] font-black uppercase tracking-[3px] text-[var(--accent)]">Tier 02 - {rank.tier}</div>
                      </div>
                    </div>

                    {/* XP Progress */}
                    <div className="space-y-4 mb-10">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-[3px] text-white/40">XP Progress</span>
                        <span className="text-[12px] font-mono text-[var(--accent)]">{rank.xp} / {rank.nextLevelAt}</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--accent)] shadow-[0_0_15px_rgba(200,169,110,0.5)] transition-all duration-1000 ease-out"
                          style={{ width: `${(rank.xp / rank.nextLevelAt) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Tactical Log */}
                    <div className="space-y-4">
                      <h4 className="text-[9px] font-black uppercase tracking-[4px] text-white/20 mb-4">Tactical Log</h4>
                      {[
                        { op: "Drop 001 Secured", xp: "+250 XP", color: "text-green-500" },
                        { op: "Alliance Portal Sync", xp: "+100 XP", color: "text-blue-500" },
                        { op: "Identity Verified", xp: "+50 XP", color: "text-white/40" },
                      ].map((log, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/[0.02] p-4 rounded-xl border border-white/5">
                           <span className="text-[10px] font-bold uppercase tracking-tight text-white/60">{log.op}</span>
                           <span className={cn("text-[9px] font-black", log.color)}>{log.xp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--accent)] p-10 rounded-[40px] text-black h-full flex flex-col justify-between min-h-[400px] shadow-[0_30px_90px_rgba(200,169,110,0.1)] relative overflow-hidden group">
                   {/* Architectural Decorative Watermark */}
                   <div className="absolute -bottom-10 -right-10 text-[20vw] font-black opacity-[0.05] pointer-events-none select-none group-hover:scale-110 transition-transform duration-1000">DW</div>
                   
                   <div className="relative z-10">
                     <h3 className="text-[24px] font-black uppercase tracking-tighter leading-none mb-6">
                       Next<br />Deployment
                       <span className="block mt-2 text-[12px] tracking-[4px] font-black opacity-40">Drop 002 / Alpha</span>
                     </h3>
                     <div className="w-12 h-[2px] bg-black/20 mb-10" />
                     <p className="text-[14px] font-bold uppercase tracking-tight leading-tight opacity-70">
                       Engineered for higher temperature endurance. 
                       The heat-reactive series is currently in final testing.
                     </p>
                   </div>

                   <div className="relative z-10 space-y-4">
                     <div className="bg-black text-[var(--accent)] p-6 rounded-[24px] text-center shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
                        <span className="text-[28px] font-black tracking-tighter italic">COMING SOON</span>
                     </div>
                     <p className="text-[9px] font-black uppercase tracking-[3px] text-center opacity-40">Priority members get 24h headstart</p>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </main>
  )
}

function VaultCard({ icon: Icon, title, desc, label, delay }: any) {
  return (
    <div className={cn(
      "bg-[#080808] border border-white/5 p-10 rounded-[40px] group hover:bg-white/[0.04] transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both",
      delay
    )}>
       <div className="size-14 bg-white/5 rounded-[20px] flex items-center justify-center mb-8 border border-white/5 group-hover:border-[var(--accent)]/30 transition-colors">
          <Icon className="size-6 text-white/40 group-hover:text-[var(--accent)]" />
       </div>
       <h3 className="text-[20px] font-black uppercase tracking-tighter mb-4">{title}</h3>
       <p className="text-[13px] text-white/30 font-medium leading-relaxed mb-10">{desc}</p>
       <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[4px] text-[var(--accent)]">
          {label} <ChevronRight className="size-3 group-hover:translate-x-1.5 transition-transform" />
       </div>
    </div>
  )
}
