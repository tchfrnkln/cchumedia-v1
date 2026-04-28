'use client';
import { useEffect } from 'react';
import { useStore } from '../../../lib/store';

const typeStyles = {
  success: 'bg-green-600 text-white',
  error:   'bg-red-600 text-white',
  info:    'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900',
  warning: 'bg-orange-500 text-white',
};

export default function Toast() {
  const toast = useStore(s => s.toast);
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] animate-toast">
      <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold max-w-sm ${typeStyles[toast.type] || typeStyles.info}`}>
        {toast.msg}
      </div>
    </div>
  );
}
