import { LegalDocumentView } from '@/components/legal/LegalDocumentView';
import { getTermsOfService } from '@/lib/legal';
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
    title: t('footer.termsOfService', locale),
    description: t('legal.termsDescription', locale),
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const document = getTermsOfService(locale);

  return <LegalDocumentView document={document} locale={locale} />;
}
