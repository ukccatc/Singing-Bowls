import { NextRequest, NextResponse } from 'next/server';

// Mock orders data - in a real app, this would come from a database
const mockOrders = [
  {
    id: 'HS-2024-001',
    date: '2024-12-01T10:00:00Z',
    status: 'delivered',
    total: 289.99,
    currency: 'USD',
    items: 1,
  },
  {
    id: 'HS-2024-002',
    date: '2024-12-10T14:30:00Z',
    status: 'shipped',
    total: 156.50,
    currency: 'USD',
    items: 2,
  },
  {
    id: 'HS-2024-003',
    date: '2024-12-15T09:15:00Z',
    status: 'processing',
    total: 425.00,
    currency: 'USD',
    items: 3,
  },
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would:
    // 1. Validate JWT token
    // 2. Extract user ID from token
    // 3. Fetch user's orders from database
    // 4. Apply pagination and filtering
    
    return NextResponse.json(mockOrders);
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}