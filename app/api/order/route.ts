import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function validatePhone(phone: string): boolean {
  return /^[234579][0-9]{7}$/.test(phone.replace(/\s/g, ""))
}

const VALID_SIZES = ["S", "M", "L", "XL", "XXL"]
const VALID_GOVERNORATES = [
  "Tunis","Ariana","Ben Arous","Manouba","Nabeul","Zaghouan","Bizerte","Béja",
  "Jendouba","Kef","Siliana","Sousse","Monastir","Mahdia","Sfax","Kairouan",
  "Kasserine","Sidi Bouzid","Gabès","Medenine","Tataouine","Gafsa","Tozeur","Kébili"
]

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing Supabase environment variables.")
      return NextResponse.json({ error: "Server configuration error. Please try again later." }, { status: 500 })
    }

    // Server-side Supabase client — created at request time, not build time
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const body = await req.json()
    const { fname, lname, phone, city, address, size, qty, note, product } = body

    // Server-side validation
    if (!fname?.trim() || !lname?.trim() || !phone || !city || !address?.trim() || !size || !product) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }
    if (fname.length > 50 || lname.length > 50) {
      return NextResponse.json({ error: "Name too long." }, { status: 400 })
    }
    if (!validatePhone(phone)) {
      return NextResponse.json({ error: "Invalid phone number." }, { status: 400 })
    }
    if (!VALID_SIZES.includes(size)) {
      return NextResponse.json({ error: "Invalid size." }, { status: 400 })
    }
    if (!VALID_GOVERNORATES.includes(city)) {
      return NextResponse.json({ error: "Invalid governorate." }, { status: 400 })
    }
    const qtyNum = Number(qty)
    if (!Number.isInteger(qtyNum) || qtyNum < 1 || qtyNum > 50) {
      return NextResponse.json({ error: "Invalid quantity (Max 50 items)." }, { status: 400 })
    }
    if (address.length > 200) {
      return NextResponse.json({ error: "Address too long." }, { status: 400 })
    }

    const order = {
      id: "DW" + Date.now(),
      date: new Date().toLocaleString("fr-TN"),
      name: `${fname.trim()} ${lname.trim()}`,
      phone: `+216${phone.replace(/\s/g, "")}`,
      city,
      address: address.trim(),
      size,
      product: product,
      qty: qtyNum,
      note: note ? String(note).slice(0, 300).trim() : "",
      status: "new",
    }

    const { error: dbError } = await supabase.from("orders").insert([order])
    if (dbError) {
      console.error("Supabase Database Insert Error:", dbError.message, dbError.details, dbError.hint)
      throw dbError
    }

    return NextResponse.json({ success: true, id: order.id })
  } catch (err: any) {
    console.error("Order Submission Critical Error:", err)
    return NextResponse.json({ error: `Order Failure: ${err?.message || 'Check database connection'}` }, { status: 500 })
  }
}