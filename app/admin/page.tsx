'use client';

import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  revenue: number;
}

const quickLinks = [
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/content', label: 'Content' },
  { href: '/admin/orders', label: 'Orders' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: ui.admin.iconGold,
      href: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: ui.admin.iconBronze,
      href: '/admin/orders',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: ui.admin.iconCopper,
      href: '/admin/customers',
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toFixed(2)}`,
      icon: TrendingUp,
      color: ui.admin.iconCharcoal,
      href: '/admin/orders',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className={ui.page.title}>Dashboard</h1>
        <p className={cn('mt-1', ui.page.subtitle)}>
          Overview of catalog, orders, and store activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={cn(ui.cardInteractive, 'block')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal-600">{card.title}</p>
                  <p className="mt-2 text-2xl font-bold text-charcoal-900">{card.value}</p>
                </div>
                <div className={cn(card.color, 'rounded-xl p-3')}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className={ui.card}>
        <h2 className="text-lg font-semibold text-charcoal-900">Quick links</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                ui.button.outline,
                'inline-flex rounded-lg px-4 py-2 text-sm font-medium'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
