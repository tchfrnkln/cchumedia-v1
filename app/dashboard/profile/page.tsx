'use client';

import LogoutButton from '@/components/Auth/LogOut';
import ProfilePage from '@/components/Dashboard/Profile/Profile';
import Footer from '@/components/Home/Footer';
import { Header2 } from '@/components/Home/Header';

export default function DashboadHome() {

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full fixed top-0 left-0 z-10 border-b-2 border-(--cchu-red)'>
        <Header2/>
      </div>
      <ProfilePage/>
      <div className="fixed bottom-4 right-4">
          <LogoutButton/>
      </div>
      <Footer/>
    </div>
  );
}