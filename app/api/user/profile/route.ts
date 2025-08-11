import { NextRequest, NextResponse } from 'next/server';

// Mock user data - in a real app, this would come from a database
const mockUser = {
  id: 'user-123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1-555-0123',
  preferredLocale: 'en',
  marketingConsent: true,
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2024-12-15T00:00:00Z',
};

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would:
    // 1. Validate JWT token
    // 2. Extract user ID from token
    // 3. Fetch user from database
    
    return NextResponse.json(mockUser);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real application, you would:
    // 1. Validate JWT token
    // 2. Extract user ID from token
    // 3. Validate input data
    // 4. Update user in database
    
    const updatedUser = {
      ...mockUser,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}