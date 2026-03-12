// src/app/dashboard/orders/page.tsx
'use client';

import { useOrdersStore, type Order, type OrderStatus } from '@/store/ordersStore';
import { format } from 'date-fns';
import { Package, Truck, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { JSX } from 'react';

export default function OrdersPage() {
  const orders = useOrdersStore((state) => state.orders);

  const getStatusBadge = (status: OrderStatus) => {
    const styles: Record<OrderStatus, { color: string; icon: JSX.Element }> = {
      pending: {
        color: 'badge-warning',
        icon: <Clock size={16} />,
      },
      paid: {
        color: 'badge-info',
        icon: <CheckCircle size={16} />,
      },
      processing: {
        color: 'badge-primary',
        icon: <Package size={16} />,
      },
      shipped: {
        color: 'badge-secondary',
        icon: <Truck size={16} />,
      },
      delivered: {
        color: 'badge-success',
        icon: <CheckCircle size={16} />,
      },
      cancelled: {
        color: 'badge-error',
        icon: <XCircle size={16} />,
      },
      refunded: {
        color: 'badge-neutral',
        icon: <AlertCircle size={16} />,
      },
    };

    const { color, icon } = styles[status];

    return (
      <div className={`badge ${color} gap-1 flex items-center`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          <div className="alert alert-info shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>You haven&apos;t placed any orders yet.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 mt-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((order: Order) => (
              <div key={order.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div>
                      <h2 className="card-title text-lg">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </h2>
                      <p className="text-sm opacity-70">
                        Placed on {format(new Date(order.timestamp), 'PPPp')}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Items */}
                  <div className="divider my-2">Items</div>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="font-medium">{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>₦{item.price.toLocaleString()}</td>
                            <td>₦{(item.price * item.quantity).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary */}
                  <div className="divider my-2"></div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">Shipping Method</p>
                      <p className="capitalize">{order.shippingMethod}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Delivery To</p>
                      <p>{order.state}</p>
                      {order.address1 && <p className="text-xs opacity-70">{order.address1}</p>}
                      {order.address2 && <p className="text-xs opacity-70">{order.address2}</p>}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Paid</span>
                      <span>₦{order.total.toLocaleString()}</span>
                    </div>
                    <div className="text-xs opacity-60 mt-1">
                      Paystack Ref: {order.paystackReference}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}