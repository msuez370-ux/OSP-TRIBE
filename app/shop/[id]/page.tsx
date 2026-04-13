"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Minus, Plus, Check, ShoppingBag, Heart } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { CartSidebar } from "@/components/cart-sidebar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products, formatCFA, useCartStore } from "@/lib/store"
import Link from "next/link"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const product = products.find((p) => p.id === params.id)
  const { addItem, setCartOpen } = useCartStore()

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  // Product images mapping
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

  if (!product) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl mb-4">Produit non trouve</h1>
          <Link href="/shop" className="text-accent hover:underline">
            Retour a la boutique
          </Link>
        </div>
      </main>
    )
  }

  const images = productImages[product.id] || [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80"
  ]

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return
    
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor)
    }
    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
      setCartOpen(true)
    }, 800)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CartSidebar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>
      </div>

      {/* Product Section */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-6 left-6 px-4 py-2 bg-accent text-accent-foreground text-[10px] uppercase tracking-wider font-medium">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-20 h-24 bg-secondary overflow-hidden transition-all ${
                      activeImage === index ? "ring-2 ring-foreground" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              {/* Title & Price */}
              <div>
                <p className="text-xs tracking-[0.2em] text-accent mb-3 uppercase">{product.category}</p>
                <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-foreground mb-4">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-mono text-foreground">{formatCFA(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through font-mono">
                      {formatCFA(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div>
                <p className="text-sm mb-4">
                  Couleur: <span className="text-accent">{selectedColor || "Choisir"}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color.hex}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        selectedColor === color.name
                          ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                          : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-sm mb-4">
                  Taille: <span className="text-accent">{selectedSize || "Choisir"}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border transition-all text-sm ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm mb-4">Quantite</p>
                <div className="inline-flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className={`w-full py-4 text-sm tracking-wider transition-all flex items-center justify-center gap-3 ${
                    !selectedSize || !selectedColor
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-foreground text-background hover:bg-accent"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Ajoute au panier
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      Ajouter au panier - {formatCFA(product.price * quantity)}
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3 border border-border text-sm tracking-wider hover:border-foreground transition-colors flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Ajouter aux favoris
                </motion.button>
              </div>

              {/* Extra Info */}
              <div className="border-t border-border pt-8 space-y-3 text-sm text-muted-foreground">
                <p>Livraison gratuite a Cotonou</p>
                <p>Retours acceptes sous 14 jours</p>
                <p>Paiement securise par Mobile Money, Moov Money ou Carte</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 border-t border-border px-6 md:px-12 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-12">
              Tu pourrais aussi <span className="italic text-accent">aimer</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
