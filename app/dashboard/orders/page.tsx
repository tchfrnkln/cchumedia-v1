'use client';

import LogoutButton from '@/components/Auth/LogOut';
import OrdersPage from '@/components/Dashboard/Orders/OrdersPage';
import Footer from '@/components/Home/Footer';
import Socials from '@/components/Home/Header/Socials';

export default function DashboadHome() {

  return (
    <div className='w-full min-h-screen'>
      <OrdersPage/>
      <div className="fixed bottom-4 right-4">
          <LogoutButton/>
      </div>
      <Footer/>
    </div>
  );
}