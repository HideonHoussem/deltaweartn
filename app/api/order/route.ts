import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Server-side Supabase client using service role key (not exposed to browser)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function validatePhone(phone: string): boolean {
  return /^[2457][0-9]{7}$/.test(phone.replace(/\s/g, ""))
}

const VALID_SIZES = ["S", "M", "L", "XL", "XXL"]
const VALID_GOVERNORATES = [
  "Tunis","Ariana","Ben Arous","Manouba","Nabeul","Zaghouan","Bizerte","Béja",
  "Jendouba","Kef","Siliana","Sousse","Monastir","Mahdia","Sfax","Kairouan",
  "Kasserine","Sidi Bouzid","Gabès","Medenine","Tataouine","Gafsa","Tozeur","Kébili"
]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fname, lname, phone, city, address, size, qty, note } = body

    // Server-side validation
    if (!fname?.trim() || !lname?.trim() || !phone || !city || !address?.trim() || !size) {
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
    if (!Number.isInteger(qtyNum) || qtyNum < 1 || qtyNum > 5) {
      return NextResponse.json({ error: "Invalid quantity." }, { status: 400 })
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
      qty: qtyNum,
      note: note ? String(note).slice(0, 300).trim() : "",
      status: "new",
    }

    const { error } = await supabase.from("orders").insert([order])
    if (error) throw error

    return NextResponse.json({ success: true, id: order.id })
  } catch (err) {
    console.error("Order API error:", err)
    return NextResponse.json({ error: "Failed to place order." }, { status: 500 })
  }
}
