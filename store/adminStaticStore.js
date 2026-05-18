// store.js  —  Zustand store for PrintHub Admin
// Install: npm install zustand

import { create } from "zustand";

// ─── SEED DATA ────────────────────────────────────────────────────────────────

export const ALL_STATUSES = [
  "pending","paid","processing", "completed","shipped","delivered","cancelled",
  "refunded"
];

export const CATEGORIES = [
  { id:"banners",    label:"Banners" },
  { id:"cards",      label:"Business Cards" },
  { id:"flyers",     label:"Flyers" },
  { id:"apparel",    label:"Apparel" },
  { id:"books",      label:"Books" },
  { id:"signage",    label:"Signage" },
  { id:"souvenirs",  label:"Souvenirs" },
  { id:"stickers",   label:"Stickers" },
  { id:"events",     label:"Events" },
  { id:"campaign",   label:"Campaign" },
  { id:"nylon",      label:"Nylon Bags" },
  { id:"packaging",  label:"Packaging" },
  { id:"stationery", label:"Stationery" },
];

export const STATUS_STYLES = {
  "pending":   { pill:"bg-purple-100 text-purple-800", dot:"bg-purple-500"  },
  "paid": { pill:"bg-amber-100 text-amber-800",   dot:"bg-amber-500"   },
  "processing":       { pill:"bg-green-100 text-green-800",   dot:"bg-green-500"   },
  "shipped":         { pill:"bg-sky-100 text-sky-800",       dot:"bg-sky-500"     },
  "delivered":       { pill:"bg-green-100 text-green-800",   dot:"bg-green-600"   },
  "cancelled":       { pill:"bg-red-100 text-red-800",       dot:"bg-red-500"     },
  "refunded": { pill:"bg-amber-100 text-amber-800",   dot:"bg-amber-500"   },
  "completed":{ pill:"bg-emerald-100 text-emerald-800",dot:"bg-emerald-500"},
//   "Design Review":   { pill:"bg-purple-100 text-purple-800", dot:"bg-purple-500"  },
//   "In Production":   { pill:"bg-blue-100 text-blue-800",     dot:"bg-blue-500"    },
};

const SEED_ORDERS = [];
const SEED_ORDERS2 = [
  {
    id:"PH-R7K4M", customer:"Adaobi Nwosu", phone:"+234 803 211 4456", email:"adaobi@nwosuassoc.ng",
    items:[
      { em:"🏷️", name:"Roll-up Banner",  meta:"85×200cm · Glossy",        qty:2,   price:16000 },
      { em:"📄",  name:"A5 Flyers",       meta:"A5 · Gloss · Lamination",  qty:500, price:4500  },
    ],
    subtotal:20500, delivery:"Abuja", fee:2000, total:22500,
    status:"Design Review", payment:"Paystack", date:"13 May 2026", createdAt:1747131660000,
    notes:"Needs banners by Friday for trade fair.",
    history:[
      { s:"Pending Payment", t:"12 May, 18:22" },
      { s:"Confirmed",       t:"12 May, 19:05" },
      { s:"Design Review",   t:"13 May, 09:41" },
    ],
  },
  {
    id:"PH-X9P2N", customer:"Emeka Okafor", phone:"+234 706 800 1230", email:"emeka@okaforventures.com",
    items:[{ em:"👕", name:"Branded T-Shirts", meta:"Custom · Cotton", qty:200, price:500000 }],
    subtotal:500000, delivery:"Pickup", fee:0, total:500000,
    status:"In Production", payment:"Bank Transfer", date:"12 May 2026", createdAt:1747047000000,
    notes:"Navy blue with gold embroidery.",
    history:[
      { s:"Pending Payment", t:"11 May, 11:00" },
      { s:"Confirmed",       t:"11 May, 14:30" },
      { s:"In Production",   t:"12 May, 14:10" },
    ],
  },
  {
    id:"PH-T3L8Q", customer:"Fatima Bello", phone:"+234 912 334 5678", email:"fatima@eliteeventsng.com",
    items:[
      { em:"💼", name:"Business Cards", meta:"A6 · Matte · Lamination", qty:500, price:18500 },
      { em:"📋", name:"Letterheads",    meta:"A4 · Uncoated",           qty:100, price:8000  },
    ],
    subtotal:26500, delivery:"Pickup", fee:0, total:26500,
    status:"Ready for Pickup", payment:"Paystack", date:"11 May 2026", createdAt:1746960900000,
    notes:"",
    history:[
      { s:"Pending Payment",  t:"10 May, 09:00" },
      { s:"Confirmed",        t:"10 May, 09:45" },
      { s:"In Production",    t:"11 May, 08:00" },
      { s:"Ready for Pickup", t:"11 May, 16:55" },
    ],
  },
  {
    id:"PH-B6W1C", customer:"Sunday Afolabi", phone:"+234 805 120 9900", email:"sunday.a@gmail.com",
    items:[{ em:"🎌", name:"Flex Banner", meta:"Custom · Vinyl", qty:3, price:18000 }],
    subtotal:18000, delivery:"Abuja", fee:2000, total:20000,
    status:"Pending Payment", payment:"Bank Transfer", date:"13 May 2026", createdAt:1747130400000,
    notes:"3m × 1.5m each.",
    history:[{ s:"Pending Payment", t:"13 May, 07:12" }],
  },
  {
    id:"PH-H2K9F", customer:"Ibrahim Musa", phone:"+234 817 900 3345", email:"ibrahimm@gmail.com",
    items:[{ em:"📑", name:"Company Profile", meta:"A4 · Gloss · Lamination", qty:20, price:55000 }],
    subtotal:55000, delivery:"Nationwide", fee:5000, total:60000,
    status:"In Production", payment:"Paystack", date:"11 May 2026", createdAt:1746961800000,
    notes:"20-page profile.",
    history:[
      { s:"Pending Payment", t:"10 May, 15:00" },
      { s:"Confirmed",       t:"10 May, 15:42" },
      { s:"In Production",   t:"11 May, 10:30" },
    ],
  },
  {
    id:"PH-D4S5V", customer:"Chioma Eze", phone:"+234 703 445 7812", email:"chioma.eze@aol.com",
    items:[{ em:"📄", name:"A5 Flyers", meta:"A5 · Gloss", qty:1000, price:12000 }],
    subtotal:12000, delivery:"Pickup", fee:0, total:12000,
    status:"Delivered", payment:"Paystack", date:"9 May 2026", createdAt:1746784500000,
    notes:"",
    history:[
      { s:"Pending Payment", t:"8 May, 14:00" },
      { s:"Confirmed",       t:"8 May, 14:30" },
      { s:"In Production",   t:"9 May, 08:00" },
      { s:"Delivered",       t:"9 May, 15:30" },
    ],
  },
  {
    id:"PH-K5M3R", customer:"Grace Okonkwo", phone:"+234 808 112 2233", email:"grace.ok@yahoo.com",
    items:[
      { em:"🪧", name:"Acrylic Sign Board", meta:"Custom · Acrylic", qty:1, price:45000 },
      { em:"🔤", name:"3D Lettering",       meta:"Custom · Metal",   qty:1, price:80000 },
    ],
    subtotal:125000, delivery:"Abuja", fee:2000, total:127000,
    status:"Design Review", payment:"Bank Transfer", date:"13 May 2026", createdAt:1747129320000,
    notes:"Office rebranding.",
    history:[
      { s:"Pending Payment", t:"12 May, 16:00" },
      { s:"Confirmed",       t:"13 May, 09:00" },
      { s:"Design Review",   t:"13 May, 11:22" },
    ],
  },
  {
    id:"PH-L7N9T", customer:"Daniel Emeka", phone:"+234 901 234 5670", email:"d.emeka@campaignhq.ng",
    items:[
      { em:"🗳️", name:"Campaign T-Shirts", meta:"Cotton · Screen Print", qty:500,  price:200000 },
      { em:"📢",  name:"Campaign Flyers",   meta:"A5 · Gloss",            qty:5000, price:75000  },
    ],
    subtotal:275000, delivery:"Nationwide", fee:5000, total:280000,
    status:"Shipped", payment:"Bank Transfer", date:"10 May 2026", createdAt:1746868800000,
    notes:"Election materials. Rush.",
    history:[
      { s:"Pending Payment", t:"9 May, 07:00"  },
      { s:"Confirmed",       t:"9 May, 07:45"  },
      { s:"In Production",   t:"9 May, 14:00"  },
      { s:"Shipped",         t:"10 May, 08:44" },
    ],
  },
  {
    id:"PH-Q8W2E", customer:"Blessing Nwosu", phone:"+234 703 001 8899", email:"blessing@bnenterprises.com",
    items:[
      { em:"☕", name:"Branded Mugs", meta:"Ceramic · Sublimation", qty:50,  price:15000 },
      { em:"🖊️", name:"Branded Pens", meta:"Metal · Engraved",      qty:100, price:10000 },
    ],
    subtotal:25000, delivery:"Pickup", fee:0, total:25000,
    status:"Ready for Pickup", payment:"Paystack", date:"10 May 2026", createdAt:1746882000000,
    notes:"Corporate AGM gift sets.",
    history:[
      { s:"Pending Payment",  t:"9 May, 13:00"  },
      { s:"Confirmed",        t:"9 May, 13:30"  },
      { s:"Ready for Pickup", t:"10 May, 15:00" },
    ],
  },
  {
    id:"PH-Z3X1C", customer:"Tunde Adeleke", phone:"+234 802 444 5566", email:"t.adeleke@tundebiz.com",
    items:[{ em:"📚", name:"Perfect Bound Book", meta:"A4 · Gloss · Softcover", qty:50, price:80000 }],
    subtotal:80000, delivery:"Abuja", fee:2000, total:82000,
    status:"Cancelled", payment:"—", date:"8 May 2026", createdAt:1746697800000,
    notes:"Customer cancelled.",
    history:[
      { s:"Pending Payment", t:"8 May, 12:30" },
      { s:"Cancelled",       t:"8 May, 16:00" },
    ],
  },
];

const SEED_PRODUCTS = [
  { id:"p001", name:"Standard Roll-up Banner",         cat:"banners",    icon:"🏷️", basePrice:8000,  origPrice:10000, rating:4.9, reviews:234, badge:"Bestseller", featured:true,  desc:"85×200cm · Single/double-sided · Includes aluminium stand" },
  { id:"p002", name:"Pull-up X Banner",                cat:"banners",    icon:"📢", basePrice:6000,  origPrice:null,  rating:4.8, reviews:156, badge:"Popular",    featured:true,  desc:"60×160cm · Lightweight · With carry bag" },
  { id:"p003", name:"Flex Banner Print (per sqm)",     cat:"banners",    icon:"🎌", basePrice:5000,  origPrice:null,  rating:4.7, reviews:312, badge:"Sale",       featured:false, desc:"Any custom size · UV & weather resistant ink" },
  { id:"p004", name:"Step & Repeat Backdrop",          cat:"banners",    icon:"🎭", basePrice:35000, origPrice:42000, rating:5.0, reviews:89,  badge:"Premium",    featured:true,  desc:"2×2m · High resolution · Event ready" },
  { id:"p005", name:"Premium Business Cards (100pcs)", cat:"cards",      icon:"💼", basePrice:3500,  origPrice:5000,  rating:4.9, reviews:567, badge:"Bestseller", featured:true,  desc:"100pcs · 400gsm · Glossy or matte" },
  { id:"p006", name:"Matte Laminated Cards (100pcs)",  cat:"cards",      icon:"🃏", basePrice:4500,  origPrice:null,  rating:4.8, reviews:234, badge:"Popular",    featured:false, desc:"100pcs · Soft-touch matte finish" },
  { id:"p007", name:"Spot UV Cards (100pcs)",          cat:"cards",      icon:"✨", basePrice:7500,  origPrice:10000, rating:4.9, reviews:123, badge:"Premium",    featured:true,  desc:"100pcs · Selective UV coating · Luxury" },
  { id:"p008", name:"A5 Flyers Full Colour (250pcs)",  cat:"flyers",     icon:"📄", basePrice:3000,  origPrice:4000,  rating:4.8, reviews:445, badge:"Bestseller", featured:true,  desc:"250pcs · 130gsm coated · Double-sided" },
  { id:"p009", name:"A4 Poster / Flyer (100pcs)",      cat:"flyers",     icon:"📋", basePrice:4500,  origPrice:null,  rating:4.7, reviews:234, badge:"Popular",    featured:false, desc:"100pcs · 170gsm gloss · Vivid colour" },
  { id:"p010", name:"Branded Cotton T-Shirt",          cat:"apparel",    icon:"👕", basePrice:2500,  origPrice:3500,  rating:4.9, reviews:789, badge:"Bestseller", featured:true,  desc:"Per piece · 180gsm · Screen print or heat transfer" },
  { id:"p011", name:"Polo Shirt (Embroidery)",         cat:"apparel",    icon:"👔", basePrice:4500,  origPrice:null,  rating:4.8, reviews:234, badge:"Popular",    featured:true,  desc:"Per piece · Embroidered logo · Corporate" },
  { id:"p012", name:"Branded Ceramic Mug",             cat:"souvenirs",  icon:"☕", basePrice:2000,  origPrice:2800,  rating:4.8, reviews:345, badge:"Bestseller", featured:true,  desc:"Per piece · 11oz · Full colour sublimation" },
  { id:"p013", name:"Custom Tote Bag",                 cat:"souvenirs",  icon:"👜", basePrice:1800,  origPrice:null,  rating:4.7, reviews:234, badge:"Popular",    featured:false, desc:"Per piece · Natural cotton · Screen print" },
  { id:"p014", name:"Perfect Bound Book",              cat:"books",      icon:"📚", basePrice:80000, origPrice:100000,rating:5.0, reviews:45,  badge:"Premium",    featured:true,  desc:"Full design + print · 100–300 pages · Softcover" },
  { id:"p015", name:"Acrylic Signage Board",           cat:"signage",    icon:"🪧", basePrice:45000, origPrice:60000, rating:4.9, reviews:67,  badge:"Premium",    featured:true,  desc:"Custom size · Wall or freestanding · Backlit option" },
  { id:"p016", name:"SAV Cut Stickers",                cat:"stickers",   icon:"🏷️", basePrice:4000,  origPrice:null,  rating:4.8, reviews:234, badge:"Popular",    featured:false, desc:"Any shape · Outdoor vinyl · Waterproof" },
  { id:"p017", name:"Campaign T-Shirts (Bulk)",        cat:"campaign",   icon:"🗳️", basePrice:2000,  origPrice:2800,  rating:4.8, reviews:234, badge:"Popular",    featured:true,  desc:"Per piece · Rush available · 3-colour print" },
  { id:"p018", name:"Company Profile Design & Print",  cat:"stationery", icon:"📑", basePrice:25000, origPrice:null,  rating:4.9, reviews:78,  badge:"Premium",    featured:true,  desc:"4–8 pages · Design + print · 10 copies" },
];

const SEED_CUSTOMERS = [
  { id:"c001", name:"Adaobi Nwosu",   email:"adaobi@nwosuassoc.ng",     phone:"+234 803 211 4456", role:"customer", loyaltyPoints:450,  joined:"12 Jan 2025", notes:"Brand manager. Repeat client for events." },
  { id:"c002", name:"Emeka Okafor",   email:"emeka@okaforventures.com", phone:"+234 706 800 1230", role:"customer", loyaltyPoints:1200, joined:"5 Mar 2024",  notes:"Corporate account. Monthly orders." },
  { id:"c003", name:"Fatima Bello",   email:"fatima@eliteeventsng.com", phone:"+234 912 334 5678", role:"customer", loyaltyPoints:890,  joined:"18 Jun 2024", notes:"Events coordinator. High volume." },
  { id:"c004", name:"Sunday Afolabi", email:"sunday.a@gmail.com",       phone:"+234 805 120 9900", role:"customer", loyaltyPoints:80,   joined:"2 Apr 2026",  notes:"" },
  { id:"c005", name:"Ibrahim Musa",   email:"ibrahimm@gmail.com",       phone:"+234 817 900 3345", role:"customer", loyaltyPoints:220,  joined:"15 Feb 2026", notes:"" },
  { id:"c006", name:"Chioma Eze",     email:"chioma.eze@aol.com",       phone:"+234 703 445 7812", role:"customer", loyaltyPoints:340,  joined:"9 Aug 2024",  notes:"" },
  { id:"c007", name:"Grace Okonkwo",  email:"grace.ok@yahoo.com",       phone:"+234 808 112 2233", role:"customer", loyaltyPoints:0,    joined:"11 May 2026", notes:"New client. Office rebranding project." },
  { id:"c008", name:"Daniel Emeka",   email:"d.emeka@campaignhq.ng",    phone:"+234 901 234 5670", role:"customer", loyaltyPoints:560,  joined:"3 Jan 2025",  notes:"Campaign manager. Seasonal high volume." },
  { id:"c009", name:"Blessing Nwosu", email:"blessing@bnenterprises.com",phone:"+234 703 001 8899", role:"customer", loyaltyPoints:150,  joined:"20 Oct 2025", notes:"" },
  { id:"c010", name:"Tunde Adeleke",  email:"t.adeleke@tundebiz.com",   phone:"+234 802 444 5566", role:"customer", loyaltyPoints:0,    joined:"1 Feb 2026",  notes:"Cancelled first order." },
  { id:"c011", name:"Silas Umekwe",   email:"admin@cchumedia.com",      phone:"+234 901 559 9370", role:"admin",    loyaltyPoints:0,    joined:"1 Jan 2011",  notes:"System admin." },
];

// ─── HELPERS (shared) ─────────────────────────────────────────────────────────

export const fmtNaira = (n) => "₦" + Math.round(n).toLocaleString("en-NG");
export const initials = (name) => name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();



// ─── ZUSTAND STORE ────────────────────────────────────────────────────────────

export const useAdminStore = create((set, get) => ({
  // ── data ──────────────────────────────────────────────────────────────────
  orders:    SEED_ORDERS,
  products:  SEED_PRODUCTS,
  customers: SEED_CUSTOMERS,

  // ── navigation ────────────────────────────────────────────────────────────
  page: "dashboard",           // "dashboard" | "orders" | "products" | "customers"
  setPage: (page) => set({ page, sidebarOpen: false }),

  // ── sidebar ───────────────────────────────────────────────────────────────
  sidebarOpen: false,
  setSidebarOpen: (v) => set({ sidebarOpen: v }),

  // ── toasts ────────────────────────────────────────────────────────────────
  toasts: [],
  toast: (msg, type = "success") => {
    const id = Date.now().toString(36);
    set((s) => ({ toasts: [...s.toasts, { id, msg, type }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3000);
  },

  // ── orders ui state ───────────────────────────────────────────────────────
  ordersTab:         "all",
  ordersSearch:      "",
  ordersSort:        "newest",
  selectedOrderId:   null,
  setOrdersTab:      (v) => set({ ordersTab: v, selectedOrderId: null }),
  setOrdersSearch:   (v) => set({ ordersSearch: v }),
  setOrdersSort:     (v) => set({ ordersSort: v }),
  selectOrder:       (id) => set({ selectedOrderId: id }),

  // ── orders actions ────────────────────────────────────────────────────────
  updateOrderStatus: (id, status) => {
    const now = new Date();
    const t = `${now.getDate()} May, ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    set((s) => ({
      orders: s.orders.map((o) =>
        o.id === id ? { ...o, status, history: [...o.history, { s: status, t }] } : o
      ),
    }));
  },
  addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),

  // ── products ui state ─────────────────────────────────────────────────────
  productView:       "grid",
  productCat:        "all",
  productSearch:     "",
  selectedProductId: null,
  setProductView:    (v) => set({ productView: v, selectedProductId: null }),
  setProductCat:     (v) => set({ productCat: v }),
  setProductSearch:  (v) => set({ productSearch: v }),
  selectProduct:     (id) => set({ selectedProductId: id }),

  // ── products actions ──────────────────────────────────────────────────────
  saveProduct: (product) =>
    set((s) => ({
      products: s.products.find((p) => p.id === product.id)
        ? s.products.map((p) => (p.id === product.id ? product : p))
        : [product, ...s.products],
    })),
  deleteProduct: (id) =>
    set((s) => ({
      products: s.products.filter((p) => p.id !== id),
      selectedProductId: s.selectedProductId === id ? null : s.selectedProductId,
    })),

  // ── customers ui state ────────────────────────────────────────────────────
  customerFilter:      "all",
  customerSearch:      "",
  selectedCustomerId:  null,
  setCustomerFilter:   (v) => set({ customerFilter: v, selectedCustomerId: null }),
  setCustomerSearch:   (v) => set({ customerSearch: v }),
  selectCustomer:      (id) => set({ selectedCustomerId: id }),

  // ── customers actions ─────────────────────────────────────────────────────
  addLoyaltyPoints: (id, pts) =>
    set((s) => ({
      customers: s.customers.map((c) =>
        c.id === id ? { ...c, loyaltyPoints: (c.loyaltyPoints || 0) + pts } : c
      ),
    })),
  saveCustomerNotes: (id, notes) =>
    set((s) => ({
      customers: s.customers.map((c) => (c.id === id ? { ...c, notes } : c)),
    })),

  // ── derived / selectors ───────────────────────────────────────────────────
  getFilteredOrders: () => {
    const { orders, ordersTab, ordersSearch, ordersSort } = get();
    let list = [...orders];
    const q = ordersSearch.toLowerCase();
    if (q) list = list.filter((o) =>
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.phone.includes(q)
    );
    if (ordersTab !== "all") list = list.filter((o) => o.status === ordersTab);
    if (ordersSort === "oldest") list.sort((a, b) => a.createdAt - b.createdAt);
    else if (ordersSort === "high") list.sort((a, b) => b.total - a.total);
    else if (ordersSort === "low")  list.sort((a, b) => a.total - b.total);
    else list.sort((a, b) => b.createdAt - a.createdAt);
    return list;
  },

  getFilteredProducts: () => {
    const { products, productCat, productSearch } = get();
    let list = [...products];
    const q = productSearch.toLowerCase();
    if (q) list = list.filter((p) =>
      p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
    );
    if (productCat !== "all") list = list.filter((p) => p.cat === productCat);
    return list;
  },

  getFilteredCustomers: () => {
    const { customers, orders, customerFilter, customerSearch } = get();
    const getOrders = (name) => orders.filter((o) => o.customer === name);
    let list = customers.filter((c) => c.role !== "admin");
    const q = customerSearch.toLowerCase();
    if (q) list = list.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q)
    );
    if (customerFilter === "active") list = list.filter((c) => getOrders(c.name).length > 0);
    if (customerFilter === "new")    list = list.filter((c) => getOrders(c.name).length === 0);
    if (customerFilter === "vip")    list = list.filter((c) => getOrders(c.name).length >= 5);
    return list;
  },

  getCustomerOrders: (name) => get().orders.filter((o) => o.customer === name),
}));
