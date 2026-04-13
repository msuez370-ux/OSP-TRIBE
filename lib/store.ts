import { create } from 'zustand'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  images: string[]
  badge?: string
  inStock: boolean
}

export interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, size: string, color: string) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product, size, color) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      )
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id && item.selectedSize === size && item.selectedColor === color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        items: [...state.items, { ...product, quantity: 1, selectedSize: size, selectedColor: color }],
      }
    })
  },
  removeItem: (id, size, color) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
      ),
    }))
  },
  updateQuantity: (id, size, color, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id, size, color)
      return
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      ),
    }))
  },
  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setCartOpen: (open) => set({ isOpen: open }),
  total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}))

// Catalog OQP Tribe
export const products: Product[] = [
  {
    id: "oqp-001",
    name: "OQP LEGACY HOODIE",
    price: 35000,
    originalPrice: 45000,
    description: "Hoodie oversize en coton premium avec broderie OQP Tribe. Coupe moderne, capuche double epaisseur, poches kangourou. Le confort rencontre le style afrofuturiste.",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Noir Eclipse", hex: "#0a0a0a" },
      { name: "Terre d'Afrique", hex: "#8B4513" },
      { name: "Or Royal", hex: "#D4AF37" }
    ],
    images: ["/products/hoodie-1.jpg", "/products/hoodie-2.jpg"],
    badge: "BEST SELLER",
    inStock: true
  },
  {
    id: "oqp-002",
    name: "TRIBAL PRINT TEE",
    price: 18000,
    description: "T-shirt en coton bio avec imprime tribal exclusif OQP. Design unique inspire des motifs traditionnels beninois revisites.",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blanc Pur", hex: "#FAFAFA" },
      { name: "Noir Eclipse", hex: "#0a0a0a" }
    ],
    images: ["/products/tee-1.jpg", "/products/tee-2.jpg"],
    badge: "NEW",
    inStock: true
  },
  {
    id: "oqp-003",
    name: "COTONOU CARGO PANTS",
    price: 42000,
    description: "Pantalon cargo coupe ample avec poches multiples. Tissu resistant et confortable, parfait pour le style streetwear.",
    category: "Pantalons",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Kaki Desert", hex: "#8B7355" },
      { name: "Noir Eclipse", hex: "#0a0a0a" }
    ],
    images: ["/products/cargo-1.jpg", "/products/cargo-2.jpg"],
    inStock: true
  },
  {
    id: "oqp-004",
    name: "ANCESTOR VARSITY JACKET",
    price: 65000,
    originalPrice: 80000,
    description: "Veste varsity premium avec broderies africaines. Manches en cuir synthetique, corps en laine melee. Une piece statement.",
    category: "Vestes",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Noir/Or", hex: "#0a0a0a" },
      { name: "Bordeaux Royal", hex: "#722F37" }
    ],
    images: ["/products/varsity-1.jpg", "/products/varsity-2.jpg"],
    badge: "LIMITED",
    inStock: true
  },
  {
    id: "oqp-005",
    name: "OQP SIGNATURE CAP",
    price: 12000,
    description: "Casquette structuree avec logo OQP brode. Fermeture ajustable en metal, visiere courbe.",
    category: "Accessoires",
    sizes: ["ONE SIZE"],
    colors: [
      { name: "Noir Eclipse", hex: "#0a0a0a" },
      { name: "Blanc Pur", hex: "#FAFAFA" },
      { name: "Or Royal", hex: "#D4AF37" }
    ],
    images: ["/products/cap-1.jpg", "/products/cap-2.jpg"],
    inStock: true
  },
  {
    id: "oqp-006",
    name: "WAKANDA FOREVER CREWNECK",
    price: 28000,
    description: "Sweat col rond avec design afrofuturiste. Coton fleece premium, coupe relaxed. Parfait pour les soirees fraiches.",
    category: "Sweats",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Noir Eclipse", hex: "#0a0a0a" },
      { name: "Gris Charbon", hex: "#36454F" }
    ],
    images: ["/products/crew-1.jpg", "/products/crew-2.jpg"],
    badge: "NEW",
    inStock: true
  }
]

export const categories = ["Tous", "Hoodies", "T-Shirts", "Pantalons", "Vestes", "Sweats", "Accessoires"]

export function formatCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' CFA'
}
