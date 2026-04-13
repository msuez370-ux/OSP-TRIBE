"use client"

import { motion } from "framer-motion"

export function Marquee() {
  const items = ["Only Quality People", "Cotonou", "Premium Streetwear", "Benin"]

  return (
    <div className="py-8 bg-foreground overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((item, j) => (
              <span key={j} className="flex items-center">
                <span className="mx-8 md:mx-12 font-[family-name:var(--font-display)] text-2xl md:text-3xl lg:text-4xl text-background tracking-wide">
                  {item}
                </span>
                <span className="w-2 h-2 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
