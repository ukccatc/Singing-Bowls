import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { getSupabaseServer, supabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? getSupabaseServer()
      : supabaseServerClient;

    const { data, error } = await client
      .from('orders')
      .select('id, email, status, total, currency, created_at, notes, billing_address, shipping_address')
      .or(`id.eq.${id},notes.eq.${id}`)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: data.notes || data.id,
      email: data.email,
      total: data.total,
      currency: data.currency,
      shipping: data.shipping_address,
      status: data.status,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
