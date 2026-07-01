import { sampleArticles } from '@/lib/data/articles';
import { transformSupabaseArticle } from '@/lib/supabase/transforms';
import { Article } from '@/lib/types';

export async function getArticles(): Promise<Article[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/articles`, {
      cache: 'no-store',
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        return result.data;
      }
    }
  } catch (error) {
    console.error('Error fetching articles from API:', error);
  }

  return sampleArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/articles/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        return result.data;
      }
    }

    if (response.status === 404) {
      return null;
    }
  } catch (error) {
    console.error('Error fetching article from API:', error);
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
