import { getAbandonedCartByToken, markAbandonedCartRecovered } from '@/lib/abandoned-cart';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    const cart = await getAbandonedCartByToken(token);
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        email: cart.email,
        locale: cart.locale,
        items: cart.items,
        subtotal: cart.subtotal,
        recovered: Boolean(cart.recovered_at),
      },
    });
  } catch (error) {
    console.error('Cart recover GET error:', error);
    return NextResponse.json({ error: 'Failed to recover cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = String(body.token || '');
    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    await markAbandonedCartRecovered(token);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cart recover POST error:', error);
    return NextResponse.json({ error: 'Failed to mark recovered' }, { status: 500 });
  }
}
