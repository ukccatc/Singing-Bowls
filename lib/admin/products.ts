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

export type AdminImageInput = {
  id?: string;
  url: string;
  isPrimary?: boolean;
};

export function buildProductImages(imageUrl: string, name: Record<string, string>) {
  return normalizeProductImages([{ url: imageUrl, isPrimary: true }], name);
}

/** Normalize form/API image list: unique URLs, exactly one primary (first if unset). */
export function normalizeProductImages(
  images: AdminImageInput[] | undefined,
  name: Record<string, string>
) {
  const seen = new Set<string>();
  const cleaned = (images || [])
    .map((image, index) => {
      const url = String(image?.url || '').trim();
      if (!url || seen.has(url)) return null;
      seen.add(url);
      return {
        id: image.id?.trim() || `img-${Date.now()}-${index}`,
        url,
        alt: name,
        width: 800,
        height: 600,
        isPrimary: Boolean(image.isPrimary),
      };
    })
    .filter((image): image is NonNullable<typeof image> => image !== null);

  if (cleaned.length === 0) return [];

  const primaryIndex = cleaned.findIndex((image) => image.isPrimary);
  return cleaned.map((image, index) => ({
    ...image,
    isPrimary: primaryIndex === -1 ? index === 0 : index === primaryIndex,
  }));
}

function resolveImagesFromBody(
  body: Record<string, unknown>,
  name: Record<string, string>
) {
  if (Array.isArray(body.images)) {
    return normalizeProductImages(body.images as AdminImageInput[], name);
  }

  const imageUrl = String(body.image_url || '').trim();
  if (imageUrl) {
    return buildProductImages(imageUrl, name);
  }

  return [];
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

function parseDimensions(body: Record<string, unknown>) {
  const existing =
    body.dimensions && typeof body.dimensions === 'object'
      ? (body.dimensions as Record<string, unknown>)
      : {};

  const unitRaw = String(
    body.dimension_unit || existing.unit || 'cm'
  ).toLowerCase();
  const unit =
    unitRaw === 'mm' || unitRaw === 'inches' || unitRaw === 'cm'
      ? unitRaw
      : 'cm';

  const diameter = Number(body.diameter ?? existing.diameter);
  const height = Number(body.height ?? existing.height);
  const length = Number(existing.length);
  const width = Number(existing.width);

  return {
    unit,
    ...(Number.isFinite(diameter) && diameter > 0 ? { diameter } : {}),
    ...(Number.isFinite(height) && height > 0 ? { height } : {}),
    ...(Number.isFinite(length) && length > 0 ? { length } : {}),
    ...(Number.isFinite(width) && width > 0 ? { width } : {}),
  };
}

function resolveSku(body: Record<string, unknown>, fallbackPrefix = 'SKU') {
  const sku = String(body.sku || '').trim();
  return sku || `${fallbackPrefix}-${Date.now()}`;
}

function parseSpecifications(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((raw) => {
      if (!raw || typeof raw !== 'object') return null;
      const item = raw as Record<string, unknown>;
      const name = (item.name || {}) as Record<string, string>;
      const val = (item.value || {}) as Record<string, string>;
      const unit = String(item.unit || '').trim();

      const nameEn = String(name.en || '').trim();
      const valueEn = String(val.en || '').trim();
      // Require at least English name + value; skip empty rows
      if (!nameEn && !valueEn) return null;

      return {
        name: {
          en: nameEn || String(name.ru || name.uk || '').trim(),
          ru: String(name.ru || '').trim() || nameEn,
          uk: String(name.uk || '').trim() || nameEn,
        },
        value: {
          en: valueEn || String(val.ru || val.uk || '').trim(),
          ru: String(val.ru || '').trim() || valueEn,
          uk: String(val.uk || '').trim() || valueEn,
        },
        ...(unit ? { unit } : {}),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

function resolveCurrency(value: unknown) {
  const currency = String(value || 'USD').toUpperCase();
  if (currency === 'EUR' || currency === 'UAH' || currency === 'USD') return currency;
  return 'USD';
}

export function mapAdminProductCreate(body: Record<string, unknown>) {
  const name = body.name as Record<string, string>;
  const description = body.description as Record<string, string>;
  const englishName = name?.en || 'product';
  const media = mediaFieldsFromBody(body);
  const images = resolveImagesFromBody(body, name);

  const weight = Number(body.weight);
  return {
    slug: slugify(String(body.slug || englishName)),
    name,
    description,
    price: Number(body.price),
    currency: resolveCurrency(body.currency),
    category: normalizeProductCategory(body.category),
    images,
    inventory: Number(body.inventory ?? body.stock ?? 0) || 0,
    sku: resolveSku(body),
    specifications: parseSpecifications(body.specifications),
    tags: parseMaterials(body.tags),
    weight: Number.isFinite(weight) && weight >= 0 ? weight : 0,
    dimensions: parseDimensions(body),
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
  const media = mediaFieldsFromBody(body);

  const update: Record<string, unknown> = {
    name: body.name,
    description: body.description,
    price: Number(body.price),
    category: normalizeProductCategory(body.category),
    inventory: Number(body.inventory ?? body.stock ?? 0),
    updated_at: new Date().toISOString(),
  };

  if (body.currency !== undefined) {
    update.currency = resolveCurrency(body.currency);
  }

  if (body.slug !== undefined) {
    update.slug = slugify(String(body.slug));
  }

  if (body.sku !== undefined) {
    update.sku = resolveSku(body);
  }

  if (body.specifications !== undefined) {
    update.specifications = parseSpecifications(body.specifications);
  }

  if (body.tags !== undefined) {
    update.tags = parseMaterials(body.tags);
  }

  if (body.weight !== undefined) {
    const weight = Number(body.weight);
    update.weight = Number.isFinite(weight) && weight >= 0 ? weight : 0;
  }

  if (
    body.diameter !== undefined ||
    body.height !== undefined ||
    body.dimension_unit !== undefined ||
    body.dimensions !== undefined
  ) {
    update.dimensions = parseDimensions(body);
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

  if (Array.isArray(body.images)) {
    update.images = normalizeProductImages(body.images as AdminImageInput[], name);
  } else if (body.image_url) {
    update.images = buildProductImages(String(body.image_url), name);
  } else if (existingImages) {
    update.images = existingImages;
  }

  return update;
}

export { slugify };
