import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

// Generate metadata for the checkout page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: t('checkout.orderSummary', locale),
    description: 'Complete your purchase of authentic Himalayan sound healing instruments',
    openGraph: {
      title: t('checkout.orderSummary', locale),
      description: 'Complete your purchase of authentic Himalayan sound healing instruments',
    },
  };
}

export default async function CheckoutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <CheckoutClient locale={locale} />;
}
