"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorOuterRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const posRef = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.mx = e.clientX
      posRef.current.my = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    const animate = () => {
      posRef.current.rx += (posRef.current.mx - posRef.current.rx) * 0.1
      posRef.current.ry += (posRef.current.my - posRef.current.ry) * 0.1
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.left = `${posRef.current.rx}px`
        cursorOuterRef.current.style.top = `${posRef.current.ry}px`
      }
      requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const attachListeners = (root: Document | Element = document) => {
      const els = root.querySelectorAll("button, a, input, select, textarea, .size-chip")
      els.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    animate()
    attachListeners()

    // Re-attach when DOM changes (new buttons rendered)
    const observer = new MutationObserver(() => attachListeners())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-250 hidden md:block ${
          isHovering 
            ? "w-[5px] h-[5px] bg-[var(--accent)]" 
            : "w-2 h-2 bg-[var(--white)]"
        }`}
      />
      <div
        ref={cursorOuterRef}
        className={`fixed rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hidden md:block ${
          isHovering 
            ? "w-[54px] h-[54px] border border-[rgba(200,169,110,0.4)]" 
            : "w-10 h-10 border border-white/30"
        }`}
      />
    </>
  )
}
