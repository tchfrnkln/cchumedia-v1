// src/lib/stores/cartStore.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { cookieStorage } from './customCookieStorage';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  specs?: Record<string, string>;
}

interface CartState {
  items: CartItem[];

  addToCart: (
    productId: string,
    name: string,
    price: number,
    quantity?: number,
    specs?: Record<string, string>
  ) => void;

  removeFromCart: (productId: string, specs?: Record<string, string>) => void;

  updateQuantity: (
    productId: string,
    quantity: number,
    specs?: Record<string, string>
  ) => void;

  clearCart: () => void;
}

/* Helper to compare specs */
const specsEqual = (
  a?: Record<string, string>,
  b?: Record<string, string>
) => {
  return JSON.stringify(a || {}) === JSON.stringify(b || {});
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (
        productId,
        name,
        price,
        quantity = 1,
        specs = {}
      ) => {

        const existing = get().items.find(
          (item) =>
            item.productId === productId &&
            specsEqual(item.specs, specs)
        );

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.productId === productId &&
              specsEqual(item.specs, specs)
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              { productId, name, price, quantity, specs },
            ],
          });
        }

        toast.success('Added to cart!');
      },

      removeFromCart: (productId, specs) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.productId === productId &&
                specsEqual(item.specs, specs)
              )
          ),
        });

        toast.success('Removed from cart');
      },

      updateQuantity: (productId, quantity, specs) => {
        if (quantity < 1)
          return get().removeFromCart(productId, specs);

        set({
          items: get().items.map((item) =>
            item.productId === productId &&
            specsEqual(item.specs, specs)
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),
    }),

    {
      name: 'cart-storage',
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);