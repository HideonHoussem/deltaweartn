export interface Product {
  id: string
  name: string
  price: string
  images: { src: string; alt: string }[]
  tags: string[]
  color: string
  fit: string
  features: string[]
  inStock: boolean
  badgeNumber: string
}

export const PRODUCTS: Product[] = [
  {
    id: "drop-001-comp",
    name: "Performance Compression Shirt",
    price: "39.000",
    images: [
      { src: "/images/product-main.png", alt: "Front View" },
      { src: "/images/hero-model.png", alt: "Lifestyle Shot" },
      { src: "/images/product-detail1.png", alt: "Detail View" },
    ],
    tags: ["Drop 001", "Limited Release"],
    color: "Black",
    fit: "Slim Fit",
    features: ["4-Way Stretch", "Moisture Wicking", "Raglan Sleeve Construction"],
    inStock: true,
    badgeNumber: "011",
  },
  {
    id: "drop-spider-comp",
    name: "Spider Compression Shirt",
    price: "39.000",
    images: [
      { src: "/images/spider.png", alt: "Spider Product Front" },
      { src: "/images/spider-product.png", alt: "Spider Product Lifestyle" },
    ],
    tags: ["Drop 001", "New Release"],
    color: "Black / White",
    fit: "High-Impact Compression",
    features: ["Spider Graphic", "Premium Stretch", "Ultra-Breathable Fabric"],
    inStock: true,
    badgeNumber: "077",
  },
]
