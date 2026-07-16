import { validateCoupon } from '@/lib/coupons';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const code = String(body.code || '');
    const subtotal = Number(body.subtotal || 0);

    if (!Number.isFinite(subtotal) || subtotal < 0) {
      return NextResponse.json({ error: 'Invalid subtotal' }, { status: 400 });
    }

    const result = await validateCoupon(code, subtotal);
    if (!result.valid) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Coupon validate error:', error);
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}
