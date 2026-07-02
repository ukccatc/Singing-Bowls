import { mapAdminArticleCreate } from '@/lib/admin/articles';
import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { getSupabaseServer } from '@/lib/supabase/server';
import { transformSupabaseArticle } from '@/lib/supabase/transforms';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: (data || []).map((row) => ({
        ...transformSupabaseArticle(row as Record<string, unknown>),
        dbId: row.id,
      })),
    });
  } catch (error) {
    console.error('Error fetching admin articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const supabase = getSupabaseServer();
    const payload = mapAdminArticleCreate(body);

    const { data, error } = await supabase
      .from('articles')
      .insert([payload])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          ...transformSupabaseArticle(data as Record<string, unknown>),
          dbId: data.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
