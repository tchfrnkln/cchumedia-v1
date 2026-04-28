'use client';

const variants = {
  brand:   'bg-red-50 text-brand dark:bg-red-950 dark:text-red-300',
  accent:  'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300',
  green:   'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  orange:  'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  dark:    'bg-gray-900 text-white dark:bg-white dark:text-gray-900',
  sale:    'bg-brand text-white',
  blue:    'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300',
  luxury:  'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
};

export default function Badge({ children, variant = 'brand', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold tracking-wide font-display ${variants[variant] || variants.brand} ${className}`}>
      {children}
    </span>
  );
}
