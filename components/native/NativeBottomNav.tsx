'use client';

import { NativeNavButton, NativePressable } from '@/components/native/NativePressable';
import { useCart } from '@/lib/hooks/useCart';
import { isShopTabActive, shouldShowNativeBottomNav } from '@/lib/native-navigation';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Home, ImageIcon, ShoppingBag, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NativeBottomNavProps {
  locale: Locale;
}

export function NativeBottomNav({ locale }: NativeBottomNavProps) {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  if (!shouldShowNativeBottomNav(pathname)) {
    return null;
  }

  const normalizedPath = pathname.replace(/\/$/, '') || `/${locale}`;

  const tabs = [
    {
      href: `/${locale}`,
      label: t('nav.home', locale),
      icon: Home,
      isActive: normalizedPath === `/${locale}`,
    },
    {
      href: `/${locale}/shop`,
      label: t('nav.shop', locale),
      icon: ShoppingBag,
      isActive: isShopTabActive(pathname),
    },
    {
      href: `/${locale}/cart`,
      label: t('nav.cart', locale),
      icon: ShoppingCart,
      isActive: pathname.includes('/cart'),
      badge: cartCount,
    },
    {
      href: `/${locale}/gallery`,
      label: t('gallery.title', locale),
      icon: ImageIcon,
      isActive: pathname.includes('/gallery'),
    },
  ] as const;

  return (
    <nav
      className="site-native-bottom-nav fixed bottom-0 left-0 right-0 z-[9991] bg-white"
      style={{ paddingBottom: 'var(--safe-area-bottom)' }}
      aria-label="Main navigation"
      role="tablist"
    >
      <div className="border-t border-cream-200/90 shadow-[0_-1px_12px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex h-16 max-w-lg items-stretch px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NativeNavButton
                key={tab.href}
                href={tab.href}
                variant="tab"
                haptic="medium"
                isActive={tab.isActive}
                scroll={false}
                aria-label={tab.label}
                aria-selected={tab.isActive}
                role="tab"
                className={cn(
                  'relative flex flex-1 flex-col items-center justify-center gap-0.5 pt-1',
                  'text-[10px] font-medium leading-none',
                  tab.isActive ? 'text-gold-700' : 'text-charcoal-400'
                )}
              >
                {tab.isActive && (
                  <span className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-gold-500" />
                )}
                <span className="native-tab-icon-wrap relative flex h-7 w-10 items-center justify-center rounded-xl">
                  <Icon
                    className={cn('h-[22px] w-[22px]', tab.isActive && 'stroke-[2.25]')}
                    strokeWidth={tab.isActive ? 2.25 : 1.75}
                  />
                  {'badge' in tab && tab.badge > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                      {tab.badge > 9 ? '9+' : tab.badge}
                    </span>
                  )}
                </span>
                <span className={cn('max-w-full truncate px-0.5', tab.isActive && 'font-semibold')}>
                  {tab.label}
                </span>
              </NativeNavButton>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
