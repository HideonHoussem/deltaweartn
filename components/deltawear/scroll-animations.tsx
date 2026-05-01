"use client"

import { useEffect, useRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  animation?: "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleUp" | "blur"
  delay?: number
  threshold?: number
}

export function AnimateOnScroll({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-visible")
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, threshold])

  const animationClasses = {
    fadeUp: "translate-y-12 opacity-0 [&.animate-visible]:translate-y-0 [&.animate-visible]:opacity-100",
    fadeIn: "opacity-0 [&.animate-visible]:opacity-100",
    fadeLeft: "translate-x-12 opacity-0 [&.animate-visible]:translate-x-0 [&.animate-visible]:opacity-100",
    fadeRight: "-translate-x-12 opacity-0 [&.animate-visible]:translate-x-0 [&.animate-visible]:opacity-100",
    scaleUp: "scale-95 opacity-0 [&.animate-visible]:scale-100 [&.animate-visible]:opacity-100",
    blur: "blur-sm opacity-0 [&.animate-visible]:blur-0 [&.animate-visible]:opacity-100",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        animationClasses[animation],
        className
      )}
    >
      {children}
    </div>
  )
}

// Parallax effect component
interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number // 0.1 to 1, where 1 is no parallax and 0.1 is maximum
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * (1 - speed)
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        ref.current.style.transform = `translateY(${rate * 0.1}px)`
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Staggered children animation
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 100,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll("[data-stagger]")
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-visible")
              }, index * staggerDelay)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [staggerDelay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <div
      data-stagger
      className={cn(
        "translate-y-8 opacity-0 transition-all duration-500 ease-out",
        "[&.animate-visible]:translate-y-0 [&.animate-visible]:opacity-100",
        className
      )}
    >
      {children}
    </div>
  )
}

// Counter animation
interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function Counter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            animateCount()
          }
        })
      },
      { threshold: 0.5 }
    )

    const animateCount = () => {
      const start = 0
      const startTime = performance.now()

      const updateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const current = Math.floor(easeOutQuart * (end - start) + start)

        if (ref.current) {
          ref.current.textContent = `${prefix}${current}${suffix}`
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        } else if (ref.current) {
          ref.current.textContent = `${prefix}${end}${suffix}`
        }
      }

      requestAnimationFrame(updateCount)
    }

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, suffix, prefix])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
