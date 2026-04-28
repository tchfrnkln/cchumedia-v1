'use client';

const variants = {
  primary:  'bg-brand hover:bg-brand-dark text-white border-brand hover:border-brand-dark hover:-translate-y-px hover:shadow-lg hover:shadow-red-200 dark:hover:shadow-red-900',
  outline:  'bg-transparent text-brand border-brand hover:bg-brand hover:text-white hover:-translate-y-px',
  ghost:    'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
  accent:   'bg-accent hover:bg-accent-dark text-white border-accent hover:-translate-y-px',
  white:    'bg-white text-brand border-white hover:bg-red-50 hover:-translate-y-px',
  dark:     'bg-gray-900 text-white border-gray-900 hover:opacity-85 hover:-translate-y-px dark:bg-white dark:text-gray-900',
  danger:   'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:-translate-y-px',
  success:  'bg-green-600 text-white border-green-600 hover:bg-green-700 hover:-translate-y-px',
  wa:       'bg-[#25d366] text-white border-[#25d366] hover:bg-[#1da851] hover:-translate-y-px hover:shadow-lg hover:shadow-green-200',
};

const sizes = {
  sm:  'px-3.5 py-1.5 text-xs rounded-md',
  md:  'px-5 py-2.5 text-sm rounded-lg',
  lg:  'px-7 py-3 text-sm rounded-xl',
  xl:  'px-9 py-4 text-base rounded-xl',
  icon:'p-2.5 rounded-lg',
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', disabled, onClick, type = 'button', href, target }) {
  const cls = `inline-flex items-center justify-center gap-2 font-display font-bold border-2 transition-all duration-150 cursor-pointer whitespace-nowrap leading-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${variants[variant]} ${sizes[size]} hover:shadow-none ${className}`;
  if (href) return <a href={href} target={target} className={cls}>{children}</a>;
  return <button type={type} className={cls} disabled={disabled} onClick={onClick}>{children}</button>;
}
