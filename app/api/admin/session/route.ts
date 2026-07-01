import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TOKEN,
  getAdminUser,
} from '@/lib/auth/admin-credentials';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (session !== ADMIN_SESSION_TOKEN) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: getAdminUser(),
  });
}
