"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowDownRight } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Top Section with Title */}
        <motion.div 
          style={{ opacity }}
          className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-12"
        >
          <div className="max-w-7xl mx-auto w-full">
            {/* Small Tag */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs tracking-[0.3em] text-muted-foreground mb-8 uppercase"
            >
              Only Quality People
            </motion.p>

            {/* Main Heading - Editorial Style */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-[family-name:var(--font-display)] text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tight text-foreground"
              >
                <span className="block">Nouvelle</span>
                <span className="block italic text-accent">Collection</span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 max-w-md"
            >
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Des pieces uniques qui celebrent votre individualite. 
                Confectionnees avec passion a Cotonou.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-10 flex items-center gap-8"
            >
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-4 text-foreground"
                >
                  <span className="text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
                    Decouvrir
                  </span>
                  <motion.span
                    className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-background transition-all"
                    whileHover={{ rotate: 45 }}
                  >
                    <ArrowDownRight className="w-4 h-4" />
                  </motion.span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          style={{ y }}
          className="relative h-[50vh] md:h-[60vh] overflow-hidden"
        >
          <motion.div
            style={{ scale: imageScale }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920&q=80"
              alt="OQP Tribe Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 left-6 md:left-12"
          >
            <p className="text-xs tracking-[0.2em] text-foreground/80 uppercase">
              Cotonou, Benin
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 right-6 md:right-12"
          >
            <p className="text-xs tracking-[0.2em] text-foreground/80 uppercase">
              Collection 2024
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-foreground/30"
          />
        </motion.div>
      </div>
    </section>
  )
}
