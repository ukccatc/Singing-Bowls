'use client';

import { GalleryViewNav } from '@/components/gallery/GalleryViewNav';
import { optimizeGalleryImageUrl } from '@/lib/images/gallery-image-url';
import { getCategoryLabelKey, GalleryAlbumWithImages } from '@/lib/supabase/gallery-albums';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface AlbumDetailClientProps {
  locale: Locale;
  album: GalleryAlbumWithImages;
  formattedDate: string;
}

export default function AlbumDetailClient({
  locale,
  album,
  formattedDate,
}: AlbumDetailClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/gallery/albums`}
            className="inline-flex items-center text-sm font-medium text-gold-700 hover:text-gold-800 mb-6"
          >
            ← {t('gallery.backToAlbums', locale)}
          </Link>

          {album.category ? (
            <span className="inline-block rounded-full bg-gold-100 text-gold-700 px-4 py-2 text-sm font-semibold mb-4">
              {t(getCategoryLabelKey(album.category), locale)}
            </span>
          ) : null}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {album.title[locale] || album.title.en}
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            {album.description[locale] || album.description.en}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            {formattedDate ? (
              <div>
                <span className="font-semibold text-gray-900">{t('gallery.date', locale)}:</span>{' '}
                {formattedDate}
              </div>
            ) : null}
            {album.location ? (
              <div>
                <span className="font-semibold text-gray-900">{t('gallery.location', locale)}:</span>{' '}
                {album.location[locale] || album.location.en}
              </div>
            ) : null}
            <div>
              <span className="font-semibold text-gray-900">{t('gallery.image', locale)}:</span>{' '}
              {t('gallery.photoCount', locale, { count: album.images.length })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <GalleryViewNav locale={locale} active="albums" />
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {album.images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-cream-100"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={optimizeGalleryImageUrl(image.image_url, 1600)}
                    alt={image.title[locale] || image.title.en}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="font-semibold text-lg">
                    {image.title[locale] || image.title.en}
                  </h3>
                  <p className="text-sm text-gray-200 line-clamp-2">
                    {image.description[locale] || image.description.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
