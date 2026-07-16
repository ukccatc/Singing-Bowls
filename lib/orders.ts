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
  couponCode?: string;
  discountAmount?: number;
}

export class InsufficientStockError extends Error {
  readonly code = 'INSUFFICIENT_STOCK';
  readonly details: Array<{ productId: string; requested: number; available: number }>;

  constructor(
    details: Array<{ productId: string; requested: number; available: number }>
  ) {
    super('One or more items are out of stock');
    this.name = 'InsufficientStockError';
    this.details = details;
  }
}

async function decrementInventory(
  client: ReturnType<typeof getSupabaseServer>,
  items: OrderItemInput[]
) {
  const shortages: Array<{ productId: string; requested: number; available: number }> = [];
  const decremented: OrderItemInput[] = [];

  for (const item of items) {
    // Prefer atomic SQL function when available (see migration 20260716).
    const { error: rpcError } = await client.rpc('decrement_product_inventory', {
      p_product_id: item.productId,
      p_quantity: item.quantity,
    });

    if (!rpcError) {
      decremented.push(item);
      continue;
    }

    const rpcMissing =
      rpcError.code === 'PGRST202' ||
      /decrement_product_inventory|Could not find the function/i.test(rpcError.message || '');

    if (!rpcMissing && /INSUFFICIENT_STOCK/i.test(rpcError.message || '')) {
      const { data: product } = await client
        .from('products')
        .select('inventory')
        .eq('id', item.productId)
        .maybeSingle();
      shortages.push({
        productId: item.productId,
        requested: item.quantity,
        available: Number(product?.inventory ?? 0),
      });
      continue;
    }

    if (!rpcMissing) {
      await restoreInventory(client, decremented);
      throw rpcError;
    }

    // Fallback: optimistic lock update if RPC is not deployed yet.
    const { data: product, error } = await client
      .from('products')
      .select('id, inventory')
      .eq('id', item.productId)
      .maybeSingle();

    if (error) {
      await restoreInventory(client, decremented);
      throw error;
    }

    const available = Number(product?.inventory ?? 0);
    if (!product || available < item.quantity) {
      shortages.push({
        productId: item.productId,
        requested: item.quantity,
        available,
      });
      continue;
    }

    const nextInventory = available - item.quantity;
    const { data: updated, error: updateError } = await client
      .from('products')
      .update({ inventory: nextInventory, updated_at: new Date().toISOString() })
      .eq('id', item.productId)
      .eq('inventory', available)
      .select('id')
      .maybeSingle();

    if (updateError) {
      await restoreInventory(client, decremented);
      throw updateError;
    }

    if (!updated) {
      shortages.push({
        productId: item.productId,
        requested: item.quantity,
        available,
      });
      continue;
    }

    decremented.push(item);
  }

  if (shortages.length > 0) {
    await restoreInventory(client, decremented);
    throw new InsufficientStockError(shortages);
  }

  return decremented;
}

async function restoreInventory(
  client: ReturnType<typeof getSupabaseServer>,
  items: OrderItemInput[]
) {
  for (const item of items) {
    const { data: product } = await client
      .from('products')
      .select('inventory')
      .eq('id', item.productId)
      .maybeSingle();

    if (!product) continue;

    await client
      .from('products')
      .update({
        inventory: Number(product.inventory ?? 0) + item.quantity,
        updated_at: new Date().toISOString(),
      })
      .eq('id', item.productId);
  }
}

export async function createOrderInDatabase(order: CreateOrderInput) {
  const client = getSupabaseServer();
  const reference = generateOrderReference();

  const decremented = await decrementInventory(client, order.items);

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
      coupon_code: order.couponCode || null,
      discount_amount: order.discountAmount || 0,
    })
    .select()
    .single();

  if (error) {
    await restoreInventory(client, decremented);
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
      // Inventory already decremented and order exists — keep both; log for ops.
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
