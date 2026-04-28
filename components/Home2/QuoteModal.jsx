'use client';
import { useState } from 'react';
import { useStore } from '../../lib/store';
import { CATEGORIES, CONFIG } from '../../lib/data';
import Modal from './ui/Modal';
import Button from './ui/Button';

export default function QuoteModal() {
  const { showToast, closeModal } = useStore();
  const [form, setForm] = useState({ name: '', phone: '', email: '', category: '', details: '', deadline: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inp = 'w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 transition-all';

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.category) {
      showToast('Please fill required fields', 'error'); return;
    }
    const msg = `Hi PrintHub! I need a quote.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCategory: ${form.category}\nDetails: ${form.details}\nDeadline: ${form.deadline}`;
    window.open(CONFIG.wa(msg), '_blank');
    setSent(true);
  };

  return (
    <Modal type="quote" title="💬 Get a Free Quote" maxWidth="max-w-lg">
      <div className="p-6">
        {sent ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="font-display font-black text-xl mb-2">Quote Sent!</h3>
            <p className="text-gray-500 text-sm mb-6">We&apos;ve opened WhatsApp with your details. We&apos;ll respond within 2 hours.</p>
            <Button onClick={closeModal}>Close</Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input className={inp} placeholder="Your name *" value={form.name} onChange={e => set('name', e.target.value)} />
              <input className={inp} type="tel" placeholder="Phone *" value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>
            <input className={inp} type="email" placeholder="Email (optional)" value={form.email} onChange={e => set('email', e.target.value)} />
            <select className={inp} value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="">Select product category *</option>
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.label}>{c.icon} {c.label}</option>
              ))}
            </select>
            <textarea className={`${inp} resize-none`} rows={3} placeholder="Describe your requirement (sizes, quantities, colours, etc.)"
              value={form.details} onChange={e => set('details', e.target.value)} />
            <input className={inp} placeholder="Deadline (e.g. Friday 25 Oct)" value={form.deadline} onChange={e => set('deadline', e.target.value)} />

            <div className="bg-green-50 dark:bg-green-950 rounded-xl p-3 text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
              <span className="mt-0.5">💬</span>
              <div>This will open WhatsApp with your details pre-filled. We respond within 2 hours Mon–Sat.</div>
            </div>

            <Button className="w-full" variant="wa" onClick={handleSubmit}>
              Send Quote via WhatsApp
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
