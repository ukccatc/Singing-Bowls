import { LegalDocumentView } from '@/components/legal/LegalDocumentView';
import { getShippingPolicy } from '@/lib/legal';
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
    title: t('footer.shippingInfo', locale),
    description: t('legal.shippingDescription', locale),
    robots: { index: true, follow: true },
  };
}

export default async function ShippingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const document = getShippingPolicy(locale);

  return <LegalDocumentView document={document} locale={locale} />;
}
