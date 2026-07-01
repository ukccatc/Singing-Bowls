import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TOKEN,
} from '@/lib/auth/admin-credentials';
import { NextRequest, NextResponse } from 'next/server';

export function isAdminSession(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_TOKEN;
}

export function requireAdminSession(request: NextRequest): NextResponse | null {
  if (!isAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}
