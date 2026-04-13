"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCartStore } from "@/lib/store"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { toggleCart, itemCount } = useCartStore()
  const count = itemCount()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "#collections", label: "Collections" },
    { href: "#about", label: "Notre Histoire" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group relative">
              <motion.span 
                className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-foreground"
                whileHover={{ scale: 1.02 }}
              >
                OQP Tribe
              </motion.span>
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    {link.label}
                  </motion.span>
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="relative text-foreground/70 hover:text-foreground transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-medium flex items-center justify-center rounded-full"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-foreground"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-10 pt-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-[family-name:var(--font-display)] text-4xl text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
