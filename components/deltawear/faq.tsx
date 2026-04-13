"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { RevealSection } from "./reveal-section"

const faqs = [
  {
    question: "What is compression wear and why should I use it?",
    answer: "Compression wear applies gentle pressure to your muscles, improving blood circulation and oxygen delivery during workouts. This helps reduce muscle fatigue, speeds up recovery, and can enhance your overall athletic performance. Our shirts are designed with medical-grade compression zones for optimal support."
  },
  {
    question: "How do I choose the right size?",
    answer: "We recommend using our Size Guide to find your perfect fit. Measure your chest, waist, and height, then compare with our size chart. Compression wear should fit snugly but not restrict breathing or movement. If you're between sizes, choose the larger size for a less compressive fit."
  },
  {
    question: "What is the fabric made of?",
    answer: "Our Performance Compression Shirt is made from a premium blend of 85% Nylon and 15% Spandex. This combination provides excellent 4-way stretch, moisture-wicking properties, quick-dry capability, and long-lasting durability. The fabric is also anti-odor and UV protective."
  },
  {
    question: "How do I care for my compression shirt?",
    answer: "Machine wash cold with similar colors. Do not use bleach or fabric softeners as they can damage the compression properties. Tumble dry on low heat or hang dry for best results. Do not iron directly on the print. With proper care, your shirt will maintain its compression and shape for years."
  },
  {
    question: "What is your delivery time and shipping policy?",
    answer: "We offer FREE delivery across all of Tunisia within 2-4 business days. Orders are processed within 24 hours and you'll receive a call to confirm once your package is shipped. We ship from Tunis and cover all governorates."
  },
  {
    question: "Can I return or exchange my order?",
    answer: "Yes! We offer hassle-free exchanges within 7 days of delivery if the item doesn't fit. The product must be unworn, unwashed, and in original condition with tags attached. Contact us to initiate an exchange. Note: Custom orders are final sale."
  },
  {
    question: "Do you offer bulk or team orders?",
    answer: "Absolutely! We offer special pricing for bulk orders of 10+ items. Perfect for gyms, sports teams, and fitness communities. Custom logo placement is also available. Contact us with your requirements for a personalized quote."
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <RevealSection id="faq" className="px-6 md:px-16 py-20 md:py-[120px] bg-[#080808]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="text-[9px] tracking-[7px] uppercase text-[var(--accent)] mb-4">
          Got Questions?
        </div>
        <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-[-1px] uppercase leading-[1.05] mb-4">
          Frequently Asked
          <br />
          <span className="text-[var(--accent)]">Questions</span>
        </h2>
        <p className="text-[13px] text-white/40 leading-[1.8]">
          Everything you need to know about our products and services
        </p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[var(--border)] overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-[#0d0d0d] transition-colors cursor-pointer"
            >
              <span className="text-[13px] md:text-[14px] font-medium tracking-[-0.2px] pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-[var(--accent)] flex-shrink-0 transition-transform duration-300",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>

            {/* Answer */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openIndex === index ? "max-h-[400px]" : "max-h-0"
              )}
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6">
                <p className="text-[12px] md:text-[13px] text-white/50 leading-[1.9]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions */}
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <p className="text-[12px] text-white/40 mb-4">
          Still have questions? We&apos;re here to help.
        </p>
        <a
          href="#order"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent)] text-[var(--accent)] text-[10px] tracking-[3px] uppercase font-semibold hover:bg-[var(--accent)] hover:text-[var(--black)] transition-all"
        >
          Place an Order
        </a>
      </div>
    </RevealSection>
  )
}
