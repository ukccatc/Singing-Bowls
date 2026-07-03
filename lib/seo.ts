import { BRAND } from '@/components/brand/Logo';
import { getDefaultLocale } from '@/lib/translations';
import {
  getContactEmail,
  getContactCoordinates,
  getContactMapsUrl,
  getContactPhones,
  getInstagramUrl,
  getSiteUrl,
  getYoutubeUrl,
} from '@/lib/site';
import { Locale } from '@/lib/types';

const DEFAULT_OG_IMAGE =
  'https://images.pexels.com/photos/3997132/pexels-photo-3997132.jpeg';

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

export function getDefaultOgImage(): string {
  return DEFAULT_OG_IMAGE;
}

export function getGoogleSiteVerification(): string | undefined {
  return process.env.GOOGLE_SITE_VERIFICATION || undefined;
}

export function getGoogleAnalyticsId(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || undefined;
}

export function buildOrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  const { latitude, longitude } = getContactCoordinates();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Himalayan Sound',
    url: siteUrl,
    logo: `${siteUrl}${BRAND.icon512}`,
    description:
      'Authentic handcrafted Nepali singing bowls and sound meditation instruments.',
    email: getContactEmail(),
    telephone: getContactPhones(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'RC London, Instytutska St.',
      addressLocality: 'Odesa',
      addressRegion: 'Odesa Oblast',
      postalCode: '65000',
      addressCountry: 'UA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    },
    hasMap: getContactMapsUrl(),
    sameAs: [getInstagramUrl(), getYoutubeUrl()].filter(Boolean),
  };
}

export function buildWebsiteJsonLd(locale: Locale) {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Himalayan Sound',
    url: `${siteUrl}/${locale}`,
    description:
      'Discover authentic handcrafted Nepali singing bowls and sound meditation instruments.',
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'Himalayan Sound',
    },
  };
}

export function buildProductJsonLd(product: {
  name: Record<string, string>;
  description: Record<string, string>;
  slug: string;
  price: number;
  currency: string;
  images: Array<{ url: string; isPrimary?: boolean }>;
  isAvailable: boolean;
  sku?: string;
}) {
  const siteUrl = getSiteUrl();
  const image = product.images.find((img) => img.isPrimary) || product.images[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name.en,
    description: product.description.en,
    image: image?.url,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/${getDefaultLocale()}/product/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price,
      availability: product.isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    brand: {
      '@type': 'Brand',
      name: 'Himalayan Sound',
    },
  };
}
