import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';

const TAB_SUFFIXES = ['', '/shop', '/cart', '/gallery'] as const;

export function isNativeTabRoot(pathname: string, locale: Locale): boolean {
  const normalized = pathname.replace(/\/$/, '') || `/${locale}`;
  return TAB_SUFFIXES.some((suffix) => normalized === `/${locale}${suffix}`);
}

/** Bottom tab bar — visible on all native screens except checkout/auth. */
export function shouldShowNativeBottomNav(pathname: string): boolean {
  if (pathname.includes('/checkout')) return false;
  if (pathname.includes('/auth/')) return false;
  return true;
}

export function isShopTabActive(pathname: string): boolean {
  return pathname.includes('/shop') || pathname.includes('/product/');
}

export function getNativeTabTitle(pathname: string, locale: Locale): string {
  const normalized = pathname.replace(/\/$/, '') || `/${locale}`;

  if (normalized === `/${locale}`) return t('nav.home', locale);
  if (normalized.endsWith('/shop')) return t('nav.shop', locale);
  if (normalized.endsWith('/cart')) return t('cart.title', locale);
  if (normalized.endsWith('/gallery')) return t('gallery.title', locale);

  return 'Himalayan Sound';
}

export function getNativeStackTitle(pathname: string, locale: Locale): string {
  if (pathname.includes('/product/')) return t('nav.shop', locale);
  if (pathname.includes('/checkout')) return t('cart.checkout', locale);
  if (pathname.includes('/about')) return t('nav.about', locale);
  if (pathname.includes('/blog')) return t('nav.blog', locale);
  if (pathname.includes('/contact')) return t('nav.contact', locale);
  if (pathname.includes('/order-confirmation')) return t('cart.title', locale);
  if (pathname.includes('/auth')) return t('nav.home', locale);

  return 'Himalayan Sound';
}
