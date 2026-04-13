"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section ref={containerRef} id="about" className="py-28 md:py-36 px-6 md:px-12 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Images */}
          <div className="relative h-[500px] md:h-[600px]">
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-0 left-0 w-[65%] h-[65%] overflow-hidden shadow-2xl"
            >
              <motion.img
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80"
                alt="Fashion"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <motion.div 
              style={{ y: y2 }}
              className="absolute bottom-0 right-0 w-[55%] h-[55%] overflow-hidden shadow-2xl"
            >
              <motion.img
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
                alt="Fashion detail"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>

          {/* Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.2em] text-accent mb-4 uppercase"
            >
              Notre Histoire
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-foreground mb-8 leading-[1.1]"
            >
              Plus qu&apos;une marque,
              <br />
              <span className="italic text-accent">une communaute.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground leading-relaxed mb-10 text-base md:text-lg"
            >
              OQP Tribe est ne a Cotonou avec une vision simple : creer des vetements 
              qui refletent l&apos;excellence et l&apos;authenticite de notre generation. 
              Chaque piece est concue pour ceux qui refusent la mediocrite.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-8 pt-10 border-t border-border"
            >
              {[
                { value: "500+", label: "Clients satisfaits" },
                { value: "50+", label: "Pieces uniques" },
                { value: "2024", label: "Fondee a Cotonou" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
