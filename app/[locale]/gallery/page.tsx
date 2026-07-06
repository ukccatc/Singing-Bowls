import GalleryPageClient from '@/app/[locale]/gallery/GalleryPageClient';
import { getGalleryImages } from '@/lib/supabase/gallery';
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
    title: `${t('gallery.title', locale)} | ${t('site.name', locale)}`,
    description: t('gallery.subtitle', locale),
    openGraph: {
      title: t('gallery.title', locale),
      description: t('gallery.subtitle', locale),
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const images = await getGalleryImages(true);

  return <GalleryPageClient locale={locale} images={images} />;
}
