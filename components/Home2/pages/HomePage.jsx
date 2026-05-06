'use client';
import { useEffect, useState } from 'react';
import { useStore } from '../../../lib/store';
import { PRODUCTS, CATEGORIES, CONFIG, TRUST_ITEMS, formatNaira } from '../../../lib/data';
import ProductCard from '../ui/ProductCard';
import Button from '../ui/Button';
import CategorySidebar from '../ui/CategorySidebar';
import StoreMain, { StoreExtras } from '../ui/CategoryShop';
import { useProductStore } from '@/store/productStore';

function FlashTimer() {
  const [time, setTime] = useState({ h: 8, m: 24, s: 0 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-1">
      {[['h', 'HRS'], ['m', 'MIN'], ['s', 'SEC']].map(([k, lbl], i) => (
        <span key={k} className="flex items-center gap-1">
          {i > 0 && <span className="text-white/50 font-bold">:</span>}
          <span className="timer-block">
            <span className="font-display font-black text-lg leading-none">{pad(time[k])}</span>
            <span className="text-[9px] text-white/60 font-bold tracking-wider">{lbl}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ name, role, text, rating }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
      <div className="text-amber-400 text-sm mb-2">{'★'.repeat(rating)}</div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">&quot;{text}&quot;</p>
      <div>
        <div className="font-display font-bold text-sm">{name}</div>
        <div className="text-xs text-gray-400">{role}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { products } = useProductStore();
  const { navigate, openModal } = useStore();
  // const featured = PRODUCTS.filter(p => p.featured).slice(0, 8);
  const featured = products?.filter(p => p.featured).slice(0, 8);
  const bestsellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
 

  const testimonials = [
    { name: 'Amaka Obi', role: 'Event Planner, Abuja', rating: 5, text: 'PrintHub delivered our conference materials in record time. Quality was excellent and pricing very fair.' },
    { name: 'Emeka Nwosu', role: 'Small Business Owner', rating: 5, text: 'My business cards turned out perfect. Spot UV finish was amazing, clients always comment on them.' },
    { name: 'Fatima Bello', role: 'Campaign Manager', rating: 5, text: 'We printed 5,000 campaign T-shirts in 48 hours! They delivered on time and the quality was top notch.' },
    { name: 'Chidi Eze', role: 'Author, Lagos', rating: 5, text: 'Published my first book with PrintHub. The hardcover finish was premium and delivery was fast.' },
  ];

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <div className="flex w-full justify-between">
        {/* Category sidebar on hero */}
        <div className="hidden md:w-1/5 md:flex justify-center items-center pt-2">
          <aside className="hidden xl:block w-52 shrink-0">
            <div className="text-black border-gray-400 dark:text-white dark:bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border dark:border-white/10">
              <div className="px-4 py-3 border-b border-gray-400 dark:border-white/10 flex items-center gap-2">
                <span className="font-display font-black text-xs uppercase tracking-wider">Categories</span>
              </div>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => navigate('shop', { cat: cat.id })}
                  className="w-full flex items-center gap-2 px-4 py-2 text-dark/80 dark:text-white/80 hover:bg-white/10 transition-colors text-left">
                  <span>{cat.icon}</span>
                  <span className="flex-1 text-xs">{cat.label}</span>
                  <span className="text-white/40 text-xs">{cat.count}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
        <section className="w-full md:w-4/5 relative bg-gradient-to-br from-[#0d0c17] via-[#15080d] to-[#340e11] overflow-hidden">
          <div className="hero-glow" />
          <div className="max-w-[1380px] mx-auto px-6 py-20 relative z-10">
            <div className="flex gap-8 items-center">
              {/* Hero content */}
              <div className="flex-1 text-white">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
                  🔴 Now Live Online · Est. 2011 · Karu, Abuja FCT
                </div>
                <h1 className="font-display font-black text-3xl md:text-4xl leading-tight mb-4">
                  Nigeria&apos;s Finest<br />
                  <span className="text-brand text-5xl md:text-6xl">Print & Branding</span><br />
                  Portal
                </h1>
                <p className="text-white/70 text-lg mb-8 max-w-xl">
                  Order banners, business cards, branded apparel, signage, books and more. Trusted by 3,000+ clients since 2011.
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  <Button size="lg" onClick={() => navigate('shop')}>🛒 Shop Products</Button>
                  <Button size="lg" variant="white" href={CONFIG.wa('Hi! I want to place a print order')} target="_blank">
                    💬 WhatsApp Us
                  </Button>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 max-w-lg">
                  {[['3,000+','Jobs Delivered'],['13+','Years in Business'],['₦3k','Prices From'],['24hr','Rush Available']].map(([v,l]) => (
                    <div key={l}>
                      <div className="font-display font-black text-2xl text-white">{v}</div>
                      <div className="text-white/50 text-xs mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="hidden lg:flex items-center justify-center text-[100px] animate-bounce" style={{ animationDuration: '15s' }}>
                🖨️
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FLASH SALE BAR */}
      <div className="bg-gradient-to-r from-brand to-brand-dark text-white">
        <div className="max-w-[1380px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <span className="bg-white text-brand text-xs font-black px-2 py-0.5 rounded-full">🔥 FLASH SALE</span>
              20% off Banners & Flyers — ends in:
            </div>
            <FlashTimer />
            <Button size="sm" variant="white" onClick={() => navigate('shop', { cat: 'banners' })}>Shop Sale →</Button>
          </div>
        </div>
      </div>

      {/* TRUST STRIP */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1380px] mx-auto px-6 py-3">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
            {TRUST_ITEMS.map(item => (
              <div key={item.text} className="flex items-center gap-2 text-sm whitespace-nowrap text-gray-600 dark:text-gray-300">
                <span className="text-lg">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1380px] mx-auto px-6 py-12">

        {/* Category chips initailly "flex"*/}
        <div className="hidden gap-2 overflow-x-auto scrollbar-hide pb-2 mb-10">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => navigate('shop', { cat: cat.id })}
              className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:border-brand hover:text-brand hover:bg-red-50 dark:hover:bg-red-950 transition-all">
              {cat.icon} {cat.id === 'all' ? 'All' : cat.label.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className='w-full flex flex-row gap-2 relative'>
          <div className='hidden md:flex w-1/5 sticky top-4'>
            <CategorySidebar/>
          </div>

          <div className='w-full md:w-4/5'>
            {/* Pre Featured */}
            <StoreMain/>

            {/* Featured */}
            <section className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-black text-2xl">Featured Products</h2>
                  <p className="text-gray-400 text-sm mt-1">Our most popular print products</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('shop')}>View All →</Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {featured.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>

            {/* Why PrintHub */}
            <section className="mb-14 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
              <div className="text-center mb-8">
                <h2 className="font-display font-black text-3xl mb-2">Why Choose PrintHub?</h2>
                <p className="text-white/60">Nigeria&apos;s most trusted print partner since 2011</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { icon: '🚀', title: 'Lightning Fast', desc: '24hr rush service available. Same-day pickup in Abuja.' },
                  { icon: '🎨', title: 'Free Design Review', desc: 'Expert preflight on every file. 300 DPI quality guaranteed.' },
                  { icon: '💰', title: 'Best Prices', desc: 'Prices from ₦500. Bulk discounts up to 20% off.' },
                  { icon: '🔄', title: 'Free Reprint', desc: "If it doesn't match your proof, we reprint for free." },
                  { icon: '📦', title: 'Nationwide Delivery', desc: 'GIG & DHL delivery across all 36 states.' },
                  { icon: '⭐', title: 'Loyalty Rewards', desc: 'Earn 2% points on every order. Redeem for discounts.' },
                ].map(f => (
                  <div key={f.title} className="flex gap-3">
                    <span className="text-3xl">{f.icon}</span>
                    <div>
                      <div className="font-display font-bold text-sm mb-1">{f.title}</div>
                      <div className="text-white/60 text-xs leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bestsellers */}
            <section className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-black text-2xl">Bestsellers 🔥</h2>
                  <p className="text-gray-400 text-sm mt-1">Most ordered by our customers</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('shop')}>View All →</Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>

            {/* Extras */}
            <StoreExtras/>

          </div>

        </div>


        {/* Testimonials */}
        <section className="my-14">
          <div className="text-center mb-8">
            <h2 className="font-display font-black text-2xl mb-2">❤️ What Our Clients Say</h2>
            <p className="text-gray-400 text-sm">3,000+ satisfied customers and counting</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map(t => <TestimonialCard key={t.name} {...t} />)}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-brand to-accent p-8 md:p-12 text-white text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="font-display font-black text-3xl mb-3">Ready to Print?</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Get a free quote in under 2 hours. Our team is ready to help you create stunning print materials.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="white" onClick={() => navigate('shop')}>🛒 Shop Now</Button>
            <Button size="lg" href={CONFIG.wa('Hi! I want a quote')} target="_blank"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 border-2">
              💬 Get Free Quote
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
