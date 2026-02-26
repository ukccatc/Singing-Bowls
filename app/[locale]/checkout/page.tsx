import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

// Generate metadata for the checkout page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const locale = params.locale;
  
  return {
    title: t('checkout.orderSummary', locale),
    description: 'Complete your purchase of authentic Himalayan sound healing instruments',
    openGraph: {
      title: t('checkout.orderSummary', locale),
      description: 'Complete your purchase of authentic Himalayan sound healing instruments',
    },
  };
}

export default function CheckoutPage({ params }: { params: { locale: Locale } }) {
  return <CheckoutClient locale={params.locale} />;
}
