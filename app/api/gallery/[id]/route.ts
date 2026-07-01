import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { getSupabaseServer } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { id } = await params;

    const { data, error } = await getSupabaseServer()
      .from('gallery')
      .update({
        title: body.title,
        description: body.description,
        display_order: body.display_order,
        is_active: body.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0] }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
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

    const { error } = await getSupabaseServer().from('gallery').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Gallery item deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
