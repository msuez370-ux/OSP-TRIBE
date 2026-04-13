"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { CartSidebar } from "@/components/cart-sidebar"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { products, categories } from "@/lib/store"
import { SlidersHorizontal, X } from "lucide-react"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products.filter(
    (product) => selectedCategory === "Tous" || product.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      default:
        return 0
    }
  })

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CartSidebar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.2em] text-accent mb-4 uppercase">Collection 2024</p>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1]">
              La <span className="italic text-accent">Collection</span>
            </h1>
            <p className="text-muted-foreground max-w-md mt-6 leading-relaxed">
              Pieces uniques inspirees de notre heritage, concues pour les visionnaires.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="border-y border-border sticky top-20 bg-background/95 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Desktop Categories */}
            <div className="hidden md:flex items-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs tracking-wider transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden flex items-center gap-2 text-sm tracking-wide"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
            </button>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:block">Trier:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-border px-3 py-2 text-xs focus:outline-none focus:border-foreground transition-colors"
              >
                <option value="featured">En vedette</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix decroissant</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-background border-r border-border z-50 p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-[family-name:var(--font-display)] text-2xl">Filtres</h3>
                <button onClick={() => setShowFilters(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setShowFilters(false)
                    }}
                    className={`block w-full text-left px-4 py-3 text-sm transition-all ${
                      selectedCategory === category
                        ? "bg-foreground text-background"
                        : "hover:bg-secondary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <p className="text-sm text-muted-foreground">
              {sortedProducts.length} produit{sortedProducts.length > 1 ? "s" : ""}
            </p>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
          >
            <AnimatePresence mode="popLayout">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
