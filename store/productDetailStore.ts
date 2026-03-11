'use client';

import { create } from 'zustand';

interface ProductDetailState {
  selectedQuantities: Record<string, number>;
  selectedSpecs: Record<string, Record<string, string>>; // productId -> specs
  defaultSpecs: Record<string, Record<string, string>>; // productId -> default specs

  setQuantity: (productId: string, qty: number) => void;
  getQuantity: (productId: string, fallback: number) => number;
  clearQuantity: (productId: string) => void;

  setSpec: (productId: string, key: string, value: string) => void;
  getSpec: (productId: string, key: string, defaultValue: string) => string;
  getAllSpecs: (productId: string) => Record<string, string>;
  clearSpecs: (productId: string) => void;
  setDefaultSpecs: (productId: string, specs: Record<string, string>) => void;
}

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
}));