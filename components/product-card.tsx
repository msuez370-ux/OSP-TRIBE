"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { Product, formatCFA } from "@/lib/store"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Product images - using Unsplash for demo
  const productImages: Record<string, string[]> = {
    "oqp-001": [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80"
    ],
    "oqp-002": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"
    ],
    "oqp-003": [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
    ],
    "oqp-004": [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"
    ],
    "oqp-005": [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80"
    ],
    "oqp-006": [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80",
      "https://images.unsplash.com/photo-1614495039153-e9cd13240469?w=800&q=80"
    ],
  }

  const images = productImages[product.id] || [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/shop/${product.id}`}>
        <motion.article
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="group cursor-pointer"
        >
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-5">
            <motion.img
              src={images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Second Image on Hover */}
            <motion.img
              src={images[1]}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Quick View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <span className="block w-full py-3 bg-background/95 backdrop-blur-sm text-foreground text-xs text-center uppercase tracking-[0.15em]">
                Voir le produit
              </span>
            </motion.div>

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {product.category}
            </p>
            <h3 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300">
              {product.name}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-foreground">{formatCFA(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through font-mono">
                  {formatCFA(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}
