'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../../../lib/store';

export default function Modal({ type, title, children, maxWidth = 'max-w-lg' }) {
  const { modal, closeModal } = useStore();
  if (!modal || modal.type !== type) return null;
  return (
    <div className="modal-backdrop animate-fade-in" onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className={`relative w-full ${maxWidth} bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-fade-in`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-display font-black text-lg">{title}</h2>
            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <X size={18} />
            </button>
          </div>
        )}
        {!title && (
          <button onClick={closeModal} className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X size={18} />
          </button>
        )}
        <div className="overflow-y-auto max-h-[85vh]">{children}</div>
      </div>
    </div>
  );
}
