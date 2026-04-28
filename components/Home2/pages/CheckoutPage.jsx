'use client';
import { useState } from 'react';
import { useStore } from '../../../lib/store';
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS, CONFIG, formatNaira } from '../../../lib/data';
import Button from '../ui/Button';

export default function CheckoutPage() {
  const { cart, user, navigate, placeOrder, getCartTotal, showToast } = useStore();
  const [delivery, setDelivery] = useState(DELIVERY_OPTIONS[0]);
  const [payment, setPayment] = useState(PAYMENT_OPTIONS[0]);
  const [useLoyalty, setUseLoyalty] = useState(false);
  const [notes, setNotes] = useState('');
  const [contact, setContact] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '' });
  const [done, setDone] = useState(null);

  if (!cart.length) return (
    <div className="max-w-[1380px] mx-auto px-6 py-20 text-center">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="font-display font-black text-2xl mb-4">Your cart is empty</h2>
      <Button onClick={() => navigate('shop')}>Browse Products</Button>
    </div>
  );

  const subtotal = getCartTotal();
  const loyaltyPts = user?.loyaltyPoints || 0;
  const loyaltyDisc = useLoyalty ? Math.min(loyaltyPts, subtotal) : 0;
  const total = subtotal - loyaltyDisc + (delivery?.fee || 0);

  const inp = 'w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 transition-all';

  const handlePlace = () => {
    if (!contact.name || !contact.phone) { showToast('Please enter your name and phone', 'error'); return; }
    const res = placeOrder({ delivery: { ...delivery, ...contact }, payment, loyaltyPointsUsed: useLoyalty ? loyaltyPts : 0, notes });
    if (res.error) { showToast(res.error, 'error'); return; }
    setDone(res.order);
  };

  if (done) return (
    <div className="max-w-[1380px] mx-auto px-6 py-20 text-center animate-fade-in">
      <div className="text-7xl mb-4">🎉</div>
      <h2 className="font-display font-black text-3xl mb-3">Order Placed!</h2>
      <p className="text-gray-500 mb-2">Order #{done.id.toUpperCase()}</p>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Thank you! We&apos;ll confirm your order shortly. Check WhatsApp or email for updates.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button href={CONFIG.wa(`Hi! My order #${done.id.toUpperCase()} total ₦${done.total.toLocaleString()}`)} target="_blank" variant="wa">
          💬 Send Payment Proof
        </Button>
        <Button variant="outline" onClick={() => navigate(user ? 'account' : 'home')}>
          {user ? 'View My Orders' : 'Back to Home'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-4">
        <div className="max-w-[1380px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
            <button onClick={() => navigate('home')} className="hover:text-brand">Home</button>
            <span>›</span><span className="text-gray-700 dark:text-gray-200 font-medium">Checkout</span>
          </div>
          <h1 className="font-display font-black text-2xl">Checkout</h1>
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="font-display font-black text-base mb-4">👤 Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className={inp} placeholder="Full Name *" value={contact.name} onChange={e => setContact(c => ({...c, name: e.target.value}))} />
                <input className={inp} type="tel" placeholder="Phone *" value={contact.phone} onChange={e => setContact(c => ({...c, phone: e.target.value}))} />
              </div>
              <input className={`${inp} mt-3`} type="email" placeholder="Email" value={contact.email} onChange={e => setContact(c => ({...c, email: e.target.value}))} />
              {!user && (
                <p className="text-xs text-gray-400 mt-2">
                  <button onClick={() => useStore.getState().openModal('auth')} className="text-brand font-bold hover:underline">Login or register</button> to earn loyalty points and track your order.
                </p>
              )}
            </section>

            {/* Delivery */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="font-display font-black text-base mb-4">🚚 Delivery Method</h3>
              <div className="space-y-2">
                {DELIVERY_OPTIONS.map(opt => (
                  <button key={opt.id} onClick={() => setDelivery(opt)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${delivery?.id === opt.id ? 'border-brand bg-red-50 dark:bg-red-950' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
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
                ))}
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="font-display font-black text-base mb-4">💳 Payment Method</h3>
              <div className="space-y-2 mb-4">
                {PAYMENT_OPTIONS.map(opt => (
                  <button key={opt.id} onClick={() => setPayment(opt)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${payment?.id === opt.id ? 'border-brand bg-red-50 dark:bg-red-950' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                    <div className="font-display font-bold text-sm">{opt.icon} {opt.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
              {payment?.id === 'transfer' && (
                <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300">
                  <div className="font-bold mb-1">Bank Details:</div>
                  <div>GTBank · 0123456789 · C-Chu Media Ltd</div>
                  <div className="text-xs mt-1 text-blue-500">Send proof of payment to our WhatsApp after placing order.</div>
                </div>
              )}
            </section>

            {/* Notes */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="font-display font-black text-base mb-4">📝 Order Notes</h3>
              <textarea className={`${inp} resize-none`} rows={3} placeholder="Any special instructions, design notes, or requests..."
                value={notes} onChange={e => setNotes(e.target.value)} />
            </section>
          </div>

          {/* Right: Summary */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sticky top-28">
              <h3 className="font-display font-black text-base mb-4">📋 Order Summary</h3>

              {/* Cart items */}
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
                <div className="flex justify-between"><span className="text-gray-500">Delivery</span><span className={delivery?.fee === 0 ? 'text-green-600' : ''}>{delivery?.fee === 0 ? 'FREE' : formatNaira(delivery?.fee || 0)}</span></div>

                {/* Loyalty points */}
                {user && loyaltyPts > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-950 rounded-xl p-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={useLoyalty} onChange={e => setUseLoyalty(e.target.checked)} className="accent-brand" />
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                        ⭐ Use {loyaltyPts.toLocaleString()} points (-{formatNaira(Math.min(loyaltyPts, subtotal))})
                      </span>
                    </label>
                  </div>
                )}

                {loyaltyDisc > 0 && (
                  <div className="flex justify-between text-green-600"><span>Loyalty discount</span><span>-{formatNaira(loyaltyDisc)}</span></div>
                )}

                <div className="flex justify-between text-lg font-display font-black border-t border-gray-100 dark:border-gray-800 pt-2 mt-2">
                  <span>Total</span><span className="text-brand">{formatNaira(total)}</span>
                </div>
              </div>

              <Button className="w-full mt-4" onClick={handlePlace}>
                Place Order →
              </Button>

              <p className="text-xs text-center text-gray-400 mt-3">
                🔒 Your information is safe and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
