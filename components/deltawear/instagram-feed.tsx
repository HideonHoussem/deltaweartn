"use client"

import Image from "next/image"
import { Instagram, Heart, MessageCircle } from "lucide-react"
import { RevealSection } from "./reveal-section"

// Instagram feed simulation - in production, you'd use Instagram Basic Display API
const posts = [
  {
    id: 1,
    image: "/images/product-main.jpg",
    likes: 234,
    comments: 18,
  },
  {
    id: 2,
    image: "/images/hero-model.jpg",
    likes: 456,
    comments: 32,
  },
  {
    id: 3,
    image: "/images/product-detail.jpg",
    likes: 189,
    comments: 12,
  },
  {
    id: 4,
    image: "/images/hero-model.jpg",
    likes: 567,
    comments: 45,
  },
  {
    id: 5,
    image: "/images/product-main.jpg",
    likes: 321,
    comments: 24,
  },
  {
    id: 6,
    image: "/images/product-detail.jpg",
    likes: 278,
    comments: 19,
  },
]

export function InstagramFeed() {
  const instagramHandle = "@deltaweartn"
  const instagramUrl = "https://www.instagram.com/deltaweartn/"

  return (
    <RevealSection id="features" className="py-20 md:py-[100px] overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-16 text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Instagram className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-[12px] tracking-[6px] uppercase text-[var(--accent)] font-bold">
            Follow Us
          </span>
        </div>
        <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-1px] uppercase leading-[1.05] mb-3">
          Join The Community
        </h2>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[14px] text-white/50 hover:text-[var(--accent)] transition-colors"
        >
          {instagramHandle}
        </a>
      </div>

      {/* Instagram Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {posts.map((post) => (
          <a
            key={post.id}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group"
          >
            <Image
              src={post.image}
              alt={`Instagram post ${post.id}`}
              fill
              className="object-cover object-[center_top] transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 text-white">
                <Heart className="w-4 h-4" fill="white" />
                <span className="text-[12px] font-semibold">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white">
                <MessageCircle className="w-4 h-4" fill="white" />
                <span className="text-[12px] font-semibold">{post.comments}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 md:px-16 text-center mt-10">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-[12px] tracking-[4px] uppercase font-bold hover:opacity-90 transition-opacity"
        >
          <Instagram className="w-4 h-4" />
          Follow {instagramHandle}
        </a>
      </div>
    </RevealSection>
  )
}
