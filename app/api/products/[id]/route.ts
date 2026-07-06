import { mapAdminProductUpdate } from '@/lib/admin/products';
import { isAdminSession, requireAdminSession } from '@/lib/auth/require-admin-session';
import { getSupabaseServer, supabaseServerClient } from '@/lib/supabase/server';
import { transformSupabaseProduct } from '@/lib/supabase/transforms';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const isAdmin = isAdminSession(request);

    let query = supabaseServerClient.from('products').select('*').eq('id', id);

    if (!isAdmin) {
      query = query.eq('is_available', true);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const payload = isAdmin
      ? data
      : transformSupabaseProduct(data as Record<string, unknown>);

    return NextResponse.json({ success: true, data: payload }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = getSupabaseServer();

    const { data: existing, error: fetchError } = await supabase
      .from('products')
      .select('images')
      .eq('id', id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 404 });
    }

    const updatePayload = mapAdminProductUpdate(body, existing?.images);

    const { data, error } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0] }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const supabase = getSupabaseServer();

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
