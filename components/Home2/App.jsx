'use client';
import { useEffect } from 'react';
import { useStore } from '../../lib/store';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';
import QuoteModal from './QuoteModal';
import Toast from './ui/Toast';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import {
  WishlistPage, ContactPage, FAQPage, TrackPage,
  StarterKitsPage, EarnPage, DesignToolPage, NotFoundPage,
  CampaignMaterialsPage
} from './pages/StaticPages';
import { BookPublishingPage } from './ui/CategoryShop';
import { useProductStore } from '@/store/productStore';
import { useUserRoleStore } from '@/store/authRole';

function Router() {
  const page = useStore(s => s.route.page);
  switch (page) {
    case 'home':        return <HomePage />;
    case 'shop':        return <ShopPage />;
    case 'product':     return <ProductPage />;
    case 'checkout':    return <CheckoutPage />;
    case 'account':     return <AccountPage />;
    case 'admin':       return <AdminPage />;
    case 'wishlist':    return <WishlistPage />;
    case 'contact':     return <ContactPage />;
    case 'faq':         return <FAQPage />;
    case 'track':       return <TrackPage />;
    case 'kits':        return <StarterKitsPage />;
    case 'earn':        return <EarnPage />;
    case 'design-tool': return <DesignToolPage />;
    case 'campaign': return <CampaignMaterialsPage />;
    case 'publishing': return <BookPublishingPage />;
    default:            return <NotFoundPage />;
  }
}

export default function App() {
  const { init, route } = useStore();
  const {fetchProducts} = useProductStore();
  const { getUserRole } = useUserRoleStore();
  

  useEffect(() => {
    init();
    // Handle browser back/forward
    const onPop = () => {
      const hash = location.hash.replace('#', '');
      if (!hash || hash === '/') { useStore.getState().navigate('home'); return; }
      const [page, qs] = hash.split('?');
      const params = qs ? Object.fromEntries(new URLSearchParams(qs)) : {};
      useStore.setState({ route: { page: page || 'home', params } });
    };
    window.addEventListener('popstate', onPop);
    fetchProducts()
    getUserRole()
    return () => window.removeEventListener('popstate', onPop);
  }, [getUserRole, fetchProducts, init]);

  const isAdmin = route.page === 'admin';
  const isDesignTool = route.page === 'design-tool';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {!isAdmin && !isDesignTool && <Header />}
      <main>
        <Router />
      </main>
      {!isAdmin && !isDesignTool && <Footer />}

      {/* Overlays */}
      <CartDrawer />
      <AuthModal />
      <QuoteModal />
      <Toast />
    </div>
  );
}
