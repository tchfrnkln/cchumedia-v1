// src/components/LogoutButton.tsx
'use client';

import { useUserRoleStore } from '@/store/authRole';
import { useAuthStore } from '@/store/authStore';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

interface LogoutButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  fullWidth?: boolean;
}

export default function LogoutButton({
  className = '',
  variant = 'outline',
  size = 'md',
  showIcon = true,
  fullWidth = false,
}: LogoutButtonProps) {
  const { logout, isLoading, user } = useAuthStore();
  const { clearRole } = useUserRoleStore();

  const handleLogout = async () => {
    try {
      toast.loading('Logging out...', { id: 'logout-toast' });

      await logout();               // Calls supabase.auth.signOut()
      clearRole();                  // Clears role from userRoleStore

      toast.success('Logged out successfully!', { id: 'logout-toast' });

      // Redirect after logout (adjust path as needed)
      window.location.href = '/dashboard';
      // Alternative: use next/navigation if you prefer router.push('/login')
    } catch {
      toast.error('Failed to log out', { id: 'logout-toast' });
    }
  };

  if(!user) return null

  return (
    <button
      className={`
        btn 
        ${variant === 'default' ? 'btn-neutral' : `btn-${variant}`} 
        btn-${size} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      onClick={handleLogout}
      disabled={isLoading}
    >
      {showIcon && <LogOut size={18} />}
      {isLoading ? (
        <>
          <span className="loading loading-spinner loading-xs"></span>
          Logging out...
        </>
      ) : (
        'Logout'
      )}
    </button>
  );
}