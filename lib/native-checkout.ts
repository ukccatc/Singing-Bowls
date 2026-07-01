import { getSiteUrl } from '@/lib/site';

export function getCheckoutBrowserUrl(locale: string): string {
  return `${getSiteUrl()}/${locale}/checkout`;
}

export function getProductShareUrl(locale: string, slug: string): string {
  return `${getSiteUrl()}/${locale}/product/${slug}`;
}
