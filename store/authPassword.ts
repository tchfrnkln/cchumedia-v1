import { create } from 'zustand'

interface PasswordState {
  isLoading: boolean
  error: string | null
  successMessage: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSuccess: (msg: string | null) => void
  clearMessages: () => void
}

export const usePasswordStore = create<PasswordState>((set) => ({
  isLoading: false,
  error: null,
  successMessage: null,
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSuccess: (msg) => set({ successMessage: msg }),
  clearMessages: () => set({ error: null, successMessage: null }),
}))