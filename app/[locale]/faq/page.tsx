import { FaqView } from '@/components/legal/FaqView';
import { getFaq } from '@/lib/legal';
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
    title: t('footer.faq', locale),
    description: t('legal.faqDescription', locale),
    robots: { index: true, follow: true },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const document = getFaq(locale);

  return <FaqView document={document} locale={locale} />;
}
