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
  deliveryArea: string;           // ← NEW
  deliveryFee: number;
  useDeliveryDiscount: boolean;   // ← NEW: 50% off toggle

  setField: <K extends keyof CheckoutState>(field: K, value: CheckoutState[K]) => void;
  toggleDeliveryDiscount: () => void;
  reset: () => void;
  updateDeliveryFee: () => void;
}

const AbujaDeliveryFees: Record<string, number> = {
  // Group 1 – ₦6,000
  'Buhari': 6000,
  'Kubwa': 6000,
  'Idu': 6000,
  'Lugbe': 6000,
  'Kuje': 6000,
  'Airport Road': 6000,
  'Karashi': 6000,
  'Orozo': 6000,
  'Masaka': 6000,
  'Giri': 6000,
  'Madalla': 6000,
  'Zuba': 6000,

  // Group 2 – ₦5,000
  'Dutse': 5000,
  'Gwaripa': 5000,
  'Dawaki': 5000,
  'Jabi': 5000,
  'Jahi': 5000,
  'Utako': 5000,
  'Mabushi': 5000,
  'Ado': 5000,
  'Life Camp': 5000,
  'Katampe': 5000,
  'Katampe Extension': 5000,
  'Galadimawa': 5000,
  'Galadima': 5000,

  // Group 3 – ₦4,000 (central / closer areas)
  'Gudu': 4000,
  'Apo': 4000,
  'Garki': 4000,
  'Maitama': 4000,
  'Asokoro': 4000,
  'Papei': 4000,
  'Maraba': 4000,
  'Abacha Road': 4000,
  'City College': 4000,
  'Nyanya': 4000,
  'Kpegyi': 4000,
  'Jikwoyi': 4000,
  'Karu': 4000,
  'New Karu': 4000,
  'New Nyanya': 4000,

  // Group 4 – ₦8,000 (farther out)
  'Gwagwalada': 8000,
  'Kwali': 8000,
  'Suleja': 8000,
  'Abaji': 8000,
} as const;

const DEFAULT_STATE: Omit<CheckoutState, 'setField' | 'toggleDeliveryDiscount' | 'reset' | 'updateDeliveryFee'> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  shippingMethod: 'home',
  address1: '',
  address2: '',
  state: 'Federal Capital Territory (FCT)',
  deliveryArea: '',
  deliveryFee: 0,
  useDeliveryDiscount: false,
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  ...DEFAULT_STATE,

  setField: (field, value) => {
    set({ [field]: value });
    // Auto-update fee when area or shipping method changes
    if (field === 'deliveryArea' || field === 'shippingMethod') {
      get().updateDeliveryFee();
    }
  },

  toggleDeliveryDiscount: () =>
    set((state) => {
      const newDiscount = !state.useDeliveryDiscount;
      // We'll let updateDeliveryFee handle the recalculation
      return { useDeliveryDiscount: newDiscount };
    }),

  reset: () => set(DEFAULT_STATE),

  updateDeliveryFee: () => {
    const { shippingMethod, deliveryArea, useDeliveryDiscount } = get();

    if (shippingMethod === 'pickup') {
      set({ deliveryFee: 0 });
      return;
    }

    if (!deliveryArea) {
      set({ deliveryFee: 0 }); // or 8000 if you want to force selection
      return;
    }

    let fee = AbujaDeliveryFees[deliveryArea as keyof typeof AbujaDeliveryFees] ?? 8000;

    if (useDeliveryDiscount) {
      fee = Math.round(fee * 0.5);
    }

    set({ deliveryFee: fee });
  },
}));