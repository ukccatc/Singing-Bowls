import { sampleArticles } from '@/lib/data/articles';
import { sampleProducts } from '@/lib/data/products';
import { supabaseServerClient } from '@/lib/supabase/server';
import { getSiteUrl } from '@/lib/site';
import { getAvailableLocales } from '@/lib/translations';
import { Locale } from '@/lib/types';
import type { MetadataRoute } from 'next';

const STATIC_PAGES = ['', 'shop', 'gallery', 'about', 'blog', 'contact'] as const;

function localeAlternates(path: string): Record<string, string> {
  const siteUrl = getSiteUrl();
  const locales = getAvailableLocales();
  const alternates: Record<string, string> = {};

  for (const locale of locales) {
    alternates[locale] = `${siteUrl}/${locale}${path}`;
  }

  return alternates;
}

function entry(
  path: string,
  options?: { lastModified?: Date; changeFrequency?: MetadataRoute.Sitemap[0]['changeFrequency']; priority?: number }
): MetadataRoute.Sitemap[0] {
  const siteUrl = getSiteUrl();
  const locales = getAvailableLocales();
  const locale = locales[0] as Locale;

  return {
    url: `${siteUrl}/${locale}${path}`,
    lastModified: options?.lastModified ?? new Date(),
    changeFrequency: options?.changeFrequency ?? 'weekly',
    priority: options?.priority ?? 0.7,
    alternates: { languages: localeAlternates(path) },
  };
}

async function getProductSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabaseServerClient
      .from('products')
      .select('slug')
      .eq('is_available', true);

    if (!error && data?.length) {
      return data.map((row) => row.slug);
    }
  } catch {
    // fall through to static data
  }

  return sampleProducts.map((product) => product.slug);
}

async function getArticleSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabaseServerClient
      .from('articles')
      .select('slug')
      .eq('is_published', true);

    if (!error && data?.length) {
      return data.map((row) => {
        const slug = row.slug as Record<string, string>;
        return slug.en || slug.ru || slug.uk || Object.values(slug)[0];
      });
    }
  } catch {
    // fall through to static data
  }

  return sampleArticles.map((article) => article.slug.en);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    const path = page ? `/${page}` : '';
    urls.push(
      entry(path, {
        priority: page === '' ? 1 : 0.8,
        changeFrequency: page === 'blog' ? 'daily' : 'weekly',
      })
    );
  }

  const productSlugs = await getProductSlugs();
  for (const slug of productSlugs) {
    urls.push(
      entry(`/product/${slug}`, {
        priority: 0.9,
        changeFrequency: 'weekly',
      })
    );
  }

  const articleSlugs = await getArticleSlugs();
  for (const slug of articleSlugs) {
    urls.push(
      entry(`/blog/${slug}`, {
        priority: 0.8,
        changeFrequency: 'monthly',
      })
    );
  }

  return urls;
}
