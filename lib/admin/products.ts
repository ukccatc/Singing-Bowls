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

export function mapAdminProductCreate(body: Record<string, unknown>) {
  const name = body.name as Record<string, string>;
  const description = body.description as Record<string, string>;
  const imageUrl = String(body.image_url || '');
  const englishName = name?.en || 'product';

  return {
    slug: slugify(String(body.slug || englishName)),
    name,
    description,
    price: Number(body.price),
    currency: 'USD',
    category: normalizeProductCategory(body.category),
    images: imageUrl ? buildProductImages(imageUrl, name) : [],
    inventory: Number(body.inventory ?? body.stock ?? 0),
    sku: String(body.sku || `SKU-${Date.now()}`),
    specifications: [],
    tags: [],
    weight: Number(body.weight ?? 0),
    dimensions: body.dimensions ?? {},
    materials: [],
    origin: 'Nepal',
    is_handmade: true,
    is_featured: Boolean(body.is_featured ?? body.isFeatured),
    is_available: body.is_available !== false && body.isAvailable !== false,
  };
}

export function mapAdminProductUpdate(body: Record<string, unknown>, existingImages?: unknown[]) {
  const name = body.name as Record<string, string>;
  const imageUrl = body.image_url ? String(body.image_url) : undefined;

  const update: Record<string, unknown> = {
    name: body.name,
    description: body.description,
    price: Number(body.price),
    category: normalizeProductCategory(body.category),
    inventory: Number(body.inventory ?? body.stock ?? 0),
    updated_at: new Date().toISOString(),
  };

  if (body.is_featured !== undefined || body.isFeatured !== undefined) {
    update.is_featured = Boolean(body.is_featured ?? body.isFeatured);
  }

  if (body.is_available !== undefined || body.isAvailable !== undefined) {
    update.is_available = Boolean(body.is_available ?? body.isAvailable);
  }

  if (imageUrl) {
    update.images = buildProductImages(imageUrl, name);
  } else if (existingImages) {
    update.images = existingImages;
  }

  return update;
}
