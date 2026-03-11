'use client';

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import toast from 'react-hot-toast'
import { cookieStorage } from './customCookieStorage'

/* ---------------- DESIGN ---------------- */

export interface DesignDetails {
  type: 'have-design' | 'design-for-me' | null

  designFile?: File | null

  businessName?: string
  description?: string

  logo?: File | null
  noLogo?: boolean
}

/* ---------------- CART ITEM ---------------- */

export interface CartItem {
  cartItemId: string

  productId: string 
  name: string | undefined
  price: number | undefined
  quantity: number

  specs?: Record<string, string>

  design?: DesignDetails
}

/* ---------------- STORE ---------------- */

interface CartState {
  items: CartItem[]

  addToCart: (
    productId: string,
    name: string,
    price: number,
    quantity?: number,
    specs?: Record<string, string>,
    design?: DesignDetails
  ) => void

  removeFromCart: (cartItemId: string) => void

  updateQuantity: (cartItemId: string, quantity: number) => void

  clearCart: () => void
}

/* ---------------- UTILS ---------------- */

const generateCartItemId = () => {
  return crypto.randomUUID()
}

/* ---------------- STORE ---------------- */

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({

      items: [],

      /* ---------- ADD TO CART ---------- */

      addToCart: (
        productId,
        name,
        price,
        quantity = 1,
        specs = {},
        design
      ) => {

        const newItem: CartItem = {
          cartItemId: generateCartItemId(),
          productId,
          name,
          price,
          quantity,
          specs,
          design
        }

        set({
          items: [...get().items, newItem]
        })

        toast.success('Added to cart!')
      },

      /* ---------- REMOVE ITEM ---------- */

      removeFromCart: (cartItemId) => {

        set({
          items: get().items.filter(
            (item) => item.cartItemId !== cartItemId
          )
        })

        toast.success('Removed from cart')
      },

      /* ---------- UPDATE QUANTITY ---------- */

      updateQuantity: (cartItemId, quantity) => {

        if (quantity < 1) {
          return get().removeFromCart(cartItemId)
        }

        set({
          items: get().items.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity }
              : item
          )
        })
      },

      /* ---------- CLEAR CART ---------- */

      clearCart: () => set({ items: [] })

    }),

    {
      name: 'cart-storage',
      storage: createJSONStorage(() => cookieStorage)
    }
  )
)