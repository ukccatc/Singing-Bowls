'use client';

import { useNetworkStatus } from '@/components/native/NetworkContext';
import { NativeMoreMenu } from '@/components/native/NativeMoreMenu';
import { NativeNavButton, NativePressable } from '@/components/native/NativePressable';
import { NativeSearchSheet } from '@/components/native/NativeSearchSheet';
import { useCart } from '@/lib/hooks/useCart';
import { releaseNativeBodyLock } from '@/lib/native-body-lock';
import {
  getNativeStackTitle,
  getNativeTabTitle,
  isNativeTabRoot,
} from '@/lib/native-navigation';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { LogoMark } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';
import { ChevronLeft, MoreHorizontal, Search, ShoppingCart } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NativeHeaderProps {
  locale: Locale;
}

const quickLinks = [
  { href: (l: string) => `/${l}/gallery`, labelKey: 'gallery.title' },
  { href: (l: string) => `/${l}/about`, labelKey: 'nav.about' },
  { href: (l: string) => `/${l}/contact`, labelKey: 'nav.contact' },
] as const;

export function NativeHeader({ locale }: NativeHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOnline } = useNetworkStatus();
  const { getItemCount } = useCart();
  const cartCount = getItemCount();
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isTabRoot = isNativeTabRoot(pathname, locale);
  const title = isTabRoot
    ? getNativeTabTitle(pathname, locale)
    : getNativeStackTitle(pathname, locale);

  const handleBack = () => {
    releaseNativeBodyLock();
    setMoreOpen(false);
    setSearchOpen(false);
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(`/${locale}`);
    }
  };

  useEffect(() => {
    setMoreOpen(false);
    setSearchOpen(false);
    releaseNativeBodyLock();
  }, [pathname]);

  const headerStyle = isOnline
    ? { top: 0, paddingTop: 'var(--safe-area-top)' }
    : { top: 'calc(var(--safe-area-top) + 2.5rem)', paddingTop: 0 };

  return (
    <>
      <header
        className="site-native-header fixed left-0 right-0 z-[9990] bg-white shadow-sm"
        style={headerStyle}
      >
        <div className="border-b border-cream-200/80">
          <div className="mx-auto flex h-14 max-w-lg items-center gap-1 px-2">
            <div className="flex min-w-[2.5rem] shrink-0 items-center">
              {!isTabRoot ? (
                <NativePressable
                  variant="icon"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-800"
                  aria-label="Go back"
                  onPress={handleBack}
                >
                  <ChevronLeft className="h-6 w-6" />
                </NativePressable>
              ) : (
                <NativeNavButton
                  href={`/${locale}`}
                  variant="icon"
                  isActive={normalizedHome(pathname, locale)}
                  aria-label="Home"
                  className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full shadow-sm"
                >
                  <LogoMark size={36} className="h-9 w-9" />
                </NativeNavButton>
              )}
            </div>

            <div className="min-w-0 flex-1 px-1">
              {isTabRoot && normalizedHome(pathname, locale) ? (
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-charcoal-900">Himalayan Sound</p>
                  <p className="truncate text-[11px] text-charcoal-500">
                    {t('native.tagline', locale)}
                  </p>
                </div>
              ) : (
                <h1 className="truncate text-center text-base font-semibold text-charcoal-900">
                  {title}
                </h1>
              )}
            </div>

            <div className="flex shrink-0 items-center">
              <NativePressable
                variant="icon"
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-700"
                aria-label={t('common.search', locale)}
                onPress={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </NativePressable>

              <NativeNavButton
                href={`/${locale}/cart`}
                variant="icon"
                isActive={pathname.includes('/cart')}
                aria-label={t('nav.cart', locale)}
                scroll={false}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal-700"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="pointer-events-none absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-600 px-0.5 text-[9px] font-bold text-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </NativeNavButton>

              <NativePressable
                variant="icon"
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-700"
                aria-label={t('nav.more', locale)}
                onPress={() => setMoreOpen(true)}
              >
                <MoreHorizontal className="h-5 w-5" />
              </NativePressable>
            </div>
          </div>
        </div>

        {isTabRoot && (
          <div className="border-b border-cream-100 bg-cream-50/80">
            <div className="mx-auto flex max-w-lg gap-2 overflow-x-auto px-3 py-2 scrollbar-none">
              <NativeNavButton
                href={`/${locale}/shop`}
                variant="chip"
                isActive={pathname.includes('/shop')}
                scroll={false}
                className={cn(
                  'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold',
                  pathname.includes('/shop')
                    ? 'bg-gold-500 text-white'
                    : 'bg-white text-charcoal-700 shadow-sm ring-1 ring-cream-200'
                )}
              >
                {t('home.shopNow', locale)}
              </NativeNavButton>
              {quickLinks.map((item) => {
                const href = item.href(locale);
                const active = pathname.startsWith(href);
                return (
                  <NativeNavButton
                    key={item.labelKey}
                    href={href}
                    variant="chip"
                    isActive={active}
                    scroll={false}
                    className={cn(
                      'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium',
                      active
                        ? 'bg-gold-100 text-gold-800 ring-1 ring-gold-300'
                        : 'bg-white text-charcoal-600 shadow-sm ring-1 ring-cream-200'
                    )}
                  >
                    {t(item.labelKey, locale)}
                  </NativeNavButton>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <NativeSearchSheet
        locale={locale}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
      <NativeMoreMenu locale={locale} open={moreOpen} onOpenChange={setMoreOpen} />
    </>
  );
}

function normalizedHome(pathname: string, locale: Locale): boolean {
  return pathname.replace(/\/$/, '') === `/${locale}`;
}
