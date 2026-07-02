import { mapAdminArticleUpdate } from '@/lib/admin/articles';
import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { getSupabaseServer } from '@/lib/supabase/server';
import { transformSupabaseArticle } from '@/lib/supabase/transforms';
import { NextRequest, NextResponse } from 'next/server';

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
    const updatePayload = mapAdminArticleUpdate(body);

    const { data, error } = await supabase
      .from('articles')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...transformSupabaseArticle(data as Record<string, unknown>),
        dbId: data.id,
      },
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
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

    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
