'use client';

import { GalleryViewNav } from '@/components/gallery/GalleryViewNav';
import { formatGalleryDate } from '@/lib/gallery/format-date';
import { optimizeGalleryImageUrl } from '@/lib/images/gallery-image-url';
import { getCategoryLabelKey, GalleryAlbumSummary } from '@/lib/supabase/gallery-albums';
import { GalleryCategory } from '@/lib/supabase/gallery';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type FilterValue = 'all' | GalleryCategory;

const FILTERS: { value: FilterValue; labelKey: string }[] = [
  { value: 'all', labelKey: 'gallery.allEvents' },
  { value: 'meditation', labelKey: 'gallery.meditation' },
  { value: 'workshop', labelKey: 'gallery.workshops' },
  { value: 'retreat', labelKey: 'gallery.retreats' },
  { value: 'ceremony', labelKey: 'gallery.ceremonies' },
];

interface AlbumsPageClientProps {
  locale: Locale;
  albums: (GalleryAlbumSummary & { formatted_date: string })[];
}

export default function AlbumsPageClient({ locale, albums }: AlbumsPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');

  const filteredAlbums = useMemo(() => {
    if (activeFilter === 'all') return albums;
    return albums.filter((album) => album.category === activeFilter);
  }, [activeFilter, albums]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-semibold">
              {t('gallery.pastEvents', locale)}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('gallery.albumsTitle', locale)}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('gallery.albumsSubtitle', locale)}
          </p>
        </div>
      </section>

      <section className="pb-6 px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-7xl mx-auto">
          <GalleryViewNav locale={locale} active="albums" />
        </div>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === filter.value
                  ? 'bg-gold-600 text-white'
                  : 'bg-white text-charcoal-700 hover:bg-gold-50'
              }`}
            >
              {t(filter.labelKey, locale)}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredAlbums.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlbums.map((album) => (
                <Link
                  key={album.id}
                  href={`/${locale}/gallery/albums/${album.slug}`}
                  className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white"
                >
                  <div className="relative aspect-[4/3] w-full bg-cream-100">
                    {album.cover_image_url ? (
                      <Image
                        src={optimizeGalleryImageUrl(album.cover_image_url, 1200)}
                        alt={album.title[locale] || album.title.en}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      {album.category ? (
                        <span className="mb-2 inline-block rounded-full bg-gold-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                          {t(getCategoryLabelKey(album.category), locale)}
                        </span>
                      ) : null}
                      <h3 className="font-semibold text-lg">
                        {album.title[locale] || album.title.en}
                      </h3>
                      {album.formatted_date ? (
                        <p className="text-sm text-gray-200 mt-1">{album.formatted_date}</p>
                      ) : null}
                      <p className="text-sm text-gray-200 mt-2">
                        {t('gallery.photoCount', locale, { count: album.image_count })}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {album.description[locale] || album.description.en}
                    </p>
                    {album.location ? (
                      <p className="mt-2 text-xs text-gold-700 font-medium">
                        {album.location[locale] || album.location.en}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{t('gallery.noAlbums', locale)}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
