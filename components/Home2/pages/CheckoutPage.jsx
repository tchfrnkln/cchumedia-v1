'use client';
import { useState, useEffect, useMemo } from 'react';
import { useStore } from '../../../lib/store';
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS, CONFIG, formatNaira } from '../../../lib/data';
import Button from '../ui/Button';
import { Banknote, Check, X } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { PaystackButton } from '@/components/Dashboard/Checkout/CheckOutPage';

export default function CheckoutPage() {
  const { cart, user, navigate, placeOrder, getCartTotal, showToast, clearCart } = useStore();

  const [delivery, setDelivery] = useState(null);
  const [payment, setPayment] = useState(null);
  const [useLoyalty, setUseLoyalty] = useState(false);
  const [notes, setNotes] = useState('');
  const [contact, setContact] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || ''
  });

  const [done, setDone] = useState(null);
  const [showBankModal, setShowBankModal] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize delivery and payment options
  useEffect(() => {
    if (Array.isArray(DELIVERY_OPTIONS) && DELIVERY_OPTIONS.length > 0 && !delivery) {
      setDelivery(DELIVERY_OPTIONS[0]);
    }
    if (Array.isArray(PAYMENT_OPTIONS) && PAYMENT_OPTIONS.length > 0 && !payment) {
      setPayment(PAYMENT_OPTIONS[0]);
    }
  }, []);

  const subtotal = getCartTotal();
  const loyaltyPts = user?.loyaltyPoints || 0;
  const loyaltyDisc = useLoyalty ? Math.min(loyaltyPts, subtotal) : 0;
  const deliveryFee = delivery?.fee || 0;
  const tax = Math.round(subtotal * 0.075);
  const customDesignFee = 5000;
  const designItems = cart.filter(
    item => item.designData?.type === 'design-for-me'
  ).length;
  const totalCustomDesignFee = customDesignFee * designItems; 
  const total = subtotal - loyaltyDisc + deliveryFee + tax + totalCustomDesignFee;
  

  const inp = 'w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 transition-all';

  const handlePlace = () => {
    if (!delivery || !payment) {
      showToast('Please select delivery and payment methods', 'error');
      return;
    }

    if (delivery.id !== "pickup" && (!contact.address || contact.address.length < 10)) {
      showToast('Please enter a valid delivery address', 'error');
      return;
    }

    if (!contact.name || !contact.phone) {
      showToast('Please enter your name and phone number', 'error');
      return;
    }

    // Show bank transfer modal
    if (payment.id === 'transfer') {
      setShowBankModal(true);
      return;
    }else if(payment.id === 'whatsapp'){

    }

    // Process other payment methods
    // const res = placeOrder({
    //   delivery: { ...delivery, ...contact },
    //   payment,
    //   loyaltyPointsUsed: useLoyalty ? loyaltyPts : 0,
    //   notes
    // });

    // if (res?.error) {
    //   showToast(res.error, 'error');
    //   return;
    // }

    // setDone(res.order);
  };

  const getButtonText = (paymentId) => {
    switch (paymentId) {
      case 'transfer': return 'Upload Receipt →';
      case 'paystack': return 'Pay Now →';
      case 'whatsapp': return 'Continue →';
      default: return 'Confirm Order';
    }
  };

  const handleBankTransferConfirm = async () => {
    if (!receiptFile) {
      showToast('Please upload payment receipt', 'error');
      return;
    }

    setUploadingReceipt(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const fileExt = receiptFile.name.split('.').pop() || 'jpg';
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
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
      const userId = user?.id || null;

      // return console.log("Delivery", delivery);
      

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          paystack_reference: "Bank Transfer",
          payment_method: "bank_transfer",
          receipt_url: urlData.publicUrl || null,
          first_name: contact.name.trim(),
          last_name: 'N/A',
          email: contact.email.trim(),
          phone: contact.phone.trim(),
          shipping_method: delivery.id === 'pickup' ? delivery.id : 'home',
          address_line1: contact.address.trim(),
          address_line2: delivery.label,
          state: 'N/A',
          delivery_area: delivery.id,
          subtotal,
          tax_amount: tax,
          delivery_fee: deliveryFee,
          custom_design_fee: totalCustomDesignFee,
          total_amount: total,
          status: 'pending',
        })
        .select('id')
        .single();

      if (orderError || !order?.id) throw orderError || new Error("Failed to create order");

      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        name: item.name || 'Unnamed product',
        price: (item.total/item.qty) ?? 0,
        quantity: item.qty,
        specs: item.config || null,
        design: item.designData || null,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      showToast('Order placed successfully!', 'success');
      setShowBankModal(false);
      setReceiptFile(null);
      clearCart();
      setDone(order)

      // TODO: Place the actual order here after successful receipt upload
    } catch (error) {
      console.log("Failed to upload receipt", error);
      showToast('Failed to upload receipt. Please try again.', 'error');
    } finally {
      setUploadingReceipt(false);
    }
  };

  const handlePayStackSuccess = async (paystackReference) => {
    handlePlace();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || null;


      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          paystack_reference: paystackReference,
          payment_method: 'paystack',
          first_name: contact.name.trim(),
          last_name: 'N/A',
          email: contact.email.trim(),
          phone: contact.phone.trim(),
          shipping_method: delivery.id === 'pickup' ? delivery.id : 'home',
          address_line1: contact.address.trim(),
          address_line2: delivery.label,
          state: 'N/A',
          delivery_area: delivery.id,
          subtotal,
          tax_amount: tax,
          delivery_fee: deliveryFee,
          custom_design_fee: totalCustomDesignFee,
          total_amount: total,
          status: 'paid',
        })
        .select('id')
        .single();

      if (orderError || !order?.id) throw orderError || new Error("Failed to create order");

      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        name: item.name || 'Unnamed product',
        price: (item.total/item.qty) ?? 0,
        quantity: item.qty,
        specs: item.config || null,
        design: item.designData || null,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      showToast(`Payment successful! Order #${order.id} created.`, 'success');
      clearCart();
      setDone(order)
    } catch (err) {
      console.error(err);
      showToast(
        `Payment succeeded but order creation failed.\n` +
        `Reference: ${paystackReference}\n` +
        `Error: ${err?.message || 'Unknown error'}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const reference = useMemo(() => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }, []);

  const paystackConfig = {
    reference,
    email: contact.email.trim(),
    amount: Math.round(total * 100),
    publicKey: 'pk_test_a361ebecc9edf1b3af278b0b42e9b037a668c872',
    currency: 'NGN',
    firstname: contact.name.trim(),
    lastname: '',
    phone: contact.phone.trim(),
    metadata: {
      custom_fields: [
        { display_name: 'Shipping Method', variable_name: 'shipping_method', value: delivery?.id },
        { display_name: 'Delivery Area', variable_name: 'delivery_area', value: contact.address },
      ],
    },
  };

    const isFormValid =
    contact.name.trim() !== '' &&
    contact.email.trim() !== '' &&
    contact.phone.trim() !== '';

  const paystackProps = {
    ...paystackConfig,
    text: isSubmitting ? 'Processing...' : 'Pay with Paystack',
    onSuccess: (response) => handlePayStackSuccess(response.reference),
    onClose: () => {
      if (!isSubmitting) showToast('Payment window closed');
    },
    disabled: !isFormValid || cart.length === 0 || isSubmitting,
    className: `btn ${isFormValid && !isSubmitting && cart.length > 0 ? 'btn-primary' : 'btn-disabled'} bg-brand border-0 shadow-none mt-6 w-full rounded-full cursor-pointer disabled:text-gray-400 disabled:bg-brand-light`,
  };

  if (done) {
    return (
      <div className="max-w-[1380px] mx-auto px-6 py-20 text-center animate-fade-in">
        <div className="text-7xl mb-4">🎉</div>
        <h2 className="font-display font-black text-3xl mb-3">Order Placed!</h2>
        <p className="text-gray-500 mb-2">Order #{done?.id?.toUpperCase()}</p>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Thank you! We&apos;ll confirm your order shortly. Check WhatsApp or email for updates.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            href={CONFIG.wa(`Hi! My order #${done?.id?.toUpperCase()}`)} 
            target="_blank" 
            variant="wa"
          >
            💬 Send Payment Proof
          </Button>
          <Button variant="outline" onClick={() => navigate(user ? 'account' : 'home')}>
            {user ? 'View My Orders' : 'Back to Home'}
          </Button>
        </div>
      </div>
    );
  }

  if (!cart?.length) {
    return (
      <div className="max-w-[1380px] mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-display font-black text-2xl mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('shop')}>Browse Products</Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-4">
        <div className="max-w-[1380px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
            <button onClick={() => navigate('home')} className="hover:text-brand">Home</button>
            <span>›</span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">Checkout</span>
          </div>
          <h1 className="font-display font-black text-2xl">Checkout</h1>
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="font-display font-black text-base mb-4">👤 Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  className={inp} 
                  placeholder="Full Name *" 
                  value={contact.name} 
                  onChange={e => setContact(c => ({...c, name: e.target.value}))} 
                />
                <input 
                  className={inp} 
                  type="tel" 
                  placeholder="Phone *" 
                  value={contact.phone} 
                  onChange={e => setContact(c => ({...c, phone: e.target.value}))} 
                />
              </div>
              <input 
                className={`${inp} mt-3`} 
                type="email" 
                placeholder="Email" 
                value={contact.email} 
                onChange={e => setContact(c => ({...c, email: e.target.value}))} 
              />
              <input 
                className={`${inp} mt-3`} 
                type="text" 
                placeholder="Delivery Address" 
                value={contact.address} 
                onChange={e => setContact(c => ({...c, address: e.target.value}))} 
              />
              {!user && (
                <p className="text-xs text-gray-400 mt-2">
                  <button onClick={() => useStore.getState().openModal('auth')} className="text-brand font-bold hover:underline">
                    Login or register
                  </button> to earn loyalty points and track orders.
                </p>
              )}
            </section>

            {/* Delivery Method */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="font-display font-black text-base mb-4">🚚 Delivery Method</h3>
              <div className="space-y-2">
                {Array.isArray(DELIVERY_OPTIONS) && DELIVERY_OPTIONS.length > 0 ? (
                  DELIVERY_OPTIONS.map(opt => (
                    <button 
                      key={opt.id} 
                      onClick={() => setDelivery(opt)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        delivery?.id === opt.id ? 'border-brand bg-red-50 dark:bg-red-950' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-display font-bold text-sm">{opt.icon} {opt.label}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{opt.sub}</div>
                        </div>
                        <div className={`font-display font-black text-sm ${opt.fee === 0 ? 'text-green-600' : 'text-brand'}`}>
                          {opt.fee === 0 ? 'FREE' : formatNaira(opt.fee)}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-red-500 p-4">Delivery options unavailable.</p>
                )}
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="font-display font-black text-base mb-4">💳 Payment Method</h3>
              <div className="space-y-2 mb-4">
                {Array.isArray(PAYMENT_OPTIONS) && PAYMENT_OPTIONS.length > 0 ? (
                  PAYMENT_OPTIONS.map(opt => (
                    <button 
                      key={opt.id} 
                      onClick={() => setPayment(opt)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        payment?.id === opt.id ? 'border-brand bg-red-50 dark:bg-red-950' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-display font-bold text-sm">{opt.icon} {opt.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{opt.sub}</div>
                    </button>
                  ))
                ) : (
                  <p className="text-red-500 p-4">Payment options unavailable.</p>
                )}
              </div>

              {payment?.id === 'transfer' && (
                <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300">
                  <div className="font-bold mb-1">Bank Details:</div>
                  <div>GTBank · 0123456789 · C-Chu Media Ltd</div>
                  <div className="text-xs mt-1 text-blue-500">Send proof of payment to our WhatsApp after placing order.</div>
                </div>
              )}
            </section>

            {/* Order Notes */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="font-display font-black text-base mb-4">📝 Order Notes</h3>
              <textarea 
                className={`${inp} resize-none`} 
                rows={3} 
                placeholder="Any special instructions, design notes, or requests..."
                value={notes} 
                onChange={e => setNotes(e.target.value)} 
              />
            </section>
          </div>

          {/* Right Column - Summary */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sticky top-28">
              <h3 className="font-display font-black text-base mb-4">📋 Order Summary</h3>

              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.cartId} className="flex items-center gap-3 text-sm">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-gray-400 text-xs">Qty: {item.qty}</div>
                    </div>
                    <span className="font-bold">{formatNaira(item.total)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatNaira(subtotal)}</span></div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                    {deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Design Fee</span>
                  <span className={customDesignFee === 0 ? 'text-green-600' : ''}>
                    {customDesignFee === 0 ? 'FREE' : formatNaira(totalCustomDesignFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span className={tax === 0 ? 'text-green-600' : ''}>
                    {tax === 0 ? 'FREE' : formatNaira(tax)}
                  </span>
                </div>

                {user && loyaltyPts > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-950 rounded-xl p-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={useLoyalty} 
                        onChange={e => setUseLoyalty(e.target.checked)} 
                        className="accent-brand" 
                      />
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                        ⭐ Use {loyaltyPts.toLocaleString()} points (-{formatNaira(Math.min(loyaltyPts, subtotal))})
                      </span>
                    </label>
                  </div>
                )}

                {loyaltyDisc > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Loyalty discount</span>
                    <span>-{formatNaira(loyaltyDisc)}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-display font-black border-t border-gray-100 dark:border-gray-800 pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-brand">{formatNaira(total)}</span>
                </div>
              </div>

              {payment?.id !== 'paystack' ?<Button className="w-full mt-6" onClick={handlePlace} disabled={!delivery || !payment}>
                {payment ? getButtonText(payment.id) : 'Confirm Order'}
              </Button> : <PaystackButton {...paystackProps} />}

              <p className="text-xs text-center text-gray-400 mt-3">
                🔒 Your information is safe and secure
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Transfer Modal - Works on all screen sizes */}
      {showBankModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md shadow-2xl">
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Banknote size={24} /> Bank Transfer Payment
              </h3>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-xl mb-6">
                <p className="font-medium mb-2">{`Please transfer ₦${total.toLocaleString()} to:`}</p>
                <p><strong>Account Number:</strong> 0130385926</p>
                <p><strong>Account Name:</strong> C-Chu Media LTD.</p>
                <p className="text-sm mt-3 text-amber-600 dark:text-amber-400">
                  Include your email or phone number in the narration for faster confirmation.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Upload Payment Receipt (image / pdf)</label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                  disabled={uploadingReceipt}
                />
              </div>

              <div className="flex gap-3 justify-end">
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
                    <>Uploading...</>
                  ) : (
                    <>
                      <Check size={16} /> Confirm & Place Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}