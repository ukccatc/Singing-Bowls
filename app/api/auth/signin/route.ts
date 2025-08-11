import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Hash the password and compare with stored hash
    // 2. Validate user credentials against database
    // 3. Generate JWT token
    // 4. Set secure HTTP-only cookie

    // Mock authentication - DO NOT use in production
    if (email === 'demo@himalayansound.com' && password === 'demo123') {
      const user = {
        id: 'user-123',
        email: 'demo@himalayansound.com',
        firstName: 'Demo',
        lastName: 'User',
      };

      // In production, use proper JWT and secure cookies
      const response = NextResponse.json(
        { 
          message: 'Sign in successful',
          user 
        },
        { status: 200 }
      );

      // Set authentication cookie (simplified for demo)
      response.cookies.set('auth-token', 'demo-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}