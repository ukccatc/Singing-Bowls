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

    // Validate required fields
    if (!email || !billingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create order in database
    const orderData = {
      email,
      billing_address: billingAddress,
      shipping_address: shippingAddress || billingAddress,
      items,
      subtotal,
      tax,
      shipping_cost: shippingCost,
      total,
      payment_intent_id: paymentIntentId,
      payment_method: paymentMethod,
      payment_status: 'pending',
      fulfillment_status: 'pending',
      currency: 'USD',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // In production, save to Supabase:
    // const { data: order, error } = await supabaseServer
    //   .from('orders')
    //   .insert(orderData)
    //   .select()
    //   .single();
    //
    // if (error) {
    //   console.error('Database error:', error);
    //   return NextResponse.json(
    //     { error: 'Failed to create order' },
    //     { status: 500 }
    //   );
    // }

    // Mock order creation
    const mockOrder = {
      id: `order_${Date.now()}`,
      ...orderData,
    };

    // In production, send confirmation email here
    // await sendOrderConfirmationEmail(email, mockOrder);

    return NextResponse.json({
      success: true,
      order: mockOrder,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
