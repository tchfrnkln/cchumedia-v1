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
  User,
  Banknote,
  X,
  Check,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { supabase } from '@/lib/supabase/client';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

// Dynamic Paystack
const PaystackButton = dynamic(
  () => import('react-paystack').then((mod) => mod.PaystackButton),
  { ssr: false }
);

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

  const [showBankModal, setShowBankModal] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);

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
  }, [checkout.shippingMethod, checkout.deliveryArea, checkout.useDeliveryDiscount]);

  const reference = useMemo(() => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }, []);

  const isFormValid =
    checkout.firstName.trim() !== '' &&
    checkout.lastName.trim() !== '' &&
    checkout.email.trim() !== '' &&
    checkout.phone.trim() !== '' &&
    (checkout.shippingMethod === 'pickup' ||
      (checkout.address1.trim() !== '' &&
       checkout.state.trim() !== '' &&
       checkout.deliveryArea.trim() !== ''));

  // Paystack success handler
  const handlePaymentSuccess = async (paystackReference: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      let userId: string;

      // if (!user ) throw new Error("Please sign in to complete your order");
      if(user){
        userId = user.id;
      }else{
        userId = `${crypto.randomUUID()}`;
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId, //add Guest id here
          paystack_reference: paystackReference,
          payment_method: 'paystack',
          first_name: checkout.firstName.trim(),
          last_name: checkout.lastName.trim(),
          email: checkout.email.trim(),
          phone: checkout.phone.trim(),
          shipping_method: checkout.shippingMethod,
          address_line1: checkout.address1.trim(),
          address_line2: checkout.address2.trim(),
          state: checkout.state.trim(),
          delivery_area: checkout.deliveryArea.trim(),
          subtotal,
          tax_amount: tax,
          delivery_fee: deliveryFee,
          custom_design_fee: customDesignFee,
          total_amount: total,
          status: 'paid',
        })
        .select('id')
        .single();

      if (orderError || !order?.id) throw orderError || new Error("Failed to create order");

      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        name: item.name || 'Unnamed product',
        price: item.price ?? 0,
        quantity: item.quantity,
        specs: item.specs || null,
        design: item.design || null,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      toast.success(`Payment successful! Order #${order.id} created.`);
      clearCart();
      setIsModalOpen(false);
      router.push('/dashboard/orders');
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        `Payment succeeded but order creation failed.\n` +
        `Reference: ${paystackReference}\n` +
        `Error: ${(err as Error).message || 'Unknown error'}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bank transfer handler
  const handleBankTransferConfirm = async () => {
    if (!receiptFile) {
      toast.error("Please upload a payment receipt image");
      return;
    }

    setUploadingReceipt(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please sign in to place this order");

      const fileExt = receiptFile.name.split('.').pop() || 'jpg';
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `receipts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('payment_receipts')
        .upload(filePath, receiptFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: receiptFile.type,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('payment_receipts').getPublicUrl(filePath);
      let userId: string;

      if(user){
        userId = user.id;
      }else{
        userId = `${crypto.randomUUID()}`;
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          paystack_reference: "Bank Transfer",
          payment_method: "bank_transfer",
          receipt_url: urlData.publicUrl || null,
          first_name: checkout.firstName.trim(),
          last_name: checkout.lastName.trim(),
          email: checkout.email.trim(),
          phone: checkout.phone.trim(),
          shipping_method: checkout.shippingMethod,
          address_line1: checkout.address1.trim(),
          address_line2: checkout.address2.trim(),
          state: checkout.state.trim(),
          delivery_area: checkout.deliveryArea.trim(),
          subtotal,
          tax_amount: tax,
          delivery_fee: deliveryFee,
          custom_design_fee: customDesignFee,
          total_amount: total,
          status: 'pending',
        })
        .select('id')
        .single();

      if (orderError || !order?.id) throw orderError || new Error("Failed to create order");

      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        name: item.name || 'Unnamed product',
        price: item.price ?? 0,
        quantity: item.quantity,
        specs: item.specs || null,
        design: item.design || null,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      toast.success(`Order #${order.id} placed! Please wait for confirmation.`);
      clearCart();
      setShowBankModal(false);
      setIsModalOpen(false);
      setReceiptFile(null);
      router.push('/dashboard/orders');
    } catch (err: unknown) {
      console.error(err);
      toast.error(`Failed to place order: ${(err as Error).message || 'Unknown error'}`);
    } finally {
      setUploadingReceipt(false);
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
        { display_name: 'Shipping Method', variable_name: 'shipping_method', value: checkout.shippingMethod },
        { display_name: 'Delivery Area', variable_name: 'delivery_area', value: checkout.deliveryArea },
      ],
    },
  };

  const paystackProps = {
    ...paystackConfig,
    text: isSubmitting ? 'Processing...' : 'Pay with Paystack',
    onSuccess: (response: PaystackSuccessResponse) => handlePaymentSuccess(response.reference),
    onClose: () => {
      if (!isSubmitting) toast('Payment window closed');
    },
    disabled: !isFormValid || cartItems.length === 0 || isSubmitting,
    className: `btn ${isFormValid && !isSubmitting && cartItems.length > 0 ? 'btn-primary' : 'btn-disabled'} flex-1`,
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      {/* Order Summary */}
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl flex items-center gap-3 mb-4">
            <ShoppingCart size={28} /> Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <div className="alert alert-info">Your cart is empty. Add some products first.</div>
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
                  <span>
                    Delivery Fee {checkout.shippingMethod === 'pickup' ? '(Pickup)' : `to ${checkout.deliveryArea || 'selected area'}`}
                  </span>
                  <span>₦{(deliveryFee*2).toLocaleString()}</span>
                </div>

                {checkout.useDeliveryDiscount && deliveryFee > 0 && (
                  <div className="flex justify-between text-xs text-success">
                    <span>50% Delivery Discount Applied</span>
                    <span>−₦{(deliveryFee).toLocaleString()}</span>
                  </div>
                )}

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

      {/* Checkout Modal */}
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="relative modal-box max-w-lg w-11/12">
          <button
            className="absolute right-4 top-4 btn btn-ghost btn-circle"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={20} />
          </button>

          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <User size={24} /> Checkout Information
          </h3>

          <div className="space-y-5">
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
                      disabled
                      value={checkout.state}
                      onChange={(e) => {
                        checkout.setField('state', e.target.value);
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

                <div className="form-control">
                  <label className="label">Delivery Area (Abuja & environs only)</label>
                  <div className="relative">
                    <select
                      className="select select-bordered w-full pr-10"
                      value={checkout.deliveryArea}
                      onChange={(e) => checkout.setField('deliveryArea', e.target.value)}
                    >
                      <option value="">Select your delivery area</option>
                      <optgroup label="₦6,000">
                        {['Buhari', 'Kubwa', 'Idu', 'Lugbe', 'Kuje', 'Airport Road', 'Karashi', 'Orozo', 'Masaka', 'Giri', 'Madalla', 'Zuba'].map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </optgroup>
                      <optgroup label="₦5,000">
                        {['Dutse', 'Gwaripa', 'Dawaki', 'Jabi', 'Jahi', 'Utako', 'Mabushi', 'Ado', 'Life Camp', 'Katampe', 'Katampe Extension', 'Galadimawa', 'Galadima'].map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </optgroup>
                      <optgroup label="₦4,000">
                        {['Gudu', 'Apo', 'Garki', 'Maitama', 'Asokoro', 'Papei', 'Maraba', 'Abacha Road', 'City College', 'Nyanya', 'Kpegyi', 'Jikwoyi', 'Karu', 'New Karu', 'New Nyanya'].map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </optgroup>
                      <optgroup label="₦8,000">
                        {['Gwagwalada', 'Kwali', 'Suleja', 'Abaji'].map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </optgroup>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" size={18} />
                  </div>
                </div>

                {checkout.deliveryArea && deliveryFee > 0 && (
                  <div className="form-control mt-4">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-success"
                        checked={checkout.useDeliveryDiscount}
                        onChange={checkout.toggleDeliveryDiscount}
                      />
                      <span className="label-text font-medium">
                        Apply 50% OFF delivery fee
                        {checkout.useDeliveryDiscount && (
                          <span className="text-success ml-2">
                            (save ₦{(deliveryFee).toLocaleString()})
                          </span>
                        )}
                      </span>
                    </label>
                  </div>
                )}

                <div className="text-sm opacity-70 mt-2">
                  Current delivery fee: <strong>₦{deliveryFee.toLocaleString()}</strong>
                  {checkout.useDeliveryDiscount && <span className="text-success ml-2">(50% discount applied)</span>}
                </div>
              </>
            )}
          </div>

          <div className="modal-action mt-8 flex flex-col sm:flex-row gap-4">
            <button
              className="btn btn-ghost flex-1 text-[8px] md:text-sm"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting || uploadingReceipt}
            >
              <Backpack size={18} /> Back to Cart
            </button>

            <button
              className="btn btn-outline flex-1 gap-2 text-[8px] md:text-sm"
              onClick={() => setShowBankModal(true)}
              disabled={!isFormValid || cartItems.length === 0 || isSubmitting}
            >
              <Banknote size={18} />
              Bank Transfer
            </button>

            <PaystackButton {...paystackProps} />
          </div>
        </div>
      </div>

      {/* Bank Transfer Modal */}
      <div className={`modal ${showBankModal ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[8px] md:text-sm">
            <Banknote size={24} /> Bank Transfer Payment
          </h3>

          <div className="bg-base-200 p-4 rounded-lg mb-6">
            <p className="font-medium mb-2">{`Please transfer ₦${total.toLocaleString()} to:`}</p>
            <p><strong>Account Number:</strong> 0130385926</p>
            <p><strong>Account Name:</strong> C-Chu Media LTD.</p>
            <p className="text-sm mt-3 text-warning">
              Include your email or phone number in the narration for faster confirmation.
            </p>
          </div>

          <div className="mb-6">
            <label className="label">Upload Payment Receipt (image / pdf)</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
              disabled={uploadingReceipt}
            />
            {receiptFile && (
              <p className="text-xs mt-2 opacity-70">
                Selected: {receiptFile.name} ({(receiptFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => {
                setShowBankModal(false);
                setReceiptFile(null);
              }}
              disabled={uploadingReceipt}
            >
              <X size={16} /> Cancel
            </button>

            <button
              className="btn btn-primary gap-2"
              onClick={handleBankTransferConfirm}
              disabled={!receiptFile || uploadingReceipt}
            >
              {uploadingReceipt ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span> Uploading...
                </>
              ) : (
                <>
                  <Check size={16} /> Place Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}