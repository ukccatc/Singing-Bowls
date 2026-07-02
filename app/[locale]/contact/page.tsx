'use client';

import { ContactForm } from '@/components/contact/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { t } from '@/lib/translations';
import {
  getContactAddress,
  getContactEmail,
  getContactPhone,
} from '@/lib/site';
import { Locale } from '@/lib/types';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { use } from 'react';

export default function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const contactEmail = getContactEmail();
  const contactPhone = getContactPhone();
  const contactAddress = getContactAddress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-50 to-cream-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6">
              {t('contact.title', locale)}
            </h1>
            <p className="text-xl text-charcoal-700 leading-relaxed max-w-2xl mx-auto">
              {t('contact.subtitle', locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                      {t('contact.form.title', locale)}
                    </h2>
                    
                    <ContactForm locale={locale} />
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                    {t('contact.info.title', locale)}
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-gold-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-900 mb-1">
                          {t('contact.info.email.title', locale)}
                        </h3>
                        <p className="text-charcoal-700 mb-2">
                          {t('contact.info.email.description', locale)}
                        </p>
                        <a href={`mailto:${contactEmail}`} className="text-gold-600 hover:text-gold-700">
                          {contactEmail}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-gold-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-900 mb-1">
                          {t('contact.info.phone.title', locale)}
                        </h3>
                        <p className="text-charcoal-700 mb-2">
                          {t('contact.info.phone.description', locale)}
                        </p>
                        <a href={`tel:${contactPhone}`} className="text-gold-600 hover:text-gold-700">
                          {contactPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-gold-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-900 mb-1">
                          {t('contact.info.visit.title', locale)}
                        </h3>
                        <p className="text-charcoal-700 mb-2">
                          {t('contact.info.visit.description', locale)}
                        </p>
                        <p className="text-charcoal-700">
                          {contactAddress}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-gold-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-900 mb-1">
                          {t('contact.info.hours.title', locale)}
                        </h3>
                        <p className="text-charcoal-700 mb-2">
                          {t('contact.info.hours.description', locale)}
                        </p>
                        <p className="text-charcoal-700">
                          Monday - Friday: 9:00 AM - 6:00 PM NPT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
