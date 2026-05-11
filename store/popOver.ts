// src/store/popOver.ts
'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

interface DesignPopoverState {
  isOpen: boolean;

  designType: 'have-design' | 'design-for-me' | null;

  // Design file upload
  designFile: File | null;
  designFileUrl: string | null;

  // Business request
  businessName: string;
  description: string;
  logo: File | null;
  logoUrl: string | null;
  noLogo: boolean;

  openPopover: () => void;
  closePopover: () => void;
  reset: () => void;

  setDesignType: (type: 'have-design' | 'design-for-me' | null) => void;

  setDesignFile: (file: File | null) => void;
  uploadDesignFile: (file: File) => Promise<void>;

  setBusinessName: (name: string) => void;
  setDescription: (desc: string) => void;

  setLogo: (file: File | null) => void;
  toggleNoLogo: () => void;
  uploadLogoFile: (file: File) => Promise<void>;

  popOverProcessing: boolean;
  setPopOverProcessing: (processing: boolean) => void;
}

export const useDesignPopoverStore = create<DesignPopoverState>((set) => ({
  isOpen: false,
  designType: null,

  designFile: null,
  designFileUrl: null,

  businessName: '',
  description: '',
  logo: null,
  logoUrl: null,
  noLogo: false,

  openPopover: () => set({ isOpen: true }),
  closePopover: () => set({ isOpen: false }),
  reset: () =>
    set({
      designType: null,
      designFile: null,
      designFileUrl: null,
      businessName: '',
      description: '',
      logo: null,
      logoUrl: null,
      noLogo: false,
    }),

  setDesignType: (type) => set({ designType: type }),

  setDesignFile: (file) => set({ designFile: file }),
  uploadDesignFile: async (file) => {
    try {
    //   const filePath = `designs/${Date.now()}-${file.name}`;
      const filePath = `${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('design-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('design-uploads')
        .getPublicUrl(filePath);

    //   if (error) throw error;

      set({ designFileUrl: data.publicUrl });
      // toast.success('Design file uploaded!');
    } catch (err: unknown) {
      toast.error(`Upload failed: ${ (err as Error).message }`);
    }
  },

  setBusinessName: (name) => set({ businessName: name }),
  setDescription: (desc) => set({ description: desc }),

  setLogo: (file) => set({ logo: file }),
  toggleNoLogo: () => set((state) => ({ noLogo: !state.noLogo })),
  uploadLogoFile: async (file) => {
    try {
      const filePath = `logos/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('design-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('design-uploads')
        .getPublicUrl(filePath);

    //   if (error) throw error;

      set({ logoUrl: data.publicUrl });
      toast.success('Logo uploaded!');
    } catch (err: unknown) {
      toast.error(`Logo upload failed: ${ (err as Error).message }`);
    }
  },
  popOverProcessing: false,
  setPopOverProcessing: (processing) => set({ popOverProcessing: processing }),
}));