import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

// Generate metadata for the contact page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const locale = params.locale;
  
  return {
    title: t('contact.title', locale),
    description: t('contact.subtitle', locale),
    openGraph: {
      title: t('contact.title', locale),
      description: t('contact.subtitle', locale),
    },
  };
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;

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
                    
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">{t('form.firstName', locale)}</Label>
                          <Input id="firstName" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">{t('form.lastName', locale)}</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">{t('form.email', locale)}</Label>
                        <Input id="email" type="email" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="subject">{t('form.subject', locale)}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t('contact.form.subject.general', locale)} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">{t('contact.form.subject.general', locale)}</SelectItem>
                            <SelectItem value="product">{t('contact.form.subject.product', locale)}</SelectItem>
                            <SelectItem value="order">{t('contact.form.subject.order', locale)}</SelectItem>
                            <SelectItem value="shipping">{t('contact.form.subject.shipping', locale)}</SelectItem>
                            <SelectItem value="wholesale">{t('contact.form.subject.wholesale', locale)}</SelectItem>
                            <SelectItem value="custom">{t('contact.form.subject.custom', locale)}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="message">{t('contact.form.message', locale)}</Label>
                        <Textarea 
                          id="message" 
                          placeholder={t('contact.form.message.placeholder', locale)}
                          rows={6}
                          required 
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-gold-600 hover:bg-gold-700">
                        {t('contact.form.send', locale)}
                      </Button>
                    </form>
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
                        <a href="mailto:info@himalayansound.com" className="text-gold-600 hover:text-gold-700">
                          info@himalayansound.com
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
                        <a href="tel:+977-1-234-5678" className="text-gold-600 hover:text-gold-700">
                          +977-1-234-5678
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
                          Kathmandu Valley, Nepal
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
