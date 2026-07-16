'use client';

import { useAuth } from '@/hooks/useAuth';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { AdminAuthGuard } from './AdminAuthGuard';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/products', label: 'Products', icon: '🛍️' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🎨' },
  { href: '/admin/media', label: 'Media Library', icon: '🖼️' },
  { href: '/admin/youtube', label: 'YouTube', icon: '▶️' },
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
      <div className={cn('flex min-h-screen', ui.admin.shellBg)}>
        <aside className={cn('flex w-64 flex-col', ui.admin.sidebar)}>
          <div className="border-b border-charcoal-800 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold-600 text-sm font-bold text-white">
              HS
            </div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className={cn('mt-1 text-sm', ui.admin.sidebarMuted)}>Himalayan Sound</p>
            {user ? (
              <p className={cn('mt-2 text-xs', ui.admin.sidebarMuted)}>
                Signed in as {user.username}
              </p>
            ) : null}
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive ? ui.admin.navActive : ui.admin.navIdle
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 border-t border-charcoal-800 p-4">
            <button type="button" onClick={handleLogout} className={ui.admin.sidebarFooterBtn}>
              Log out
            </button>
            <Link href="/en" className={ui.admin.sidebarFooterBtn}>
              ← Back to Store
            </Link>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </AdminAuthGuard>
  );
}
