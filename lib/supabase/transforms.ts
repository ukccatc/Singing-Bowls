import { Article, Product } from '@/lib/types';

export function transformSupabaseProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as Product['name'],
    description: row.description as Product['description'],
    price: Number(row.price),
    currency: (row.currency as string) || 'USD',
    images: (row.images as Product['images']) || [],
    audioSample: row.audio_sample as string | undefined,
    youtubeVideo: row.youtube_video as Product['youtubeVideo'],
    soundcloudAudio: row.soundcloud_audio as Product['soundcloudAudio'],
    category: row.category as Product['category'],
    specifications: (row.specifications as Product['specifications']) || [],
    inventory: Number(row.inventory ?? 0),
    sku: row.sku as string,
    weight: Number(row.weight ?? 0),
    dimensions: (row.dimensions as Product['dimensions']) || { unit: 'cm' },
    materials: (row.materials as string[]) || [],
    origin: (row.origin as string) || '',
    craftsman: row.craftsman as string | undefined,
    isHandmade: Boolean(row.is_handmade),
    isFeatured: Boolean(row.is_featured),
    isAvailable: Boolean(row.is_available),
    tags: (row.tags as string[]) || [],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    seo: (row.seo as Product['seo']) || {},
  };
}

export function transformSupabaseArticle(row: Record<string, unknown>): Article {
  const slug = row.slug as Record<string, string>;

  return {
    id: slug?.en || (row.id as string),
    title: row.title as Article['title'],
    excerpt: row.excerpt as Article['excerpt'],
    content: row.content as Article['content'],
    slug,
    author: row.author as Article['author'],
    category: row.category as Article['category'],
    tags: (row.tags as string[]) || [],
    image: row.image as Article['image'],
    isPublished: Boolean(row.is_published),
    publishedAt: row.published_at as string,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    readingTime: Number(row.reading_time ?? 5),
    seo: (row.seo as Article['seo']) || {},
  };
}

export function articleMatchesSlug(
  row: Record<string, unknown>,
  slug: string
): boolean {
  const slugMap = row.slug as Record<string, string> | undefined;
  if (!slugMap) return false;

  return (
    row.id === slug ||
    Object.values(slugMap).includes(slug) ||
    slugMap.en === slug
  );
}
