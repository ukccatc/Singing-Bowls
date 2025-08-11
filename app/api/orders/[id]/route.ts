import { NextRequest, NextResponse } from 'next/server';

// Mock order data - in a real app, this would come from a database
const mockOrders = {
  'HS-2024-001': {
    id: 'HS-2024-001',
    email: 'customer@example.com',
    total: 289.99,
    currency: 'USD',
    items: [
      {
        name: 'Large Himalayan Bronze Singing Bowl',
        quantity: 1,
        price: 289.99,
      },
    ],
    shipping: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main Street',
      city: 'New York',
      country: 'United States',
    },
    estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'processing',
    createdAt: new Date().toISOString(),
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    
    // In a real application, you would:
    // 1. Validate user authentication
    // 2. Check if user has access to this order
    // 3. Fetch from database
    
    const order = mockOrders[orderId as keyof typeof mockOrders];
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}