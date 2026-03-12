'use client';

import { create } from 'zustand';

export type ShippingMethod = 'home' | 'pickup';

export interface CheckoutState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingMethod: ShippingMethod;
  address1: string;
  address2: string;
  state: string;
  deliveryFee: number; // in smallest unit (kobo / kobo equivalent)

  setField: <K extends keyof CheckoutState>(field: K, value: CheckoutState[K]) => void;
  reset: () => void;
  updateDeliveryFee: () => void;
}

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe',
  'Zamfara', 'Federal Capital Territory (FCT)',
] as const;

// Updated delivery fees — cheaper for Abuja/FCT since store is there
const deliveryFees: Record<string, number> = {
  'Federal Capital Territory (FCT)': 800,    // ← Much cheaper for local Abuja deliveries
  'Abuja': 800,                              // alias
  'Nasarawa': 1200,                          // nearby state
  'Niger': 1400,                             // nearby
  'Lagos': 2500,                             // farther, increased a bit for realism
  'Ogun': 2200,
  'Oyo': 2800,
  'Osun': 3000,
  'Ondo': 3000,
  'Ekiti': 3000,
  'Abia': 3500,
  'Anambra': 3500,
  'Imo': 3500,
  'Enugu': 3500,
  'Ebonyi': 3800,
  'Delta': 3500,
  'Rivers': 3800,
  'Cross River': 4000,
  'Akwa Ibom': 4000,
  // Add more as needed — distant ones can stay higher
} as const;

const DEFAULT_STATE: Omit<CheckoutState, 'setField' | 'reset' | 'updateDeliveryFee'> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  shippingMethod: 'home',
  address1: '',
  address2: '',
  state: 'Federal Capital Territory (FCT)',  // ← Changed default to FCT/Abuja
  deliveryFee: 800,
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  ...DEFAULT_STATE,

  setField: (field, value) => set({ [field]: value }),

  reset: () => set(DEFAULT_STATE),

  updateDeliveryFee: () => {
    const { state, shippingMethod } = get();

    if (shippingMethod === 'pickup') {
      set({ deliveryFee: 0 });
      return;
    }

    // Normalize common variations
    let normalized = state;
    if (state === 'Abuja') {
      normalized = 'Federal Capital Territory (FCT)';
    }

    const fee = deliveryFees[normalized] ?? 2500; // fallback — raised slightly for distant/unlisted

    set({ deliveryFee: fee });
  },
}));