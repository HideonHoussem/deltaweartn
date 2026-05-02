"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { PRODUCTS, Product } from "@/lib/products-data"

export type CartItem = {
  id: string // Concatenation of productId + size
  productId: string
  productName: string
  size: string
  qty: number
  price: number
  image: string
}

type CartContextType = {
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  items: CartItem[]
  addToCart: (product: Product, size: string, qty: number) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, delta: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  rawTotalPrice: number
  lastAddedItem: CartItem | null
  showPopup: boolean
  setShowPopup: (show: boolean) => void
  hasDiscount: boolean
  applyDiscount: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<CartItem[]>([])
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [hasDiscount, setHasDiscount] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("deltawear_cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart", e)
      }
    }
    const savedDiscount = localStorage.getItem("deltawear_discount")
    if (savedDiscount === "true") {
      setHasDiscount(true)
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("deltawear_cart", JSON.stringify(items))
  }, [items])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const addToCart = (product: Product, size: string, qty: number) => {
    const itemId = `${product.id}-${size}`
    const priceNum = parseFloat(product.price.replace(".", "")) / 1000 // Convert "39.000" string to numeric price if needed, or keep as is. Actually let's just parse it.
    
    // In Tunisia price is often shown as 39.000 (39 DT). 
    // Let's keep it simple: 39.000 -> 39
    const cleanPrice = parseFloat(product.price)

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId)
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, qty: item.qty + qty } : item
        )
      }
      const newItem = {
        id: itemId,
        productId: product.id,
        productName: product.name,
        size,
        qty,
        price: cleanPrice,
        image: product.images[0].src,
      }
      setLastAddedItem(newItem)
      return [...prev, newItem]
    })
    
    setShowPopup(true)
    // Auto hide popup after 4 seconds
    setTimeout(() => setShowPopup(false), 4000)
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta)
          return { ...item, qty: newQty }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("deltawear_cart")
  }

  const applyDiscount = () => {
    setHasDiscount(true)
    localStorage.setItem("deltawear_discount", "true")
  }

  const totalItems = items.reduce((acc, item) => acc + item.qty, 0)
  const rawTotalPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0)
  const totalPrice = hasDiscount ? rawTotalPrice * 0.90 : rawTotalPrice

  return (
    <CartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
        rawTotalPrice,
        lastAddedItem,
        showPopup,
        setShowPopup,
        hasDiscount,
        applyDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
