import { useCartStore } from '@/store/cartStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const CartDrawer = () => {

  const { showCartDrawer, closeCartDrawer } = useDashboardStore();
  const { items } = useCartStore();

  return (
    <div className="drawer drawer-end z-50">

      <input
        type="checkbox"
        className="drawer-toggle"
        checked={showCartDrawer}
        readOnly
      />

      <div className="drawer-side">

        <label
          className="drawer-overlay"
          onClick={closeCartDrawer}
        ></label>

        <ul className="menu p-4 w-80 h-full bg-base-200">

          {/* Header */}

          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">
              Your Cart
            </h2>

            <button
              className="btn btn-sm btn-ghost"
              onClick={closeCartDrawer}
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}

          {items.length === 0 ? (
            <p className="text-center py-8">
              Cart is empty.
            </p>
          ) : (
            items.map((item, index) => (
              <li
                key={`${item.productId}-${index}`}
                className="mb-4 border-b pb-3"
              >

                {/* Product + price */}

                <div className="flex justify-between font-medium">
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span className="font-semibold">
                    {
                      item.price && `₦${Number((item?.price * item.quantity).toFixed(2)).toLocaleString()}`
                    }
                  </span>
                </div>

                {/* Specs */}

                {item.specs && Object.keys(item.specs).length > 0 && (
                  <div className="mt-1 pl-1 text-xs opacity-70 flex flex-col gap-1">

                    {Object.entries(item.specs).map(([key, value]) => (
                      <span key={key}>
                        {key}: {value}
                      </span>
                    ))}

                  </div>
                )}

              </li>
            ))
          )}

          {/* Footer */}

          {items.length > 0 && (
            <div className="mt-6">

              <button
                className="btn btn-outline w-full mb-6"
                onClick={() =>
                  useCartStore.getState().clearCart()
                }
              >
                Clear Cart
              </button>

              <Link href="/dashboard/checkout" onClick={closeCartDrawer}>
                <button className="btn btn-primary w-full max-w-xs">
                  Proceed to Checkout
                </button>
              </Link>

            </div>
          )}

        </ul>
      </div>
    </div>
  )
}

export default CartDrawer

export const Cart = () =>{
    const { openCartDrawer } = useDashboardStore();
    const { items } = useCartStore();

    return (
        <div className='mr-6'>
            <button
                className="btn btn-outline"
                onClick={openCartDrawer}
            >
                <ShoppingCart size={20} />
                Cart ({items.length})
            </button>
        </div>
    )
}