'use client';

import LogoutButton from '@/components/Auth/LogOut';
import CheckoutPage from '@/components/Dashboard/Checkout/CheckOutPage';
import Footer from '@/components/Home/Footer';
import Socials from '@/components/Home/Header/Socials';

export default function DashboadHome() {

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full fixed top-0 left-0 bg-[#DCD8EF] p-4 z-10'>
        <Socials withMail/>
      </div>
      <CheckoutPage/>
      <div className="fixed bottom-4 right-4">
          <LogoutButton/>
      </div>
      <Footer/>
    </div>
  );
}