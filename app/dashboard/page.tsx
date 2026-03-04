'use client';

import LogoutButton from '@/components/Auth/LogOut';
import Dashboard from '@/components/Dashboard/Main';

export default function DashboadHome() {

  return (
    <div className='w-full min-h-screen'>
      <Dashboard/>
      <div className="fixed bottom-4 right-4">
          <LogoutButton/>
      </div>
    </div>
  );
}