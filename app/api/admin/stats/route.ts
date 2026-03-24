import { supabaseServer } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get total products
    const { count: productCount } = await supabaseServer
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
