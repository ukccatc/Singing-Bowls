import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import { sampleProducts } from '@/lib/data/products';
import ProductDetail from '@/components/product/ProductDetail';
import ProductReviews from '@/components/product/ProductReviews';
import AudioPlayer from '@/components/product/AudioPlayer';
import { MediaEmbed } from '@/components/media/MediaEmbed';
import { MediaFile } from '@/lib/media-manager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Truck, 
  Shield, 
  Star, 
  Heart,
  ShoppingCart,
  Play,
  Pause,
  Volume2,
  Video,
  Image
} from 'lucide-react';

interface ProductPageProps {
  params: {
    slug: string;
    locale: Locale;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = sampleProducts.find(p => p.slug === params.slug);
  
  if (!product) {
    return {
      title: t('product.notFound', params.locale),
    };
  }

  return {
    title: `${product.name[params.locale]} | ${t('site.name', params.locale)}`,
    description: product.description[params.locale].substring(0, 160),
    openGraph: {
      title: product.name[params.locale],
      description: product.description[params.locale].substring(0, 160),
      images: product.images.map(img => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt[params.locale],
      })),
    },
  };
}

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  
  ['en', 'ru', 'uk'].forEach((locale) => {
    sampleProducts.forEach((product) => {
      params.push({
        locale: locale as Locale,
        slug: product.slug,
      });
    });
  });
  
  return params;
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = sampleProducts.find(p => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat(params.locale === 'en' ? 'en-US' : params.locale === 'ru' ? 'ru-RU' : 'uk-UA', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  // Convert product images to MediaFile format
  const imageMedia: MediaFile[] = product.images.map((img, index) => ({
    id: `image-${product.id}-${index}`,
    type: 'image',
    title: `${product.name[params.locale]} - Image ${index + 1}`,
    description: img.alt[params.locale] || img.alt.en,
    url: img.url,
    platform: 'cdn',
    thumbnail: img.url,
    size: 0,
    metadata: {
      width: img.width,
      height: img.height,
      format: 'jpg',
      tags: ['singing bowl', 'himalayan', 'meditation'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  // Convert product audio sample to MediaFile format
  const audioMedia: MediaFile | null = product.audioSample ? {
    id: `audio-${product.id}`,
    type: 'audio',
    title: `${product.name[params.locale]} - Audio Sample`,
    description: product.description[params.locale] || product.description.en,
    url: product.audioSample,
    platform: 'soundcloud',
    thumbnail: product.images[0]?.url,
    duration: 180, // Default duration
    size: 0,
    metadata: {
      tags: ['singing bowl', 'meditation', 'sound healing'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  } : null;

  // Mock video media (if product had video)
  const videoMedia: MediaFile | null = null; // Could be added to product data

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href={`/${params.locale}`} className="hover:text-amber-600">
                {t('nav.home', params.locale)}
              </a>
            </li>
            <li>/</li>
            <li>
              <a href={`/${params.locale}/shop`} className="hover:text-amber-600">
                {t('nav.shop', params.locale)}
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              {product.name[params.locale]}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Media Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              {imageMedia[0] && (
                <MediaEmbed
                  media={imageMedia[0]}
                  width={600}
                  height={600}
                  className="w-full h-full"
                />
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {imageMedia.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {imageMedia.slice(1).map((image) => (
                  <div key={image.id} className="aspect-square rounded-lg overflow-hidden bg-white shadow-md">
                    <MediaEmbed
                      media={image}
                      width={150}
                      height={150}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Video Section (if available) */}
            {videoMedia && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Video className="w-5 h-5 mr-2 text-amber-600" />
                  {t('product.video', params.locale)}
                </h3>
                <MediaEmbed
                  media={videoMedia}
                  width={600}
                  height={338}
                  controls={true}
                />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <Badge variant="secondary" className="text-sm">
              {t(`product.categories.${product.category}`, params.locale)}
            </Badge>

            {/* Product Title */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {product.name[params.locale]}
            </h1>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-amber-600">
                {formatPrice(product.price, product.currency)}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                (0 {t('product.reviews', params.locale)})
              </span>
            </div>

            {/* Audio Sample */}
            {audioMedia && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Volume2 className="w-5 h-5" />
                    <span>{t('product.audioSample', params.locale)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MediaEmbed
                    media={audioMedia}
                    width={400}
                    height={200}
                    controls={true}
                  />
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex space-x-4">
              <Button size="lg" className="flex-1 bg-amber-600 hover:bg-amber-700">
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t('product.addToCart', params.locale)}
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 text-sm">
                <Package className="w-5 h-5 text-amber-600" />
                <span>{t('product.freeShipping', params.locale)}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="w-5 h-5 text-amber-600" />
                <span>{t('product.fastDelivery', params.locale)}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="w-5 h-5 text-amber-600" />
                <span>{t('product.warranty', params.locale)}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Description */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('product.description', params.locale)}
              </h2>
              <div className="prose prose-lg max-w-none">
                {product.description[params.locale].split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('product.specifications', params.locale)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">
                        {spec.name[params.locale]}
                      </span>
                      <span className="text-gray-900">
                        {spec.value[params.locale]}
                        {spec.unit && ` ${spec.unit}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media Gallery */}
            {imageMedia.length > 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Image className="w-6 h-6 mr-2 text-amber-600" />
                  {t('product.gallery', params.locale)}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imageMedia.map((image) => (
                    <div key={image.id} className="aspect-square rounded-lg overflow-hidden bg-white shadow-md">
                      <MediaEmbed
                        media={image}
                        width={300}
                        height={300}
                        className="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <ProductReviews productId={product.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('product.quickInfo', params.locale)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('product.sku', params.locale)}</span>
                  <span className="font-medium">{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('product.category', params.locale)}</span>
                  <span className="font-medium">
                    {t(`product.categories.${product.category}`, params.locale)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('product.availability', params.locale)}</span>
                  <span className="font-medium text-green-600">
                    {t('product.inStock', params.locale)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Related Products */}
            <Card>
              <CardHeader>
                <CardTitle>{t('product.relatedProducts', params.locale)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleProducts
                    .filter(p => p.category === product.category && p.id !== product.id)
                    .slice(0, 3)
                    .map((relatedProduct) => (
                      <div key={relatedProduct.id} className="flex space-x-3">
                        <img
                          src={relatedProduct.images[0].url}
                          alt={relatedProduct.images[0].alt[params.locale]}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">
                            {relatedProduct.name[params.locale]}
                          </h4>
                          <p className="text-sm text-amber-600 font-bold">
                            {formatPrice(relatedProduct.price, relatedProduct.currency)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
