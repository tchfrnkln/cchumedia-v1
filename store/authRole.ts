// src/lib/stores/userRoleStore.ts
'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';

type UserRole = 'admin' | 'staff' | 'user' | null;

interface UserRoleState {
  role: UserRole;
  isLoading: boolean;
  error: string | null;
  getUserRole: () => Promise<UserRole>;
  clearRole: () => void;
}

export const useUserRoleStore = create<UserRoleState>((set) => ({
  role: null,
  isLoading: false,
  error: null,


  getUserRole: async () => {
    set({ isLoading: true, error: null });

    try {
      // Get current authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        set({ isLoading: false, role: null });
        return null;
      }

      // Fetch role from profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Failed to fetch user role:', error);
        set({ error: error.message, isLoading: false, role: null });
        return null;
      }

      const fetchedRole = (data?.role as UserRole) ?? 'user';
      set({ role: fetchedRole, isLoading: false, error: null });
      return fetchedRole;
    } catch {
      const message = 'Unknown error fetching role';
      set({ error: message, isLoading: false, role: null });
      return null;
    }
  },

  // Useful when logging out or session ends
  clearRole: () => {
    set({ role: null, error: null, isLoading: false });
  },
}));