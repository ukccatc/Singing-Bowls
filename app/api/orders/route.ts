import { createOrderInDatabase, formatOrderForAdmin } from '@/lib/orders';
import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { getSupabaseServer, supabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const client = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? getSupabaseServer()
      : supabaseServerClient;

    const { data, error } = await client
      .from('orders')
      .select('id, email, status, total, currency, created_at, notes')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({
      success: true,
      data: (data || []).map(formatOrderForAdmin),
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      items,
      shipping,
      billing,
      paymentMethod,
      subtotal,
      tax,
      shippingCost,
      total,
    } = body;

    if (!items || !shipping || !billing || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required order information' },
        { status: 400 }
      );
    }

    const savedOrder = await createOrderInDatabase({
      email: billing.email || shipping.email,
      billingAddress: billing,
      shippingAddress: shipping,
      items: items.map(
        (item: {
          productId: string;
          product?: { price?: number };
          quantity: number;
        }) => ({
          productId: item.productId,
          price: item.product?.price || 0,
          quantity: item.quantity,
        })
      ),
      total,
      paymentMethod,
      subtotal,
      tax,
      shippingCost,
    });

    return NextResponse.json(
      {
        message: 'Order created successfully',
        orderId: savedOrder.reference,
        order: {
          id: savedOrder.reference,
          email: savedOrder.email,
          total: savedOrder.total,
          items,
          billing,
          shipping,
          paymentMethod,
          subtotal,
          tax,
          shippingCost,
          createdAt: savedOrder.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
