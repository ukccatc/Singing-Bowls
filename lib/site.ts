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
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'himalayansound.info@gmail.com';
}

/** Inbox for contact-form alerts (defaults to public contact address). */
export function getAdminNotificationEmail(): string {
  return process.env.ADMIN_NOTIFICATION_EMAIL || getContactEmail();
}

const DEFAULT_CONTACT_PHONES = ['+380671318351', '+380662874081'] as const;

/** All public contact phone numbers (comma/semicolon/pipe-separated in env). */
export function getContactPhones(): string[] {
  const raw =
    process.env.NEXT_PUBLIC_CONTACT_PHONES || process.env.NEXT_PUBLIC_CONTACT_PHONE;
  if (!raw?.trim()) {
    return [...DEFAULT_CONTACT_PHONES];
  }
  return raw
    .split(/[,;|]/)
    .map((phone) => phone.trim())
    .filter(Boolean);
}

/** Primary contact phone (first in list). */
export function getContactPhone(): string {
  return getContactPhones()[0];
}

/** Normalize for tel: links (digits and leading + only). */
export function formatPhoneTel(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

const DEFAULT_SHOWROOM_ADDRESS =
  'RC London, Instytutska St., Odesa, Odesa Oblast, 65000, Ukraine';
const DEFAULT_MAPS_URL = 'https://maps.google.com/?q=46.378056,30.700346';
const DEFAULT_COORDINATES = { latitude: 46.378056, longitude: 30.700346 };

export function getContactAddress(): string {
  return process.env.NEXT_PUBLIC_CONTACT_ADDRESS || DEFAULT_SHOWROOM_ADDRESS;
}

export function getContactMapsUrl(): string {
  return process.env.NEXT_PUBLIC_CONTACT_MAPS_URL || DEFAULT_MAPS_URL;
}

export function getContactCoordinates(): { latitude: number; longitude: number } {
  const raw = process.env.NEXT_PUBLIC_CONTACT_COORDINATES;
  if (raw?.trim()) {
    const [lat, lng] = raw.split(',').map((value) => Number(value.trim()));
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return { latitude: lat, longitude: lng };
    }
  }
  return DEFAULT_COORDINATES;
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
