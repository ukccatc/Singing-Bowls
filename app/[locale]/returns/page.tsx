import { LegalDocumentView } from '@/components/legal/LegalDocumentView';
import { getReturnPolicy } from '@/lib/legal';
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
    title: t('footer.returns', locale),
    description: t('legal.returnsDescription', locale),
    robots: { index: true, follow: true },
  };
}

export default async function ReturnsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const document = getReturnPolicy(locale);

  return <LegalDocumentView document={document} locale={locale} />;
}
