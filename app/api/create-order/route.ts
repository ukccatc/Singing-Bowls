import { createOrderInDatabase } from '@/lib/orders';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      billingAddress,
      shippingAddress,
      items,
      subtotal,
      tax,
      shippingCost,
      total,
      paymentIntentId,
      paymentMethod,
    } = body;

    if (!email || !billingAddress || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const savedOrder = await createOrderInDatabase({
      email,
      billingAddress,
      shippingAddress: shippingAddress || billingAddress,
      items: items.map((item: { productId: string; price: number; quantity: number }) => ({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      paymentMethod,
      subtotal,
      tax,
      shippingCost,
    });

    return NextResponse.json({
      success: true,
      order: {
        id: savedOrder.reference,
        dbId: savedOrder.id,
        email: savedOrder.email,
        total: savedOrder.total,
        currency: savedOrder.currency,
        payment_intent_id: paymentIntentId,
        payment_method: paymentMethod,
        payment_status: 'pending',
        fulfillment_status: 'pending',
        created_at: savedOrder.created_at,
      },
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
