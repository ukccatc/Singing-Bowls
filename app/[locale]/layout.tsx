import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/lib/context/CartContext';
import { getAvailableLocales } from '@/lib/translations';
import { Locale } from '@/lib/types';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Generate metadata for each locale
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const locale = params.locale;
  
  if (!getAvailableLocales().includes(locale)) {
    notFound();
  }

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
    metadataBase: new URL('https://himalayansound.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'ru': '/ru', 
        'uk': '/uk',
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
          url: '/og-image.jpg',
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
      images: ['/og-image.jpg'],
    },
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

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = params.locale;
  
  // Validate locale
  if (!getAvailableLocales().includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4b27a" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 font-sans antialiased">
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header locale={locale} />
            <main className="flex-1 pt-16 lg:pt-20">
              {children}
            </main>
            <Footer locale={locale} />
          </div>
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
