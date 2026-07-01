import { supabaseServerClient } from '@/lib/supabase/server';
import {
  articleMatchesSlug,
  transformSupabaseArticle,
} from '@/lib/supabase/transforms';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const { data, error } = await supabaseServerClient
      .from('articles')
      .select('*')
      .eq('is_published', true);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const article = (data || []).find((row) => articleMatchesSlug(row, slug));

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: transformSupabaseArticle(article),
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
