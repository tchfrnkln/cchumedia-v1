'use client';
import { useStore } from '../../../lib/store';
import { CATEGORIES } from '../../../lib/data';
import { useProductStore } from '@/store/productStore';

export default function CategorySidebar({ activeCat = 'all' }) {
  const { navigate } = useStore();

  const { products: storeProducts, categoryCounts } = useProductStore();

  const getCount = (catId) => {
    if (catId === 'all') return storeProducts?.length || 0;
    return categoryCounts[catId] || 0;
  };

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden sticky top-24">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="hidden">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <span className="font-display font-black text-xs uppercase tracking-wider">Categories</span>
        </div>
        <div>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate('shop', { cat: cat.id })}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm ${activeCat === cat.id ? 'bg-red-50 dark:bg-red-950 text-brand font-bold border-r-2 border-brand' : 'text-gray-600 dark:text-gray-300'}`}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="flex-1 leading-tight">{cat.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCat === cat.id ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>{getCount(cat.id)}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

