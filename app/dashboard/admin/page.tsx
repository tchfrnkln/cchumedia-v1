'use client';

import LogoutButton from '@/components/Auth/LogOut';
import AdminOrdersPage from '@/components/Dashboard/Admin/AdminStatus';
import Footer from '@/components/Home/Footer';
import { Header2 } from '@/components/Home/Header';

export default function DashboadHome() {

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full fixed top-0 left-0 bg-[#DCD8EF] p-4 z-10'>
        <Header2/>
      </div>
      <AdminOrdersPage/>
      <div className="fixed bottom-4 right-4">
          <LogoutButton/>
      </div>
      <Footer/>
    </div>
  );
}