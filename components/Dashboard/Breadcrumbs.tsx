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

  // Custom label mapping (what the user sees)
  const labelMap: Record<string, string> = {
    dashboard: 'Dashboard',
    checkout: 'Checkout',
    orders: 'My Orders',
    profile: 'Profile',
    products: 'Products',           // ← displayed text stays "Products"
    // Add more as needed
    // '[id]': 'Item Details',      // example for dynamic segments
  };

  // Custom link override mapping (where it actually goes)
  // Only needed for segments where href should differ from the path
  const linkOverrideMap: Record<string, string> = {
    products: '/dashboard',         // ← key change: /products → /dashboard
    // Add more overrides if you have other special cases, e.g.:
    // 'settings': '/account/settings',
  };

  const getLabel = (segment: string) => {
    // Clean up slugs: kebab-case → Title Case (fallback)
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
          // Build the default href from path segments
          const defaultHref = '/' + segments.slice(0, index + 1).join('/');

          // Use override if defined for this segment, otherwise use default
          const href = linkOverrideMap[segment] ?? defaultHref;

          const label = getLabel(segment);
          const isLast = index === segments.length - 1;

          return (
            <li key={defaultHref}>  {/* key on original path to avoid dupes */}
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