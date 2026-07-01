import { sampleArticles } from '@/lib/data/articles';
import { supabaseServerClient } from '@/lib/supabase/server';
import {
  articleMatchesSlug,
  transformSupabaseArticle,
} from '@/lib/supabase/transforms';
import { Article } from '@/lib/types';

export async function getArticles(): Promise<Article[]> {
  try {
    const { data, error } = await supabaseServerClient
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (!error && data?.length) {
      return data.map((row) =>
        transformSupabaseArticle(row as Record<string, unknown>)
      );
    }
  } catch (error) {
    console.error('Error fetching articles from Supabase:', error);
  }

  return sampleArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const { data, error } = await supabaseServerClient
      .from('articles')
      .select('*')
      .eq('is_published', true);

    if (!error && data?.length) {
      const article = data.find((row) => articleMatchesSlug(row, slug));
      if (article) {
        return transformSupabaseArticle(article as Record<string, unknown>);
      }
    }
  } catch (error) {
    console.error('Error fetching article from Supabase:', error);
  }

  return (
    sampleArticles.find(
      (article) =>
        article.id === slug ||
        article.slug.en === slug ||
        article.slug.ru === slug ||
        article.slug.uk === slug
    ) || null
  );
}

export { transformSupabaseArticle };
