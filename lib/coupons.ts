import { getSupabaseServer } from '@/lib/supabase/server';

export interface CouponRecord {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percent' | 'fixed';
  discount_value: number;
  min_subtotal: number;
  max_uses: number | null;
  used_count: number;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
}

export interface CouponValidationResult {
  valid: boolean;
  code?: string;
  description?: string;
  discountAmount?: number;
  discountType?: 'percent' | 'fixed';
  discountValue?: number;
  error?: string;
}

export function normalizeCouponCode(code: string): string {
  return code.trim().toUpperCase();
}

export function computeDiscountAmount(
  coupon: Pick<CouponRecord, 'discount_type' | 'discount_value'>,
  subtotal: number
): number {
  if (subtotal <= 0) return 0;
  if (coupon.discount_type === 'percent') {
    return Math.min(subtotal, Math.round(subtotal * (Number(coupon.discount_value) / 100) * 100) / 100);
  }
  return Math.min(subtotal, Number(coupon.discount_value));
}

export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<CouponValidationResult> {
  const normalized = normalizeCouponCode(code);
  if (!normalized) {
    return { valid: false, error: 'Enter a promo code' };
  }

  const client = getSupabaseServer();
  const { data, error } = await client
    .from('coupons')
    .select('*')
    .eq('code', normalized)
    .maybeSingle();

  if (error || !data) {
    return { valid: false, error: 'Invalid promo code' };
  }

  const coupon = data as CouponRecord;
  const now = Date.now();

  if (!coupon.is_active) {
    return { valid: false, error: 'This promo code is no longer active' };
  }
  if (coupon.starts_at && new Date(coupon.starts_at).getTime() > now) {
    return { valid: false, error: 'This promo code is not active yet' };
  }
  if (coupon.ends_at && new Date(coupon.ends_at).getTime() < now) {
    return { valid: false, error: 'This promo code has expired' };
  }
  if (coupon.max_uses != null && coupon.used_count >= coupon.max_uses) {
    return { valid: false, error: 'This promo code has reached its usage limit' };
  }
  if (subtotal < Number(coupon.min_subtotal || 0)) {
    return {
      valid: false,
      error: `Minimum order of $${Number(coupon.min_subtotal).toFixed(2)} required`,
    };
  }

  const discountAmount = computeDiscountAmount(coupon, subtotal);
  if (discountAmount <= 0) {
    return { valid: false, error: 'Promo code cannot be applied' };
  }

  return {
    valid: true,
    code: coupon.code,
    description: coupon.description || undefined,
    discountAmount,
    discountType: coupon.discount_type,
    discountValue: Number(coupon.discount_value),
  };
}

export async function redeemCoupon(params: {
  code: string;
  orderId: string;
  email: string;
  discountAmount: number;
}): Promise<void> {
  const client = getSupabaseServer();
  const normalized = normalizeCouponCode(params.code);

  const { data: coupon } = await client
    .from('coupons')
    .select('id, used_count')
    .eq('code', normalized)
    .maybeSingle();

  if (!coupon) return;

  await client.from('coupon_redemptions').insert({
    coupon_id: coupon.id,
    order_id: params.orderId,
    email: params.email,
    discount_amount: params.discountAmount,
  });

  await client
    .from('coupons')
    .update({ used_count: Number(coupon.used_count || 0) + 1 })
    .eq('id', coupon.id);
}
