// store/ordersStore.ts
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase/client'; // ← make sure this is your client

// Shape of one line item in an order
export interface OrderItem {
  product_id: string;     // changed to match likely DB column name
  name: string;
  price: number;
  quantity: number;
  specs: Record<string, string> | null;
  design: unknown | null;
}

// Status union type (keep consistent with your DB)
export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface Order {
  id: string;
  paystack_reference: string;   // snake_case – matches Supabase convention
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  shipping_method: 'home' | 'pickup';
  address_line1: string;
  address_line2: string | null;
  state: string;
  subtotal: number;
  tax_amount: number;
  delivery_fee: number;
  custom_design_fee?: number;   // optional – if you added this column
  total_amount: number;
  status: OrderStatus;
  created_at: string;           // Supabase auto column
  // You can add user_id, updated_at, etc. if needed
  items?: OrderItem[];          // we'll join or fetch separately
}

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  clearOrders: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      isLoading: false,
      error: null,

      fetchOrders: async () => {
        set({ isLoading: true, error: null });

        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            throw new Error('User not authenticated');
          }

          // Fetch orders for the current user
          const { data, error } = await supabase
            .from('orders')
            .select(`
              id,
              paystack_reference,
              first_name,
              last_name,
              email,
              phone,
              shipping_method,
              address_line1,
              address_line2,
              state,
              subtotal,
              tax_amount,
              delivery_fee,
              custom_design_fee,
              total_amount,
              status,
              created_at
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          if (!data) throw new Error('No data returned');

          // Optionally fetch order_items here and attach them
          // For simplicity, if you want items displayed → fetch them separately or use a join
          const ordersWithItems = await Promise.all(
            data.map(async (order) => {
              const { data: items } = await supabase
                .from('order_items')
                .select('product_id, name, price, quantity, specs, design')
                .eq('order_id', order.id);

              return {
                ...order,
                items: items || [],
                // Map DB field names to your UI-friendly names
                paystackReference: order.paystack_reference,
                firstName: order.first_name,
                lastName: order.last_name,
                shippingMethod: order.shipping_method,
                address1: order.address_line1,
                address2: order.address_line2 || '',
                tax: order.tax_amount,
                deliveryFee: order.delivery_fee,
                total: order.total_amount,
                timestamp: order.created_at,
              } as Order;
            })
          );

          set({ orders: ordersWithItems });
        } catch (err: unknown) {
          console.error('Failed to fetch orders:', err);
          set({ error: (err as Error).message || 'Failed to load orders' });
        } finally {
          set({ isLoading: false });
        }
      },

      addOrder: (newOrder) => {
        set({ orders: [newOrder, ...get().orders] }); // newest first
      },

      updateOrderStatus: (orderId, newStatus) => {
        set({
          orders: get().orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          ),
        });
      },

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: 'orders-storage',
      partialize: (state) => ({ orders: state.orders }), // only persist orders
    }
  )
);