import { Loader } from "@/components/deltawear/loader"
import { Navbar } from "@/components/deltawear/navbar"
import { Hero } from "@/components/deltawear/hero"
import { RetroCollection } from "@/components/deltawear/retro-collection"
import { Ticker } from "@/components/deltawear/ticker"
import { Philosophy } from "@/components/deltawear/philosophy"
import { Products } from "@/components/deltawear/products"
import { SubscriptionStrip } from "@/components/deltawear/subscription-strip"
import { Footer } from "@/components/deltawear/footer"

import { ImpactText } from "@/components/deltawear/impact-text"

export default function DeltaWearPage() {
  return (
    <main className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      <Loader />
      <Navbar />
      <Hero />
      <Ticker />
      <RetroCollection />
      <Philosophy />
      <ImpactText />

      <Products />
      <SubscriptionStrip />
      <Footer />
    </main>
  )
}
