"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-4">
                Rejoins la Tribe
              </h3>
              <p className="text-background/60 text-sm md:text-base">
                Sois le premier informe des nouvelles collections et offres exclusives.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Ton email"
                className="flex-1 bg-transparent border-b border-background/30 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-background transition-colors text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 bg-accent text-accent-foreground text-xs uppercase tracking-wider hover:bg-accent/90 transition-colors"
              >
                Rejoindre
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-[family-name:var(--font-display)] text-2xl">
              OQP Tribe
            </Link>
            <p className="mt-4 text-sm text-background/60 leading-relaxed">
              Only Quality People.
              <br />
              Cotonou, Benin.
            </p>
            <div className="mt-6 flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-background/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider mb-6 text-background/80">Shop</h4>
            <ul className="space-y-4 text-sm text-background/60">
              {["Tous les produits", "T-Shirts", "Hoodies", "Accessoires"].map((item) => (
                <li key={item}>
                  <Link href="/shop" className="hover:text-background transition-colors inline-flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider mb-6 text-background/80">Info</h4>
            <ul className="space-y-4 text-sm text-background/60">
              {["Notre Histoire", "Contact", "FAQ", "Livraison"].map((item) => (
                <li key={item}>
                  <Link href="/" className="hover:text-background transition-colors inline-flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-wider mb-6 text-background/80">Contact</h4>
            <ul className="space-y-4 text-sm text-background/60">
              <li>+229 XX XX XX XX</li>
              <li>contact@oqptribe.com</li>
              <li>Cotonou, Benin</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            &copy; 2024 OQP Tribe. Tous droits reserves.
          </p>
          <div className="flex gap-6 text-xs text-background/40">
            <Link href="/" className="hover:text-background transition-colors">
              Conditions Generales
            </Link>
            <Link href="/" className="hover:text-background transition-colors">
              Confidentialite
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
