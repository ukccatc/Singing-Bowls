'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { AdminAuthGuard } from './AdminAuthGuard';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/products', label: 'Products', icon: '🛍️' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🎨' },
  { href: '/admin/media', label: 'Media Library', icon: '🖼️' },
  { href: '/admin/content', label: 'Content', icon: '📝' },
  { href: '/admin/orders', label: 'Orders', icon: '📦' },
  { href: '/admin/customers', label: 'Customers', icon: '👥' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    logout();
    router.replace('/admin/login');
  };

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-gray-100">
        <aside className="flex w-64 flex-col bg-gray-900 text-white shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="mt-1 text-sm text-gray-400">Himalayan Sound</p>
            {user && <p className="mt-2 text-xs text-gray-500">Signed in as {user.username}</p>}
          </div>

          <nav className="flex-1 space-y-1 px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-4 py-3 font-medium transition-colors ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 border-t border-gray-800 p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full rounded-lg bg-gray-800 px-4 py-2 text-center text-sm transition-colors hover:bg-gray-700"
            >
              Log out
            </button>
            <Link
              href="/en"
              className="block rounded-lg bg-gray-800 px-4 py-2 text-center text-sm transition-colors hover:bg-gray-700"
            >
              ← Back to Store
            </Link>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </AdminAuthGuard>
  );
}
