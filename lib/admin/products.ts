import { ProductCategory } from '@/lib/types';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CATEGORY_ALIASES: Record<string, ProductCategory> = {
  SINGING_BOWLS: ProductCategory.SINGING_BOWLS,
  singing_bowls: ProductCategory.SINGING_BOWLS,
  BELLS: ProductCategory.MEDITATION_BELLS,
  meditation_bells: ProductCategory.MEDITATION_BELLS,
  GONGS: ProductCategory.GONGS,
  gongs: ProductCategory.GONGS,
  ACCESSORIES: ProductCategory.ACCESSORIES,
  accessories: ProductCategory.ACCESSORIES,
  GIFT_SETS: ProductCategory.GIFT_SETS,
  gift_sets: ProductCategory.GIFT_SETS,
};

export function normalizeProductCategory(value: unknown): ProductCategory {
  const key = String(value || ProductCategory.SINGING_BOWLS);
  return CATEGORY_ALIASES[key] || ProductCategory.SINGING_BOWLS;
}

export function buildProductImages(imageUrl: string, name: Record<string, string>) {
  return [
    {
      id: `img-${Date.now()}`,
      url: imageUrl,
      alt: name,
      width: 800,
      height: 600,
      isPrimary: true,
    },
  ];
}

function parseMaterials(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function parseYouTubeUrl(url: string | undefined) {
  const trimmed = url?.trim();
  if (!trimmed) return undefined;

  const match = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  const videoId = match?.[1];
  if (!videoId) return undefined;

  return {
    id: `yt-${videoId}`,
    videoId,
    title: 'Product video',
    url: trimmed,
    platform: 'youtube' as const,
    isEmbeddable: true,
    privacyStatus: 'public' as const,
    createdAt: new Date().toISOString(),
  };
}

function parseSoundCloudUrl(url: string | undefined) {
  const trimmed = url?.trim();
  if (!trimmed) return undefined;

  return {
    id: `sc-${Date.now()}`,
    trackId: trimmed,
    title: 'Audio sample',
    streamUrl: trimmed,
    duration: 0,
    tags: [] as string[],
    platform: 'soundcloud' as const,
    isPublic: true,
    downloadable: false,
    createdAt: new Date().toISOString(),
  };
}

function mediaFieldsFromBody(body: Record<string, unknown>) {
  const youtube = parseYouTubeUrl(
    String(body.youtube_url || body.youtubeUrl || '')
  );
  const soundcloud = parseSoundCloudUrl(
    String(body.soundcloud_url || body.soundcloudUrl || '')
  );
  const audioSample = String(body.audio_sample || body.audioSample || '').trim();

  return {
    youtube_video: youtube ?? null,
    soundcloud_audio: soundcloud ?? null,
    audio_sample: audioSample || null,
  };
}

export function mapAdminProductCreate(body: Record<string, unknown>) {
  const name = body.name as Record<string, string>;
  const description = body.description as Record<string, string>;
  const imageUrl = String(body.image_url || '');
  const englishName = name?.en || 'product';
  const media = mediaFieldsFromBody(body);

  return {
    slug: slugify(String(body.slug || englishName)),
    name,
    description,
    price: Number(body.price),
    currency: String(body.currency || 'USD'),
    category: normalizeProductCategory(body.category),
    images: imageUrl ? buildProductImages(imageUrl, name) : [],
    inventory: Number(body.inventory ?? body.stock ?? 0),
    sku: String(body.sku || `SKU-${Date.now()}`),
    specifications: [],
    tags: [],
    weight: Number(body.weight ?? 0),
    dimensions: body.dimensions ?? {},
    materials: parseMaterials(body.materials),
    origin: String(body.origin || 'Nepal'),
    craftsman: body.craftsman ? String(body.craftsman) : null,
    is_handmade: Boolean(body.is_handmade ?? body.isHandmade ?? true),
    is_featured: Boolean(body.is_featured ?? body.isFeatured),
    is_available: body.is_available !== false && body.isAvailable !== false,
    ...media,
  };
}

export function mapAdminProductUpdate(body: Record<string, unknown>, existingImages?: unknown[]) {
  const name = body.name as Record<string, string>;
  const imageUrl = body.image_url ? String(body.image_url) : undefined;
  const media = mediaFieldsFromBody(body);

  const update: Record<string, unknown> = {
    name: body.name,
    description: body.description,
    price: Number(body.price),
    category: normalizeProductCategory(body.category),
    inventory: Number(body.inventory ?? body.stock ?? 0),
    updated_at: new Date().toISOString(),
  };

  if (body.slug !== undefined) {
    update.slug = slugify(String(body.slug));
  }

  if (body.sku !== undefined) {
    update.sku = String(body.sku);
  }

  if (body.weight !== undefined) {
    update.weight = Number(body.weight);
  }

  if (body.materials !== undefined) {
    update.materials = parseMaterials(body.materials);
  }

  if (body.origin !== undefined) {
    update.origin = String(body.origin);
  }

  if (body.craftsman !== undefined) {
    update.craftsman = body.craftsman ? String(body.craftsman) : null;
  }

  if (body.is_handmade !== undefined || body.isHandmade !== undefined) {
    update.is_handmade = Boolean(body.is_handmade ?? body.isHandmade);
  }

  if (body.is_featured !== undefined || body.isFeatured !== undefined) {
    update.is_featured = Boolean(body.is_featured ?? body.isFeatured);
  }

  if (body.is_available !== undefined || body.isAvailable !== undefined) {
    update.is_available = Boolean(body.is_available ?? body.isAvailable);
  }

  if (body.youtube_url !== undefined || body.youtubeUrl !== undefined) {
    update.youtube_video = media.youtube_video;
  }

  if (body.soundcloud_url !== undefined || body.soundcloudUrl !== undefined) {
    update.soundcloud_audio = media.soundcloud_audio;
  }

  if (body.audio_sample !== undefined || body.audioSample !== undefined) {
    update.audio_sample = media.audio_sample;
  }

  if (imageUrl) {
    update.images = buildProductImages(imageUrl, name);
  } else if (existingImages) {
    update.images = existingImages;
  }

  return update;
}

export { slugify };
