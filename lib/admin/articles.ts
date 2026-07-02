import { ArticleCategory } from '@/lib/types';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function mapAdminArticleCreate(body: Record<string, unknown>) {
  const title = body.title as Record<string, string>;
  const excerpt = body.excerpt as Record<string, string>;
  const content = body.content as Record<string, string>;
  const englishTitle = title?.en || 'article';
  const slugInput = body.slug as Record<string, string> | undefined;
  const imageUrl = String(body.image_url || '');

  const slug = slugInput?.en
    ? slugInput
    : {
        en: slugify(englishTitle),
        ru: slugify(title?.ru || englishTitle),
        uk: slugify(title?.uk || englishTitle),
      };

  const now = new Date().toISOString();
  const isPublished = Boolean(body.is_published ?? body.isPublished);

  return {
    title,
    excerpt,
    content,
    slug,
    author: body.author || {
      id: 'admin',
      name: 'Himalayan Sound',
      bio: { en: '', ru: '', uk: '' },
    },
    category: String(body.category || ArticleCategory.SOUND_HEALING),
    tags: (body.tags as string[]) || [],
    image: imageUrl
      ? {
          url: imageUrl,
          alt: title,
          width: 1200,
          height: 630,
        }
      : body.image || {
          url: '',
          alt: title,
          width: 1200,
          height: 630,
        },
    is_published: isPublished,
    published_at: isPublished ? (body.published_at as string) || now : null,
    reading_time: Number(body.reading_time ?? body.readingTime ?? 5),
    seo: body.seo || {},
    created_at: now,
    updated_at: now,
  };
}

export function mapAdminArticleUpdate(body: Record<string, unknown>) {
  const title = body.title as Record<string, string> | undefined;
  const imageUrl = body.image_url ? String(body.image_url) : undefined;
  const now = new Date().toISOString();

  const update: Record<string, unknown> = {
    updated_at: now,
  };

  if (body.title) update.title = body.title;
  if (body.excerpt) update.excerpt = body.excerpt;
  if (body.content) update.content = body.content;
  if (body.slug) update.slug = body.slug;
  if (body.author) update.author = body.author;
  if (body.category) update.category = String(body.category);
  if (body.tags) update.tags = body.tags;
  if (body.reading_time !== undefined || body.readingTime !== undefined) {
    update.reading_time = Number(body.reading_time ?? body.readingTime);
  }
  if (body.seo) update.seo = body.seo;

  if (body.is_published !== undefined || body.isPublished !== undefined) {
    const isPublished = Boolean(body.is_published ?? body.isPublished);
    update.is_published = isPublished;
    if (isPublished) {
      update.published_at = (body.published_at as string) || now;
    }
  }

  if (imageUrl && title) {
    update.image = {
      url: imageUrl,
      alt: title,
      width: 1200,
      height: 630,
    };
  } else if (body.image) {
    update.image = body.image;
  }

  return update;
}
