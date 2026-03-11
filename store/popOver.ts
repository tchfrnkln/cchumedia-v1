'use client';

import { create } from 'zustand';

export type DesignType = 'have-design' | 'design-for-me' | null;

interface DesignPopoverState {
  isOpen: boolean;
  designType: DesignType;

  designFile: File | null;

  businessName: string;
  description: string;

  logo: File | null;
  noLogo: boolean;

  openPopover: () => void;
  closePopover: () => void;

  setDesignType: (type: DesignType) => void;

  setDesignFile: (file: File | null) => void;

  setBusinessName: (name: string) => void;
  setDescription: (desc: string) => void;

  setLogo: (file: File | null) => void;
  toggleNoLogo: () => void;

  reset: () => void;
}

export const useDesignPopoverStore = create<DesignPopoverState>((set) => ({
  isOpen: false,

  designType: null,

  designFile: null,

  businessName: '',
  description: '',

  logo: null,
  noLogo: false,

  openPopover: () => set({ isOpen: true }),

  closePopover: () => set({ isOpen: false }),

  setDesignType: (type) => set({ designType: type }),

  setDesignFile: (file) => set({ designFile: file }),

  setBusinessName: (name) => set({ businessName: name }),

  setDescription: (desc) => set({ description: desc }),

  setLogo: (file) => set({ logo: file }),

  toggleNoLogo: () =>
    set((state) => ({
      noLogo: !state.noLogo,
    })),

  reset: () =>
    set({
      designType: null,
      designFile: null,
      businessName: '',
      description: '',
      logo: null,
      noLogo: false,
    }),
}));