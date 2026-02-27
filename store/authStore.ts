// src/lib/stores/authStore.ts
'use client';  // Client-side only

import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  // Add more fields as needed from Supabase user
}

interface AuthState {
  user: User | null;
  session: unknown | null;  // Use Supabase's Session type if importing, but keep simple
  isLoading: boolean;
  error: string | null;
  success: string | null;
  setUser: (user: User | null) => void;
  setSession: (session: unknown | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  error: null,
  success: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  signup: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      set({ error: error.message });
      throw error;
    }
    set({ user: data.user as User, session: data.session, isLoading: false, success: "Successfully signed up!" });
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ error: error.message });
      throw error;
    }
    set({ user: data.user as User, session: data.session, isLoading: false, success: "Successfully logged in!" });
  },
  logout: async () => {
    set({ isLoading: true });
    const { error } = await supabase.auth.signOut();
    if (error) {
      set({ error: error.message });
      throw error;
    }
    set({ user: null, session: null, isLoading: false });
  },
}));

// Listen for auth changes (from Supabase docs)
import { supabase } from '@/lib/supabase/client';  // Adjust path if needed

supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().setSession(session);
  useAuthStore.getState().setUser(session?.user as User | null);
});