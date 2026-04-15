import type { Metadata, Viewport } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import { CartDrawer } from '@/components/deltawear/cart-drawer'
import { CartPopup } from '@/components/deltawear/cart-popup'

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"]
})

export const metadata: Metadata = {
  title: 'DeltaWear TN | Built Different',
  description: 'Performance compression wear engineered for athletes who don\'t settle. Moisture-wicking technology, 4-way stretch fabric — made for the grind. Free delivery across Tunisia.',
  keywords: ['compression wear', 'athletic wear', 'Tunisia', 'sportswear', 'gym wear', 'fitness apparel'],
  authors: [{ name: 'DeltaWear TN' }],
  icons: {
    icon: '/images/logo.png',
  },
  openGraph: {
    title: 'DeltaWear TN | Built Different',
    description: 'Performance compression wear engineered for athletes who don\'t settle.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
          <CartPopup />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </CartProvider>
      </body>
    </html>
  )
}
