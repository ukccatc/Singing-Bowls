import { galleryAlbumSeeds } from '@/lib/data/gallery-albums';
import { GalleryCategory, GalleryItem, getGalleryImages } from '@/lib/supabase/gallery';
import { supabaseServerClient } from '@/lib/supabase/server';

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: { en: string; ru: string; uk?: string };
  description: { en: string; ru: string; uk?: string };
  event_date: string | null;
  category: GalleryCategory | null;
  location?: { en: string; ru: string; uk?: string } | null;
  cover_image_url?: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryAlbumSummary extends GalleryAlbum {
  image_count: number;
  cover_image_url: string;
}

export interface GalleryAlbumWithImages extends GalleryAlbum {
  images: GalleryItem[];
}

type AlbumImageLink = {
  display_order: number;
  gallery: GalleryItem | GalleryItem[] | null;
};

type AlbumRow = GalleryAlbum & {
  gallery_album_images?: AlbumImageLink[] | null;
};

function isMissingAlbumsTable(error: { message?: string; code?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === '42P01' ||
    error.message?.includes('gallery_albums') ||
    error.message?.includes('schema cache')
  );
}

function extractImages(links: AlbumImageLink[] | null | undefined): GalleryItem[] {
  if (!links?.length) return [];

  return links
    .slice()
    .sort((a, b) => a.display_order - b.display_order)
    .flatMap((link) => {
      if (!link.gallery) return [];
      return Array.isArray(link.gallery) ? link.gallery : [link.gallery];
    })
    .filter((image) => image.is_active);
}

function toSummary(album: AlbumRow): GalleryAlbumSummary {
  const { gallery_album_images, ...rest } = album;
  const images = extractImages(gallery_album_images);
  const cover = rest.cover_image_url || images[0]?.image_url || '';

  return {
    ...rest,
    cover_image_url: cover,
    image_count: images.length,
  };
}

function buildStaticAlbums(images: GalleryItem[]): GalleryAlbumSummary[] {
  const imagesByOrder = new Map(images.map((image) => [image.display_order, image]));

  return galleryAlbumSeeds
    .map((seed, index) => {
      const albumImages = seed.imageDisplayOrders
        .map((displayOrder) => imagesByOrder.get(displayOrder))
        .filter((image): image is GalleryItem => Boolean(image));

      const coverOrder = seed.coverImageDisplayOrder ?? seed.imageDisplayOrders[0];
      const coverImage = coverOrder ? imagesByOrder.get(coverOrder) : albumImages[0];

      return {
        id: `seed-${seed.slug}`,
        slug: seed.slug,
        title: seed.title,
        description: seed.description,
        event_date: seed.eventDate,
        category: seed.category,
        location: seed.location,
        display_order: index + 1,
        is_active: true,
        cover_image_url: coverImage?.image_url || '',
        image_count: albumImages.length,
      };
    })
    .filter((album) => album.image_count > 0);
}

function buildStaticAlbumBySlug(
  slug: string,
  images: GalleryItem[]
): GalleryAlbumWithImages | null {
  const seed = galleryAlbumSeeds.find((item) => item.slug === slug);
  if (!seed) return null;

  const imagesByOrder = new Map(images.map((image) => [image.display_order, image]));
  const albumImages = seed.imageDisplayOrders
    .map((displayOrder) => imagesByOrder.get(displayOrder))
    .filter((image): image is GalleryItem => Boolean(image));

  if (albumImages.length === 0) return null;

  const coverOrder = seed.coverImageDisplayOrder ?? seed.imageDisplayOrders[0];
  const coverImage = coverOrder ? imagesByOrder.get(coverOrder) : albumImages[0];

  return {
    id: `seed-${seed.slug}`,
    slug: seed.slug,
    title: seed.title,
    description: seed.description,
    event_date: seed.eventDate,
    category: seed.category,
    location: seed.location,
    display_order: galleryAlbumSeeds.indexOf(seed) + 1,
    is_active: true,
    cover_image_url: coverImage?.image_url || albumImages[0].image_url,
    images: albumImages,
  };
}

const albumSelect = `
  *,
  gallery_album_images (
    display_order,
    gallery:gallery_id (*)
  )
`;

async function fetchAlbumRows(activeOnly: boolean): Promise<AlbumRow[] | null> {
  let query = supabaseServerClient
    .from('gallery_albums')
    .select(albumSelect)
    .order('event_date', { ascending: false })
    .order('display_order', { ascending: true });

  if (activeOnly) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (isMissingAlbumsTable(error)) {
    return null;
  }

  if (error) {
    console.error('Error fetching gallery albums:', error);
    return [];
  }

  return (data as AlbumRow[]) ?? [];
}

export async function getGalleryAlbums(activeOnly = true): Promise<GalleryAlbumSummary[]> {
  try {
    const rows = await fetchAlbumRows(activeOnly);

    if (rows === null) {
      const images = await getGalleryImages(activeOnly);
      return buildStaticAlbums(images);
    }

    if (!rows.length) {
      const images = await getGalleryImages(activeOnly);
      const staticAlbums = buildStaticAlbums(images);
      return staticAlbums.length > 0 ? staticAlbums : [];
    }

    return rows.map(toSummary).filter((album) => album.image_count > 0);
  } catch (error) {
    console.error('Error fetching gallery albums:', error);
    const images = await getGalleryImages(activeOnly);
    return buildStaticAlbums(images);
  }
}

export async function getGalleryAlbumBySlug(
  slug: string,
  activeOnly = true
): Promise<GalleryAlbumWithImages | null> {
  try {
    let query = supabaseServerClient
      .from('gallery_albums')
      .select(albumSelect)
      .eq('slug', slug)
      .maybeSingle();

    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (isMissingAlbumsTable(error)) {
      const images = await getGalleryImages(activeOnly);
      return buildStaticAlbumBySlug(slug, images);
    }

    if (error || !data) {
      const images = await getGalleryImages(activeOnly);
      return buildStaticAlbumBySlug(slug, images);
    }

    const album = data as AlbumRow;
    const { gallery_album_images, ...rest } = album;
    const images = extractImages(gallery_album_images);

    if (activeOnly && images.length === 0) {
      const fallbackImages = await getGalleryImages(activeOnly);
      return buildStaticAlbumBySlug(slug, fallbackImages);
    }

    return {
      ...rest,
      cover_image_url: rest.cover_image_url || images[0]?.image_url || null,
      images,
    };
  } catch (error) {
    console.error('Error fetching gallery album:', error);
    const images = await getGalleryImages(activeOnly);
    return buildStaticAlbumBySlug(slug, images);
  }
}

export async function getGalleryAlbumSlugs(activeOnly = true): Promise<string[]> {
  try {
    let query = supabaseServerClient
      .from('gallery_albums')
      .select('slug')
      .order('event_date', { ascending: false });

    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (isMissingAlbumsTable(error)) {
      return galleryAlbumSeeds.map((seed) => seed.slug);
    }

    if (error || !data?.length) {
      return galleryAlbumSeeds.map((seed) => seed.slug);
    }

    return data.map((row) => row.slug);
  } catch (error) {
    console.error('Error fetching gallery album slugs:', error);
    return galleryAlbumSeeds.map((seed) => seed.slug);
  }
}

export function getCategoryLabelKey(category: GalleryCategory | null | undefined): string {
  switch (category) {
    case 'workshop':
      return 'gallery.workshops';
    case 'retreat':
      return 'gallery.retreats';
    case 'ceremony':
      return 'gallery.ceremonies';
    case 'meditation':
    default:
      return 'gallery.meditation';
  }
}
