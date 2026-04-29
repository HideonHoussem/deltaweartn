import Image from "next/image"

export function Footer() {
  return (
    <footer className="px-6 md:px-16 py-12 md:py-16 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-5 md:gap-10">
      <div className="flex items-center gap-3 justify-center md:justify-start">
        <Image
          src="/images/logo.png"
          alt="DeltaWear Logo"
          width={24}
          height={24}
          className="w-6 h-6 object-contain opacity-60"
        />
        <span className="text-[12px] tracking-[6px] uppercase font-bold opacity-70">
          DeltaWear
        </span>
      </div>
      
      <div className="text-[11px] tracking-[4px] uppercase text-white/60 text-center font-medium" suppressHydrationWarning>
        © {new Date().getFullYear()} DeltaWear TN · All rights reserved
      </div>
      
      <div className="flex gap-7 justify-center md:justify-end">
        {[
          { label: "Collection", href: "#products" },
          { label: "Order", href: "#order" },
          { label: "Instagram", href: "https://instagram.com/deltaweartn", external: true },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="text-[11px] tracking-[4px] uppercase text-white/60 no-underline hover:text-[var(--accent)] transition-colors font-medium"
            suppressHydrationWarning
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
