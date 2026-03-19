'use client';

import { create } from 'zustand';

interface ProductDetailState {
  selectedQuantities: Record<string, number>;
  selectedSpecs: Record<string, Record<string, string>>; // productId → specKey → value
  defaultSpecs: Record<string, Record<string, string>>;

  setQuantity: (productId: string, qty: number) => void;
  getQuantity: (productId: string, fallback: number) => number;
  clearQuantity: (productId: string) => void;

  setSpec: (productId: string, key: string, value: string) => void;
  getSpec: (productId: string, key: string, defaultValue: string) => string;
  getAllSpecs: (productId: string) => Record<string, string>;
  clearSpecs: (productId: string) => void;
  setDefaultSpecs: (productId: string, specs: Record<string, string>) => void;

  // New: price calculation moved here — called on demand
  getUnitPrice: (
    productId: string,
    product: { price: number; specs?: Record<string, string[]> } | null
  ) => number;

  getTotalPrice: (
    productId: string,
    product: { price: number; specs?: Record<string, string[]> } | null,
    quantityFallback: number
  ) => number;
}

const extractPercentage = (value: string) => {
  const match = value.match(/([+-]\d+)%/);
  return match ? Number(match[1]) : 0;
};

export const useProductDetailStore = create<ProductDetailState>((set, get) => ({
  selectedQuantities: {},
  selectedSpecs: {},
  defaultSpecs: {},

  setQuantity: (productId, qty) =>
    set((s) => ({
      selectedQuantities: { ...s.selectedQuantities, [productId]: qty },
    })),

  getQuantity: (productId, fallback) =>
    get().selectedQuantities[productId] ?? fallback,

  clearQuantity: (productId) =>
    set((s) => {
      const { [productId]: _, ...rest } = s.selectedQuantities;
      return { selectedQuantities: rest };
    }),

  setSpec: (productId, key, value) =>
    set((s) => ({
      selectedSpecs: {
        ...s.selectedSpecs,
        [productId]: { ...(s.selectedSpecs[productId] || {}), [key]: value },
      },
    })),

  getSpec: (productId, key, defaultValue) =>
    get().selectedSpecs[productId]?.[key] ??
    get().defaultSpecs[productId]?.[key] ??
    defaultValue,

  getAllSpecs: (productId) => ({
    ...(get().defaultSpecs[productId] || {}),
    ...(get().selectedSpecs[productId] || {}),
  }),

  clearSpecs: (productId) =>
    set((s) => {
      const { [productId]: _, ...rest } = s.selectedSpecs;
      return { selectedSpecs: rest };
    }),

  setDefaultSpecs: (productId, specs) =>
    set((s) => ({
      defaultSpecs: { ...s.defaultSpecs, [productId]: specs },
    })),

  // ────────────────────────────────────────────────
  // Price calculation — pure, called when rendering
  // ────────────────────────────────────────────────
  getUnitPrice: (productId, product) => {
    if (!product) return 0;

    const basePrice = product.price;
    let totalPercentage = 0;

    if (product.specs) {
      Object.entries(product.specs).forEach(([specKey, options]) => {
        const selected = get().getSpec(productId, specKey, options[0]);
        totalPercentage += extractPercentage(selected);
      });
    }

    return basePrice * (1 + totalPercentage / 100);
  },

  getTotalPrice: (productId, product, quantityFallback) => {
    const qty = get().getQuantity(productId, quantityFallback);
    const unit = get().getUnitPrice(productId, product);
    return unit * qty;
  },
}));