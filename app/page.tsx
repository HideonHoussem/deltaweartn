import { Loader } from "@/components/deltawear/loader"
import { CustomCursor } from "@/components/deltawear/custom-cursor"
import { Navbar } from "@/components/deltawear/navbar"
import { Hero } from "@/components/deltawear/hero"
import { Ticker } from "@/components/deltawear/ticker"
import { Products } from "@/components/deltawear/products"
import { Features } from "@/components/deltawear/features"
import { BrandStrip } from "@/components/deltawear/brand-strip"
import { InstagramCTA } from "@/components/deltawear/instagram-cta"
import { FAQ } from "@/components/deltawear/faq"
import { OrderForm } from "@/components/deltawear/order-form"
import { Footer } from "@/components/deltawear/footer"

export default function DeltaWearPage() {
  return (
    <main className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      <Loader />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Ticker />
      <Products />
      <Features />
      <BrandStrip />
      <InstagramCTA />
      <FAQ />
      <OrderForm />
      <Footer />
    </main>
  )
}
