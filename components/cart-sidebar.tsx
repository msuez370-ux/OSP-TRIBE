"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCartStore, formatCFA } from "@/lib/store"
import Link from "next/link"

export function CartSidebar() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, total } = useCartStore()
  const cartTotal = total()

  // Product images mapping
  const productImages: Record<string, string> = {
    "oqp-001": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
    "oqp-002": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    "oqp-003": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80",
    "oqp-004": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
    "oqp-005": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80",
    "oqp-006": "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&q=80",
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-foreground">
                  Panier
                </h2>
                <span className="text-xs text-muted-foreground">({items.length})</span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCartOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground mb-2">Ton panier est vide</p>
                  <p className="text-xs text-muted-foreground/60 mb-8">Ajoute des pieces de la collection</p>
                  <Link 
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="px-6 py-3 bg-foreground text-background text-xs uppercase tracking-wider hover:bg-accent transition-colors"
                  >
                    Voir la collection
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-24 bg-secondary overflow-hidden flex-shrink-0">
                        <img
                          src={productImages[item.id] || "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-medium text-foreground truncate pr-4">{item.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.selectedSize} / {item.selectedColor}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                              className="p-2 hover:bg-secondary transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                              className="p-2 hover:bg-secondary transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-sm font-mono text-foreground">{formatCFA(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="text-lg font-mono text-foreground">{formatCFA(cartTotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Livraison calculee a la prochaine etape</p>
                
                <Link 
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full py-4 bg-foreground text-background text-center text-xs uppercase tracking-wider hover:bg-accent transition-colors"
                >
                  Passer la commande
                </Link>

                <button
                  onClick={() => setCartOpen(false)}
                  className="block w-full py-3 border border-border text-center text-xs uppercase tracking-wider hover:border-foreground transition-colors"
                >
                  Continuer les achats
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
