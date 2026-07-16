import {
  listAbandonedCartsForReminder,
  markAbandonedCartReminded,
} from '@/lib/abandoned-cart';
import { isEmailConfigured, sendAbandonedCartEmail } from '@/lib/email';
import { buildAbsoluteSiteUrl } from '@/lib/site';
import { NextRequest, NextResponse } from 'next/server';

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Allow in development without secret
    return process.env.NODE_ENV !== 'production';
  }
  const auth = request.headers.get('authorization');
  return auth === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json({
      success: true,
      sent: 0,
      skipped: 'Email is not configured',
    });
  }

  try {
    const carts = await listAbandonedCartsForReminder(50);
    let sent = 0;
    const errors: string[] = [];

    for (const cart of carts) {
      try {
        const items = Array.isArray(cart.items) ? cart.items : [];
        const itemCount = items.reduce(
          (sum: number, item: { quantity?: number }) => sum + Number(item.quantity || 0),
          0
        );
        const recoveryUrl = buildAbsoluteSiteUrl(
          cart.locale || 'en',
          `/cart?recover=${cart.recovery_token}`
        );

        await sendAbandonedCartEmail({
          email: cart.email,
          locale: cart.locale || 'en',
          recoveryUrl,
          subtotal: Number(cart.subtotal || 0),
          itemCount,
        });

        await markAbandonedCartReminded(cart.id);
        sent += 1;
      } catch (error) {
        console.error('Abandoned cart reminder failed:', error);
        errors.push(cart.id);
      }
    }

    return NextResponse.json({ success: true, checked: carts.length, sent, errors });
  } catch (error) {
    console.error('Abandoned cart cron error:', error);
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 });
  }
}
