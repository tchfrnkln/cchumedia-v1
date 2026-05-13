// AdminDashboard.jsx  —  PrintHub Admin  (Next.js · Tailwind · Zustand)
// Usage:  import AdminDashboard from "@/components/AdminDashboard";
//         <AdminDashboard />
//
// Requires:  npm install zustand
// Peer deps: React 18+, Next.js 13+, Tailwind CSS v3 or v4

"use client";

import { useState, useEffect, useMemo } from "react";
import {
  useAdminStore,
  ALL_STATUSES,
  CATEGORIES,
  STATUS_STYLES,
  fmtNaira,
  initials,
} from "@/store/adminStaticStore";
import { useAdminOrdersStore } from "@/store/adminOrders";

// ─── TINY SHARED UI ───────────────────────────────────────────────────────────

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || { pill: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${s.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {status}
    </span>
  );
}

function SectionLabel({ children }) {
  return <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1.5">{children}</p>;
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 bg-gray-50 outline-none focus:border-red-500 focus:bg-white transition-colors ${className}`}
      {...props}
    />
  );
}

function Select({ className = "", children, ...props }) {
  return (
    <select
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 bg-gray-50 outline-none focus:border-red-500 transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

function Btn({ variant = "ghost", size = "md", className = "", children, ...props }) {
  const base = "inline-flex items-center justify-center gap-1.5 font-bold rounded-lg transition-colors cursor-pointer border";
  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white border-red-600",
    ghost:   "bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-100",
    outline: "bg-transparent hover:bg-gray-50 text-gray-600 border-gray-200",
    danger:  "bg-transparent hover:bg-red-50 text-red-600 border-red-200",
  };
  const sizes = { sm: "px-3 py-1.5 text-[12px]", md: "px-4 py-2 text-[13px]", xs: "px-2 py-1 text-[11px]" };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const h = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 z-[300] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-black text-base text-gray-900">{title}</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm transition-colors">✕</button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

// ─── TOASTS ───────────────────────────────────────────────────────────────────

function ToastContainer() {
  const toasts = useAdminStore((s) => s.toasts);
  const TYPE = { success: "bg-emerald-900", error: "bg-red-900", info: "bg-indigo-700" };
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[999] flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className={`${TYPE[t.type] || TYPE.info} text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-2xl pointer-events-auto`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

function Sidebar() {
  const { page, setPage, sidebarOpen, setSidebarOpen, orders } = useAdminStore();
  const pending = orders.filter((o) => ["Pending Payment", "Design Review"].includes(o.status)).length;
  const NAV = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "orders",    icon: "📦", label: "Orders",   badge: pending },
    { id: "products",  icon: "🛒", label: "Products" },
    { id: "customers", icon: "👥", label: "Customers" },
  ];
  const TOOLS = [
    { icon: "🎨", label: "Design Tool" },
    { icon: "⭐", label: "Loyalty Points" },
    { icon: "⚙️", label: "Settings" },
  ];
  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-[99] lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <nav className={`fixed top-0 left-0 bottom-0 w-[220px] bg-white border-r border-gray-100 flex flex-col z-[100] transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0`}>
        {/* Logo */}
        <div className="px-4 py-[18px] border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-[30px] h-[30px] bg-red-600 rounded-[7px] flex items-center justify-center text-white text-[15px] font-black flex-shrink-0">P</div>
            <div>
              <div className="font-black text-[15px] text-gray-900 leading-tight">PrintHub</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 py-2 overflow-y-auto">
          <div className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-widest text-gray-300">Main</div>
          {NAV.map(({ id, icon, label, badge }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`w-[calc(100%-16px)] mx-2 flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-bold transition-all ${page === id ? "bg-red-50 text-red-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
            >
              <span className="text-base w-5 text-center flex-shrink-0">{icon}</span>
              <span className="flex-1 text-left">{label}</span>
              {badge > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{badge}</span>
              )}
            </button>
          ))}

          <div className="px-3 pt-5 pb-1 text-[10px] font-black uppercase tracking-widest text-gray-300">Tools</div>
          {TOOLS.map(({ icon, label }) => (
            <button
              key={label}
              className="w-[calc(100%-16px)] mx-2 flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              <span className="text-base w-5 text-center flex-shrink-0">{icon}</span>
              <span className="text-left">{label}</span>
              <span className="ml-auto text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">Soon</span>
            </button>
          ))}
        </div>

        {/* User */}
        <div className="border-t border-gray-100 p-2">
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="w-[30px] h-[30px] rounded-full bg-red-600 text-white flex items-center justify-center text-[11px] font-black flex-shrink-0">SU</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-bold text-gray-800 truncate">Silas Umekwe</div>
              <div className="text-[10px] text-gray-400">Super Admin</div>
            </div>
            <span className="text-gray-300 text-xs">⋯</span>
          </div>
        </div>
      </nav>
    </>
  );
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────

function Topbar({ onNewOrder }) {
  const { sidebarOpen, setSidebarOpen, setPage, selectOrder, selectCustomer, orders, products, customers, toast } = useAdminStore();
  const [q, setQ] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;
    const ql = q.toLowerCase();
    const order = orders.find((o) => o.id.toLowerCase().includes(ql) || o.customer.toLowerCase().includes(ql));
    if (order) { setPage("orders"); selectOrder(order.id); setQ(""); return; }
    const prod = products.find((p) => p.name.toLowerCase().includes(ql));
    if (prod) { setPage("products"); setQ(""); return; }
    const cust = customers.find((c) => c.name.toLowerCase().includes(ql) || c.email.toLowerCase().includes(ql));
    if (cust) { setPage("customers"); selectCustomer(cust.id); setQ(""); return; }
    toast(`No results for "${q}"`, "error");
  }

  return (
    <header className="bg-white border-b border-gray-100 h-14 flex items-center px-4 md:px-6 gap-4 sticky top-0 z-50 flex-shrink-0">
      <button
        className="lg:hidden text-gray-500 hover:text-gray-800 p-1"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-8 flex-1 max-w-xs">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search orders, products, customers…"
          className="bg-transparent outline-none text-[13px] text-gray-700 placeholder-gray-400 w-full"
        />
      </form>

      <div className="ml-auto flex items-center gap-2">
        <button onClick={() => toast("No new notifications", "info")} className="relative w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
          🔔
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-600 rounded-full border border-white" />
        </button>
        <Btn variant="primary" size="sm" onClick={onNewOrder}>
          <span className="text-base leading-none">+</span>
          <span className="hidden sm:inline">New Order</span>
        </Btn>
      </div>
    </header>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

const ACTIVITY = [
  { dot: "bg-red-500",     text: "New order PH-R7K4M — Adaobi Nwosu, Roll-up banners ×2", time: "2 min ago" },
  { dot: "bg-blue-500",    text: "PH-X9P2N artwork approved — moved to In Production",     time: "14 min ago" },
  { dot: "bg-emerald-500", text: "PH-T3L8Q ready for pickup — customer notified",          time: "1 hr ago" },
  { dot: "bg-red-500",     text: "New customer registered — Grace Okonkwo",                time: "2 hr ago" },
  { dot: "bg-emerald-500", text: "PH-D4S5V delivered — 24 loyalty points awarded",         time: "3 hr ago" },
];
const CAT_COLORS = ["#D42B2B","#7B7EC8","#2563eb","#059669","#d97706","#0891b2"];
const CAT_LABELS = { banners:"Banners", apparel:"Apparel", flyers:"Flyers", books:"Books", signage:"Signage", souvenirs:"Souvenirs", cards:"Cards", campaign:"Campaign" };

function Dashboard() {
  const { orders, products, customers, setPage, selectOrder } = useAdminStore();
  const totalRev = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => ["Pending Payment","Design Review","In Production"].includes(o.status));

  const catRev = {};
  orders.filter((o) => o.status !== "Cancelled").forEach((o) =>
    o.items.forEach((i) => {
      const p = products.find((x) => x.name === i.name);
      const cat = p?.cat || "other";
      catRev[cat] = (catRev[cat] || 0) + i.price;
    })
  );
  const sorted = Object.entries(catRev).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxRev = sorted[0]?.[1] || 1;

  const STATS = [
    { icon:"💰", val:fmtNaira(totalRev),                               label:"Total revenue",     delta:"↑ +18% vs last month",  up:true  },
    { icon:"📦", val:orders.length,                                    label:"Total orders",       delta:"↑ +12% this month",     up:true  },
    { icon:"⏳", val:pending.length,                                   label:"Pending",            delta:"3 need design review",  up:false },
    { icon:"👥", val:customers.filter((c) => c.role !== "admin").length,label:"Customers",         delta:"↑ +27 new this month",  up:true  },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[22px] font-black text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Tuesday, 13 May 2026 · Welcome back, Silas</p>
        </div>
        <Btn variant="ghost" size="sm" onClick={() => setPage("orders")}>View all orders →</Btn>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-black text-gray-900">{s.val}</div>
            <div className="text-[12px] text-gray-400 font-semibold mt-1">{s.label}</div>
            <div className={`text-[11px] font-bold mt-1.5 ${s.up ? "text-emerald-600" : "text-red-500"}`}>{s.delta}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent orders */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="font-black text-[14px] text-gray-900">Recent orders</h2>
            <Btn variant="ghost" size="xs" onClick={() => setPage("orders")}>View all →</Btn>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-gray-50">
                <tr>
                  {["Order","Customer","Total","Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-gray-400 border-b border-gray-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 7).map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => { setPage("orders"); selectOrder(o.id); }}
                    className="cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <td className="px-4 py-3 font-black text-red-600 text-[12px]">{o.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-800">{o.customer}</div>
                      <div className="text-[11px] text-gray-400">{o.phone}</div>
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-800">{fmtNaira(o.total)}</td>
                    <td className="px-4 py-3"><StatusPill status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right col */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="font-black text-[14px] text-gray-900">Revenue by category</h2>
            </div>
            <div className="p-4">
              {sorted.map(([cat, rev], i) => (
                <div key={cat} className="flex items-center gap-3 mb-3 last:mb-0">
                  <span className="text-[12px] font-semibold text-gray-700 w-20 flex-shrink-0 truncate">{CAT_LABELS[cat] || cat}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.round(rev / maxRev * 100)}%`, background: CAT_COLORS[i % CAT_COLORS.length] }} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 w-14 text-right flex-shrink-0">{fmtNaira(rev)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="font-black text-[14px] text-gray-900">Activity feed</h2>
            </div>
            <div className="p-4">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex gap-3 pb-3 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`} />
                  <div>
                    <p className="text-[12px] text-gray-700 leading-relaxed">{a.text}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ORDER DETAIL PANEL ───────────────────────────────────────────────────────

function OrderDetail({ orderId }) {
//   const { updateOrderStatus, selectOrder, toast } = useAdminStore();
  const { selectOrder, toast } = useAdminStore();

  const {
      orders,
      updateOrderStatus
    } = useAdminOrdersStore();

  const order = orders.find((o) => o.id === orderId);
  const [newStatus, setNewStatus] = useState(order?.status ?? "Pending Payment");
  
  console.log("Order", order)

//   useEffect(() => { if (order) setNewStatus(order.status); }, [order?.status]);

  if (!order) return null;

  function saveStatus() {
    if (newStatus === order.status) { toast("Status unchanged", "info"); return; }
    updateOrderStatus(order.id, newStatus);
    toast(`✅ ${order.id} → ${newStatus}`, "success");
  }

  function copySummary() {
    const lines = order.items?.map((i) => `- ${i.name} ×${i.qty} — ${fmtNaira(i.price)}`).join("\n");
    const text = `Order ${order.id}\nCustomer: ${order.first_name} · ${order.phone}\nStatus: ${order.status}\n\nItems:\n${lines}\n\nTotal: ${fmtNaira(order.total_amount)}`;
    navigator.clipboard?.writeText(text)
      .then(() => toast("📋 Copied to clipboard", "success"))
      .catch(() => toast("Copy failed", "error"));
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 px-4 py-3.5 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div>
          <div className="font-black text-red-600 text-[13px]">{`${order.id.slice(0,7)} ...`}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">{new Date(order.updated_at).toLocaleDateString('en-GB')}</div>
        </div>
        <div className="flex items-center gap-2">
          <StatusPill status={order.status} />
          <button onClick={() => selectOrder(null)} className="w-7 h-7 rounded-lg bg-red-200 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-[13px] transition-colors">✕</button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div><SectionLabel>Customer</SectionLabel>
          <p className="text-[13px] font-semibold text-gray-800">{order.first_name}</p>
          <p className="text-[12px] text-gray-400">{order.phone}</p>
          <p className="text-[12px] text-gray-400">{order.email}</p>
        </div>
        <div><SectionLabel>Delivery · Payment</SectionLabel>
          <p className="text-[13px] font-semibold text-gray-800">{order.address_line2}</p>
          <p className="text-[12px] text-gray-400">{order.payment_method == "paystack" ? `Paystack(${order.paystack_reference})` :  <a href={order.receipt_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-500 mt-0.5 underline cursor-pointer">{order.payment_method}</a>}</p>
        </div>
        {order.notes && <div><SectionLabel>Notes</SectionLabel><p className="text-[12px] text-gray-500 leading-relaxed">{order.notes}</p></div>}

        <hr className="border-gray-100" />

        <div>
          <SectionLabel>Items</SectionLabel>
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-2.5 items-start py-2 border-b border-gray-50 last:border-0">
              <span className="text-lg flex-shrink-0 leading-tight">{i+1}.</span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-gray-800">{item.name}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">× {item.quantity}pcs</p>
                {Object.entries(item.specs).map(([key, options]) => (
                    <p key={key} className="text-[11px] text-gray-400 mt-0.5">
                        {key} : {options}
                    </p>
                ))}
                <p className="text-[12px] font-semibold text-gray-800 mt-3">Design</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Type : {item.design?.type}</p>
                {(item.design?.type !== "have-design") && <div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Description : {item.design?.description}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Business Name : {item.design?.businessName}</p>
                </div>}
                <div className="flex flex-row justify-ends items-center w-full">
                  {(!item.design?.noLogo && (item.design?.type !== "have-design")) && <a href={item.design?.logo} target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-500 mt-0.5 underline cursor-pointer">Logo</a>}
                  {(item.design?.type !== 'design-for-me') && <a href={item.design?.designFile} target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-500 mt-0.5 underline cursor-pointer">Design Image</a>}
                </div>
              </div>
              <span className="text-[12px] font-black text-gray-800 flex-shrink-0">{fmtNaira(item.price)}</span>
            </div>
          ))}
          <div className="pt-2 space-y-1">
            <div className="flex justify-between text-[12px] text-gray-500"><span>Subtotal</span><span>{fmtNaira(order.subtotal)}</span></div>
            <div className="flex justify-between text-[12px] text-gray-500"><span>Design</span><span>{order.custom_design_fee > 0 ? fmtNaira(order.custom_design_fee) : "Free"}</span></div>
            <div className="flex justify-between text-[12px] text-gray-500"><span>Delivery</span><span>{order.delivery_fee > 0 ? fmtNaira(order.delivery_fee) : "Free"}</span></div>
            <div className="flex justify-between text-[12px] text-gray-500"><span>Tax</span><span>{order.tax_amount > 0 ? fmtNaira(order.tax_amount) : "Free"}</span></div>
            <div className="flex justify-between text-[13px] font-black text-red-600 pt-1.5 border-t border-gray-100"><span>Total</span><span>{fmtNaira(order.total_amount)}</span></div>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="hidden">
          <SectionLabel>Status history</SectionLabel>
          {order.history?.map((h, i) => (
            <div key={i} className="flex gap-2.5 py-1.5">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${i < order.history.length - 1 ? "bg-emerald-500" : "bg-red-500"}`} />
              <div>
                <p className="text-[12px] font-semibold text-gray-800">{h.s}</p>
                <p className="text-[11px] text-gray-400">{h.t}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <SectionLabel>Update status</SectionLabel>
          <div className="flex gap-2 mt-1">
            <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="flex-1 py-1.5">
              {ALL_STATUSES.map((s) => <option key={s}>{s}</option>)}
            </Select>
            <Btn variant="primary" size="sm" onClick={() => updateOrderStatus(order.id, newStatus)}>Save</Btn>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 flex flex-col gap-2">
        <a
          href={`https://wa.me/${order.phone.replace(/\D/g,"").replace(/^0/,"234")}?text=Hi%20${encodeURIComponent(order.customer?.split(" ")[0])}%20regarding%20order%20${order.id}`}
          target="_blank" rel="noreferrer"
          className="w-full py-2 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-colors text-center block"
        >💬 WhatsApp customer</a>
        <button onClick={copySummary} className="w-full py-2 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">
          📋 Copy order summary
        </button>
      </div>
    </div>
  );
}

// ─── ORDERS PAGE ──────────────────────────────────────────────────────────────

function Orders() {
  const {
    ordersSearch, selectedOrderId, setOrdersSearch, selectOrder, toast,
  } = useAdminStore();
  // Live Data
  const {
      orders,
      filteredOrders,
      updateOrderStatus,
      setFilter,
      setSort,
      isLoading,
    } = useAdminOrdersStore();

    const [ordersTab, setOrdersTab ] = useState("all")

//   const list = getFilteredOrders();
  const counts = { all: orders.length };
  ALL_STATUSES.forEach((s) => { counts[s] = orders.filter((o) => o.status === s).length; });

  function exportCSV() {
    const rows = [["Order #","Customer","Phone","Total","Status","Date"],...orders.map((o) => [o.id,o.customer,o.phone,o.total,o.status,o.date])];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv); a.download = "orders.csv"; a.click();
    toast("⬇ Orders exported", "success");
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <h1 className="text-[22px] font-black text-gray-900">Orders</h1>
          <p className="text-sm text-gray-400 mt-0.5">{filteredOrders.length} orders · {fmtNaira(filteredOrders.reduce((s,o) => s+o.total_amount, 0))} total</p>
        </div>
        <Btn variant="outline" size="sm" onClick={exportCSV}>⬇ <span className="hidden sm:inline">Export CSV</span></Btn>
      </div>

      <div className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${selectedOrderId ? "grid grid-cols-1 lg:grid-cols-[1fr_300px]" : ""}`}>
        <div className="min-w-0">
          {/* Toolbar */}
          <div className="w-full flex flex-wrap items-center justify-end gap-2 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-8 flex-1 min-w-[160px] hidden">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input value={ordersSearch} onChange={(e) => setOrdersSearch(e.target.value)} placeholder="Order #, name, phone…" className="bg-transparent outline-none text-[13px] text-gray-700 placeholder-gray-400 w-full" />
            </div>
            <select onChange={(e) => setSort(e.target.value)} className="border border-gray-200 rounded-lg px-2 py-1.5 text-[12px] text-gray-600 bg-gray-50 outline-none h-8">
                <option value="date">Sort by Date</option>
                <option value="status">Sort by Status</option>
            </select>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-100" style={{ scrollbarWidth:"none" }}>
            {[["all","All"],...ALL_STATUSES.map((s) => [s,s])].map(([id,lbl]) => (
              <button
                key={id}
                onClick={() => {
                    setFilter(id);
                    setOrdersTab(id)
                }}
                className={`flex-shrink-0 px-3.5 py-2.5 text-[12px] font-bold border-b-2 transition-colors whitespace-nowrap ${ordersTab === id ? "text-red-600 border-red-600" : "text-gray-400 border-transparent hover:text-gray-700"}`}
              >
                {lbl}
                <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-black ${ordersTab === id ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-400"}`}>{counts[id] ?? 0}</span>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>{["Order","Customer","Items","Total","Delivery","Status","Date",""].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-gray-400 border-b border-gray-100 whitespace-nowrap">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 && <tr><td colSpan={8} className="text-center py-12 text-gray-400 text-sm">No orders match your filters</td></tr>}
                {filteredOrders.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => selectOrder(o.id)}
                    className={`cursor-pointer border-b border-gray-50 transition-colors ${selectedOrderId === o.id ? "bg-red-50" : "hover:bg-gray-50"}`}
                  >
                    <td className="px-4 py-3 font-black text-red-600 text-[12px]">{o.id.slice(0,7)+"..."}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-800">{o.first_name}</div>
                      <div className="text-[11px] text-gray-400">{o.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-[12px] max-w-[140px] truncate">
                      {o.items.length === 1 ? `${o.items[0]?.name}` : `${o.items[0]?.name} +${o.items.length-1} more`}
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-800">{fmtNaira(o.total_amount)}</td>
                    <td className="px-4 py-3 text-gray-400 text-[12px] whitespace-nowrap">{o.address_line2}</td>
                    <td className="px-4 py-3"><StatusPill status={o.status} /></td>
                    <td className="px-4 py-3 text-gray-400 text-[11px] whitespace-nowrap">{new Date(o.updated_at).toLocaleDateString('en-GB').replace(" 2026","")}</td>
                    <td className="px-4 py-3">
                      <Btn variant="outline" size="xs" onClick={(e) => { e.stopPropagation(); selectOrder(o.id); }}>Open</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrderId && (
          <div className="border-t lg:border-t-0 lg:border-l border-gray-100 max-h-[80vh] lg:max-h-none overflow-y-auto">
            <OrderDetail orderId={selectedOrderId} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── NEW ORDER MODAL ──────────────────────────────────────────────────────────

function NewOrderModal({ open, onClose }) {
  const { products, addOrder, setPage, selectOrder, toast } = useAdminStore();
  const [f, setF] = useState({ name:"", phone:"", email:"", productId:"", qty:"100", total:"", delivery:"Pickup", payment:"Paystack", notes:"" });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  function save() {
    if (!f.name.trim() || !f.phone.trim() || !f.total) { toast("Name, phone and total are required", "error"); return; }
    const product = products.find((p) => p.id === f.productId) || products[0];
    const fee = f.delivery === "Pickup" ? 0 : f.delivery === "Abuja" ? 2000 : 5000;
    const now = new Date();
    const id = "PH-" + Math.random().toString(36).toUpperCase().slice(2, 7);
    const order = {
      id, customer: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(),
      items: [{ em: product?.icon ?? "📦", name: product?.name ?? "Custom Order", meta: `${f.qty}pcs`, qty: parseInt(f.qty) || 1, price: parseFloat(f.total) }],
      subtotal: parseFloat(f.total), delivery: f.delivery, fee, total: parseFloat(f.total) + fee,
      status: "Pending Payment", payment: f.payment,
      date: `${now.getDate()} May 2026`, createdAt: Date.now(), notes: f.notes,
      history: [{ s:"Pending Payment", t:`${now.getDate()} May, ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}` }],
    };
    addOrder(order);
    setPage("orders");
    selectOrder(id);
    toast(`✅ Order ${id} created`, "success");
    onClose();
  }

  const lbl = "block text-[11px] font-black uppercase tracking-wide text-gray-400 mb-1";
  return (
    <Modal open={open} onClose={onClose} title="New order"
      footer={<>
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
        <Btn variant="primary" onClick={save}>Place order</Btn>
      </>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={lbl}>Customer name *</label><Input placeholder="Full name" value={f.name} onChange={set("name")} /></div>
        <div><label className={lbl}>Phone *</label><Input placeholder="+234 XXX XXX XXXX" value={f.phone} onChange={set("phone")} /></div>
        <div className="sm:col-span-2"><label className={lbl}>Email</label><Input type="email" placeholder="customer@email.com" value={f.email} onChange={set("email")} /></div>
        <div><label className={lbl}>Product</label>
          <Select value={f.productId} onChange={set("productId")}>
            {products.map((p) => <option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
          </Select>
        </div>
        <div><label className={lbl}>Quantity</label><Input type="number" value={f.qty} onChange={set("qty")} min="1" /></div>
        <div><label className={lbl}>Total amount (₦) *</label><Input type="number" placeholder="20000" value={f.total} onChange={set("total")} /></div>
        <div><label className={lbl}>Delivery</label>
          <Select value={f.delivery} onChange={set("delivery")}>
            <option>Pickup</option><option>Abuja</option><option>Nationwide</option>
          </Select>
        </div>
        <div><label className={lbl}>Payment</label>
          <Select value={f.payment} onChange={set("payment")}>
            <option>Paystack</option><option>Bank Transfer</option><option>Cash</option><option>WhatsApp</option>
          </Select>
        </div>
        <div className="sm:col-span-2"><label className={lbl}>Notes</label>
          <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 bg-gray-50 outline-none focus:border-red-500 resize-none" rows={2} placeholder="Special instructions…" value={f.notes} onChange={set("notes")} />
        </div>
      </div>
    </Modal>
  );
}

// ─── PRODUCT DETAIL PANEL ─────────────────────────────────────────────────────

const SIZE_MULS = { A6:0.55, A5:0.7, A4:1, A3:1.4, Custom:1.3 };

function ProductDetail({ productId, onEdit }) {
  const { products, deleteProduct, selectProduct, toast } = useAdminStore();
  const product = products.find((p) => p.id === productId);
  const [qty, setQty] = useState(100);
  const [size, setSize] = useState("A4");

  if (!product) return null;
  const disc = qty >= 1000 ? 0.2 : qty >= 500 ? 0.15 : qty >= 200 ? 0.1 : qty >= 100 ? 0.05 : 0;
  const total = Math.round(product.basePrice * (SIZE_MULS[size] ?? 1) * (1 - disc) * qty);
  const origDisc = product.origPrice ? Math.round((1 - product.basePrice / product.origPrice) * 100) : 0;

  function handleDelete() {
    if (!confirm(`Delete "${product.name}"?`)) return;
    deleteProduct(product.id);
    toast(`🗑 "${product.name}" deleted`, "info");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between gap-2 px-4 py-3.5 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="text-3xl">{product.icon}</div>
        <button onClick={() => selectProduct(null)} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-[13px] transition-colors">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.badge && <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full">{product.badge}</span>}
            {product.featured && <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded-full">Featured</span>}
            {origDisc > 0 && <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full">-{origDisc}% off</span>}
          </div>
          <h3 className="font-black text-[14px] text-gray-900 leading-snug">{product.name}</h3>
          <p className="text-[12px] text-gray-400 mt-1.5 leading-relaxed">{product.desc}</p>
        </div>
        <div><SectionLabel>Category</SectionLabel><span className="bg-indigo-50 text-indigo-700 text-[11px] font-bold px-2 py-0.5 rounded-full">{product.cat}</span></div>
        <div>
          <SectionLabel>Pricing</SectionLabel>
          <div className="font-black text-xl text-red-600">{fmtNaira(product.basePrice)}</div>
          {product.origPrice && <p className="text-[12px] text-gray-400 line-through">{fmtNaira(product.origPrice)} original</p>}
        </div>
        <div><SectionLabel>Rating</SectionLabel><p className="text-[13px] font-semibold text-gray-700">⭐ {product.rating} <span className="text-gray-400 font-normal">({product.reviews.toLocaleString()} reviews)</span></p></div>
        <hr className="border-gray-100" />
        <div>
          <SectionLabel>Quick price calculator</SectionLabel>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-[12px] text-gray-400 w-12">Qty</label>
              <Input type="number" value={qty} min={1} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value)||1))} className="flex-1 py-1.5" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[12px] text-gray-400 w-12">Size</label>
              <Select value={size} onChange={(e) => setSize(e.target.value)} className="flex-1 py-1.5 text-[12px]">
                {Object.keys(SIZE_MULS).map((s) => <option key={s}>{s}</option>)}
              </Select>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2.5 flex justify-between items-center">
              <span className="text-[11px] text-gray-400">Estimated total</span>
              <span className="font-black text-red-600 text-lg">{fmtNaira(total)}</span>
            </div>
            {disc > 0 && <p className="text-[11px] text-emerald-600 font-bold">✓ {(disc*100).toFixed(0)}% bulk discount applied</p>}
          </div>
        </div>
      </div>
      <div className="p-3 border-t border-gray-100 flex flex-col gap-2">
        <Btn variant="primary" className="w-full justify-center" onClick={() => onEdit(productId)}>✏ Edit Product</Btn>
        <Btn variant="danger" className="w-full justify-center" onClick={handleDelete}>🗑 Delete Product</Btn>
      </div>
    </div>
  );
}

// ─── PRODUCT MODAL ────────────────────────────────────────────────────────────

const BADGES = ["","Bestseller","Popular","New","Sale","Premium","Luxury"];

function ProductModal({ open, onClose, editId }) {
  const { products, saveProduct, toast } = useAdminStore();
  const existing = editId ? products.find((p) => p.id === editId) : null;
//   const [f, setF] = useState({ name:"", cat:"banners", icon:"", basePrice:"", origPrice:"", rating:"4.8", reviews:"0", badge:"", featured:"true", desc:"" });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));


  const initialForm = useMemo(() => {
    if (existing) {
        return {
        name: existing.name,
        cat: existing.cat,
        icon: existing.icon,
        basePrice: String(existing.basePrice),
        origPrice: existing.origPrice
            ? String(existing.origPrice)
            : "",
        rating: String(existing.rating),
        reviews: String(existing.reviews),
        badge: existing.badge ?? "",
        featured: String(existing.featured),
        desc: existing.desc,
        };
    }

    return {
        name: "",
        cat: "banners",
        icon: "",
        basePrice: "",
        origPrice: "",
        rating: "4.8",
        reviews: "0",
        badge: "",
        featured: "true",
        desc: "",
    };
    }, [existing]);

  const [f, setF] = useState(initialForm);

  function save() {
    if (!f.name.trim() || !f.basePrice) { toast("Name and base price are required", "error"); return; }
    saveProduct({ id:existing?.id??("p"+Date.now().toString(36)), name:f.name.trim(), cat:f.cat, icon:f.icon||"🛒", basePrice:parseFloat(f.basePrice), origPrice:f.origPrice?parseFloat(f.origPrice):null, rating:parseFloat(f.rating)||4.8, reviews:parseInt(f.reviews)||0, badge:f.badge||null, featured:f.featured==="true", desc:f.desc });
    toast(existing ? `✅ "${f.name}" updated` : `✅ "${f.name}" added`, "success");
    onClose();
  }

  const lbl = "block text-[11px] font-black uppercase tracking-wide text-gray-400 mb-1";
  return (
    <Modal open={open} onClose={onClose} title={existing ? "Edit product" : "Add new product"}
      footer={<><Btn variant="ghost" onClick={onClose}>Cancel</Btn><Btn variant="primary" onClick={save}>Save product</Btn></>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2"><label className={lbl}>Product name *</label><Input placeholder="e.g. Roll-up Banner 85×200cm" value={f.name} onChange={set("name")} /></div>
        <div><label className={lbl}>Category *</label><Select value={f.cat} onChange={set("cat")}>{CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</Select></div>
        <div><label className={lbl}>Icon (emoji)</label><Input placeholder="🏷️" value={f.icon} onChange={set("icon")} /></div>
        <div><label className={lbl}>Base price (₦) *</label><Input type="number" placeholder="8000" value={f.basePrice} onChange={set("basePrice")} /></div>
        <div><label className={lbl}>Original price (₦)</label><Input type="number" placeholder="Blank if no discount" value={f.origPrice} onChange={set("origPrice")} /></div>
        <div><label className={lbl}>Rating</label><Input type="number" step="0.1" min="1" max="5" value={f.rating} onChange={set("rating")} /></div>
        <div><label className={lbl}>Reviews count</label><Input type="number" value={f.reviews} onChange={set("reviews")} /></div>
        <div><label className={lbl}>Badge</label><Select value={f.badge} onChange={set("badge")}>{BADGES.map((b) => <option key={b} value={b}>{b||"None"}</option>)}</Select></div>
        <div><label className={lbl}>Featured?</label><Select value={f.featured} onChange={set("featured")}><option value="true">Yes</option><option value="false">No</option></Select></div>
        <div className="sm:col-span-2"><label className={lbl}>Description</label><Input placeholder="Short description" value={f.desc} onChange={set("desc")} /></div>
      </div>
    </Modal>
  );
}

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────

function Products() {
  const { products, productView, productCat, productSearch, selectedProductId, setProductView, setProductCat, setProductSearch, selectProduct, getFilteredProducts } = useAdminStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const list = getFilteredProducts();

  function openEdit(id) { setEditId(id); setModalOpen(true); }
  function openAdd() { setEditId(null); setModalOpen(true); }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <h1 className="text-[22px] font-black text-gray-900">Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">{list.length} of {products.length} products</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            {["grid","table"].map((v) => (
              <button key={v} onClick={() => setProductView(v)} className={`px-3 py-1.5 text-[12px] font-bold transition-colors ${productView===v ? "bg-red-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                {v === "grid" ? "⊞ Grid" : "☰ Table"}
              </button>
            ))}
          </div>
          <select value={productCat} onChange={(e) => setProductCat(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 bg-white outline-none focus:border-red-500 h-8">
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-8">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={productSearch} onChange={(e) => setProductSearch(e.target.value)} placeholder="Search products…" className="bg-transparent outline-none text-[12px] text-gray-700 placeholder-gray-400 w-32" />
          </div>
          <Btn variant="primary" size="sm" onClick={openAdd}>+ <span className="hidden sm:inline">Add Product</span></Btn>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="flex-1 min-w-0">
          {list.length === 0 && <div className="text-center py-16 text-gray-400"><div className="text-4xl mb-3 opacity-30">🛒</div><p className="font-bold">No products found</p></div>}

          {/* Grid */}
          {productView === "grid" && list.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {list.map((p) => {
                const disc = p.origPrice ? Math.round((1-p.basePrice/p.origPrice)*100) : 0;
                return (
                  <div key={p.id} onClick={() => selectProduct(p.id)} className={`bg-white rounded-xl border cursor-pointer transition-all overflow-hidden group ${selectedProductId===p.id ? "border-red-500 ring-2 ring-red-100" : "border-gray-100 hover:border-red-500 hover:shadow-md hover:-translate-y-0.5"}`}>
                    <div className="aspect-square bg-gray-50 flex items-center justify-center text-4xl relative">
                      {p.icon}
                      <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                        {p.badge && <span className="bg-red-50 text-red-600 text-[9px] font-black px-1.5 py-0.5 rounded-full">{p.badge}</span>}
                        {disc>0 && <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-1.5 py-0.5 rounded-full">-{disc}%</span>}
                      </div>
                      <div onClick={(e) => { e.stopPropagation(); openEdit(p.id); }} className="absolute inset-x-0 bottom-0 bg-red-600 text-white text-[11px] font-bold py-1.5 text-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all">✏ Edit</div>
                    </div>
                    <div className="p-2.5">
                      <div className="text-[9px] font-black uppercase tracking-wide text-gray-400 mb-0.5">{p.cat}</div>
                      <div className="text-[12px] font-black text-gray-800 leading-tight line-clamp-2 mb-1.5">{p.name}</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-black text-red-600 text-[13px]">{fmtNaira(p.basePrice)}</span>
                        {p.origPrice && <span className="text-[10px] text-gray-400 line-through">{fmtNaira(p.origPrice)}</span>}
                      </div>
                      <div className="text-[10px] text-amber-500 mt-1">⭐ {p.rating} <span className="text-gray-400">({p.reviews.toLocaleString()})</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table */}
          {productView === "table" && list.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] min-w-[700px]">
                  <thead className="bg-gray-50">
                    <tr>{["","Name","Category","Base price","Rating","Reviews","Badge","Featured",""].map((h,i) => <th key={i} className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-gray-400 border-b border-gray-100">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {list.map((p) => (
                      <tr key={p.id} onClick={() => selectProduct(p.id)} className={`cursor-pointer border-b border-gray-50 transition-colors ${selectedProductId===p.id ? "bg-red-50" : "hover:bg-gray-50"}`}>
                        <td className="px-4 py-3 text-xl text-center">{p.icon}</td>
                        <td className="px-4 py-3"><div className="font-semibold text-gray-800">{p.name}</div><div className="text-[11px] text-gray-400 max-w-xs truncate">{p.desc}</div></td>
                        <td className="px-4 py-3"><span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{p.cat}</span></td>
                        <td className="px-4 py-3 font-bold text-red-600">{fmtNaira(p.basePrice)}</td>
                        <td className="px-4 py-3 text-gray-600">⭐ {p.rating}</td>
                        <td className="px-4 py-3 text-gray-500">{p.reviews.toLocaleString()}</td>
                        <td className="px-4 py-3">{p.badge ? <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{p.badge}</span> : <span className="text-gray-300">—</span>}</td>
                        <td className="px-4 py-3">{p.featured ? <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">✓ Yes</span> : <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">No</span>}</td>
                        <td className="px-4 py-3"><Btn variant="outline" size="xs" onClick={(e) => { e.stopPropagation(); openEdit(p.id); }}>✏</Btn></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {selectedProductId && (
          <div className="w-72 flex-shrink-0 bg-white rounded-xl border border-gray-100 overflow-hidden max-h-[80vh] overflow-y-auto hidden md:block">
            <ProductDetail productId={selectedProductId} onEdit={openEdit} />
          </div>
        )}
      </div>

      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} editId={editId} />
    </div>
  );
}

// ─── CUSTOMER DETAIL PANEL ────────────────────────────────────────────────────

function CustomerDetail({ customerId }) {
  const { customers, orders, addLoyaltyPoints, saveCustomerNotes, selectCustomer, setPage, selectOrder, toast } = useAdminStore();
  const customer = customers.find((c) => c.id === customerId);
  const custOrders = orders.filter((o) => o.customer === customer?.name);
  const [pts, setPts] = useState("");
  const [notes, setNotes] = useState(customer?.notes ?? "");

//   useEffect(() => { if (customer) setNotes(customer.notes ?? ""); }, [customerId]);

  if (!customer) return null;
  const totalSpent = custOrders.reduce((s, o) => s + o.total, 0);

  function addPts() {
    const n = parseInt(pts);
    if (!n || n <= 0) { toast("Enter a valid points amount", "error"); return; }
    addLoyaltyPoints(customerId, n);
    toast(`⭐ Added ${n} points to ${customer.name}`, "success");
    setPts("");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-2 px-4 py-3.5 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center text-[12px] font-black flex-shrink-0">{initials(customer.name)}</div>
          <div>
            <div className="font-black text-[13px] text-gray-900">{customer.name}</div>
            <div className="text-[11px] text-gray-400">{customer.joined}</div>
          </div>
        </div>
        <button onClick={() => selectCustomer(null)} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-[13px] transition-colors">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Loyalty card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-4 text-white">
          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Loyalty balance</div>
          <div className="font-black text-[28px] text-red-500">{(customer.loyaltyPoints||0).toLocaleString()}</div>
          <div className="text-[12px] text-white/40 mt-1">= {fmtNaira(customer.loyaltyPoints||0)} discount available</div>
        </div>

        <div><SectionLabel>Contact</SectionLabel>
          <p className="text-[13px] font-semibold text-gray-700">{customer.email}</p>
          <p className="text-[12px] text-gray-400 mt-0.5">{customer.phone}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="font-black text-xl text-red-600">{custOrders.length}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Total orders</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="font-black text-[15px] text-red-600">{totalSpent > 0 ? fmtNaira(totalSpent) : "—"}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Total spent</div>
          </div>
        </div>

        {customer.notes && <div><SectionLabel>Notes</SectionLabel><p className="text-[12px] text-gray-500 leading-relaxed">{customer.notes}</p></div>}

        <hr className="border-gray-100" />

        <div>
          <SectionLabel>Recent orders ({custOrders.length})</SectionLabel>
          {custOrders.length === 0 ? <p className="text-[12px] text-gray-400 text-center py-4">No orders yet</p> :
            custOrders.slice(0, 4).map((o) => (
              <div key={o.id} onClick={() => { setPage("orders"); selectOrder(o.id); }} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors">
                <div>
                  <div className="font-black text-red-600 text-[11px]">{o.id}</div>
                  <div className="text-[10px] text-gray-400">{o.date.replace(" 2026","")}</div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill status={o.status} />
                  <span className="font-black text-[12px] text-gray-700">{fmtNaira(o.total)}</span>
                </div>
              </div>
            ))
          }
        </div>

        <div>
          <SectionLabel>Add loyalty points</SectionLabel>
          <div className="flex gap-2">
            <Input type="number" value={pts} onChange={(e) => setPts(e.target.value)} placeholder="e.g. 500" className="flex-1 py-1.5" />
            <button onClick={addPts} className="bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold px-3 py-1.5 rounded-lg transition-colors">Add</button>
          </div>
        </div>

        <div>
          <SectionLabel>Internal notes</SectionLabel>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Notes about this customer…" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] text-gray-700 bg-gray-50 outline-none focus:border-red-500 resize-none" />
          <button onClick={() => { saveCustomerNotes(customerId, notes); toast("Notes saved","success"); }} className="mt-1.5 text-[12px] font-bold text-gray-500 border border-gray-200 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors w-full">Save notes</button>
        </div>
      </div>

      <div className="p-3 border-t border-gray-100 flex flex-col gap-2">
        <a href={`https://wa.me/${customer.phone.replace(/\D/g,"").replace(/^0/,"234")}?text=Hi%20${encodeURIComponent(customer.name.split(" ")[0])}`} target="_blank" rel="noreferrer" className="w-full py-2 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-colors text-center block">💬 WhatsApp customer</a>
        <a href={`mailto:${customer.email}`} className="w-full py-2 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-colors text-center block">✉ Send email</a>
      </div>
    </div>
  );
}

// ─── CUSTOMERS PAGE ───────────────────────────────────────────────────────────

const CUST_FILTERS = [
  { value:"all",    label:"All customers" },
  { value:"active", label:"Active (ordered)" },
  { value:"new",    label:"New (no orders)" },
  { value:"vip",    label:"VIP (5+ orders)" },
];

function Customers() {
  const { customers, orders, customerFilter, customerSearch, selectedCustomerId, setCustomerFilter, setCustomerSearch, selectCustomer, getFilteredCustomers, toast } = useAdminStore();
  const list = getFilteredCustomers();

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <h1 className="text-[22px] font-black text-gray-900">Customers</h1>
          <p className="text-sm text-gray-400 mt-0.5">{list.length} customer{list.length!==1?"s":""}</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <select value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 bg-white outline-none focus:border-red-500 h-8">
            {CUST_FILTERS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-8">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} placeholder="Name, email, phone…" className="bg-transparent outline-none text-[12px] text-gray-700 placeholder-gray-400 w-36" />
          </div>
          <Btn variant="primary" size="sm" onClick={() => toast("Customer creation coming soon","info")}>+ <span className="hidden sm:inline">Add Customer</span></Btn>
        </div>
      </div>

      <div className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${selectedCustomerId ? "grid grid-cols-1 lg:grid-cols-[1fr_300px]" : ""}`}>
        <div className="min-w-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] min-w-[560px]">
              <thead className="bg-gray-50">
                <tr>{["Customer","Phone","Role","Orders","Spent","Loyalty pts","Joined",""].map((h) => <th key={h} className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-gray-400 border-b border-gray-100 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {list.length===0 && <tr><td colSpan={8} className="text-center py-12 text-gray-400 text-sm">No customers match your filters</td></tr>}
                {list.map((c) => {
                  const co = orders.filter((o) => o.customer === c.name);
                  const spent = co.reduce((s,o)=>s+o.total,0);
                  return (
                    <tr key={c.id} onClick={() => selectCustomer(c.id)} className={`cursor-pointer border-b border-gray-50 transition-colors ${selectedCustomerId===c.id ? "bg-red-50" : "hover:bg-gray-50"}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">{initials(c.name)}</div>
                          <div><div className="font-semibold text-gray-800">{c.name}</div><div className="text-[11px] text-gray-400">{c.email}</div></div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-[12px] whitespace-nowrap">{c.phone}</td>
                      <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.role==="admin" ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"}`}>{c.role}</span></td>
                      <td className="px-4 py-3 text-center font-bold text-gray-700">{co.length}</td>
                      <td className="px-4 py-3 font-bold text-gray-700">{spent>0 ? fmtNaira(spent) : "—"}</td>
                      <td className="px-4 py-3"><span className="text-amber-600 font-bold text-[12px]">⭐ {(c.loyaltyPoints||0).toLocaleString()}</span></td>
                      <td className="px-4 py-3 text-gray-400 text-[11px] whitespace-nowrap">{c.joined}</td>
                      <td className="px-4 py-3"><Btn variant="outline" size="xs" onClick={(e) => { e.stopPropagation(); selectCustomer(c.id); }}>View</Btn></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {selectedCustomerId && (
          <div className="border-t lg:border-t-0 lg:border-l border-gray-100 max-h-[80vh] lg:max-h-none overflow-y-auto">
            <CustomerDetail customerId={selectedCustomerId} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────

export default function AdminDashboardMain() {
  const page = useAdminStore((s) => s.page);
  const [newOrderOpen, setNewOrderOpen] = useState(false);

  const {
    orders,
    filteredOrders,
    fetchAllOrders,
    updateOrderStatus,
    setFilter,
    setSort,
    isLoading,
  } = useAdminOrdersStore();

  useEffect(() => {
      fetchAllOrders();
    }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onNewOrder={() => setNewOrderOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {page === "dashboard" && <Dashboard />}
          {page === "orders"    && <Orders />}
          {page === "products"  && <Products />}
          {page === "customers" && <Customers />}
        </main>
      </div>
      <ToastContainer />
      <NewOrderModal open={newOrderOpen} onClose={() => setNewOrderOpen(false)} />
    </div>
  );
}
