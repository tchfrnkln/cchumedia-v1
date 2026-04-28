'use client';
import { useState } from 'react';
import { useStore } from '../../../lib/store';
import { PRODUCTS, formatNaira } from '../../../lib/data';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ProductCard from '../ui/ProductCard';

const STATUS_COLORS = {
  'Pending Payment': 'orange', 'Confirmed': 'blue', 'Design Review': 'accent',
  'In Production': 'accent', 'Ready': 'green', 'Delivered': 'green', 'Cancelled': 'dark',
};

export default function AccountPage() {
  const { user, navigate, openModal, logout, getUserOrders, wishlist, updateProfile, showToast } = useStore();
  const tab = useStore(s => s.route.params?.tab) || 'orders';
  const setTab = (t) => navigate('account', { tab: t });

  if (!user) return (
    <div className="max-w-[1380px] mx-auto px-6 py-20 text-center">
      <div className="text-6xl mb-4">👤</div>
      <h2 className="font-display font-black text-2xl mb-4">Login to Your Account</h2>
      <p className="text-gray-500 mb-6">Track orders, earn loyalty points, save designs and more.</p>
      <Button onClick={() => openModal('auth')}>Login / Register</Button>
    </div>
  );

  const orders = getUserOrders();
  const wishedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const tabs = [
    { id: 'orders', icon: '📦', label: 'My Orders' },
    { id: 'loyalty', icon: '⭐', label: 'Loyalty' },
    { id: 'wishlist', icon: '❤️', label: 'Wishlist' },
    { id: 'profile', icon: '⚙️', label: 'Profile' },
    ...(user.role === 'admin' ? [{ id: 'admin-link', icon: '🔧', label: 'Admin' }] : []),
  ];

  return (
    <div className="animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-4">
        <div className="max-w-[1380px] mx-auto px-6">
          <h1 className="font-display font-black text-2xl">My Account</h1>
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside>
            <div className="bg-gradient-to-br from-brand to-brand-dark rounded-2xl p-5 text-white mb-4 text-center">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-3">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="font-display font-black text-base">{user.name}</div>
              <div className="text-white/70 text-xs mt-1">{user.email}</div>
              <div className="mt-3 bg-white/15 rounded-xl p-2.5 flex items-center justify-center gap-2">
                <span className="text-xl">⭐</span>
                <div>
                  <div className="font-display font-black text-base leading-none">{(user.loyaltyPoints || 0).toLocaleString()}</div>
                  <div className="text-white/60 text-[10px]">Loyalty Points</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              {tabs.map(t => (
                <button key={t.id}
                  onClick={() => t.id === 'admin-link' ? navigate('admin') : setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0 ${tab === t.id ? 'bg-red-50 dark:bg-red-950 text-brand font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  <span>{t.icon}</span>{t.label}
                </button>
              ))}
              <button onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                🚪 Logout
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {tab === 'orders' && (
              <div>
                <h2 className="font-display font-black text-xl mb-4">📦 My Orders</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="text-5xl mb-3">📦</div>
                    <p className="font-display font-bold text-lg mb-2">No orders yet</p>
                    <p className="text-gray-400 text-sm mb-4">Your orders will appear here.</p>
                    <Button size="sm" onClick={() => navigate('shop')}>Shop Now</Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map(order => (
                      <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                        <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                          <div>
                            <div className="font-display font-black text-sm">Order #{order.id.toUpperCase()}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-NG', { day:'numeric', month:'short', year:'numeric' })}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={STATUS_COLORS[order.status] || 'accent'}>{order.status}</Badge>
                            <span className="font-display font-black text-brand">{formatNaira(order.total)}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map(item => (
                            <span key={item.cartId} className="text-xs bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg">
                              {item.icon} {item.name} ×{item.qty}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'loyalty' && (
              <div>
                <h2 className="font-display font-black text-xl mb-4">⭐ Loyalty Points</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-6 text-white text-center">
                    <div className="text-3xl mb-1">⭐</div>
                    <div className="font-display font-black text-3xl">{(user.loyaltyPoints || 0).toLocaleString()}</div>
                    <div className="text-white/70 text-xs mt-1">Available Points</div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 text-center">
                    <div className="text-3xl mb-1">💰</div>
                    <div className="font-display font-black text-3xl text-brand">{formatNaira(user.loyaltyPoints || 0)}</div>
                    <div className="text-gray-400 text-xs mt-1">Cash Value (1pt = ₦1)</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                  <h3 className="font-display font-black text-base mb-3">How it works</h3>
                  {[
                    ['🛒', 'Earn Points', 'Get 2% of every order value as loyalty points'],
                    ['⭐', 'Redeem Points', 'Use points as discount at checkout (1 point = ₦1)'],
                    ['🎁', 'Bonus Points', 'Earn extra points on first orders and referrals'],
                  ].map(([ic, t, d]) => (
                    <div key={t} className="flex gap-3 mb-3 last:mb-0">
                      <span className="text-xl">{ic}</span>
                      <div><div className="font-bold text-sm">{t}</div><div className="text-gray-400 text-xs">{d}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'wishlist' && (
              <div>
                <h2 className="font-display font-black text-xl mb-4">❤️ My Wishlist</h2>
                {wishedProducts.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="text-5xl mb-3">❤️</div>
                    <p className="font-display font-bold text-lg mb-2">Your wishlist is empty</p>
                    <Button size="sm" onClick={() => navigate('shop')}>Browse Products</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {wishedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                )}
              </div>
            )}

            {tab === 'profile' && (
              <ProfileTab user={user} updateProfile={updateProfile} showToast={showToast} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ user, updateProfile, showToast }) {
  const [form, setForm] = useState({ name: user.name, phone: user.phone || '', email: user.email });
  const inp = 'w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand transition-all';
  const save = () => { updateProfile(form); showToast('Profile updated!', 'success'); };
  return (
    <div>
      <h2 className="font-display font-black text-xl mb-4">⚙️ Profile Settings</h2>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
          <input className={inp} value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Email</label>
          <input className={inp} type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Phone</label>
          <input className={inp} type="tel" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
        </div>
        <Button onClick={save}>Save Changes</Button>
      </div>
    </div>
  );
}
