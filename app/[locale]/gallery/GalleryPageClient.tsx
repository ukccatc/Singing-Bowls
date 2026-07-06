'use client';

import { GalleryCategory, GalleryItem } from '@/lib/supabase/gallery';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
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

interface GalleryPageClientProps {
  locale: Locale;
  images: GalleryItem[];
}

export default function GalleryPageClient({ locale, images }: GalleryPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');

  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') return images;
    return images.filter((img) => img.category === activeFilter);
  }, [activeFilter, images]);

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
            {t('gallery.title', locale)}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('gallery.subtitle', locale)}
          </p>
        </div>
      </section>

      <section className="pb-6 px-4 sm:px-6 lg:px-8">
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
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={image.image_url}
                    alt={image.title[locale] || image.title.en}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-semibold text-lg">
                        {image.title[locale] || image.title.en}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {image.description[locale] || image.description.en}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{t('gallery.noImages', locale)}</p>
            </div>
          )}

          <div className="mt-16 pt-12 border-t border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gold-600 mb-2">{images.length}</div>
                <p className="text-gray-600">{t('gallery.eventsCaptured', locale)}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold-600 mb-2">
                  {images.length > 0 ? images.length : '0'}
                </div>
                <p className="text-gray-600">{t('gallery.momentsShared', locale)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gold-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('gallery.joinNext', locale)}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('gallery.joinDescription', locale)}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-700 transition-colors"
          >
            {t('gallery.getInTouch', locale)}
          </Link>
        </div>
      </section>
    </div>
  );
}
