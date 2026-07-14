import { Locale } from '@/lib/types';

export function formatGalleryDate(
  dateString: string | null,
  locale: Locale
): string {
  if (!dateString) return '';

  return new Date(`${dateString}T00:00:00`).toLocaleDateString(
    locale === 'uk' ? 'uk-UA' : locale === 'ru' ? 'ru-RU' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}
