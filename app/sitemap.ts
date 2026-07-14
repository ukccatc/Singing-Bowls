import { getArticles } from '@/lib/supabase/content';
import { getGalleryAlbumSlugs } from '@/lib/supabase/gallery-albums';
import { getProductSlugs } from '@/lib/supabase/products';
import { getSiteUrl } from '@/lib/site';
import { getAvailableLocales, getDefaultLocale } from '@/lib/translations';
import { Locale } from '@/lib/types';
import type { MetadataRoute } from 'next';

const STATIC_PAGES = [
  '',
  'shop',
  'gallery',
  'gallery/albums',
  'about',
  'blog',
  'contact',
  'shipping',
  'returns',
  'faq',
  'privacy',
  'terms',
] as const;

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
  const locale = getDefaultLocale();

  return {
    url: `${siteUrl}/${locale}${path}`,
    lastModified: options?.lastModified ?? new Date(),
    changeFrequency: options?.changeFrequency ?? 'weekly',
    priority: options?.priority ?? 0.7,
    alternates: { languages: localeAlternates(path) },
  };
}

async function getArticleSlugs(): Promise<string[]> {
  const articles = await getArticles();
  return articles.map(
    (article) => article.slug.en || article.slug.uk || article.slug.ru
  );
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

  const albumSlugs = await getGalleryAlbumSlugs();
  for (const slug of albumSlugs) {
    urls.push(
      entry(`/gallery/albums/${slug}`, {
        priority: 0.75,
        changeFrequency: 'monthly',
      })
    );
  }

  return urls;
}
