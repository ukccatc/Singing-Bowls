import { getAvailableLocales } from '@/lib/translations';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow admin routes without auth for now (development)
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Locale detection and redirection
  const availableLocales = getAvailableLocales();
  
  // Check if the pathname starts with a locale
  const pathnameHasLocale = availableLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to default locale if no locale is present
  const defaultLocale = 'en';
  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
