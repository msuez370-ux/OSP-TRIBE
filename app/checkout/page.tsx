"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBag, Truck, CreditCard, Smartphone, Check, Lock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useCartStore, formatCFA } from "@/lib/store"
import Link from "next/link"

const paymentMethods = [
  {
    id: "mtn-momo",
    name: "MTN Mobile Money",
    icon: "MTN",
    color: "#FFCC00",
    textColor: "#000"
  },
  {
    id: "moov-money",
    name: "Moov Money",
    icon: "MOOV",
    color: "#00A0E3",
    textColor: "#FFF"
  },
  {
    id: "card",
    name: "Carte Bancaire",
    icon: "VISA",
    color: "#1A1F71",
    textColor: "#FFF"
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: "",
    color: "#000",
    textColor: "#FFF"
  }
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const [step, setStep] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    quarter: ""
  })

  const cartTotal = total()
  const deliveryFee = 2000
  const finalTotal = cartTotal + deliveryFee

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmitOrder = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-md text-center">
            <div className="w-20 h-20 border border-border flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl mb-4">Ton panier est vide</h1>
            <p className="text-muted-foreground mb-8">Ajoute des articles pour passer commande</p>
            <Link 
              href="/shop"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest hover:bg-primary/90 transition-colors"
            >
              VOIR LA COLLECTION
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-lg text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Check className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-4"
            >
              Commande <span className="italic text-accent">Confirmee</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground mb-4"
            >
              Merci pour ta commande ! Tu recevras un SMS de confirmation sous peu.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground mb-8"
            >
              Numero de commande: <span className="font-mono text-primary">OQP-{Date.now().toString().slice(-8)}</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                href="/shop"
                className="inline-block px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest hover:bg-primary/90 transition-colors"
              >
                CONTINUER LE SHOPPING
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-24 pb-8 px-6">
        <div className="container mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            RETOUR
          </button>
        </div>
      </div>

      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Steps Indicator */}
              <div className="flex items-center gap-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-4">
                    <div 
                      className={`w-8 h-8 flex items-center justify-center text-sm font-mono transition-colors ${
                        step >= s ? "bg-foreground text-background" : "border border-border text-muted-foreground"
                      }`}
                    >
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && <div className={`w-12 h-[1px] ${step > s ? "bg-foreground" : "bg-border"}`} />}
                  </div>
                ))}
              </div>

              {/* Step 1: Contact Info */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-[family-name:var(--font-display)] text-2xl">Informations de contact</h2>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs tracking-widest text-muted-foreground mb-2">PRENOM</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                          placeholder="Jean"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-widest text-muted-foreground mb-2">NOM</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                          placeholder="Mensah"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs tracking-widest text-muted-foreground mb-2">EMAIL</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                        placeholder="jean@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs tracking-widest text-muted-foreground mb-2">TELEPHONE</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                        placeholder="+229 XX XX XX XX"
                      />
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-4 bg-foreground text-background text-sm tracking-wide hover:bg-accent transition-colors"
                    >
                      CONTINUER VERS LA LIVRAISON
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Delivery */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-primary" />
                      <h2 className="font-[family-name:var(--font-display)] text-2xl">Adresse de livraison</h2>
                    </div>

                    <div>
                      <label className="block text-xs tracking-widest text-muted-foreground mb-2">ADRESSE</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                        placeholder="123 Rue Example"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs tracking-widest text-muted-foreground mb-2">VILLE</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                          placeholder="Cotonou"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-widest text-muted-foreground mb-2">QUARTIER</label>
                        <input
                          type="text"
                          name="quarter"
                          value={formData.quarter}
                          onChange={handleInputChange}
                          className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                          placeholder="Akpakpa"
                        />
                      </div>
                    </div>

                    <div className="bg-secondary p-4 flex items-start gap-3">
                      <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Livraison Standard</p>
                        <p className="text-xs text-muted-foreground">2-3 jours ouvrables - {formatCFA(deliveryFee)}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-4 border border-border text-sm tracking-widest hover:border-foreground transition-colors"
                      >
                        RETOUR
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 py-4 bg-foreground text-background text-sm tracking-wide hover:bg-accent transition-colors"
                      >
                        CONTINUER VERS LE PAIEMENT
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <h2 className="font-[family-name:var(--font-display)] text-2xl">Mode de paiement</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-4 border transition-all flex items-center gap-4 ${
                            selectedPayment === method.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-foreground/50"
                          }`}
                        >
                          <div 
                            className="w-12 h-8 flex items-center justify-center text-xs font-bold rounded"
                            style={{ backgroundColor: method.color, color: method.textColor }}
                          >
                            {method.id === "apple-pay" ? (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                              </svg>
                            ) : method.icon}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium">{method.name}</p>
                            {method.id.includes("money") && (
                              <p className="text-xs text-muted-foreground">Paiement mobile</p>
                            )}
                          </div>
                          {selectedPayment === method.id && (
                            <Check className="w-4 h-4 text-primary ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>

                    {selectedPayment && selectedPayment.includes("money") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-xs tracking-widest text-muted-foreground mb-2">
                            NUMERO {selectedPayment === "mtn-momo" ? "MTN" : "MOOV"}
                          </label>
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-muted-foreground" />
                            <input
                              type="tel"
                              className="flex-1 bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                              placeholder="+229 XX XX XX XX"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {selectedPayment === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-xs tracking-widest text-muted-foreground mb-2">NUMERO DE CARTE</label>
                          <input
                            type="text"
                            className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors font-mono"
                            placeholder="4242 4242 4242 4242"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs tracking-widest text-muted-foreground mb-2">EXPIRATION</label>
                            <input
                              type="text"
                              className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors font-mono"
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <label className="block text-xs tracking-widest text-muted-foreground mb-2">CVV</label>
                            <input
                              type="text"
                              className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors font-mono"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => setStep(2)}
                        className="px-6 py-4 border border-border text-sm tracking-widest hover:border-foreground transition-colors"
                      >
                        RETOUR
                      </button>
                      <button
                        onClick={handleSubmitOrder}
                        disabled={!selectedPayment || isProcessing}
                        className={`flex-1 py-4 text-sm tracking-widest flex items-center justify-center gap-3 transition-all ${
                          !selectedPayment
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                            />
                            TRAITEMENT EN COURS...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            PAYER {formatCFA(finalTotal)}
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                      <Lock className="w-3 h-3" />
                      Paiement 100% securise
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border p-6 sticky top-24">
                <h3 className="font-[family-name:var(--font-display)] text-xl mb-6">Resume de la commande</h3>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                      <div className="w-16 h-16 bg-secondary flex items-center justify-center shrink-0">
                        <span className="text-sm font-display text-primary">OQP</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedSize} / {item.selectedColor} x {item.quantity}
                        </p>
                        <p className="text-sm font-mono text-primary mt-1">
                          {formatCFA(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-mono">{formatCFA(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="font-mono">{formatCFA(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="font-mono text-primary">{formatCFA(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
