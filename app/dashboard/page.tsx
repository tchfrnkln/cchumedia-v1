'use client';

import LogoutButton from '@/components/Auth/LogOut';
import Dashboard from '@/components/Dashboard/Main';
import Footer from '@/components/Home/Footer';
import Socials from '@/components/Home/Header/Socials';
import { useAuthStore } from '@/store/authStore';

export default function DashboadHome() {

  const { user } = useAuthStore();

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full fixed top-0 left-0 bg-[#DCD8EF] p-4 z-10'>
        <Socials withMail/>
      </div>
      <Dashboard/>
      {user && <div className="fixed bottom-4 right-4">
          <LogoutButton/>
      </div>}
      <Footer/>
    </div>
  );
}