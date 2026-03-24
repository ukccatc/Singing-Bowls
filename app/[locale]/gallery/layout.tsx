import { Locale } from '@/lib/types';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const locale = params.locale;

  const titles: Record<Locale, string> = {
    en: 'Gallery - Past Sound Healing Events',
    ru: 'Галерея - Прошлые события звукового исцеления',
    uk: 'Галерея - Минулі події звукового зцілення',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Explore moments from our past sound healing meditation events, workshops, retreats, and ceremonies.',
    ru: 'Исследуйте моменты из наших прошлых событий звукового исцеления, мастер-классов, ретритов и церемоний.',
    uk: 'Дослідіть моменти з наших минулих подій звукового зцілення, майстер-класів, ретритів та церемоній.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
  };
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
