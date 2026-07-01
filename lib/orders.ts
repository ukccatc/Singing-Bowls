import { getSupabaseServer } from '@/lib/supabase/server';

export function generateOrderReference() {
  return `HS-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
}

export interface OrderItemInput {
  productId: string;
  price: number;
  quantity: number;
}

export interface CreateOrderInput {
  email: string;
  billingAddress: Record<string, unknown>;
  shippingAddress: Record<string, unknown>;
  items: OrderItemInput[];
  total: number;
  paymentMethod?: string;
  subtotal?: number;
  tax?: number;
  shippingCost?: number;
}

export async function createOrderInDatabase(order: CreateOrderInput) {
  const client = getSupabaseServer();
  const reference = generateOrderReference();

  const { data: orderRow, error } = await client
    .from('orders')
    .insert({
      email: order.email,
      status: 'pending',
      total: order.total,
      currency: 'USD',
      billing_address: order.billingAddress,
      shipping_address: order.shippingAddress,
      payment_method: order.paymentMethod,
      notes: reference,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  if (order.items.length > 0) {
    const orderItems = order.items.map((item) => ({
      order_id: orderRow.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await client.from('order_items').insert(orderItems);

    if (itemsError) {
      console.error('Failed to insert order items:', itemsError);
    }
  }

  return {
    ...orderRow,
    reference,
  };
}

export function formatOrderForAdmin(order: {
  id: string;
  email: string;
  status: string;
  total: number;
  currency: string;
  created_at: string;
  notes?: string | null;
}) {
  return {
    id: order.notes || order.id,
    email: order.email,
    status: order.status,
    total: order.total,
    currency: order.currency,
    created_at: order.created_at,
  };
}
