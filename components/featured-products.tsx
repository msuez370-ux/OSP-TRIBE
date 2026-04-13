"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { products } from "@/lib/store"
import { ProductCard } from "./product-card"

export function FeaturedProducts() {
  const featured = products.slice(0, 4)

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.2em] text-accent mb-4 uppercase">
              Selection
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
              Pieces
              <span className="italic text-accent"> Phares</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/shop" className="group inline-flex items-center gap-3 text-sm tracking-wide text-foreground hover:text-accent transition-colors">
              Voir toute la collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
