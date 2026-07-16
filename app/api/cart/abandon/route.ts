import { upsertAbandonedCart } from '@/lib/abandoned-cart';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const locale = String(body.locale || 'en');
    const items = Array.isArray(body.items) ? body.items : [];
    const subtotal = Number(body.subtotal || 0);

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const result = await upsertAbandonedCart({
      email,
      locale,
      items: items.map(
        (item: {
          productId: string;
          quantity: number;
          name?: string;
          price?: number;
          slug?: string;
          imageUrl?: string;
        }) => ({
          productId: item.productId,
          quantity: Number(item.quantity) || 1,
          name: item.name,
          price: item.price,
          slug: item.slug,
          imageUrl: item.imageUrl,
        })
      ),
      subtotal: Number.isFinite(subtotal) ? subtotal : 0,
    });

    return NextResponse.json({ success: true, recoveryToken: result.recoveryToken });
  } catch (error) {
    console.error('Abandoned cart upsert error:', error);
    return NextResponse.json({ error: 'Failed to save cart' }, { status: 500 });
  }
}
