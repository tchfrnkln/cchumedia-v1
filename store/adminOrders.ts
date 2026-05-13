'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';
import { Order, OrderStatus } from './ordersStore';

interface AdminOrdersState {
  orders: Order[];
  filteredOrders: Order[];
  isLoading: boolean;
  error: string | null;
  sortBy: 'date' | 'status';
  filterStatus: OrderStatus | 'all';

  fetchAllOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  setSort: (sort: 'date' | 'status') => void;
  setFilter: (status: OrderStatus | 'all') => void;
  applyFilters: () => void;
}

export const useAdminOrdersStore = create<AdminOrdersState>((set, get) => ({
  orders: [],
  filteredOrders: [],
  isLoading: false,
  error: null,
  sortBy: 'date',
  filterStatus: 'all',

  fetchAllOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // 🔐 Check Admin Role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        throw new Error('Admins only');
      }

      // 📦 Get Orders
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // 📦 Get ALL order_items (important fix)
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select(`
          order_id,
          product_id,
          name,
          price,
          quantity,
          specs,
          design
        `);

      if (itemsError) throw itemsError;

      // 🔗 Attach items to orders
      const ordersWithItems = ordersData.map((order) => ({
        ...order,
        items:
          itemsData?.filter(
            (item) => item.order_id === order.id
          ) || [],
      }));

      set({ orders: ordersWithItems });
      

      get().applyFilters();
    } catch (err: unknown) {
      console.error(err);
      set({ error: (err as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      set({
        orders: get().orders.map((o) =>
          o.id === orderId ? { ...o, status } : o
        ),
      });

      get().applyFilters();
    } catch (err) {
      console.error(err);
    }
  },

  setSort: (sort) => {
    set({ sortBy: sort });
    get().applyFilters();
  },

  setFilter: (status) => {
    set({ filterStatus: status });
    get().applyFilters();
  },

  applyFilters: () => {
    const { orders, sortBy, filterStatus } = get();

    let filtered = [...orders];

    if (filterStatus !== 'all') {
      filtered = filtered.filter((o) => o.status === filterStatus);
    }

    if (sortBy === 'date') {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
    }

    if (sortBy === 'status') {
      filtered.sort((a, b) =>
        a.status.localeCompare(b.status)
      );
    }

    set({ filteredOrders: filtered });
  },
}));