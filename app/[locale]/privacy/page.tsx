import { LegalDocumentView } from '@/components/legal/LegalDocumentView';
import { getPrivacyPolicy } from '@/lib/legal';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: t('footer.privacyPolicy', locale),
    description: t('legal.privacyDescription', locale),
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const document = getPrivacyPolicy(locale);

  return <LegalDocumentView document={document} locale={locale} />;
}
