import { randomBytes } from 'crypto';
import { getSupabaseServer } from '@/lib/supabase/server';

export interface AbandonedCartItem {
  productId: string;
  quantity: number;
  name?: string;
  price?: number;
  slug?: string;
  imageUrl?: string;
}

export function createRecoveryToken(): string {
  return randomBytes(24).toString('hex');
}

export async function upsertAbandonedCart(input: {
  email: string;
  locale: string;
  items: AbandonedCartItem[];
  subtotal: number;
}): Promise<{ recoveryToken: string }> {
  const client = getSupabaseServer();
  const email = input.email.trim().toLowerCase();
  const items = input.items.filter((item) => item.productId && item.quantity > 0);

  if (!email || items.length === 0) {
    throw new Error('Email and cart items are required');
  }

  const { data: existing } = await client
    .from('abandoned_carts')
    .select('id, recovery_token')
    .eq('email', email)
    .is('recovered_at', null)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) {
    const { error } = await client
      .from('abandoned_carts')
      .update({
        locale: input.locale || 'en',
        items,
        subtotal: input.subtotal,
        reminded_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id);

    if (error) throw error;
    return { recoveryToken: existing.recovery_token };
  }

  const recoveryToken = createRecoveryToken();
  const { error } = await client.from('abandoned_carts').insert({
    email,
    locale: input.locale || 'en',
    items,
    subtotal: input.subtotal,
    recovery_token: recoveryToken,
  });

  if (error) throw error;
  return { recoveryToken };
}

export async function getAbandonedCartByToken(token: string) {
  const client = getSupabaseServer();
  const { data, error } = await client
    .from('abandoned_carts')
    .select('*')
    .eq('recovery_token', token)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function markAbandonedCartRecovered(token: string) {
  const client = getSupabaseServer();
  await client
    .from('abandoned_carts')
    .update({ recovered_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('recovery_token', token);
}

export async function markAbandonedCartReminded(id: string) {
  const client = getSupabaseServer();
  await client
    .from('abandoned_carts')
    .update({ reminded_at: new Date().toISOString() })
    .eq('id', id);
}

/** Carts idle 1–24 hours that have not been reminded yet. */
export async function listAbandonedCartsForReminder(limit = 50) {
  const client = getSupabaseServer();
  const now = Date.now();
  const minAge = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const maxAge = new Date(now - 1 * 60 * 60 * 1000).toISOString();

  const { data, error } = await client
    .from('abandoned_carts')
    .select('*')
    .is('reminded_at', null)
    .is('recovered_at', null)
    .lte('updated_at', maxAge)
    .gte('updated_at', minAge)
    .order('updated_at', { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data || [];
}
