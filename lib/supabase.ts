import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Order = {
  id: string
  date: string
  name: string
  phone: string
  city: string
  address: string
  size: string
  qty: number
  note: string
  status: "new" | "confirmed" | "delivered"
}
