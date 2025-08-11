import { NextRequest, NextResponse } from 'next/server';
import { getLocaleFromPathname, getAvailableLocales } from '@/lib/translations';

// Locale detection and routing middleware
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = getAvailableLocales().every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocaleFromRequest(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

// Get locale from request (headers, cookies, etc.)
function getLocaleFromRequest(request: NextRequest): string {
  // Check for locale in cookie
  const localeCookie = request.cookies.get('locale')?.value;
  if (localeCookie && getAvailableLocales().includes(localeCookie as any)) {
    return localeCookie;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => getAvailableLocales().includes(lang as any));
    
    if (preferredLocale) {
      return preferredLocale;
    }
  }

  // Default to English
  return 'en';
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
