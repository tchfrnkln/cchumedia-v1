'use client';
import { useStore } from '../../lib/store';
import { CONFIG, CATEGORIES } from '../../lib/data';
import Image from 'next/image';

export default function Footer() {
  const { navigate, route } = useStore();
  if (route.page === 'design-tool' || route.page === 'admin') return null;

  const cols = [
    {
      title: 'Products',
      links: CATEGORIES.filter(c => c.id !== 'all').slice(0, 7).map(c => ({
        label: `${c.icon} ${c.label}`, action: () => navigate('shop', { cat: c.id })
      })),
    },
    {
      title: 'Company',
      links: [
        { label: '📖 About Us', action: () => navigate('about') },
        { label: '💰 Affiliate Program', action: () => navigate('earn') },
        { label: '📦 Track Your Order', action: () => navigate('track') },
        { label: '❓ FAQ', action: () => navigate('faq') },
        { label: '📞 Contact Us', action: () => navigate('contact') },
        { label: '⚖️ Terms & Conditions', action: () => navigate('terms') },
        { label: '🔒 Privacy Policy', action: () => navigate('privacy') },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: '🎨 Online Design Tool', action: () => navigate('design-tool') },
        { label: '🚀 Starter Kits', action: () => navigate('kits') },
        { label: '📚 Book Publishing', action: () => navigate('shop', { cat: 'books' }) },
        { label: '🗳️ Campaign Materials', action: () => navigate('campaign') },
        { label: '💬 Quick Quote', action: () => {} },
        { label: '⭐ Loyalty Programme', action: () => navigate('account', { tab: 'loyalty' }) },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-20">
      <div className="max-w-[1380px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <button onClick={() => navigate('home')} className="flex items-center gap-2.5 mb-4">
              <Image src='/images/icon.png' alt="cchu media" width={50} height={50}></Image>
              <div className="leading-tight text-left">
                <div className="font-display font-black text-sm">PrintHub</div>
                <div className="text-xs text-gray-400">by C-Chu Media Ltd</div>
              </div>
            </button>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Professional printing and branding solutions for businesses across Nigeria. Est. 2013 · Birthing your Imagination...
            </p>
            <div className="space-y-1.5 text-sm text-gray-400">
              <div>📍 {CONFIG.address}</div>
              <div>📞 <a href={`tel:${CONFIG.phone1}`} className="hover:text-white transition-colors">{CONFIG.phone1}</a></div>
              <div>📞 <a href={`tel:${CONFIG.phone2}`} className="hover:text-white transition-colors">{CONFIG.phone2}</a></div>
              <div>✉️ <a href={`mailto:${CONFIG.email}`} className="hover:text-white transition-colors">{CONFIG.email}</a></div>
              <div>⏰ {CONFIG.hours}</div>
            </div>
            <div className="flex gap-2 mt-4">
              {[
                { icon: '💬', href: CONFIG.wa('Hi PrintHub!') },
                { icon: '📘', href: '#' },
                { icon: '📸', href: '#' },
                { icon: '🐦', href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm hover:bg-brand transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {cols.map(col => (
            <div key={col.title}>
              <div className="font-display font-black text-xs uppercase tracking-wider text-gray-300 mb-4">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-sm text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800 py-5">
        <div className="max-w-[1380px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© 2025 C-Chu Media Ltd · All rights reserved · RC: 1234567</span>
          <div className="flex items-center gap-3">
            <span>💳 Paystack</span>
            {/* <span>💳 Flutterwave</span> */}
            <span>🏦 Bank Transfer</span>
            <span>💬 WhatsApp Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
