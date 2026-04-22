// components/Dashboard/CategorySidebar.tsx
'use client';

import { useMemo } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import clsx from 'clsx';


export default function CategorySidebar() {
  const { searchQuery, setSearchQuery, setCurrentPage } = useDashboardStore();

  /**
   * Categories inspired by common print/media shops:
   * Business Cards, Flyers, Banners, Stickers, Brochures, etc.
   * Since your data may differ, we also merge categories found in products.
   */
  const categories = useMemo(() => {
    const defaultCategories = [
      'All Products',
      'Card',
      'Flyer',
      'Banner',
      'Poster',
      'Brochures',
      'Sticker',
      'Vest',
      'Invitation',
      'Cap',
      'Packaging',
      'Branding',
      'Bag',
      'Shirt',
      'Mug',
      'Receipt',
      'Invoice',
      'Book',
      'Document',
      'Event',
      'Wedding',
      '3D',
      'Pillow',
      'Gift',

    ];

    // const dbCategories = products
    //   .map((p) => p.def?.trim())
    //   .filter(Boolean) as string[];

    return Array.from(new Set([...defaultCategories]));
  }, []);

  const handleClick = (category: string) => {
    setCurrentPage(1);

    if (category === 'All Products') {
      setSearchQuery('');
      return;
    }

    setSearchQuery(category);
  };

  return (
    <aside className="w-full shrink-0">
      <div className="bg-base-100 rounded-2xl shadow-md p-4 sticky top-4">
        <h3 className="font-bold text-lg mb-4">Categories</h3>

        {/* mobile horizontal scroll */}
        <div className="w-full flex gap-2 overflow-x-scroll pb-2 scrollbar-hide ">
          {categories.map((cat) => {
            const active =
              (cat === 'All Products' && searchQuery === '') ||
              searchQuery.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                onClick={() => handleClick(cat)}
                className={clsx(
                  'px-4 py-2 rounded-full whitespace-nowrap border text-sm',
                  active
                    ? 'bg-[#9B96C8] text-white border-[#9B96C8]'
                    : 'border-base-300'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* desktop stacked */}
        {/* <div className="hidden lg:flex flex-col gap-2">
          {categories.map((cat) => {
            const active =
              (cat === 'All Products' && searchQuery === '') ||
              searchQuery.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                onClick={() => handleClick(cat)}
                className={clsx(
                  'text-left px-4 py-3 rounded-xl transition',
                  active
                    ? 'bg-[#9B96C8] text-white'
                    : 'hover:bg-base-200'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div> */}
      </div>
    </aside>
  );
}