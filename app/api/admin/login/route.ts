import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TOKEN,
  getAdminUser,
  validateAdminCredentials,
} from '@/lib/auth/admin-credentials';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const username = String(body.username || body.email || '').trim();
    const password = String(body.password || '');

    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      user: getAdminUser(),
    });

    response.cookies.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
