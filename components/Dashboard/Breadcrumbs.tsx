'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Skip on home page or root
  if (!pathname || pathname === '/') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  // Optional: Custom label mapping for better readability
  // Extend this object for dynamic/[slug] routes, dashboard sections, etc.
  const labelMap: Record<string, string> = {
    dashboard: 'Dashboard',
    checkout: 'Checkout',
    orders: 'My Orders',
    profile: 'Profile',
    products: 'Products',
    // Example dynamic route handling (you can make this more advanced)
    '[id]': 'Item Details', // fallback - replace with real title fetch if needed
  };

  const getLabel = (segment: string) => {
    // Clean up slugs: kebab-case → Title Case
    const cleaned = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return labelMap[segment] || labelMap[cleaned] || cleaned;
  };

  return (
    <div className="breadcrumbs text-sm mb-4 mt-24 px-4">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const label = getLabel(segment);
          const isLast = index === segments.length - 1;

          return (
            <li key={href}>
              {isLast ? (
                <span className="text-base-content/70">{label}</span>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}