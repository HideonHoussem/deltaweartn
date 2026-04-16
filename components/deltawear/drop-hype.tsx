"use client"

import { useEffect, useState } from "react"
import { RevealSection } from "./reveal-section"
import { AnimateOnScroll } from "./scroll-animations"
import { ShieldAlert, Zap, ArrowRight, CheckCircle2, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"

// Target date: 30 days from now
const DROP_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

export function DropHype() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [email, setEmail] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = DROP_DATE.getTime() - now
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <RevealSection id="drop-hype" className="relative min-h-[90vh] bg-[#050505] flex items-center justify-center py-24 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Pulsing Alert Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px] animate-pulse" />

      {/* Cyber Scanners */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.1)] animate-[digitalScan_6s_infinite]" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.1)] animate-[digitalScan_6s_infinite_reverse]" />

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-16 text-center">
        
        <AnimateOnScroll animation="fadeUp">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="px-5 py-2 border border-[var(--accent)]/30 bg-[var(--accent)]/5 rounded-full flex items-center gap-3">
              <ShieldAlert className="size-4 text-[var(--accent)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[5px] text-[var(--accent)]">Deployment 002 Scheduled</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-white/20">
               <Wifi className="size-4" />
               <span className="text-[8px] font-black uppercase tracking-[3px]">Secure Signal</span>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="scaleUp" delay={200}>
          <h2 className="text-[clamp(48px,8vw,120px)] font-black uppercase tracking-tighter leading-[0.85] mb-16 select-none">
            MISSION <br className="md:hidden" /> <span className="text-white/20 italic">CRITICAL</span>
          </h2>
        </AnimateOnScroll>

        {/* Massive Digital Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 max-w-4xl mx-auto">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Mins" },
            { value: timeLeft.seconds, label: "Secs" },
          ].map((item, i) => (
            <div key={i} className="group cursor-default">
              <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[40px] group-hover:border-[var(--accent)]/30 transition-all duration-700 shadow-2xl relative overflow-hidden">
                <div className="text-[48px] md:text-[72px] font-thin tracking-[-4px] leading-none mb-2 tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-[9px] font-black uppercase tracking-[4px] text-white/20 group-hover:text-[var(--accent)]/60 transition-colors">
                  {item.label}
                </div>
                {/* Micro-glow */}
                <div className="absolute top-0 right-0 p-2 text-white/[0.02]">0{i+1}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tactical Registration */}
        <div className="max-w-2xl mx-auto">
          {status === 'success' ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-10 rounded-[40px] animate-in zoom-in duration-500">
               <CheckCircle2 className="size-16 text-emerald-500 mx-auto mb-6" />
               <h3 className="text-[20px] font-black uppercase tracking-[2px] mb-2">Position Secured</h3>
               <p className="text-[12px] text-emerald-500/60 uppercase tracking-[4px] font-black">Authentication code sent to {email}</p>
            </div>
          ) : (
            <div className="space-y-8">
               <p className="text-[14px] md:text-[16px] text-white/80 font-black uppercase tracking-[1px] leading-relaxed">
                 Priority members get 24h Early Access and exclusive <br className="hidden md:block" /> mission status rewards for Drop 002.
               </p>
               
               <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                 <div className="flex-1 relative group">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER DEPLOYMENT EMAIL"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-8 py-6 text-[11px] font-black tracking-[4px] uppercase outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.04] transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none group-hover:opacity-100 transition-opacity">
                      <Zap className="size-4 text-[var(--accent)]" />
                    </div>
                 </div>
                 <button 
                   type="submit"
                   disabled={status === 'loading'}
                   className="px-12 py-6 bg-[var(--accent)] text-black font-black uppercase tracking-[5px] text-[11px] rounded-2xl hover:scale-[1.05] active:scale-[0.95] transition-all shadow-[0_0_40px_rgba(200,169,110,0.2)] flex items-center justify-center gap-3"
                 >
                   {status === 'loading' ? "AUTHENTICATING..." : (
                     <>SECURE POSITION <ArrowRight className="size-4" /></>
                   )}
                 </button>
               </form>
               
               <div className="flex items-center justify-center gap-8 pt-8">
                  {[
                    { label: "Encrypted", val: "AES-256" },
                    { label: "Status", val: "ALPHA" },
                    { label: "Origin", val: "TN-99" },
                  ].map((stat, i) => (
                    <div key={i} className="text-left">
                       <div className="text-[8px] font-black uppercase tracking-[2px] text-white/50">{stat.label}</div>
                       <div className="text-[10px] font-black tracking-[1px] text-[var(--accent)]">{stat.val}</div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Background Decorative Word */}
      <div className="absolute -bottom-10 -right-10 text-[20vw] font-black text-white/[0.01] uppercase select-none pointer-events-none">
        DEPLOY
      </div>
    </RevealSection>
  )
}
