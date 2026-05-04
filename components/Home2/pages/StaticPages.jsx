'use client';
import { useStore } from '../../../lib/store';
import { CONFIG, CATEGORIES, PRODUCTS, formatNaira } from '../../../lib/data';
import Button from '../ui/Button';
import ProductCard from '../ui/ProductCard';
import { useAuthStore } from '@/store/authStore';
import { useProfileStore } from '@/store/profileStore';

export function WishlistPage() {
  const { wishlist, navigate } = useStore();
  const products = PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <div className="max-w-[1380px] mx-auto px-6 py-10 animate-fade-in">
      <h1 className="font-display font-black text-2xl mb-6">❤️ My Wishlist</h1>
      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="font-display font-black text-xl mb-3">Your wishlist is empty</h2>
          <Button onClick={() => navigate('shop')}>Browse Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

export function ContactPage() {
  const { navigate } = useStore();
  return (
    <div className="max-w-[1380px] mx-auto px-6 py-10 animate-fade-in">
      <h1 className="font-display font-black text-3xl mb-2">📞 Contact Us</h1>
      <p className="text-gray-400 mb-8">We&apos;re here to help. Reach us any way you prefer.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            ['📍', 'Address', CONFIG.address],
            ['📞', 'Phone', `${CONFIG.phone1} · ${CONFIG.phone2}`],
            ['✉️', 'Email', CONFIG.email],
            ['⏰', 'Hours', CONFIG.hours],
          ].map(([icon, label, val]) => (
            <div key={label} className="flex gap-4 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
              <span className="text-2xl">{icon}</span>
              <div><div className="font-bold text-sm">{label}</div><div className="text-gray-500 text-sm mt-0.5">{val}</div></div>
            </div>
          ))}
          <Button variant="wa" href={CONFIG.wa('Hi PrintHub! I have an enquiry.')} target="_blank" className="w-full">
            💬 Chat on WhatsApp
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-display font-black text-lg mb-4">Send us a message</h2>
          <div className="space-y-3">
            {['Your Name', 'Email Address', 'Phone Number'].map(ph => (
              <input key={ph} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand" placeholder={ph} />
            ))}
            <textarea rows={4} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand resize-none" placeholder="Your message..." />
            <Button className="w-full">Send Message</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  const faqs = [
    ['How fast is your turnaround?', 'Standard orders take 5-7 business days. Express is 3 days and Rush is 24 hours (for orders before 2PM). Same-day pickup is available in Abuja.'],
    ['What file formats do you accept?', 'We accept PDF, AI, PSD, CDR, PNG (300dpi+) and JPEG (300dpi+). PDF is preferred. We offer free file review on all orders.'],
    ['Do you deliver nationwide?', 'Yes! We deliver across all 36 states via GIG Logistics and DHL. Delivery takes 2-5 business days. Abuja delivery is 1-2 days.'],
    ['What payment methods do you accept?', 'Bank transfer (GTBank), Paystack (card/USSD), and WhatsApp pay. All payments are confirmed before production begins.'],
    ['Do you offer bulk discounts?', 'Yes! Orders of 50+ pieces get 3% off, 100+ get 7%, 250+ get 12%, and 500+ get 20% off.'],
    ['What if my print has an error?', 'If the error is on our end, we reprint for free. If the file you provided had errors, we\'ll discuss options. We always review files before printing.'],
    ['Can I design online?', 'Yes! Use our Design Online tool to create your artwork directly in the browser. Our team can also design for you.'],
    ['How do loyalty points work?', 'Earn 2% of every order value as loyalty points. 1 point = ₦1 discount on future orders.'],
  ];
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">
      <h1 className="font-display font-black text-3xl mb-2">❓ Frequently Asked Questions</h1>
      <p className="text-gray-400 mb-8">Everything you need to know about PrintHub</p>
      <div className="space-y-3">
        {faqs.map(([q, a]) => (
          <details key={q} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-display font-bold text-sm list-none">
              {q}
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function TrackPage() {
  const { user, getUserOrders } = useStore();
  const orders = user ? getUserOrders() : [];
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <h1 className="font-display font-black text-3xl mb-2">📦 Track Your Order</h1>
      <p className="text-gray-400 mb-6">Enter your order ID or check your account orders below.</p>
      <div className="flex gap-2 mb-8">
        <input className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand" placeholder="Order ID (e.g. ABC123)" />
        <Button>Track</Button>
      </div>
      {orders.length > 0 && (
        <div>
          <h2 className="font-display font-black text-base mb-3">Your Recent Orders</h2>
          <div className="space-y-3">
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
                <div className="flex justify-between">
                  <span className="font-display font-black text-sm">#{o.id.toUpperCase()}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg font-bold">{o.status}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{new Date(o.createdAt).toLocaleDateString()} · {formatNaira(o.total)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function StarterKitsPage() {
  const { navigate } = useStore();
  const kits = [
    { name: 'Startup Branding Kit', icon: '🚀', price: 35000, items: ['500 Business Cards', '500 A5 Flyers', 'Email Signature Design'], badge: 'Most Popular' },
    { name: 'Corporate Identity Kit', icon: '💼', price: 55000, items: ['500 Business Cards', 'Letterhead × 500', 'Email Sig', 'Social Media Graphics'], badge: 'Premium' },
    { name: 'Event Essentials Kit', icon: '🎪', price: 75000, items: ['2×2m Backdrop', 'Pull-up Banner', '50 Conference Tags', '100 Programme Booklets'], badge: 'Best Value' }
  ];
  return (
    <div className="w-full mx-auto px-6 py-10 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="font-display font-black text-3xl mb-2">🚀 Starter Kits</h1>
        <p className="text-gray-400">Everything you need to launch your brand — bundled and discounted.</p>
      </div>
      <div className="w-full flex flex-wrap justify-center items-center gap-5">
        {kits.map(kit => (
          <div key={kit.name} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="text-5xl mb-3">{kit.icon}</div>
            <span className="text-xs font-black bg-brand text-white px-2 py-0.5 rounded-full">{kit.badge}</span>
            <h3 className="font-display font-black text-base mt-3 mb-2">{kit.name}</h3>
            <ul className="space-y-1 mb-4">
              {kit.items.map(i => <li key={i} className="text-xs text-gray-500 flex items-center gap-1.5">✅ {i}</li>)}
            </ul>
            <div className="font-display font-black text-brand text-xl mb-3">{formatNaira(kit.price)}</div>
            <Button size="sm" className="w-full" onClick={() => useStore.getState().openModal('quote')}>Get This Kit</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EarnPage() {
  const { openModal } = useStore();
  const { user } = useAuthStore()
  const { profile, fetchProfile } = useProfileStore();

  const affLink = `${window.location.origin}/auth/new?aff=${profile?.affiliate_id}`;
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="font-display font-black text-3xl mb-2">💰 Earn with PrintHub</h1>
        <p className="text-gray-400">Refer clients, earn commissions, and grow with us.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[['🔗','1. Share Your Link','Get your unique referral link from your account dashboard'],
          ['🛒','2. Client Orders','Your referral places their first order on PrintHub'],
          ['💵','3. Earn 5%','You earn 5% of their order value, credited to your account']].map(([ic,t,d])=>(
          <div key={t} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 text-center">
            <div className="text-3xl mb-2">{ic}</div>
            <div className="font-display font-black text-sm mb-1">{t}</div>
            <div className="text-xs text-gray-400">{d}</div>
          </div>
        ))}
      </div>
      {!user ? (
        <div className="text-center">
          <Button onClick={() => openModal('auth')}>Login to Get Your Link</Button>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-800">
          <div className="font-bold text-sm mb-2">Your Referral Link</div>
          {profile?.affiliate_id ? 
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 text-sm font-mono text-brand border border-gray-200 dark:border-gray-700 mb-3">
              {affLink}
            </div>
            <Button size="sm" onClick={() => { navigator.clipboard?.writeText(affLink); useStore.getState().showToast('Link copied!','success'); }}>
              Copy Link
            </Button>
          </div>:
            <Button size="sm" onClick={() => { 
                fetchProfile();
                useStore.getState().showToast('Fetching Link',); 
              }}>
              Get Link
            </Button>
          }
        </div>
      )}
    </div>
  );
}

export function DesignToolPage() {
  const { navigate } = useStore();
  return (
    <div className="animate-fade-in min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-7xl mb-4">🎨</div>
        <h1 className="font-display font-black text-3xl mb-3">Online Design Tool</h1>
        <p className="text-white/60 mb-6">Full-featured canvas editor coming soon.</p>
        <div className="flex flex-col gap-5">
          <Button variant="white" href={CONFIG.wa('Hi! I need help with design for my print job.')} target="_blank">
            💬 Chat with Our Designer
          </Button>
          <Button onClick={() => navigate('home')}>Go Home</Button>
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  const { navigate } = useStore();
  return (
    <div className="max-w-[1380px] mx-auto px-6 py-20 text-center animate-fade-in">
      <div className="text-8xl mb-4">🤷</div>
      <h1 className="font-display font-black text-3xl mb-3">Page Not Found</h1>
      <p className="text-gray-400 mb-6">This page doesn&apos;t exist or is still being built.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={() => navigate('home')}>Go Home</Button>
        <Button variant="outline" onClick={() => navigate('shop')}>Browse Products</Button>
      </div>
    </div>
  );
}




const SAMPLE_PRODUCTS = [
  { id: "c1", name: "Campaign Flyers A5",        price: "₦18,000", cat: "campaign", tag: "Popular" },
  { id: "c2", name: "Candidate Poster A2",        price: "₦25,000", cat: "campaign" },
  { id: "c3", name: "Campaign T-Shirts",          price: "₦8,500",  cat: "campaign", tag: "Bulk" },
  { id: "c4", name: "Campaign Caps",              price: "₦5,000",  cat: "campaign" },
  { id: "b1", name: "Roll-up Banner 85×200cm",    price: "₦22,000", cat: "banners",  tag: "Fast" },
  { id: "b2", name: "Outdoor PVC Banner",         price: "₦15,000", cat: "banners" },
  { id: "a1", name: "Branded Polo Shirt",         price: "₦9,500",  cat: "apparel" },
  { id: "a2", name: "Embroidered Cap",            price: "₦4,500",  cat: "apparel" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PromoBanner({ emoji, title, sub }) {
  return (
    <button
      onClick={() => UI.openModal("quote-modal")}
      className="
        group relative flex flex-col justify-between
        w-full min-h-[140px] sm:min-h-[160px]
        rounded-2xl overflow-hidden text-left
        border border-white/10
        bg-gradient-to-br from-[#1a1f2e] to-[#0f1420]
        p-5 sm:p-6 cursor-pointer
        shadow-md hover:shadow-xl
        transition-all duration-300 hover:-translate-y-0.5
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
      "
    >
      {/* Watermark */}
      <span
        aria-hidden
        className="absolute -right-3 -bottom-3 text-[90px] opacity-10 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-20"
      >
        {emoji}
      </span>

      {/* Hover glow */}
      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 space-y-1">
        <span className="text-3xl leading-none">{emoji}</span>
        <p className="font-extrabold text-white text-lg leading-tight tracking-tight">{title}</p>
        <p className="text-xs text-slate-400 font-medium">{sub}</p>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-wide group-hover:bg-white/20 transition-colors duration-200">
          Get Quote →
        </span>
      </div>
    </button>
  );
}


function RushBanner() {
  return (
    <div className="w-full rounded-2xl bg-[linear-gradient(135deg,#0c0c18,#180606)] border border-white/10 px-6 py-8 sm:py-10 flex flex-col items-center text-center shadow-lg">
      <span className="text-4xl mb-3 select-none" aria-hidden>⚡</span>
      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
        Rush Campaign Production Available
      </h3>
      <p className="mt-2 text-sm text-white/50 max-w-sm leading-relaxed">
        We understand election timelines. Get your materials produced in 24–48 hours.
      </p>
      <a
        href={CONFIG.wa("Hi! I need urgent campaign materials. Rush production.")}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-6 inline-flex items-center gap-2
          px-7 py-3 rounded-xl
          bg-amber-400 text-slate-900
          font-extrabold text-sm tracking-wide
          hover:bg-amber-300 active:scale-95
          transition-all duration-200 shadow-md
          focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
        "
      >
        📞 Call for Rush Order
      </a>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export const CampaignMaterialsPage = () => {
  const products = [
    ...SAMPLE_PRODUCTS.filter((p) => p.cat === "campaign"),
    ...SAMPLE_PRODUCTS.filter((p) => p.cat === "banners").slice(0, 2),
    ...SAMPLE_PRODUCTS.filter((p) => p.cat === "apparel").slice(0, 2),
  ];

  return (
    <div className="min-h-screen text-white">

      {/* ── HERO ── */}
      <section className="w-full bg-gradient-to-br from-[#10101e] to-[#0b0f1a] border-b border-white/10 py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            🗳️ Campaign Materials
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/50 max-w-[480px] leading-relaxed">
            Election, political and civic campaign materials. Fast turnaround, bulk pricing, rush available.
          </p>
        </div>
      </section>

      {/* ── PAGE BODY ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-10">

        {/* ── PROMO BANNERS ── */}
        <section aria-label="Campaign packages">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <PromoBanner
              emoji="🗳️"
              title="Ward / LGA Campaign"
              sub="From ₦50,000 · Banners, flyers, T-shirts, caps"
            />
            <PromoBanner
              emoji="🏛️"
              title="State-Wide Campaign"
              sub="From ₦200,000 · Full suite, vehicle branding"
            />
          </div>
        </section>

        {/* ── PRODUCTS GRID ── */}
        <section aria-label="Campaign products">
          <div className="mb-5">
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-black dark:text-white flex items-center gap-1.5">
              Campaign Products
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand mt-0.5" />
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
              Flyers, banners, apparel and more for your campaign
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ── RUSH BANNER ── */}
        <section aria-label="Rush production">
          <RushBanner />
        </section>

      </div>
    </div>
  );
};
