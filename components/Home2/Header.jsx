'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, Heart, User, ShoppingBag, MessageCircle, Sun, Moon, ChevronDown, Menu, X } from 'lucide-react';
import { useStore } from '../../lib/store';
import { CATEGORIES, CONFIG, PRODUCTS } from '../../lib/data';
import Button from './ui/Button';

export default function Header() {
  const { route, user, cart, theme, setTheme, navigate, openModal } = useStore();
  const [searchVal, setSearchVal] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMega, setShowMega] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [announcementClosed, setAnnouncementClosed] = useState(false);
  const cartCount = cart.length;
  const searchRef = useRef(null);

  const searchResults = searchVal.length > 1
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase())).slice(0, 6)
    : [];

  const doSearch = () => {
    if (searchVal.trim()) {
      navigate('shop', { search: searchVal.trim() });
      setShowSearch(false);
      setSearchVal('');
    }
  };

  const navLinks = [
    { page: 'home', label: '🏠 Home' },
    { page: 'kits', label: '🚀 Starter Kits' },
    { page: 'campaign', label: '🗳️ Campaign' },
    { page: 'publishing', label: '📚 Publishing' },
    { page: 'design-tool', label: '🎨 Design Online' },
    { page: 'earn', label: '💰 Earn' },
    { page: 'track', label: '📦 Track' },
    { page: 'faq', label: '❓ FAQ' },
    { page: 'contact', label: '📞 Contact' }
  ];

  return (
    <>
      {/* Announcement Bar */}
      {!announcementClosed && (
        <div className="bg-brand text-white text-[10px] font-semibold py-2 px-4 flex items-center justify-center gap-3 relative">
          🎉 <strong>Flash Sale:</strong> 20% off all Banner orders · Use code <strong>BANNER20</strong>
          <button
            onClick={() => navigate('kits')}
            className="underline hover:no-underline"
          >Starter Kits →</button>
          <button
            onClick={() => setAnnouncementClosed(true)}
            className="absolute right-4 text-white/70 hover:text-white"
          >×</button>
        </div>
      )}

      {/* Main Header */}
      <header className="sticky top-0 z-[300] bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-[1380px] mx-auto px-6">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 shrink-0"
            >
              <div className="w-9 h-9 bg-brand text-white font-display font-black text-xl rounded-xl flex items-center justify-center shadow-lg shadow-red-200 dark:shadow-red-900">P</div>
              <div className="hidden sm:block leading-tight text-left">
                <div className="font-display font-black text-base text-gray-900 dark:text-white">PrintHub</div>
                <div className="text-xs text-gray-400">by C-Chu Media Ltd</div>
              </div>
            </button>

            {/* Search */}
            <div className="flex-1 relative hidden md:block rounded-full" ref={searchRef}>
              <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden focus-within:border-brand focus-within:ring-2 focus-within:ring-red-100 dark:focus-within:ring-red-900 transition-all w-2/3">
                <input
                  type="text"
                  value={searchVal}
                  onChange={e => { setSearchVal(e.target.value); setShowSearch(true); }}
                  onFocus={() => setShowSearch(true)}
                  onKeyDown={e => e.key === 'Enter' && doSearch()}
                  placeholder="Search banners, cards, T-shirts, books..."
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none"
                />
                <button
                  onClick={doSearch}
                  className="text-white"
                >
                  <div className="p-1 rounded-full bg-brand p-3">
                    <Search size={16}/>
                  </div>
                </button>
              </div>
              {/* Search dropdown */}
              {showSearch && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-4 py-2.5 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">Results</div>
                      {searchResults.map(p => (
                        <button key={p.id} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                          onClick={() => { navigate('product', { id: p.id }); setShowSearch(false); setSearchVal(''); }}>
                          <span className="text-xl">{p.icon}</span>
                          <span className="text-sm font-medium">{p.name}</span>
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2.5 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">Popular searches</div>
                      {CATEGORIES.filter(c => c.id !== 'all').slice(0, 7).map(c => (
                        <button key={c.id} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                          onClick={() => { navigate('shop', { cat: c.id }); setShowSearch(false); }}>
                          <span className="text-lg">{c.icon}</span>
                          <span className="text-sm">{c.label}</span>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="w-full md:w-max flex items-center justify-between md:justify-normal gap-1">
              <div className='flex items-center gap-1'>
                {/* Theme toggle */}
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Toggle theme"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => navigate('wishlist')}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Heart size={18} />
                </button>

                {/* Account */}
                {user ? (
                  <button
                    onClick={() => navigate('account')}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                  >
                    <User size={18} />
                    {user.role === 'admin' && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-brand rounded-full text-[7px] text-white font-bold flex items-center justify-center">A</span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => openModal('auth')}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User size={18} />
                  </button>
                )}

                {/* WhatsApp */}
                <a
                  href={CONFIG.wa('Hi! I want to enquire about PrintHub')}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-[#25d366]"
                >
                  <MessageCircle size={18} />
                </a>

                {/* Cart */}
                <button
                  onClick={() => openModal('cart')}
                  className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ShoppingBag size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* CTA */}
                <Button size="sm" onClick={() => openModal('quote')} className="hidden md:inline-flex ml-1">
                  Order Now
                </Button>
              </div>


              {/* Mobile menu */}
              <button
                onClick={() => setShowMobile(!showMobile)}
                className="z-10 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
              >
                {showMobile ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Nav bar */}
        <nav className="hidden md:block border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="max-w-[1380px] mx-auto px-6">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
              <button
                  onClick={() => navigate('shop', { cat: 'all' })}
                  className={`flex items-center gap-1 px-3 py-2 text-xs font-display font-bold whitespace-nowrap rounded-lg transition-colors ${route.page === 'shop' ? 'bg-red-50 dark:bg-red-950 text-brand' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brand'}`}
                >
                  🛒 All Products <ChevronDown size={12} />
                </button>
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => navigate(link.page)}
                  className={`px-3 py-2 text-xs font-display font-bold whitespace-nowrap rounded-lg transition-colors ${route.page === link.page ? 'bg-red-50 dark:bg-red-950 text-brand' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brand'}`}
                >
                  {link.label}
                </button>
              ))}

              {/* Products mega menu trigger */}
              <div className='hidden'>
                <button
                  onClick={() => navigate('shop', { cat: 'all' })}
                  className={`flex items-center gap-1 px-3 py-2 text-xs font-display font-bold whitespace-nowrap rounded-lg transition-colors ${route.page === 'shop' ? 'bg-red-50 dark:bg-red-950 text-brand' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brand'}`}
                >
                  🛒 All Products <ChevronDown size={12} />
                </button>
                {showMega && (
                  <div className="nav-mega-menu">
                    {CATEGORIES.filter(c => c.id !== 'all').slice(0, 9).map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { navigate('shop', { cat: cat.id }); setShowMega(false); }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <div>
                          <div className="font-display font-bold text-xs">{cat.label}</div>
                          <div className="text-xs text-gray-400">{cat.count} products</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => openModal('quote')}
                className="px-3 py-2 text-xs font-display font-bold whitespace-nowrap rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brand transition-colors"
              >
                💬 Quick Quote
              </button>

              {user?.role === 'admin' && (
                <button
                  onClick={() => navigate('admin')}
                  className="px-3 py-2 text-xs font-display font-bold whitespace-nowrap rounded-lg text-brand hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                >
                  ⚙️ Admin
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {showMobile && (
          <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-4 py-3 space-y-1 animate-fade-in">
            {/* Mobile search */}
            <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-3">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
                onKeyDown={e => { if (e.key === 'Enter') { navigate('shop', { search: e.target.value }); setShowMobile(false); } }}
              />
              <Search size={16} className="mr-3 text-gray-400" />
            </div>
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => { navigate(link.page); setShowMobile(false); }}
                className="w-full text-left px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Close search on outside click */}
      {showSearch && (
        <div className="fixed inset-0 z-40" onClick={() => setShowSearch(false)} />
      )}
    </>
  );
}
