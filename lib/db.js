// ================================================================
// PRINTHUB — lib/db.js
// localStorage persistence layer (browser-only)
// ================================================================

const PREFIX = 'ph_';

function isBrowser() {
  return typeof window !== 'undefined';
}

export const DB = {
  get(table) {
    if (!isBrowser()) return [];
    try { return JSON.parse(localStorage.getItem(PREFIX + table)) || []; }
    catch { return []; }
  },
  set(table, data) {
    if (!isBrowser()) return data;
    localStorage.setItem(PREFIX + table, JSON.stringify(data));
    return data;
  },
  getOne(table, id) {
    return this.get(table).find(r => r.id === id) || null;
  },
  insert(table, record) {
    const rows = this.get(table);
    const newRecord = { ...record, id: record.id || this.uid(), createdAt: record.createdAt || Date.now() };
    rows.push(newRecord);
    this.set(table, rows);
    return newRecord;
  },
  update(table, id, patch) {
    const rows = this.get(table);
    const idx = rows.findIndex(r => r.id === id);
    if (idx === -1) return null;
    rows[idx] = { ...rows[idx], ...patch, updatedAt: Date.now() };
    this.set(table, rows);
    return rows[idx];
  },
  remove(table, id) {
    this.set(table, this.get(table).filter(r => r.id !== id));
  },
  query(table, predicate) {
    return this.get(table).filter(predicate);
  },
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  },
  clear(table) {
    if (!isBrowser()) return;
    localStorage.removeItem(PREFIX + table);
  },
  getVal(key, fallback = null) {
    if (!isBrowser()) return fallback;
    const v = localStorage.getItem(PREFIX + 'kv_' + key);
    return v !== null ? JSON.parse(v) : fallback;
  },
  setVal(key, value) {
    if (!isBrowser()) return;
    localStorage.setItem(PREFIX + 'kv_' + key, JSON.stringify(value));
  },
  seedAdmin() {
    if (!isBrowser()) return;
    if (!this.getVal('seeded')) {
      this.insert('users', {
        id: 'admin001',
        email: 'admin@cchumedia.com',
        password: 'admin123',
        name: 'Silas Umekwe',
        role: 'admin',
        phone: '+234 901 559 9370',
        loyaltyPoints: 0,
        addresses: [],
        createdAt: Date.now(),
      });
      this.setVal('seeded', true);
    }
  },
};
