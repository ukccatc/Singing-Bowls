import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: t('contact.title', locale),
    description: t('contact.subtitle', locale),
    openGraph: {
      title: t('contact.title', locale),
    },
  };
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
