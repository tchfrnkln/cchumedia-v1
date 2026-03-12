'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Backpack,
  ChevronDown,
  Mail,
  MapPin,
  Package,
  Phone,
  ShoppingCart,
  User
} from 'lucide-react';
import { PaystackButton } from 'react-paystack';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { supabase } from '@/lib/supabase/client';

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe',
  'Zamfara', 'Federal Capital Territory (FCT)',
];

interface PaystackSuccessResponse {
  reference: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0)
  );

  // ── UPDATED: Custom design fee = 5000 per distinct item that needs design-for-me ──
  const CUSTOM_DESIGN_FEE = 5000;

  const customDesignFee = useMemo(() => {
    // Count unique cart items (by productId + design fingerprint) that require custom design
    const designItems = cartItems.filter((item) => item.design?.type === 'design-for-me');

    // If your cart allows duplicate productId with different designs, use a better key
    // For most stores → productId + JSON.stringify(design) is safer
    const uniqueDesignKeys = new Set(
      designItems.map((item) => {
        // If design can differ per line item → use both product + design content
        return `${item.productId}-${JSON.stringify(item.design ?? {})}`;
      })
    );

    return uniqueDesignKeys.size * CUSTOM_DESIGN_FEE;
  }, [cartItems]);

  const tax = Math.round(subtotal * 0.075);
  const { deliveryFee } = useCheckoutStore();
  const total = subtotal + tax + deliveryFee + customDesignFee;

  const checkout = useCheckoutStore();

  useEffect(() => {
    checkout.updateDeliveryFee();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout.shippingMethod, checkout.state]);

  const reference = useMemo(() => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }, []);

  const isFormValid =
    checkout.firstName.trim() !== '' &&
    checkout.lastName.trim() !== '' &&
    checkout.email.trim() !== '' &&
    checkout.phone.trim() !== '' &&
    (checkout.shippingMethod === 'pickup' ||
      (checkout.address1.trim() !== '' && checkout.state.trim() !== ''));

  const handlePaymentSuccess = async (paystackReference: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Please sign in to complete your order");
      }

      // 1. Insert main order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          paystack_reference: paystackReference,
          first_name: checkout.firstName.trim(),
          last_name: checkout.lastName.trim(),
          email: checkout.email.trim(),
          phone: checkout.phone.trim(),
          shipping_method: checkout.shippingMethod,
          address_line1: checkout.address1.trim(),
          address_line2: checkout.address2.trim(),
          state: checkout.state.trim(),
          subtotal,
          tax_amount: tax,
          delivery_fee: deliveryFee,
          custom_design_fee: customDesignFee,     // now correct amount
          total_amount: total,
          status: 'paid',
        })
        .select('id')
        .single();

      if (orderError || !order?.id) {
        throw orderError || new Error("Failed to create order");
      }

      // 2. Insert order items (unchanged)
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        name: item.name || 'Unnamed product',
        price: item.price ?? 0,
        quantity: item.quantity,
        specs: item.specs || null,
        design: item.design || null,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }

      alert(`Payment successful!\nOrder created (ID: ${order.id})`);

      clearCart();
      setIsModalOpen(false);

      router.push('/orders');

    } catch (err: unknown) {
      console.error("Order creation failed:", err);
      alert(
        `Payment was successful, but we couldn't save your order.\n` +
        `Please contact support with reference: ${paystackReference}\n` +
        `Error: ${ (err as Error).message || 'Unknown error' }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const paystackConfig = {
    reference,
    email: checkout.email.trim(),
    amount: Math.round(total * 100),          // includes corrected customDesignFee
    publicKey: 'pk_test_a361ebecc9edf1b3af278b0b42e9b037a668c872',
    currency: 'NGN',
    firstname: checkout.firstName.trim(),
    lastname: checkout.lastName.trim(),
    phone: checkout.phone.trim(),
    metadata: {
      custom_fields: [
        {
          display_name: 'Shipping Method',
          variable_name: 'shipping_method',
          value: checkout.shippingMethod,
        },
        {
          display_name: 'Delivery State',
          variable_name: 'delivery_state',
          value: checkout.state,
        },
      ],
    },
  };

  const paystackProps = {
    ...paystackConfig,
    text: isSubmitting ? 'Processing...' : 'Confirm & Pay Now',
    onSuccess: (response: PaystackSuccessResponse) => handlePaymentSuccess(response.reference),
    onClose: () => {
      if (!isSubmitting) {
        alert('Payment window was closed. You can try again.');
      }
    },
    disabled: !isFormValid || cartItems.length === 0 || isSubmitting,
    className: `btn ${isFormValid && !isSubmitting ? 'btn-primary' : 'btn-disabled'} w-full`,
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
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
                      {item.design?.type === 'design-for-me' && (
                        <p className="text-xs text-info">+ Custom Design</p>
                      )}
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
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (7.5%)</span>
                  <span>₦{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee to {checkout.state}</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>

                {customDesignFee > 0 && (
                  <div className="flex justify-between text-info">
                    <span>Custom Design Fee</span>
                    <span>₦{customDesignFee.toLocaleString()}</span>
                  </div>
                )}

                <div className="divider my-3"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
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
        <div className="relative modal-box max-w-lg w-11/12">
          <div
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="absolute right-4 top-4 btn btn-ghost p-4 rounded-full text-xs cursor-pointer"
          >
            <Backpack size={16} /> Summary
          </div>

          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <User size={24} /> Checkout Information
          </h3>

          <div className="space-y-5">
            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label"><span className="label-text">First Name</span></label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={checkout.firstName}
                  onChange={(e) => checkout.setField('firstName', e.target.value)}
                />
              </div>
              <div>
                <label className="label"><span className="label-text">Last Name</span></label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={checkout.lastName}
                  onChange={(e) => checkout.setField('lastName', e.target.value)}
                />
              </div>
            </div>

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
            <button
              className="btn btn-ghost"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <PaystackButton {...paystackProps} />
          </div>
        </div>
      </div>
    </div>
  );
}