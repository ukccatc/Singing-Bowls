import AlbumsPageClient from '@/app/[locale]/gallery/albums/AlbumsPageClient';
import { formatGalleryDate } from '@/lib/gallery/format-date';
import { getGalleryAlbums } from '@/lib/supabase/gallery-albums';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { Metadata } from 'next';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: `${t('gallery.albumsTitle', locale)} | ${t('site.name', locale)}`,
    description: t('gallery.albumsSubtitle', locale),
    openGraph: {
      title: t('gallery.albumsTitle', locale),
      description: t('gallery.albumsSubtitle', locale),
    },
  };
}

export default async function GalleryAlbumsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const albums = await getGalleryAlbums(true);
  const albumsWithDates = albums.map((album) => ({
    ...album,
    formatted_date: formatGalleryDate(album.event_date, locale),
  }));

  return <AlbumsPageClient locale={locale} albums={albumsWithDates} />;
}
