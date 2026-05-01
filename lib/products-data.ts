export interface Product {
  id: string
  name: string
  price: string
  description: string
  images: { src: string; alt: string }[]
  tags: string[]
  color: string
  fit: string
  features: string[]
  inStock: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: "lefriki t shirt",
    name: "Lefriki T-Shirt",
    price: "49",
    description: "Embrace the legacy with the Lefriki T-Shirt. Crafted from premium cotton for an oversized, comfortable fit, this piece features bold '1920' Club Africain graphics on the back. A perfect blend of street-style aesthetics and unwavering club pride.",
    images: [
      { src: "/images/m10.jpeg", alt: "Lefriki Back Detail" },
      { src: "/images/m8.png", alt: "Lefriki Front Detail" },
    ],
    tags: ["Streetwear", "Heritage", "Oversized"],
    color: "Midnight Black",
    fit: "Oversized Fit",
    features: ["Heavyweight Cotton", "Drop Shoulder", "Premium Print"],
    inStock: true
  }
]

