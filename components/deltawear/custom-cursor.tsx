"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorHaloRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [click, setClick] = useState(false)
  const posRef = useRef({ mx: 0, my: 0, dotX: 0, dotY: 0, haloX: 0, haloY: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.mx = e.clientX
      posRef.current.my = e.clientY
    }

    const handleMouseDown = () => setClick(true)
    const handleMouseUp = () => setClick(false)

    const animate = () => {
      // Very fast for dot
      posRef.current.dotX += (posRef.current.mx - posRef.current.dotX) * 0.35
      posRef.current.dotY += (posRef.current.my - posRef.current.dotY) * 0.35
      
      // Slower for halo (liquid feel)
      posRef.current.haloX += (posRef.current.mx - posRef.current.haloX) * 0.15
      posRef.current.haloY += (posRef.current.my - posRef.current.haloY) * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.dotX}px, ${posRef.current.dotY}px, 0) translate(-50%, -50%)`
      }
      
      if (cursorHaloRef.current) {
        cursorHaloRef.current.style.transform = `translate3d(${posRef.current.haloX}px, ${posRef.current.haloY}px, 0) translate(-50%, -50%)`
      }
      
      requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const attachListeners = (root: Document | Element = document) => {
      const els = root.querySelectorAll("button, a, input, select, textarea, .size-chip, .clickable")
      els.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    animate()
    attachListeners()

    const observer = new MutationObserver(() => attachListeners())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Precision Dot */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] rounded-full hidden md:block transition-all duration-300 ${
          isHovering 
            ? "w-1 h-1 bg-[var(--accent)]" 
            : "w-1.5 h-1.5 bg-[var(--accent)]"
        }`}
        style={{ left: 0, top: 0 }}
      />
      
      {/* Aurora Halo */}
      <div
        ref={cursorHaloRef}
        className={`fixed pointer-events-none z-[9998] rounded-full hidden md:block transition-all duration-500 ease-out ${
          isHovering 
            ? "w-[60px] h-[60px] bg-[var(--accent)]/30 blur-2xl scale-125 shadow-[0_0_30px_rgba(200,169,110,0.5)]" 
            : "w-[24px] h-[24px] bg-[var(--accent)]/15 blur-lg scale-100"
        } ${click ? "scale-90 opacity-80" : ""}`}
        style={{ left: 0, top: 0 }}
      />
    </>
  )
}
