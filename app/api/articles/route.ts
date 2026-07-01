import { supabaseServerClient } from '@/lib/supabase/server';
import { transformSupabaseArticle } from '@/lib/supabase/transforms';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabaseServerClient
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: (data || []).map((row) => transformSupabaseArticle(row)),
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
