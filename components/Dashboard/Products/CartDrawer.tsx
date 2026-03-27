'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { useAuthStore } from '@/store/authStore';
import { ShoppingCart, X, UserPlus, ArrowRight } from 'lucide-react';

const CartDrawer = () => {
  const { showCartDrawer, closeCartDrawer } = useDashboardStore();
  const { items, removeFromCart } = useCartStore();
  const { user } = useAuthStore();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleProceedToCheckout = () => {
    if (user) {
      // User is logged in → go directly to checkout
      closeCartDrawer();
      location.href = "/dashboard/checkout";
    } else {
      // User is NOT logged in → show the choice modal
      setShowCheckoutModal(true);
    }
  };

  const handleContinueAsGuest = () => {
    setShowCheckoutModal(false);
    closeCartDrawer();
    location.href = "/dashboard/checkout?guest=true";   // You can read this query param on checkout page
  };

  const handleGoToAuth = () => {
    setShowCheckoutModal(false);
    closeCartDrawer();
    location.href = "/auth/new?redirect=/dashboard/checkout"; // or your signup page
  };

  return (
    <>
      <div className="drawer drawer-end z-50">
        <input
          type="checkbox"
          className="drawer-toggle"
          checked={showCartDrawer}
          readOnly
        />

        <div className="drawer-content" />

        <div className="drawer-side">
          <label className="drawer-overlay" onClick={closeCartDrawer} aria-label="close sidebar" />

          <div className="menu p-0 w-80 sm:w-96 h-full bg-base-200 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-base-300">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button
                className="btn btn-ghost btn-circle btn-sm"
                onClick={closeCartDrawer}
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
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
                    <button
                      className="absolute top-2 right-2 btn btn-ghost btn-xs text-error"
                      onClick={() => removeFromCart(item.cartItemId)}
                    >
                      <X size={16} />
                    </button>

                    <div className="pr-8">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm opacity-70">Qty: {item.quantity}</p>
                        </div>
                        {item.price && <p className="font-semibold">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>}
                      </div>

                      {item.specs && Object.keys(item.specs).length > 0 && (
                        <div className="text-xs opacity-70 mt-1">
                          {Object.entries(item.specs).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-medium">{key}:</span> {value}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-base-300 bg-base-200 sticky bottom-0">
                <button onClick={handleProceedToCheckout} className="w-full">
                  <span className="btn btn-primary w-full">
                    Proceed to Checkout
                  </span>
                </button>

                <div className="text-center mt-3 text-sm opacity-70">
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Choice Modal (shows only for non-logged-in users) */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
          <div className="bg-base-100 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-center mb-2">Ready to Checkout?</h3>
              <p className="text-center text-base-content/70 mb-8">
                Create an account to save your order history, track delivery, and enjoy faster future checkouts.
              </p>

              <div className="space-y-3">
                {/* Sign Up / Login Option */}
                <button
                  onClick={handleGoToAuth}
                  className="btn btn-primary w-full flex items-center justify-center gap-3 py-6 text-lg"
                >
                  <UserPlus size={24} />
                  Sign up or Log in
                </button>

                {/* Continue as Guest */}
                <button
                  onClick={handleContinueAsGuest}
                  className="btn btn-outline w-full flex items-center justify-center gap-3 py-6 text-lg"
                >
                  Continue as Guest
                  <ArrowRight size={24} />
                </button>
              </div>

              <p className="text-xs text-center mt-6 opacity-60">
                You can always create an account later from your profile
              </p>
            </div>

            <div className="border-t p-4">
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="btn btn-ghost w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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