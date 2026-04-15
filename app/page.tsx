import { Loader } from "@/components/deltawear/loader"
import { Navbar } from "@/components/deltawear/navbar"
import { Hero } from "@/components/deltawear/hero"
import { Ticker } from "@/components/deltawear/ticker"
import { Products } from "@/components/deltawear/products"
import { Features } from "@/components/deltawear/features"
import { BrandStrip } from "@/components/deltawear/brand-strip"
import { SubscriptionStrip } from "@/components/deltawear/subscription-strip"
import { FAQ } from "@/components/deltawear/faq"
import { Footer } from "@/components/deltawear/footer"

export default function DeltaWearPage() {
  return (
    <main className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      <Loader />
      <Navbar />
      <Hero />
      <Ticker />
      <SubscriptionStrip />
      <Products />
      <Features />
      <BrandStrip />
      <FAQ />
      <Footer />
    </main>
  )
}
