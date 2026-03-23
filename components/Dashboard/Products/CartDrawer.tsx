'use client';

import { useCartStore } from '@/store/cartStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CartDrawer = () => {
  const { showCartDrawer, closeCartDrawer } = useDashboardStore();
  const { items, removeFromCart } = useCartStore();

  return (
    <div className="drawer drawer-end z-50">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={showCartDrawer}
        readOnly
      />

      <div className="drawer-content" />

      <div className="drawer-side">
        <label
          className="drawer-overlay"
          onClick={closeCartDrawer}
          aria-label="close sidebar"
        />

        {/* Main drawer panel */}
        <div className="menu p-0 w-80 sm:w-96 h-full bg-base-200 flex flex-col">
          {/* Header - fixed */}
          <div className="flex items-center justify-between p-4 border-b border-base-300">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              className="btn btn-ghost btn-circle btn-sm"
              onClick={closeCartDrawer}
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable items section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-70 py-12">
                <ShoppingCart size={48} className="mb-4 opacity-50" />
                <p className="text-lg">Your cart is empty</p>
                <p className="text-sm mt-2">Add some items to get started</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="card bg-base-100 shadow-sm rounded-lg p-3 relative"
                >
                  {/* Remove button - top right */}
                  <button
                    className="absolute top-2 right-2 btn btn-ghost btn-xs text-error hover:text-error"
                    onClick={() => removeFromCart(item.cartItemId)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <X size={16} />
                  </button>

                  <div className="pr-8">
                    {/* Name + quantity + price */}
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-medium">{item.name || 'Product'}</p>
                        <p className="text-sm opacity-70">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold whitespace-nowrap">
                        {item.price
                          ? `₦${(item.price * item.quantity).toLocaleString()}`
                          : '—'}
                      </p>
                    </div>

                    {/* Specs */}
                    {item.specs && Object.keys(item.specs).length > 0 && (
                      <div className="text-xs opacity-70 mt-1 space-y-0.5">
                        {Object.entries(item.specs).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Custom design tag if exists */}
                    {item.design?.type === 'design-for-me' && (
                      <div className="badge badge-info badge-sm mt-2">
                        Custom Design Requested
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer - always visible at bottom */}
          {items.length > 0 && (
            <div className="p-4 border-t border-base-300 bg-base-200 sticky bottom-0">
              <Link href="/dashboard/checkout" legacyBehavior>
                <a
                  onClick={closeCartDrawer}
                  className="btn btn-primary w-full"
                >
                  Proceed to Checkout
                </a>
              </Link>

              {/* Optional: show subtotal */}
              <div className="text-center mt-3 text-sm opacity-70">
                {items.length} item{items.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

export const Cart = () => {
  const { openCartDrawer } = useDashboardStore();
  const items = useCartStore((state) => state.items);

  return (
    <div className="mr-4 sm:mr-6">
      <button className="btn btn-outline gap-2" onClick={openCartDrawer}>
        <ShoppingCart size={20} />
        Cart
        {items.length > 0 && (
          <span className="badge badge-primary badge-sm">{items.length}</span>
        )}
      </button>
    </div>
  );
};