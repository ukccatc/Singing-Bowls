import { getSupabaseServer, supabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? getSupabaseServer()
      : supabaseServerClient;

    const { count: productCount } = await client
      .from('products')
      .select('*', { count: 'exact', head: true });

    // For now, return mock data for orders and customers
    // These would be fetched from actual tables when they exist
    return NextResponse.json({
      totalProducts: productCount || 0,
      totalOrders: 0,
      totalCustomers: 0,
      revenue: 0,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
