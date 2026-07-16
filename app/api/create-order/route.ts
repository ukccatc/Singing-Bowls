import { redeemCoupon, validateCoupon } from '@/lib/coupons';
import {
  isEmailConfigured,
  sendOrderAdminNotificationEmail,
  sendOrderConfirmationEmail,
} from '@/lib/email';
import { createOrderInDatabase, InsufficientStockError } from '@/lib/orders';
import { getSupabaseServer } from '@/lib/supabase/server';
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
      couponCode,
    } = body;

    if (!email || !billingAddress || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const normalizedItems = items.map(
      (item: { productId: string; price: number; quantity: number }) => ({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
      })
    );

    const computedSubtotal = Number(subtotal) || 0;
    let discountAmount = 0;
    let normalizedCoupon: string | undefined;

    if (couponCode) {
      const validation = await validateCoupon(String(couponCode), computedSubtotal);
      if (!validation.valid || !validation.discountAmount || !validation.code) {
        return NextResponse.json(
          { error: validation.error || 'Invalid promo code' },
          { status: 400 }
        );
      }
      discountAmount = validation.discountAmount;
      normalizedCoupon = validation.code;
    }

    const savedOrder = await createOrderInDatabase({
      email,
      billingAddress,
      shippingAddress: shippingAddress || billingAddress,
      items: normalizedItems,
      total,
      paymentMethod,
      subtotal,
      tax,
      shippingCost,
      couponCode: normalizedCoupon,
      discountAmount,
    });

    if (normalizedCoupon && discountAmount > 0) {
      try {
        await redeemCoupon({
          code: normalizedCoupon,
          orderId: savedOrder.id,
          email,
          discountAmount,
        });
      } catch (redeemError) {
        console.error('Coupon redeem failed:', redeemError);
      }
    }

    // Mark matching abandoned carts as recovered
    try {
      const client = getSupabaseServer();
      await client
        .from('abandoned_carts')
        .update({
          recovered_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('email', String(email).toLowerCase())
        .is('recovered_at', null);
    } catch {
      // non-blocking
    }

    if (isEmailConfigured()) {
      const customerName =
        billingAddress.firstName && billingAddress.lastName
          ? `${billingAddress.firstName} ${billingAddress.lastName}`
          : billingAddress.firstName || 'Customer';
      const locale = body.locale || 'en';
      const itemCount = normalizedItems.reduce(
        (sum: number, item: { quantity: number }) => sum + Number(item.quantity || 0),
        0
      );

      try {
        await sendOrderConfirmationEmail({
          email,
          customerName,
          orderId: savedOrder.reference,
          total: Number(total),
          currency: savedOrder.currency || 'USD',
          locale,
        });
      } catch (emailError) {
        console.error('Order confirmation email failed:', emailError);
      }

      try {
        await sendOrderAdminNotificationEmail({
          customerName,
          customerEmail: email,
          orderId: savedOrder.reference,
          total: Number(total),
          currency: savedOrder.currency || 'USD',
          paymentMethod,
          itemCount,
          locale,
        });
      } catch (emailError) {
        console.error('Order admin notification email failed:', emailError);
      }
    }

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
        coupon_code: normalizedCoupon || null,
        discount_amount: discountAmount,
      },
      message: 'Order created successfully',
    });
  } catch (error) {
    if (error instanceof InsufficientStockError) {
      return NextResponse.json(
        {
          error: 'Insufficient stock for one or more items',
          code: error.code,
          details: error.details,
        },
        { status: 409 }
      );
    }

    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
