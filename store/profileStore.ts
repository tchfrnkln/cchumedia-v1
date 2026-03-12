// src/store/profileStore.ts
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase/client';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  gender: string | null;
  location: string | null;
  affiliate_id: string | null;
  affiliate_link: string;
  total_earnings: number;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  calculateEarnings: () => Promise<number>;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      loading: false,
      error: null,

      fetchProfile: async () => {
        set({ loading: true, error: null });

        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('Not authenticated');

          const { data, error } = await supabase
            .from('profiles')
            .select('id, full_name, email, gender, location, affiliate_id')
            .eq('id', user.id)
            .single();

          if (error || !data) throw error || new Error('Profile not found');

          const affiliate_link = `${window.location.origin}/auth/new?aff=${data.id}`;

          const earnings = await get().calculateEarnings();

          set({
            profile: {
              ...data,
              affiliate_link,
              total_earnings: earnings,
            },
          });
        } catch (err: unknown) {
          set({ error: (err as Error).message });
        } finally {
          set({ loading: false });
        }
      },

      calculateEarnings: async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return 0;

          // Get all users referred by me
          const { data: referred } = await supabase
            .from('profiles')
            .select('id')
            .eq('affiliate_id', user.id);

          if (!referred?.length) return 0;

          const referredIds = referred.map(r => r.id);

          // Get paid orders by referred users (only subtotal)
          const { data: orders } = await supabase
            .from('orders')
            .select('subtotal')
            .in('user_id', referredIds)
            .eq('status', 'paid');

          if (!orders?.length) return 0;

          const totalSubtotal = orders.reduce((sum, o) => sum + (o.subtotal || 0), 0);
          return Math.round(totalSubtotal * 0.10); // 10%
        } catch (err) {
          console.error('Earnings calc failed:', err);
          return 0;
        }
      },
    }),
    {
      name: 'profile-storage',
    }
  )
);