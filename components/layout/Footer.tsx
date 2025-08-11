'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import LanguageChanger from './LanguageChanger';

interface FooterProps {
  locale: Locale;
}

const Footer: React.FC<FooterProps> = ({ locale }) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(t('messages.subscribed', locale));
      setEmail('');
      setIsSubscribing(false);
    }, 1000);
  };

  const footerLinks = {
    quickLinks: [
      { href: `/${locale}/shop`, label: t('nav.shop', locale) },
      { href: `/${locale}/about`, label: t('nav.about', locale) },
      { href: `/${locale}/blog`, label: t('nav.blog', locale) },
      { href: `/${locale}/contact`, label: t('nav.contact', locale) },
    ],
    customerService: [
      { href: `/${locale}/shipping`, label: 'Shipping Info' },
      { href: `/${locale}/returns`, label: 'Returns' },
      { href: `/${locale}/faq`, label: 'FAQ' },
      { href: `/${locale}/contact`, label: t('nav.contact', locale) },
    ],
    legal: [
      { href: `/${locale}/privacy`, label: 'Privacy Policy' },
      { href: `/${locale}/terms`, label: 'Terms of Service' },
    ],
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/himalayansound',
      icon: Instagram,
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@himalayansound',
      icon: Youtube,
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center space-x-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white group-hover:text-gold-400 transition-colors">
                  Himalayan Sound
                </span>
              </div>
            </Link>
            
            <p className="text-charcoal-300 text-sm leading-relaxed mb-6">
              {t('footer.tagline', locale)}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-charcoal-300">
                <MapPin className="h-4 w-4 text-gold-400 flex-shrink-0" />
                <span>Kathmandu Valley, Nepal</span>
              </div>
              <div className="flex items-center space-x-3 text-charcoal-300">
                <Mail className="h-4 w-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:info@himalayansound.com" className="hover:text-gold-400 transition-colors">
                  info@himalayansound.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-charcoal-300">
                <Phone className="h-4 w-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+977-1-234-5678" className="hover:text-gold-400 transition-colors">
                  +977-1-234-5678
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold-400">
              {t('footer.quickLinks', locale)}
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-charcoal-300 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold-400">
              {t('footer.customerService', locale)}
            </h3>
            <ul className="space-y-3">
              {footerLinks.customerService.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-charcoal-300 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold-400">
              {t('footer.newsletter', locale)}
            </h3>
            <p className="text-charcoal-300 text-sm mb-4">
              {t('footer.newsletterDescription', locale)}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder={t('footer.newsletterPlaceholder', locale)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-charcoal-700 border-charcoal-600 text-white placeholder-charcoal-400 focus:border-gold-400 flex-1"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-gold-500 hover:bg-gold-600 text-white px-4"
                >
                  {isSubscribing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>

            <div>
              <h4 className="font-medium mb-3 text-gold-400">
                {t('footer.followUs', locale)}
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-charcoal-700 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors group"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5 text-charcoal-300 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Language Changer */}
            <div className="mt-6">
              <LanguageChanger variant="inline" />
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-charcoal-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-1 text-charcoal-300 text-sm">
            <span>{t('footer.copyright', locale)}</span>
            <Heart className="h-4 w-4 text-red-400 mx-1" />
            <span>{t('footer.madeWithLove', locale)}</span>
          </div>
          
          <div className="flex items-center space-x-6">
            {footerLinks.legal.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && <span className="text-charcoal-600">•</span>}
                <Link
                  href={link.href}
                  className="text-charcoal-300 hover:text-gold-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;