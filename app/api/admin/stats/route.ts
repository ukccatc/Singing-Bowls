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

    const { count: productCount } = await client
      .from('products')
      .select('*', { count: 'exact', head: true });

    const { count: orderCount } = await client
      .from('orders')
      .select('*', { count: 'exact', head: true });

    const { data: orderTotals } = await client.from('orders').select('total, email');

    const revenue = (orderTotals || []).reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );
    const uniqueCustomers = new Set(
      (orderTotals || []).map((order) => order.email).filter(Boolean)
    ).size;

    return NextResponse.json({
      totalProducts: productCount || 0,
      totalOrders: orderCount || 0,
      totalCustomers: uniqueCustomers,
      revenue,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
