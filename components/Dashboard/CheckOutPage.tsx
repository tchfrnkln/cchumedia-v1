// components/CheckoutPage.tsx  (or Dashboard/CheckOut.tsx)
'use client';

import { useState, useEffect } from 'react';
import {
  ChevronDown,
  Mail,
  MapPin,
  Package,
  Phone,
  ShoppingCart,
  User,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
// import { useCartStore } from '@/stores/cartStore';
// import { useCheckoutStore } from '@/stores/checkoutStore';

const nigerianStates = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
  'Federal Capital Territory (FCT)',
];

export default function CheckoutPage() {
  const [isModalOpen, setIsModalOpen] = useState(true); // ← modal starts open

  const cartItems = useCartStore((state) => state.items);

  const subtotal = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0)
  );

  const tax = Math.round(subtotal * 0.08);

  const { deliveryFee } = useCheckoutStore();

  const total = subtotal + tax + deliveryFee;

  const checkout = useCheckoutStore();

  // Update delivery fee when shipping method or state changes
  useEffect(() => {
    checkout.updateDeliveryFee();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ checkout.shippingMethod, checkout.state]);

  const handleCheckout = () => {
    const checkoutData = {
      personal: {
        firstName: checkout.firstName,
        lastName: checkout.lastName,
        email: checkout.email,
        phone: checkout.phone,
      },
      shipping: {
        method: checkout.shippingMethod,
        address1: checkout.address1,
        address2: checkout.address2,
        state: checkout.state,
        deliveryFee: checkout.deliveryFee,
      },
      order: {
        items: cartItems,
        subtotal,
        tax,
        deliveryFee,
        total,
      },
      timestamp: new Date().toISOString(),
    };

    console.log('CHECKOUT SUBMISSION:', JSON.stringify(checkoutData, null, 2));

    // You can later replace this with:
    // - API call to create order
    // - toast notification
    // - redirect to payment or success page
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center mt-24">
      {/* Order Summary Card */}
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl flex items-center gap-3 mb-4">
            <ShoppingCart size={28} /> Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <div className="alert alert-info">
              Your cart is empty. Add some products first.
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex justify-between items-center border-b pb-3 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{item.name || 'Unnamed product'}</p>
                      <p className="text-sm opacity-70">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-right">
                      ₦{((item.price ?? 0) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{(subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (8%)</span>
                  <span>₦{(tax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee to {checkout.state}</span>
                  <span>₦{(deliveryFee).toLocaleString()}</span>
                </div>
                <div className="divider my-3"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₦{(total).toLocaleString()}</span>
                </div>
              </div>
            </>
          )}

          <div className="card-actions mt-6">
            <button
              className="btn btn-primary w-full"
              onClick={() => setIsModalOpen(true)}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Information Modal */}
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-lg w-11/12">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <User size={24} /> Checkout Information
          </h3>

          <div className="space-y-5">
            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={checkout.firstName}
                  onChange={(e) => checkout.setField('firstName', e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={checkout.lastName}
                  onChange={(e) => checkout.setField('lastName', e.target.value)}
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div>
              <label className="label flex items-center gap-2">
                <Mail size={16} /> <span>Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={checkout.email}
                onChange={(e) => checkout.setField('email', e.target.value)}
              />
            </div>

            <div>
              <label className="label flex items-center gap-2">
                <Phone size={16} /> <span>Phone Number</span>
              </label>
              <input
                type="tel"
                className="input input-bordered w-full"
                value={checkout.phone}
                onChange={(e) => checkout.setField('phone', e.target.value)}
              />
            </div>

            {/* Shipping method */}
            <div>
              <label className="label">Delivery Option</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shipping"
                    className="radio radio-primary"
                    checked={checkout.shippingMethod === 'home'}
                    onChange={() => {
                      checkout.setField('shippingMethod', 'home');
                      checkout.updateDeliveryFee();
                    }}
                  />
                  <MapPin size={16} /> Home Delivery
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shipping"
                    className="radio radio-primary"
                    checked={checkout.shippingMethod === 'pickup'}
                    onChange={() => {
                      checkout.setField('shippingMethod', 'pickup');
                      checkout.updateDeliveryFee();
                    }}
                  />
                  <Package size={16} /> Self Pickup (No fee)
                </label>
              </div>
            </div>

            {/* Address – shown only for home delivery */}
            {checkout.shippingMethod === 'home' && (
              <>
                <div>
                  <label className="label">Address Line 1</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={checkout.address1}
                    onChange={(e) => checkout.setField('address1', e.target.value)}
                  />
                </div>

                <div>
                  <label className="label">Address Line 2 (optional)</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={checkout.address2}
                    onChange={(e) => checkout.setField('address2', e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">State</label>
                  <div className="relative">
                    <select
                      className="select select-bordered w-full pr-10"
                      value={checkout.state}
                      onChange={(e) => {
                        checkout.setField('state', e.target.value);
                        checkout.updateDeliveryFee();
                      }}
                    >
                      {nigerianStates.map((stateName) => (
                        <option key={stateName} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-70"
                      size={18}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="modal-action mt-8">
            <button className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleCheckout}>
              Confirm & Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}