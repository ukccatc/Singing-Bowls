import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import { sampleProducts } from '@/lib/data/products';
import ProductDetail from '@/components/product/ProductDetail';
import ProductReviews from '@/components/product/ProductReviews';
import AudioPlayer from '@/components/product/AudioPlayer';
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
  Pause
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
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={product.images[0].url}
                alt={product.images[0].alt[params.locale]}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((image) => (
                  <div key={image.id} className="aspect-square rounded-lg overflow-hidden bg-white shadow-md">
                    <img
                      src={image.url}
                      alt={image.alt[params.locale]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
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
              {/* Original price removed - not in Product type */}
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
            {product.audioSample && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>{t('product.audioSample', params.locale)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AudioPlayer 
                    audioUrl={product.audioSample} 
                    title={product.name[params.locale]}
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
