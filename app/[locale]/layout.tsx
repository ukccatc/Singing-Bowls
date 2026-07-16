import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { LocaleHtmlLang } from '@/components/layout/LocaleHtmlLang';
import { NativeShellLoader } from '@/components/native/NativeShellLoader';
import { CookieConsentBanner } from '@/components/seo/CookieConsentBanner';
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/lib/context/CartContext';
import { WishlistProvider } from '@/lib/context/WishlistContext';
import { getDefaultOgImage, getGoogleSiteVerification, getMetadataBase } from '@/lib/seo';
import { getAvailableLocales, getDefaultLocale } from '@/lib/translations';
import { Locale } from '@/lib/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Generate metadata for each locale
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!getAvailableLocales().includes(locale)) {
    notFound();
  }

  const googleVerification = getGoogleSiteVerification();
  const ogImage = getDefaultOgImage();

  return {
    title: {
      default: 'Himalayan Sound - Authentic Nepali Singing Bowls',
      template: '%s | Himalayan Sound'
    },
    description: locale === 'en' 
      ? 'Discover authentic handcrafted Nepali singing bowls and sound meditation instruments.'
      : locale === 'ru'
      ? 'Откройте для себя аутентичные рукотворные непальские поющие чаши и медитативные инструменты.'
      : 'Відкрийте для себе автентичні рукотворні непальські співаючі чаші та медитативні інструменти.',
    keywords: locale === 'en'
      ? 'singing bowls, sound healing, meditation, nepal, himalayan, authentic'
      : locale === 'ru'
      ? 'поющие чаши, звуковое исцеление, медитация, непал, гималаи, аутентичные'
      : 'співаючі чаші, звукове зцілення, медитація, непал, гімалаї, автентичні',
    authors: [{ name: 'Himalayan Sound' }],
    creator: 'Himalayan Sound',
    publisher: 'Himalayan Sound',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: getMetadataBase(),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'x-default': `/${getDefaultLocale()}`,
        en: '/en',
        ru: '/ru',
        uk: '/uk',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      alternateLocale: getAvailableLocales().filter(l => l !== locale),
      siteName: 'Himalayan Sound',
      title: 'Himalayan Sound - Authentic Nepali Singing Bowls',
      description: locale === 'en' 
        ? 'Discover authentic handcrafted Nepali singing bowls and sound meditation instruments.'
        : locale === 'ru'
        ? 'Откройте для себя аутентичные рукотворные непальские поющие чаши и медитативные инструменты.'
        : 'Відкрийте для себе автентичні рукотворні непальські співаючі чаші та медитативні інструменти.',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Himalayan Sound - Authentic Nepali Singing Bowls',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Himalayan Sound - Authentic Nepali Singing Bowls',
      description: locale === 'en' 
        ? 'Discover authentic handcrafted Nepali singing bowls and sound meditation instruments.'
        : locale === 'ru'
        ? 'Откройте для себя аутентичные рукотворные непальские поющие чаши и медитативные инструменты.'
        : 'Відкрийте для себе автентичні рукотворні непальські співаючі чаші та медитативні інструменти.',
      images: [ogImage],
    },
    ...(googleVerification
      ? {
          verification: {
            google: googleVerification,
          },
        }
      : {}),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Generate static params for all locales
export async function generateStaticParams() {
  return getAvailableLocales().map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!getAvailableLocales().includes(locale)) {
    notFound();
  }

  return (
    <>
      <LocaleHtmlLang locale={locale} />
      <GoogleAnalytics />
      <CartProvider>
        <WishlistProvider>
          <NativeShellLoader locale={locale} />
          <div className="flex min-h-screen flex-col bg-gradient-to-br from-cream-50 to-cream-100">
            <Header locale={locale} />
            <main className="site-main flex-1 pt-16 lg:pt-20">{children}</main>
            <Footer locale={locale} />
          </div>
          <Toaster position="top-right" />
          <CookieConsentBanner locale={locale} />
        </WishlistProvider>
      </CartProvider>
    </>
  );
}
