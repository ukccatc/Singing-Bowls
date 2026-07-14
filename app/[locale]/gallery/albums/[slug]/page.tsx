import AlbumDetailClient from '@/app/[locale]/gallery/albums/[slug]/AlbumDetailClient';
import { formatGalleryDate } from '@/lib/gallery/format-date';
import { getGalleryAlbumBySlug, getGalleryAlbumSlugs } from '@/lib/supabase/gallery-albums';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getGalleryAlbumSlugs(true);
  const locales: Locale[] = ['en', 'ru', 'uk'];

  return slugs.flatMap((slug) => locales.map((locale) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const album = await getGalleryAlbumBySlug(slug, true);

  if (!album) {
    return {
      title: t('gallery.albumsTitle', locale),
    };
  }

  const title = album.title[locale] || album.title.en;
  const description = album.description[locale] || album.description.en;

  return {
    title: `${title} | ${t('gallery.albumsTitle', locale)}`,
    description,
    openGraph: {
      title,
      description,
      images: album.cover_image_url ? [album.cover_image_url] : undefined,
    },
  };
}

export default async function GalleryAlbumDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const album = await getGalleryAlbumBySlug(slug, true);

  if (!album) {
    notFound();
  }

  return (
    <AlbumDetailClient
      locale={locale}
      album={album}
      formattedDate={formatGalleryDate(album.event_date, locale)}
    />
  );
}
