// src/lib/stores/cartStore.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // ← import createJSONStorage too!
import toast from 'react-hot-toast';
import { cookieStorage } from './customCookieStorage';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (productId: string, name: string, price: number, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (productId, name, price, quantity = 1) => {
        const existing = get().items.find((item) => item.productId === productId);
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
            ),
          });
        } else {
          set({ items: [...get().items, { productId, name, price, quantity }] });
        }
        toast.success('Added to cart!');
      },
      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
        toast.success('Removed from cart');
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return get().removeFromCart(productId);
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // key in cookies
      storage: createJSONStorage(() => cookieStorage), // ← this fixes the type mismatch!
    }
  )
);