'use client';

import { GalleryFilter } from '@/components/gallery/GalleryFilter';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { galleryImages } from '@/lib/data/gallery';
import { Locale } from '@/lib/types';
import { useState } from 'react';

type GalleryCategory = 'meditation' | 'workshop' | 'retreat' | 'ceremony' | 'all';

const translations = {
  en: {
    pastEvents: 'Past Sound Healing Events',
    title: 'Gallery',
    subtitle: 'Explore moments from our past sound healing meditation events and retreats',
    noImages: 'No images found',
    eventsCaptured: 'Events Captured',
    eventTypes: 'Event Types',
    locations: 'Locations',
    joinNext: 'Join Our Next Event',
    joinDescription: 'Experience the transformative power of sound healing with our community. Check back soon for upcoming events and retreats.',
    getInTouch: 'Get in Touch',
  },
  ru: {
    pastEvents: 'Прошлые события звукового исцеления',
    title: 'Галерея',
    subtitle: 'Исследуйте моменты из наших прошлых событий звукового исцеления и медитации',
    noImages: 'Изображения не найдены',
    eventsCaptured: 'Событий Запечатлено',
    eventTypes: 'Типы Событий',
    locations: 'Места',
    joinNext: 'Присоединитесь к Нашему Следующему Событию',
    joinDescription: 'Испытайте преобразующую силу звукового исцеления с нашим сообществом. Проверьте позже предстоящие события и ретриты.',
    getInTouch: 'Свяжитесь с Нами',
  },
  uk: {
    pastEvents: 'Минулі події звукового зцілення',
    title: 'Галерея',
    subtitle: 'Дослідіть моменти з наших минулих подій звукового зцілення та медитації',
    noImages: 'Зображення не знайдені',
    eventsCaptured: 'Подій Запечатлено',
    eventTypes: 'Типи Подій',
    locations: 'Місця',
    joinNext: 'Приєднайтеся до Нашої Наступної Подіїї',
    joinDescription: 'Відчуйте перетворюючу силу звукового зцілення з нашою спільнотою. Перевіряйте пізніше майбутні події та ретрити.',
    getInTouch: 'Зв\'яжіться з Нами',
  },
};

export default function GalleryPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all');
  const t = (key: keyof typeof translations.en) => translations[locale][key];

  // Filter images based on active category
  const filteredImages =
    activeFilter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-semibold">
              {t('pastEvents')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter */}
          <GalleryFilter
            onFilterChange={(category) => setActiveFilter(category)}
            locale={locale}
          />

          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <GalleryGrid images={filteredImages} locale={locale} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t('noImages')}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-16 pt-12 border-t border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gold-600 mb-2">
                  {galleryImages.length}
                </div>
                <p className="text-gray-600">
                  {t('eventsCaptured')}
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold-600 mb-2">
                  {new Set(galleryImages.map((img) => img.category)).size}
                </div>
                <p className="text-gray-600">
                  {t('eventTypes')}
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold-600 mb-2">
                  {new Set(galleryImages.map((img) => img.location[locale])).size}
                </div>
                <p className="text-gray-600">
                  {t('locations')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gold-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('joinNext')}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('joinDescription')}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-700 transition-colors"
          >
            {t('getInTouch')}
          </a>
        </div>
      </section>
    </div>
  );
}
