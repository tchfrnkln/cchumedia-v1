// store/ordersStore.ts

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Shape of one line item in an order
// (matches what you map in handlePaymentSuccess)
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  specs: Record<string, string> | null;
  design: unknown | null;        // ← use unknown instead of any (safer)
  // If you know the exact shape of design, replace unknown with it:
  // design: DesignDetails | null;
}

// Status union type
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
  paystackReference: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingMethod: 'home' | 'pickup';
  address1: string;
  address2: string;
  state: string;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  items: OrderItem[];             // ← typed array
  status: OrderStatus;
  timestamp: string;
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  clearOrders: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (newOrder) => {
        set({ orders: [...get().orders, newOrder] });
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
    }
  )
);