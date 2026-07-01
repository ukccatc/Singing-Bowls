function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
    category: String(body.category || 'SINGING_BOWLS'),
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
    is_featured: false,
    is_available: true,
  };
}

export function mapAdminProductUpdate(body: Record<string, unknown>, existingImages?: unknown[]) {
  const name = body.name as Record<string, string>;
  const imageUrl = body.image_url ? String(body.image_url) : undefined;

  const update: Record<string, unknown> = {
    name: body.name,
    description: body.description,
    price: Number(body.price),
    category: String(body.category),
    inventory: Number(body.inventory ?? body.stock ?? 0),
    updated_at: new Date().toISOString(),
  };

  if (imageUrl) {
    update.images = buildProductImages(imageUrl, name);
  } else if (existingImages) {
    update.images = existingImages;
  }

  return update;
}
