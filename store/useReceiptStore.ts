import { create } from 'zustand';

interface ReceiptStore {
  receiptFile: File | null;
  uploadingReceipt: boolean;
  showBankModal: boolean;

  // Actions
  setReceiptFile: (file: File | null) => void;
  setUploadingReceipt: (isUploading: boolean) => void;
  setShowBankModal: (show: boolean) => void;
  
  // Optional: Reset helper
  resetReceipt: () => void;
}

export const useReceiptStore = create<ReceiptStore>((set) => ({
  receiptFile: null,
  uploadingReceipt: false,
  showBankModal: false,

  setReceiptFile: (file) => set({ receiptFile: file }),
  
  setUploadingReceipt: (isUploading) => set({ uploadingReceipt: isUploading }),
  
  setShowBankModal: (show) => set({ showBankModal: show }),

  resetReceipt: () => set({
    receiptFile: null,
    uploadingReceipt: false,
  }),
}));