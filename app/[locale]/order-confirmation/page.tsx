'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Locale } from '@/lib/types';
import { ArrowRight, CheckCircle, Mail, Package } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderConfirmationPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'N/A';
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Get email from localStorage or session
    const storedEmail = localStorage.getItem('checkout_email');
    if (storedEmail) {
      setEmail(storedEmail);
      localStorage.removeItem('checkout_email');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            
            {/* Success Message */}
            <Card className="border-0 shadow-lg mb-8">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-charcoal-900 mb-4">
                  Order Confirmed!
                </h1>
                
                <p className="text-lg text-charcoal-700 mb-6">
                  Thank you for your purchase. Your order has been received and is being processed.
                </p>

                <div className="bg-cream-50 rounded-lg p-6 mb-6">
                  <p className="text-sm text-charcoal-600 mb-2">Order Number</p>
                  <p className="text-2xl font-bold text-gold-600">{orderId}</p>
                </div>

                {email && (
                  <p className="text-charcoal-600">
                    A confirmation email has been sent to <strong>{email}</strong>
                  </p>
                )}
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="border-0 shadow-lg mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                  What happens next?
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal-900 mb-2">
                        1. Order Confirmation
                      </h3>
                      <p className="text-charcoal-700">
                        You'll receive an email confirmation with your order details and receipt.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-bronze-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="h-6 w-6 text-bronze-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal-900 mb-2">
                        2. Order Processing
                      </h3>
                      <p className="text-charcoal-700">
                        We'll carefully prepare your authentic Himalayan instruments for shipping.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-copper-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="h-6 w-6 text-copper-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal-900 mb-2">
                        3. Shipping Notification
                      </h3>
                      <p className="text-charcoal-700">
                        Once shipped, you'll receive tracking information to monitor your delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold-600 hover:bg-gold-700">
                <Link href={`/${locale}/shop`}>
                  Continue Shopping
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/${locale}`}>
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Support */}
            <Card className="border-0 shadow-md mt-8 bg-blue-50">
              <CardContent className="p-6 text-center">
                <p className="text-charcoal-700">
                  Need help with your order?{' '}
                  <Link href={`/${locale}/contact`} className="text-gold-600 hover:underline font-medium">
                    Contact our support team
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
