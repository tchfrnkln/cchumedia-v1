// ================================================================
// PRINTHUB — lib/store.js
// Zustand global state store
// ================================================================

import { create } from 'zustand';
import { DB } from './db';
import { calcProductPrice, formatNaira } from './data';

export const useStore = create((set, get) => ({
  // ── STATE ──────────────────────────────────────────────────
  route: { page: 'home', params: {} },
  user: null,
  cart: [],
  theme: 'light',
  wishlist: [],
  modal: null, // { type, data }
  adminTab: 'dashboard',
  toast: null,

  // ── INIT ───────────────────────────────────────────────────
  init() {
    if (typeof window === 'undefined') return;
    DB.seedAdmin();
    const theme = localStorage.getItem('ph_theme') || 'light';
    const wishlist = JSON.parse(localStorage.getItem('ph_wishlist') || '[]');
    const uid = DB.getVal('session');
    let user = null;
    if (uid) user = DB.getOne('users', uid);
    const cart = user ? DB.getVal('cart_' + user.id, []) : DB.getVal('cart_guest', []);
    set({ theme, wishlist, user, cart });
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme); 
  },

  // ── THEME ──────────────────────────────────────────────────
  setTheme(t) {
    localStorage.setItem('ph_theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
    document.documentElement.setAttribute('data-theme', t);
    set({ theme: t });
  },

  // ── NAVIGATION ─────────────────────────────────────────────
  navigate(page, params = {}) {
    set({ route: { page, params }, modal: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ── MODALS ─────────────────────────────────────────────────
  openModal(type, data = null) { set({ modal: { type, data } }); },
  closeModal() { set({ modal: null }); },

  // ── TOAST ──────────────────────────────────────────────────
  showToast(msg, type = 'info') {
    set({ toast: { msg, type, id: Date.now() } });
    setTimeout(() => set({ toast: null }), 3200);
  },

  // ── AUTH ───────────────────────────────────────────────────
  login(email, password) {
    const user = DB.query('users', u =>
      u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    )[0];
    if (!user) return { error: 'Invalid email or password' };
    DB.setVal('session', user.id);
    // Merge guest cart
    const guestCart = DB.getVal('cart_guest', []);
    const userCart = DB.getVal('cart_' + user.id, []);
    const merged = [...userCart, ...guestCart];
    DB.setVal('cart_' + user.id, merged);
    DB.setVal('cart_guest', []);
    set({ user, cart: merged });
    return { user };
  },

  register({ name, email, phone, password }) {
    if (!name || !email || !password) return { error: 'All fields required' };
    const exists = DB.query('users', u => u.email.toLowerCase() === email.toLowerCase())[0];
    if (exists) return { error: 'Email already registered' };
    const user = DB.insert('users', {
      name: name.trim(), email: email.trim().toLowerCase(),
      phone: phone || '', password, role: 'customer',
      loyaltyPoints: 0, addresses: [], createdAt: Date.now(),
    });
    DB.setVal('session', user.id);
    set({ user, cart: [] });
    return { user };
  },

  logout() {
    DB.setVal('session', null);
    set({ user: null, cart: [] });
    get().navigate('home');
  },

  updateProfile(patch) {
    const { user } = get();
    if (!user) return;
    const updated = DB.update('users', user.id, patch);
    if (updated) set({ user: updated });
    return updated;
  },

  // ── WISHLIST ───────────────────────────────────────────────
  toggleWishlist(productId) {
    const { wishlist } = get();
    const next = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    localStorage.setItem('ph_wishlist', JSON.stringify(next));
    set({ wishlist: next });
  },

  // ── CART ───────────────────────────────────────────────────
  _saveCart(items) {
    const { user } = get();
    if (user) DB.setVal('cart_' + user.id, items);
    else DB.setVal('cart_guest', items);
    set({ cart: items });
  },

  addToCart(product, config = {}, qty = 1, designData = null) {
    const { unit, total, discount } = calcProductPrice(
      product.basePrice, config.size, config.material, config.finishing, config.turnaround, qty
    );
    const { cart } = get();
    const items = [...cart, {
      cartId: DB.uid(),
      productId: product.id,
      name: product.name,
      icon: product.icon,
      qty, unitPrice: unit, total, discount,
      config: { ...config },
      designData: designData || null,
      addedAt: Date.now(),
    }];
    get()._saveCart(items);
    get().showToast(`🛒 ${product.name} added to cart!`, 'success');
  },

  removeFromCart(cartId) {
    get()._saveCart(get().cart.filter(i => i.cartId !== cartId));
    get().showToast('Item removed', 'info');
  },

  updateCartQty(cartId, newQty) {
    if (newQty < 1) { get().removeFromCart(cartId); return; }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PRODUCTS } = require('./data');
    const items = get().cart.map(i => {
      if (i.cartId !== cartId) return i;
      const product = PRODUCTS.find(p => p.id === i.productId);
      if (!product) return i;
      const { unit, total, discount } = calcProductPrice(
        product.basePrice, i.config.size, i.config.material, i.config.finishing, i.config.turnaround, newQty
      );
      return { ...i, qty: newQty, unitPrice: unit, total, discount };
    });
    get()._saveCart(items);
  },

  clearCart() { get()._saveCart([]); },

  getCartTotal() {
    return get().cart.reduce((s, i) => s + i.total, 0);
  },

  // ── ORDERS ─────────────────────────────────────────────────
  placeOrder({ delivery, payment, loyaltyPointsUsed, notes }) {
    const { user, cart } = get();
    if (!cart.length) return { error: 'Cart is empty' };
    const subtotal = get().getCartTotal();
    const loyaltyDiscount = Math.min(loyaltyPointsUsed || 0, subtotal);
    const deliveryFee = delivery?.fee || 0;
    const total = subtotal - loyaltyDiscount + deliveryFee;
    const order = DB.insert('orders', {
      userId: user?.id || 'guest',
      customerName: user?.name || delivery?.name,
      customerPhone: user?.phone || delivery?.phone,
      customerEmail: user?.email || delivery?.email,
      items: cart,
      subtotal, loyaltyDiscount, deliveryFee, total,
      delivery, payment, notes: notes || '',
      status: 'Pending Payment',
      createdAt: Date.now(),
    });
    // Award loyalty points
    if (user) {
      const pts = Math.round(total * 0.02);
      DB.update('users', user.id, { loyaltyPoints: (user.loyaltyPoints || 0) + pts - (loyaltyPointsUsed || 0) });
      const updatedUser = DB.getOne('users', user.id);
      set({ user: updatedUser });
    }
    get().clearCart();
    return { order };
  },

  getUserOrders() {
    const { user } = get();
    if (!user) return [];
    return DB.query('orders', o => o.userId === user.id)
      .sort((a, b) => b.createdAt - a.createdAt);
  },

  getAllOrders() {
    return DB.get('orders').sort((a, b) => b.createdAt - a.createdAt);
  },

  updateOrderStatus(orderId, status) {
    DB.update('orders', orderId, { status });
  },
}));
