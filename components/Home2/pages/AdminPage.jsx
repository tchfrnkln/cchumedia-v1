'use client';
import { useState } from 'react';
import { useStore } from '../../../lib/store';
import { PRODUCTS, CATEGORIES, formatNaira } from '../../../lib/data';
import { DB } from '../../../lib/db';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useUserRoleStore } from '@/store/authRole';
import { useAuthStore } from '@/store/authStore';

const STATUS_OPTS = ['Pending Payment','Confirmed','Design Review','In Production','Ready','Delivered','Cancelled'];
const STATUS_COLORS = { 'Pending Payment':'orange','Confirmed':'blue','Design Review':'accent','In Production':'accent','Ready':'green','Delivered':'green','Cancelled':'dark' };

export default function AdminPage() {
  const { navigate, adminTab, updateOrderStatus } = useStore();
  const setTab = (t) => useStore.setState({ adminTab: t });
  const { role } = useUserRoleStore();
  const { user } = useAuthStore()

  console.log("user", user);
  

  if (role !== 'admin' && role !== 'staff') return (
    <div className="max-w-[1380px] mx-auto px-6 py-20 text-center">
      <div className="text-5xl mb-4">🔒</div>
      <h2 className="font-display font-black text-2xl mb-4">Admin Access Required</h2>
      <Button onClick={() => useStore.getState().openModal('auth')}>Login as Admin</Button>
    </div>
  );

  const navItems = [
    ['dashboard','📊','Dashboard'],['orders','📦','Orders'],
    ['products','🛒','Products'],['customers','👥','Customers'],
  ];

  return (
    <div className="flex min-h-screen animate-fade-in">
      {/* Sidebar */}
      <nav className="w-52 bg-gray-900 text-white shrink-0 flex flex-col">
        <div className="px-4 py-5 border-b border-gray-800">
          <div className="font-display font-black text-sm">⚙️ Admin Panel</div>
          <div className="text-gray-400 text-xs mt-0.5">{user?.user_metadata.full_name}</div>
        </div>
        <div className="flex-1">
          {navItems.map(([id, ic, lbl]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors text-left ${adminTab === id ? 'bg-brand text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
              {ic} {lbl}
            </button>
          ))}
        </div>
        <div className="border-t border-gray-800 p-2">
          <button onClick={() => navigate('home')}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors">
            🏠 Back to Site
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto p-6">
        {adminTab === 'dashboard' && <AdminDashboard />}
        {adminTab === 'orders' && <AdminOrders updateOrderStatus={updateOrderStatus} />}
        {adminTab === 'products' && <AdminProducts />}
        {adminTab === 'customers' && <AdminCustomers />}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color = 'brand' }) {
  const clr = { brand:'bg-red-50 dark:bg-red-950 text-brand', green:'bg-green-50 dark:bg-green-950 text-green-600', blue:'bg-blue-50 dark:bg-blue-950 text-blue-600', amber:'bg-amber-50 dark:bg-amber-950 text-amber-600' };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${clr[color]}`}>{icon}</div>
      <div className="font-display font-black text-2xl">{value}</div>
      <div className="text-sm text-gray-500 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

function AdminDashboard() {
  const orders = useStore(s => s.getAllOrders)();
  const customers = DB.query('users', u => u.role !== 'admin');
  const totalRev = orders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0);
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString());
  const pending = orders.filter(o => ['Pending Payment','Confirmed','Design Review','In Production'].includes(o.status));

  return (
    <div>
      <h1 className="font-display font-black text-2xl mb-6">📊 Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="💰" label="Total Revenue" value={formatNaira(totalRev)} color="green" />
        <StatCard icon="📦" label="Total Orders" value={orders.length} sub={`${pending.length} pending`} color="blue" />
        <StatCard icon="👥" label="Customers" value={customers.length} color="amber" />
        <StatCard icon="🗓️" label="Today's Orders" value={todayOrders.length} color="brand" />
      </div>

      <h2 className="font-display font-black text-base mb-3">Recent Orders</h2>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {orders.slice(0, 5).map(order => (
          <div key={order.id} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
            <div>
              <div className="font-display font-bold text-sm">#{order.id.toUpperCase()}</div>
              <div className="text-xs text-gray-400">{order.customerName} · {new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={STATUS_COLORS[order.status] || 'accent'}>{order.status}</Badge>
              <span className="font-display font-black text-brand text-sm">{formatNaira(order.total)}</span>
            </div>
          </div>
        ))}
        {orders.length === 0 && <div className="py-10 text-center text-gray-400 text-sm">No orders yet</div>}
      </div>
    </div>
  );
}

function AdminOrders({ updateOrderStatus }) {
  const orders = useStore(s => s.getAllOrders)();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div>
      <h1 className="font-display font-black text-2xl mb-4">📦 Orders</h1>
      <div className="flex gap-2 flex-wrap mb-4">
        <button onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === 'all' ? 'bg-brand text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-brand'}`}>
          All ({orders.length})
        </button>
        {STATUS_OPTS.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === s ? 'bg-brand text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-brand'}`}>
            {s} ({orders.filter(o => o.status === s).length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(order => (
          <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
              <div>
                <div className="font-display font-black text-sm">#{order.id.toUpperCase()}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {order.customerName} · {order.customerPhone} · {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={order.status}
                  onChange={e => { updateOrderStatus(order.id, e.target.value); useStore.getState().showToast('Order updated', 'success'); }}
                  className="text-xs font-bold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 outline-none focus:border-brand"
                >
                  {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="font-display font-black text-brand">{formatNaira(order.total)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {order.items.map(item => (
                <span key={item.cartId} className="text-xs bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg">
                  {item.icon} {item.name} ×{item.qty}
                </span>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-gray-400">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
}

function AdminProducts() {
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  return (
    <div>
      <h1 className="font-display font-black text-2xl mb-4">🛒 Products ({PRODUCTS.length})</h1>
      <div className="flex gap-2 flex-wrap mb-4">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${cat === c.id ? 'bg-brand text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-brand'}`}>
            {c.icon} {c.label.split(' ')[0]}
          </button>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-2">Product</div><div>Category</div><div>Price</div><div>Reviews</div>
        </div>
        {filtered.map(p => (
          <div key={p.id} className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0 items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="col-span-2 flex items-center gap-2">
              <span className="text-xl">{p.icon}</span>
              <span className="text-sm font-medium truncate">{p.name}</span>
            </div>
            <div className="text-xs text-gray-500">{p.cat}</div>
            <div className="font-bold text-brand text-sm">{formatNaira(p.basePrice)}</div>
            <div className="text-xs text-gray-400">⭐ {p.rating} ({p.reviews})</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminCustomers() {
  const customers = DB.query('users', u => u.role !== 'admin');
  const orders = useStore(s => s.getAllOrders)();
  return (
    <div>
      <h1 className="font-display font-black text-2xl mb-4">👥 Customers ({customers.length})</h1>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {customers.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No customers yet</div>
        ) : customers.map(c => {
          const custOrders = orders.filter(o => o.userId === c.id);
          const spent = custOrders.reduce((s, o) => s + o.total, 0);
          return (
            <div key={c.id} className="flex items-center justify-between px-5 py-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand text-white rounded-xl flex items-center justify-center font-black text-sm">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-sm">{c.name}</div>
                  <div className="text-xs text-gray-400">{c.email} · {c.phone || 'No phone'}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display font-black text-brand text-sm">{formatNaira(spent)}</div>
                <div className="text-xs text-gray-400">{custOrders.length} orders · ⭐ {c.loyaltyPoints || 0} pts</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
