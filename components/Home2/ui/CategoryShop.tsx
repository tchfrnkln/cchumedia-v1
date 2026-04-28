"use client";

import React from "react";
import { useStore } from "../../../lib/store";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  label: string;
  icon: string;
  count: number;
}

interface NavigateOptions {
  cat: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { id: "all",        label: "All Products",           icon: "🛒",  count: 65 },
  { id: "banners",    label: "Banners & Large Format",  icon: "🏷️", count: 8  },
  { id: "cards",      label: "Business Cards",          icon: "💼",  count: 6  },
  { id: "flyers",     label: "Flyers & Leaflets",       icon: "📄",  count: 5  },
  { id: "apparel",    label: "Branded Apparel",         icon: "👕",  count: 7  },
  { id: "books",      label: "Book Publishing",         icon: "📚",  count: 4  },
  { id: "signage",    label: "Signage & Installation",  icon: "🪧", count: 5  },
  { id: "souvenirs",  label: "Souvenirs & Gifts",       icon: "🎁",  count: 6  },
  { id: "stickers",   label: "Stickers & Labels",       icon: "🏷️", count: 4  },
  { id: "events",     label: "Event Materials",         icon: "🎪",  count: 5  },
  { id: "campaign",   label: "Campaign Materials",      icon: "🗳️", count: 5  },
  { id: "nylon",      label: "Custom Nylon Bags",       icon: "🛍️", count: 3  },
  { id: "packaging",  label: "Packaging & Boxes",       icon: "📦",  count: 4  },
  { id: "stationery", label: "Office Stationery",       icon: "📋",  count: 3  },
];

// ─── Mock Store navigation (replace with your real router/store) ──────────────

// const Store = {
//   navigate: (page: string, opts: NavigateOptions) => {
//     console.log("Navigate →", page, opts);
//     // e.g. router.push(`/${page}?cat=${opts.cat}`)
//   },
// };

// ─── Sub-components ──────────────────────────────────────────────────────────

function PromoBanner({
  emoji,
  title,
  subtitle,
  ctaLabel,
  ctaVariant = "primary",
  catId,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaVariant?: "primary" | "accent";
  catId: string;
}) {
    const { navigate } = useStore();
  return (
    <button
      onClick={() => navigate("shop", { cat: catId })}
      className="
        group relative flex flex-col justify-between
        w-full max-h-[145px]
        rounded-2xl overflow-hidden
        border border-white/10
        bg-gradient-to-br from-[#1a1f2e] to-[#0f1420]
        p-5 sm:p-6
        text-left cursor-pointer
        shadow-lg hover:shadow-2xl
        transition-all duration-300 ease-out
        hover:-translate-y-1
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
      "
    >
      {/* Background emoji watermark */}
      <span
        aria-hidden
        className="
          absolute -right-3 -bottom-3
          text-[90px] sm:text-[110px]
          opacity-10 select-none pointer-events-none
          transition-transform duration-500
          group-hover:scale-110 group-hover:opacity-20
        "
      >
        {emoji}
      </span>

      {/* Glow accent */}
      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />

        <div className="w-full flex flex-row justify-center align-bottom">
            {/* Content */}
            <div className="relative z-10 flex flex-col gap-3">
                <span className="text-3xl sm:text-4xl leading-none">{emoji}</span>
                <div>
                <p className="font-extrabold text-white text-md leading-tight tracking-tight">
                    {title}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
                    {subtitle}
                </p>
                </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-4">
                <span
                className={`
                    inline-block px-4 py-1.5 rounded-full
                    text-xs sm:text-sm font-bold tracking-wide
                    transition-all duration-200
                    ${
                    ctaVariant === "accent"
                        ? "bg-amber-400 text-slate-900 group-hover:bg-amber-300"
                        : "bg-white/10 text-white group-hover:bg-white/20"
                    }
                `}
                >
                {ctaLabel}
                </span>
            </div>
        </div>
    </button>
  );
}

function CategoryCard({ category }: { category: Category }) {
    const { navigate } = useStore();
  return (
    <button
      onClick={() => navigate("shop", { cat: category.id })}
      className="
        group flex flex-col items-center justify-center gap-2
        rounded-xl border border-white/8
        bg-white/[0.03] hover:bg-white/[0.07]
        p-3 sm:p-4
        text-center cursor-pointer
        transition-all duration-200 ease-out
        hover:-translate-y-0.5 hover:border-amber-400/30 hover:shadow-md
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
      "
    >
      <span className="text-xl sm:text-2xl leading-none transition-transform duration-200 group-hover:scale-110">
        {category.icon}
      </span>
      <span className="font-semibold text-xs sm:text-sm leading-snug">
        {category.label}
      </span>
      <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
        {category.count} products
      </span>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StoreMain() {
  const visibleCategories = CATEGORIES.filter((c) => c.id !== "all");

  return (
    <main className="w-full min-h-screen text-black dark:text-white  space-y-8 sm:space-y-10">

      {/* ── PROMO BANNERS ── */}
      <section aria-label="Promotional banners">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <PromoBanner
            emoji="🏷️"
            title="Banners from ₦5,000"
            subtitle="Indoor · Outdoor · Roll-up · Backdrops"
            ctaLabel="Shop Banners →"
            ctaVariant="primary"
            catId="banners"
          />
          <PromoBanner
            emoji="👕"
            title="Branded Apparel"
            subtitle="T-Shirts · Caps · Polos · Hoodies"
            ctaLabel="Shop Apparel →"
            ctaVariant="accent"
            catId="apparel"
          />
        </div>
      </section>

      {/* ── CATEGORIES GRID ── */}
      <section aria-label="Shop by category">
        {/* Section header */}
        <div className="flex items-end justify-between mb-4 sm:mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center gap-1.5">
              Shop by Category
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Browse all print &amp; branding products
            </p>
          </div>
        </div>

        {/* Grid */}
        <div
          className="
            grid gap-2 sm:gap-3
            grid-cols-3
            xs:grid-cols-4
            sm:grid-cols-4
            md:grid-cols-7
            lg:grid-cols-7
            xl:grid-cols-7
          "
        >
          {visibleCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>
    </main>
  );
}


// ─── Data ────────────────────────────────────────────────────────────────────

const PARTNERS: string[] = ['EFCC','FRSC','NAMA','Living Faith Church','Labour Party','ADC Party','Hallmark Insurance','CIRA Juice','Fairplay Hotel','Whiteball Lounge','Glory Intl School','Highgrade School'];

const PROMO_ITEMS = [
  {
    emoji: "🚀",
    title: "Starter Kits",
    sub: "From ₦35,000 flat",
    cta: "View Kits →",
    ctaClass: "bg-white/10 text-white hover:bg-white/20",
    page: "kits",
  },
  {
    emoji: "🗳️",
    title: "Campaign",
    sub: "From ₦50,000",
    cta: "Order Now →",
    ctaClass: "bg-[#25d366] text-white hover:bg-[#1fba59]",
    page: "campaign",
  },
  {
    emoji: "💰",
    title: "Earn 10%",
    sub: "Refer & earn forever",
    cta: "Join Free →",
    ctaClass: "bg-amber-400 text-slate-900 hover:bg-amber-300",
    page: "earn",
  },
];

const AFFILIATE_TIERS = [
  { pct: "10%", label: "Orders 1–5" },
  { pct: "5%",  label: "Orders 6–10" },
  { pct: "3%",  label: "Order 11+ Forever" },
  { pct: "∞",   label: "No Limits" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SmallPromoBanner({
  emoji,
  title,
  sub,
  cta,
  ctaClass,
  page,
}: (typeof PROMO_ITEMS)[number]) {

    const { navigate } = useStore();

  return (
    <button
      onClick={() => navigate(page)}
      className="
        group relative flex flex-col justify-between
        w-full min-h-[110px]
        rounded-2xl overflow-hidden
        border border-white/10
        bg-gradient-to-br from-[#1a1f2e] to-[#0f1420]
        p-4 text-left cursor-pointer
        shadow-md hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-0.5
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
      "
    >
      {/* Watermark emoji */}
      <span
        aria-hidden
        className="
          absolute -right-2 -bottom-2 text-[70px]
          opacity-10 select-none pointer-events-none
          transition-transform duration-500
          group-hover:scale-110 group-hover:opacity-20
        "
      >
        {emoji}
      </span>

      {/* Hover glow */}
      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 space-y-0.5">
        <p className="font-extrabold text-white text-[1rem] leading-tight tracking-tight">
          {title}
        </p>
        <p className="text-[0.78rem] text-slate-400 font-medium">{sub}</p>
      </div>

      <div className="relative z-10 mt-3">
        <span
          className={`
            inline-block px-3 py-1 rounded-full
            text-[0.74rem] font-bold tracking-wide
            transition-all duration-200 ${ctaClass}
          `}
        >
          {cta}
        </span>
      </div>
    </button>
  );
}

function AffiliateBanner() {
    const { navigate } = useStore();
  return (
    <div
      className="
        w-full rounded-2xl border border-amber-400/20
        bg-gradient-to-br from-[#1a1f10] to-[#0f1408]
        p-5 sm:p-7
        flex flex-col sm:flex-row gap-6 items-start sm:items-center
        shadow-lg
      "
    >
      {/* Left */}
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="font-extrabold text-white text-lg sm:text-xl leading-tight">
            Earn While You Refer 💰
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
            Join the C-Chu Media Affiliate Program. Earn commission on every
            order your referrals place — forever.
          </p>
        </div>

        {/* Tiers */}
        <div className="flex flex-wrap gap-2">
          {AFFILIATE_TIERS.map((tier) => (
            <div
              key={tier.label}
              className="
                flex flex-col items-center justify-center
                rounded-xl border border-amber-400/20
                bg-amber-400/5 px-3 py-2 min-w-[68px]
              "
            >
              <span className="text-amber-400 font-extrabold text-base sm:text-lg leading-none">
                {tier.pct}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 mt-1 text-center leading-tight">
                {tier.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right CTA */}
      <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
        <span className="text-4xl" aria-hidden>🎯</span>
        <button
          onClick={() => navigate("earn")}
          className="
            px-6 py-2.5 rounded-full
            bg-amber-400 text-slate-900
            font-extrabold text-sm tracking-wide
            hover:bg-amber-300 active:scale-95
            transition-all duration-200 shadow-md
            focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
          "
        >
          Join Free →
        </button>
        <p className="text-[0.72rem] text-white/30">
          Paid monthly · No targets
        </p>
      </div>
    </div>
  );
}

function DesignToolBanner() {
    const { navigate } = useStore();
  return (
    <div
      className="
        w-full rounded-2xl overflow-hidden
        bg-[linear-gradient(135deg,#060618,#0e0e2a)]
        p-6 sm:p-8
        grid grid-cols-[1fr_auto] gap-4 sm:gap-6
        items-center
        shadow-lg
      "
    >
      <div className="space-y-3">
        <p className="text-[0.72rem] font-extrabold uppercase tracking-widest text-amber-400">
          🎨 Free Online Design Tool
        </p>
        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
          Design Your Prints Right Here
        </h3>
        <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-sm">
          Drag &amp; drop editor · 100+ templates · Export print-ready files ·
          Send directly to print.
        </p>
        <button
          onClick={() => navigate("design-tool")}
          className="
            inline-flex items-center gap-2
            px-5 py-2.5 rounded-full
            bg-amber-400 text-slate-900
            font-extrabold text-sm tracking-wide
            hover:bg-amber-300 active:scale-95
            transition-all duration-200 shadow-md
            focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
          "
        >
          🎨 Open Design Tool
        </button>
      </div>

      <span
        aria-hidden
        className="text-[3.5rem] sm:text-[4rem] opacity-50 select-none"
      >
        🖥️
      </span>
    </div>
  );
}

function PartnerTag({ name }: { name: string }) {
  return (
    <span
      className="
        inline-flex items-center px-3 py-1.5
        rounded-full border border-gray-400 dark:border-white/10
        bg-white/[0.04] text-black/60 dark:text-white/60
        text-[0.75rem] sm:text-xs font-semibold
        whitespace-nowrap
        hover:border-brand-dark hover:bg-white/[0.08]
        transition-all duration-200 cursor-default
      "
    >
      {name}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const StoreExtras = () => {
  return (
    <div className="w-full space-y-7 text-white">

      {/* ── PROMO 3-GRID ── */}
      <section aria-label="Promotional offers">
        <div className="flex flex-col md:flex-row gap-3">
          {PROMO_ITEMS.map((item) => (
            <SmallPromoBanner key={item.page} {...item} />
          ))}
        </div>
      </section>

      {/* ── AFFILIATE BANNER ── */}
      <section aria-label="Affiliate programme">
        <AffiliateBanner />
      </section>

      {/* ── DESIGN TOOL BANNER ── */}
      <section aria-label="Online design tool">
        <DesignToolBanner />
      </section>

      {/* ── PARTNERS ── */}
      <section aria-label="Trusted partners" className="mb-7 text-black dark:text-white">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight  flex items-center gap-1.5">
            Trusted by Nigeria&apos;s Leaders
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand mt-0.5" />
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {PARTNERS.map((p) => (
            <PartnerTag key={p} name={p} />
          ))}
        </div>
      </section>
    </div>
  );
}


interface Package {
  name: string;
  price: string;
  items: string[];
  badge?: string;
  gradient: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image?: string;
  cat: string;
  tag?: string;
}


// ─── Data ────────────────────────────────────────────────────────────────────

const PACKAGES: Package[] = [
  {
    name: "Self-Publishing Basic",
    price: "₦80,000",
    badge: "",
    gradient: "from-[#5a5da0] to-[#7B7EC8]",
    items: [
      "Cover Design (Front + Back + Spine)",
      "Interior Layout & Typesetting",
      "10 Printed Copies (Perfect Bound)",
      "ISBN Registration Guidance",
      "PDF Digital Copy",
    ],
  },
  {
    name: "Self-Publishing Pro",
    price: "₦150,000",
    badge: "Most Popular ⭐",
    gradient: "from-[#6d28d9] to-[#4c1d95]",
    items: [
      "Full Cover Design (All sides)",
      "Interior Layout + Illustrations",
      "50 Printed Copies",
      "Light Copy Editing",
      "ISBN Registration",
      "1 Year Digital Distribution Support",
    ],
  },
  {
    name: "Institutional Print",
    price: "Custom",
    badge: "For Organisations",
    gradient: "from-[#0c0c18] to-[#1a0606]",
    items: [
      "Academic & corporate books",
      "Minimum 100 copies",
      "Full design service",
      "ISBN registration",
      "Hardcover or softcover",
      "Distribution support available",
    ],
  },
];

// Replace with real filtered products
const SAMPLE_PRODUCTS: Product[] = [
  { id: "b1", name: "Children's Story Book", price: "₦45,000", cat: "books", tag: "Popular" },
  { id: "b2", name: "Academic Thesis Print", price: "₦35,000", cat: "books" },
  { id: "b3", name: "Corporate Annual Report", price: "₦60,000", cat: "books", tag: "New" },
  { id: "b4", name: "Novel — Paperback", price: "₦55,000", cat: "books" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-black/30 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className={`bg-gradient-to-br ${pkg.gradient} px-5 py-6 text-white`}>
        {pkg.badge && (
          <p className="text-[0.7rem] font-bold uppercase tracking-widest opacity-70 mb-2 font-mono">
            {pkg.badge}
          </p>
        )}
        <h3 className="text-xl font-black leading-tight tracking-tight">{pkg.name}</h3>
        <p className="text-2xl font-black mt-2">{pkg.price}</p>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <ul className="flex-1 space-y-2.5">
          {pkg.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-brand flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5 text-brand-light"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6.5L5 9.5L10 3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-sm text-gray-700 dark:text-slate-300 leading-snug">{item}</span>
            </li>
          ))}
        </ul>

        <button
        //   onClick={() => log}
          className="
            w-full py-2.5 rounded-xl
            bg-brand text-white/90
            font-extrabold text-sm tracking-wide
            hover:bg-brand-deeper active:scale-95
            transition-all duration-200 shadow-md
            focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
          "
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col rounded-xl border border-gray-400 dark:border-white/10 overflow-hidden hover:border-brand-light hover:shadow-lg transition-all duration-200">
      {/* Image placeholder */}
      <div className="relative h-36 bg-gradient-to-br from-brand-light to-brand-mid dark:from-[#1a1f2e] dark:to-[#0f1420] flex items-center justify-center">
        <span className="text-5xl opacity-30 select-none">📚</span>
        {product.tag && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-brand text-[10px] font-extrabold uppercase tracking-wide text-white">
            {product.tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <p className="text-black dark:text-white/20 font-bold text-sm leading-snug">{product.name}</p>
          <p className="text-brand font-extrabold text-base mt-1">{product.price}</p>
        </div>
        <button
        //   onClick={() => }
          className="
            w-full py-2 rounded-lg border border-gray-400 text-black dark:border-white/10
            dark:text-white/70 text-xs font-bold tracking-wide
            
            transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light
          "
        >
          Get Quote →
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const BookPublishingPage = () => {
  return (
    <div className="min-h-screen text-white">

      {/* ── HERO ── */}
      <section className="w-full bg-gradient-to-br from-[#10101e] to-[#0b0f1a] border-b border-white/10 py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            📚 Book Publishing
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/50 max-w-md leading-relaxed">
            Professional book design, editing and print services. From concept to printed copy.
          </p>
        </div>
      </section>

      {/* ── PAGE BODY ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-10">

        {/* ── PACKAGES GRID ── */}
        <section aria-label="Publishing packages">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </section>

        {/* ── PRODUCTS GRID ── */}
        <section aria-label="Book publishing products">
          <div className="mb-5">
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-black dark:text-white flex items-center gap-1.5">
              Individual Print Products
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-deeper mt-0.5" />
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
              Single-run print orders for books & reports
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {SAMPLE_PRODUCTS.filter((p) => p.cat === "books").map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

