import { mapAdminProductCreate } from '@/lib/admin/products';
import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { getSupabaseServer, supabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const supabase = getSupabaseServer();
    const payload = mapAdminProductCreate(body);

    const { data, error } = await supabase.from('products').insert([payload]).select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0] }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create product';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseServerClient
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
