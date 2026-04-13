import { createClient, SupabaseClient } from "@supabase/supabase-js"

let _client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _client
}

// Proxy so `supabase.from(...)` etc. work exactly as before,
// but createClient is only called on first actual use — not at import time.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop: string) {
    return (getClient() as any)[prop]
  },
})

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
