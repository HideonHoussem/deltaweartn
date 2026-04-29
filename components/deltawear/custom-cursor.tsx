"use client"

import { useEffect, useState, useRef } from "react"

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const position = useRef({ x: -100, y: -100 })

  useEffect(() => {
    setMounted(true)
    const moveCursor = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      
      setIsHovering(!!isInteractive)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleLinkHover)
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleLinkHover)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isHovering])

  if (!mounted) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.1s ease-out, opacity 0.3s ease",
        willChange: "transform"
      }}
    />
  )
}

