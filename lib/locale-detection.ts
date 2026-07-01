import type { NextRequest } from 'next/server';
import { Locale } from '@/lib/types';

export const LOCALE_PREFERENCE_COOKIE = 'hs_locale';
const UKRAINE_COUNTRY_CODE = 'UA';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

type GeoAutoLocale = 'en' | 'uk';

export function getCountryFromRequest(request: NextRequest): string | undefined {
  const cloudflareCountry = request.headers.get('cf-ipcountry');
  if (cloudflareCountry && cloudflareCountry !== 'XX') {
    return cloudflareCountry.toUpperCase();
  }

  const vercelCountry = request.headers.get('x-vercel-ip-country');
  if (vercelCountry) {
    return vercelCountry.toUpperCase();
  }

  return undefined;
}

/** Geo-based locale: Ukraine → uk, all others → en, unknown → uk. Never auto-selects ru. */
export function getLocaleFromGeo(country?: string): GeoAutoLocale {
  if (!country) {
    return 'uk';
  }

  return country === UKRAINE_COUNTRY_CODE ? 'uk' : 'en';
}

export function getLocalePreferenceFromCookie(request: NextRequest): Locale | undefined {
  const value = request.cookies.get(LOCALE_PREFERENCE_COOKIE)?.value;

  if (value === 'en' || value === 'ru' || value === 'uk') {
    return value;
  }

  return undefined;
}

/** Manual cookie wins; otherwise geo (uk/en only). */
export function getRedirectLocale(request: NextRequest): Locale {
  const preference = getLocalePreferenceFromCookie(request);
  if (preference) {
    return preference;
  }

  return getLocaleFromGeo(getCountryFromRequest(request));
}

export function setLocalePreferenceCookie(locale: Locale): void {
  if (typeof document === 'undefined') {
    return;
  }

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${LOCALE_PREFERENCE_COOKIE}=${locale}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}
