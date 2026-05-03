import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity: number, selectedWeight: string) => void
  removeItem: (productId: string, selectedWeight: string) => void
  updateQuantity: (productId: string, selectedWeight: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity, selectedWeight) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id && item.selectedWeight === selectedWeight
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && item.selectedWeight === selectedWeight
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          return {
            items: [...state.items, { product, quantity, selectedWeight }],
          }
        })
      },
      removeItem: (productId, selectedWeight) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.selectedWeight === selectedWeight)
          ),
        }))
      },
      updateQuantity: (productId, selectedWeight, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.selectedWeight === selectedWeight
              ? { ...item, quantity }
              : item
          ),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          const price = item.product.discount_price || item.product.price
          return total + price * item.quantity
        }, 0)
      },
    }),
    {
      name: 'nutracore-cart',
    }
  )
)
