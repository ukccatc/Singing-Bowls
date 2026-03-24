'use client';

import { Locale } from '@/lib/types';
import { useState } from 'react';

type GalleryCategory = 'meditation' | 'workshop' | 'retreat' | 'ceremony' | 'all';

interface GalleryFilterProps {
  onFilterChange: (category: GalleryCategory) => void;
  locale: Locale;
}

const categoryLabels: Record<GalleryCategory, Record<Locale, string>> = {
  all: {
    en: 'All Events',
    ru: 'Все события',
    uk: 'Всі події',
  },
  meditation: {
    en: 'Meditation',
    ru: 'Медитация',
    uk: 'Медитація',
  },
  workshop: {
    en: 'Workshops',
    ru: 'Мастер-классы',
    uk: 'Майстер-класи',
  },
  retreat: {
    en: 'Retreats',
    ru: 'Ретриты',
    uk: 'Ретрити',
  },
  ceremony: {
    en: 'Ceremonies',
    ru: 'Церемонии',
    uk: 'Церемонії',
  },
};

export function GalleryFilter({ onFilterChange, locale }: GalleryFilterProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all');

  const handleFilterClick = (category: GalleryCategory) => {
    setActiveFilter(category);
    onFilterChange(category);
  };

  const categories: GalleryCategory[] = ['all', 'meditation', 'workshop', 'retreat', 'ceremony'];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilterClick(category)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            activeFilter === category
              ? 'bg-gold-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-gold-500 hover:text-gold-500'
          }`}
        >
          {categoryLabels[category][locale]}
        </button>
      ))}
    </div>
  );
}
