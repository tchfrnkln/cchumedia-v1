'use client';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useStore } from '../../../lib/store';
import { PRODUCTS, CATEGORIES, formatNaira } from '../../../lib/data';
import ProductCard from '../ui/ProductCard';
import CategorySidebar from '../ui/CategorySidebar';
import Button from '../ui/Button';
import { useProductStore } from '@/store/productStore';

export default function ShopPage() {
  const { route, navigate } = useStore();
  const { params } = route;
  const cat = params?.cat || 'all';
  const sort = params?.sort || 'popular';
  const search = params?.search || '';

  const [showFilters, setShowFilters] = useState(false);
  const [priceMax, setPriceMax] = useState(200000);

  const { products: storeProducts } = useProductStore();

  // Prefer store products, fallback to static PRODUCTS
  const allProducts = useMemo(() => {
    return storeProducts?.length > 0 ? storeProducts : PRODUCTS;
  }, [storeProducts]);

  // Main filtered and sorted products
  const product = useMemo(() => {
    let result = [...allProducts];

    // Category filter (more flexible)
    if (cat !== 'all') {
      result = result.filter(p => {
        const productCat = p.cat || p.category || '';
        return productCat.toLowerCase() === cat.toLowerCase();
      });
    }

    // Search filter
    if (search) {
      const searchTerm = search.toLowerCase().trim();
      result = result.filter(p =>
        p.name?.toLowerCase().includes(searchTerm) ||
        p.desc?.toLowerCase().includes(searchTerm) ||
        p.productName?.toLowerCase().includes(searchTerm) // support different naming
      );
    }

    // Price filter
    result = result.filter(p => {
      const price = p.basePrice || p.price || p.cost || 0;
      return price <= priceMax;
    });

    // Sorting
    if (sort === 'low') {
      result.sort((a, b) => {
        const priceA = a.basePrice || a.price || 0;
        const priceB = b.basePrice || b.price || 0;
        return priceA - priceB;
      });
    } else if (sort === 'high') {
      result.sort((a, b) => {
        const priceA = a.basePrice || a.price || 0;
        const priceB = b.basePrice || b.price || 0;
        return priceB - priceA;
      });
    } else {
      // Default: Most Popular (reviews)
      result.sort((a, b) => (b.reviews || b.rating || 0) - (a.reviews || a.rating || 0));
    }

    return result;
  }, [allProducts, cat, search, priceMax, sort]);

  const catLabel = CATEGORIES.find(c => c.id === cat)?.label || 'All Products';

  console.log("All Products:", allProducts.length);
  console.log("Final displayed products:", product.length);
  console.log("Current category:", cat);

  return (
    <div className="animate-fade-in">
      {/* Page hero */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-[1380px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <button onClick={() => navigate('home')} className="hover:text-brand transition-colors">Home</button>
            <span>›</span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              {search ? `Search: "${search}"` : catLabel}
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display font-black text-2xl">
                {search ? `Results for "${search}"` : catLabel}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {product.length} product{product.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium lg:hidden"
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
              <select
                value={sort}
                onChange={e => navigate('shop', { cat, sort: e.target.value })}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-brand"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto px-6 py-8">
        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-6">
          {CATEGORIES.map(c => (
            <button 
              key={c.id} 
              onClick={() => navigate('shop', { cat: c.id })}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border 
                ${c.id === cat 
                  ? 'bg-brand text-white border-brand' 
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-brand hover:text-brand'
                }`}
            >
              {c.icon} {c.id === 'all' ? 'All' : c.label.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className={`${showFilters ? 'fixed inset-0 z-50 bg-white dark:bg-gray-950 p-6 overflow-y-auto' : 'hidden'} lg:block lg:static lg:z-auto lg:bg-transparent lg:p-0 lg:overflow-visible`}>
            {showFilters && (
              <button 
                onClick={() => setShowFilters(false)} 
                className="flex items-center gap-2 mb-4 text-sm font-bold lg:hidden"
              >
                <X size={16} /> Close Filters
              </button>
            )}
            <CategorySidebar activeCat={cat} />

            {/* Price filter */}
            <div className="mt-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 hidden lg:block">
              <div className="font-display font-black text-xs uppercase tracking-wider text-gray-500 mb-3">💰 Max Price</div>
              <input 
                type="range" 
                min={500} 
                max={200000} 
                step={500} 
                value={priceMax}
                onChange={e => setPriceMax(Number(e.target.value))}
                className="w-full accent-brand" 
              />
              <div className="text-sm font-bold text-brand mt-2">{formatNaira(priceMax)}</div>
            </div>

            {/* Quick quote widget */}
            <div className="mt-4 hidden lg:block bg-gradient-to-br from-brand to-brand-dark rounded-2xl p-4 text-white">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-display font-black text-sm mb-1">Custom Print?</div>
              <div className="text-white/70 text-xs mb-3">Get a quote in under 2 hours</div>
              <button
                onClick={() => useStore.getState().openModal('quote')}
                className="w-full py-2 bg-white text-brand text-xs font-display font-black rounded-xl hover:bg-red-50 transition-colors"
              >
                Free Quote
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {product.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display font-black text-xl mb-2">No product found</h3>
                <p className="text-gray-400 text-sm mb-6">Try adjusting your filters or search terms</p>
                <Button onClick={() => navigate('shop', { cat: 'all' })}>
                  View All Products
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {product.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}