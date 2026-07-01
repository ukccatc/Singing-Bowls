import { Locale } from '@/lib/types';
import { Metadata } from 'next';
import { Suspense } from 'react';
import OrderConfirmationContent from './OrderConfirmationContent';

export const metadata: Metadata = {
  title: 'Order Confirmation',
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage({ params }: { params: Promise<{ locale: Locale }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center">
          <p className="text-charcoal-600">Loading order details...</p>
        </div>
      }
    >
      <OrderConfirmationContent params={params} />
    </Suspense>
  );
}
