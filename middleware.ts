import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAvailableLocales } from '@/lib/translations';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip admin routes for now to avoid conflicts
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
