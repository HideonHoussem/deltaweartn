import { NextRequest, NextResponse } from "next/server"

// Simple in-memory rate limiter
// Allows max 5 requests per IP per 10 minutes on the order API
const rateMap = new Map<string, { count: number; resetAt: number }>()

const LIMIT = 5
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes

export function proxy(req: NextRequest) {
  // Only rate-limit the /api/order route
  if (!req.nextUrl.pathname.startsWith("/api/order")) {
    return NextResponse.next()
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return NextResponse.next()
  }

  if (entry.count >= LIMIT) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    )
  }

  entry.count++
  return NextResponse.next()
}

export const config = {
  matcher: "/api/order",
}
