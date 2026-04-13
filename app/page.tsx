import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { CartSidebar } from "@/components/cart-sidebar"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CartSidebar />
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <AboutSection />
      <Footer />
    </main>
  )
}
