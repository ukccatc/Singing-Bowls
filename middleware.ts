import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TOKEN,
} from '@/lib/auth/admin-credentials';
import { getRedirectLocale } from '@/lib/locale-detection';
import { getAvailableLocales } from '@/lib/translations';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

    if (!isLoginPage && session !== ADMIN_SESSION_TOKEN) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (isLoginPage && session === ADMIN_SESSION_TOKEN) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
  }

  const availableLocales = getAvailableLocales();

  const pathnameHasLocale = availableLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const redirectLocale = getRedirectLocale(request);
  const newUrl = new URL(`/${redirectLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|manifest.json|sw.js|offline.html|\\.well-known).*)',
  ],
};
