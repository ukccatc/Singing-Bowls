import { buildAbsoluteSiteUrl } from '@/lib/site';

export function getCheckoutBrowserUrl(locale: string): string {
  return buildAbsoluteSiteUrl(locale, '/checkout');
}

export function getProductShareUrl(locale: string, slug: string): string {
  return buildAbsoluteSiteUrl(locale, `/product/${slug}`);
}
