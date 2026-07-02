import { getDefaultLocale } from '@/lib/translations';

const PRODUCTION_SITE_URL = 'https://himalayan-sound.com';

/** Canonical public site URL for SEO, sitemap, share links, and native checkout. */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_SITE_URL;
  }
  return 'http://localhost:3000';
}

export function getSiteName(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_NAME ||
    process.env.NEXT_PUBLIC_APP_NAME ||
    'Himalayan Sound'
  );
}

export function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@himalayan-sound.com';
}

export function getContactPhone(): string {
  return process.env.NEXT_PUBLIC_CONTACT_PHONE || '+977-1-234-5678';
}

export function getContactAddress(): string {
  return process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Kathmandu Valley, Nepal';
}

export function getInstagramUrl(): string {
  return (
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/himalayansound'
  );
}

export function getYoutubeUrl(): string {
  return process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@himalayansound';
}

/** Locale-prefixed path, e.g. buildSitePath('uk', '/shop') → '/uk/shop' */
export function buildSitePath(locale: string, path = ''): string {
  const normalized = !path || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

/** Absolute URL for a locale path */
export function buildAbsoluteSiteUrl(locale: string, path = ''): string {
  return `${getSiteUrl()}${buildSitePath(locale, path)}`;
}

export function getDefaultLocaleSitePath(path = ''): string {
  return buildSitePath(getDefaultLocale(), path);
}
