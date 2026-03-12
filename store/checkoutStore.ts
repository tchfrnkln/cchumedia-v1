// stores/checkoutStore.ts
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe',
  'Zamfara', 'Federal Capital Territory (FCT)',
] as const;

const deliveryFees: Record<string, number> = {
  'Lagos': 1000,
  'Federal Capital Territory (FCT)': 2000,
  'Abuja': 2000,           // alias
  'Ogun': 1200,
  'Oyo': 1500,
  'Osun': 1500,
  'Ondo': 1500,
  'Ekiti': 1500,
  'Abia': 1500,
  'Anambra': 1500,
  'Imo': 1500,
  'Enugu': 1500,
  'Ebonyi': 1800,
  'Delta': 1500,
  'Rivers': 1500,
  'Cross River': 1800,
  'Akwa Ibom': 1800,
  // Add the rest according to your real pricing policy
  // Most others default to a mid-range value
} as const;

const DEFAULT_STATE: Omit<CheckoutState, 'setField' | 'reset' | 'updateDeliveryFee'> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  shippingMethod: 'home',
  address1: '',
  address2: '',
  state: 'Lagos',
  deliveryFee: 1000,
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
    const normalized = state === 'Abuja' ? 'Federal Capital Territory (FCT)' : state;
    const fee = deliveryFees[normalized] ?? 1800; // fallback for unlisted states

    set({ deliveryFee: fee });
  },
}));