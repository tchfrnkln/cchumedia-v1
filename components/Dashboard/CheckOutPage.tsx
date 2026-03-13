'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Backpack,
  ShoppingCart,
  User
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { supabase } from '@/lib/supabase/client';
import dynamic from 'next/dynamic';   // ← Add this import

// Dynamically import PaystackButton — only loads in browser, ssr: false skips server render
const PaystackButton = dynamic(
  () => import('react-paystack').then(mod => mod.PaystackButton),
  { ssr: false }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe',
  'Zamfara', 'Federal Capital Territory (FCT)',
];

// ... rest of your interface / types remain the same

export default function CheckoutPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0)
  );

  const CUSTOM_DESIGN_FEE = 5000;

  const customDesignFee = useMemo(() => {
    const designItems = cartItems.filter((item) => item.design?.type === 'design-for-me');
    const uniqueDesignKeys = new Set(
      designItems.map((item) => `${item.productId}-${JSON.stringify(item.design ?? {})}`)
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
  }, [checkout.shippingMethod, checkout.state]); // removed unnecessary eslint-disable

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
    // ... your existing handlePaymentSuccess logic (unchanged)
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Please sign in to complete your order");
      }

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
          custom_design_fee: customDesignFee,
          total_amount: total,
          status: 'paid',
        })
        .select('id')
        .single();

      if (orderError || !order?.id) {
        throw orderError || new Error("Failed to create order");
      }

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
        `Error: ${(err as Error).message || 'Unknown error'}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const paystackConfig = {
    reference,
    email: checkout.email.trim(),
    amount: Math.round(total * 100),
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
    onSuccess: (response: { reference: string }) => handlePaymentSuccess(response.reference),
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
            {/* ... all your form fields remain unchanged ... */}

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
    </div>
  );
}