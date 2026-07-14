'use client';

import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import Link from 'next/link';

interface GalleryViewNavProps {
  locale: Locale;
  active: 'photos' | 'albums';
}

export function GalleryViewNav({ locale, active }: GalleryViewNavProps) {
  const base = `/${locale}/gallery`;
  const tabClass = (isActive: boolean) =>
    `rounded-full px-5 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-gold-600 text-white'
        : 'bg-white text-charcoal-700 hover:bg-gold-50'
    }`;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Link href={base} className={tabClass(active === 'photos')}>
        {t('gallery.photos', locale)}
      </Link>
      <Link href={`${base}/albums`} className={tabClass(active === 'albums')}>
        {t('gallery.albums', locale)}
      </Link>
    </div>
  );
}
