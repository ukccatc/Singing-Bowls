'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  Award,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Weight,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import AudioPlayer from './AudioPlayer';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';
import { t, getLocaleFromPathname } from '@/lib/translations';

interface ProductDetailProps {
  product: Product;
  onAddToCart?: (productId: string, quantity: number) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const productName = product.name[locale] || product.name.en;
  const productDescription = product.description[locale] || product.description.en;
  const selectedImage = product.images[selectedImageIndex];

  const handleAddToCart = async () => {
    if (!product.isAvailable) return;
    
    setIsAddingToCart(true);
    onAddToCart?.(product.id, quantity);
    
    // Simulate loading
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: productDescription.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : locale === 'uk' ? 'uk-UA' : 'en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-cream-50 rounded-xl overflow-hidden group">
            {selectedImage && (
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt[locale] || selectedImage.alt.en}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Image Indicators */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-colors',
                      index === selectedImageIndex 
                        ? 'bg-gold-500' 
                        : 'bg-white/60 hover:bg-white/80'
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    'relative aspect-square rounded-lg overflow-hidden border-2 transition-colors',
                    index === selectedImageIndex 
                      ? 'border-gold-500' 
                      : 'border-cream-200 hover:border-gold-300'
                  )}
                >
                  <Image
                    src={image.url}
                    alt={image.alt[locale] || image.alt.en}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 25vw, 12vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          
          {/* Header */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              {product.isFeatured && (
                <Badge variant="secondary" className="bg-gold-500 text-white">
                  Featured
                </Badge>
              )}
              {product.isHandmade && (
                <Badge variant="outline" className="border-gold-500 text-gold-700">
                  <Award className="h-3 w-3 mr-1" />
                  Handmade
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-charcoal-900 mb-2">
              {productName}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-charcoal-600">
              <span>SKU: {product.sku}</span>
              {product.craftsman && (
                <span>{t('product.craftsman', locale)}: {product.craftsman}</span>
              )}
            </div>
          </div>

          {/* Price and Stock */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-charcoal-900">
              {formatPrice(product.price, product.currency)}
            </div>
            <div className="flex items-center space-x-4">
              {product.isAvailable ? (
                <span className="text-green-600 font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  {t('product.inStock', locale)}
                </span>
              ) : (
                <span className="text-red-600 font-medium flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  {t('product.outOfStock', locale)}
                </span>
              )}
              
              {product.inventory <= 10 && product.inventory > 0 && (
                <span className="text-orange-600 text-sm">
                  {t('product.limitedStock', locale, { count: product.inventory })}
                </span>
              )}
            </div>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-cream-50 rounded-lg">
            {product.specifications.slice(0, 3).map((spec) => (
              <div key={spec.name.en} className="text-center">
                <div className="text-xs text-charcoal-600 mb-1">
                  {spec.name[locale] || spec.name.en}
                </div>
                <div className="font-medium text-charcoal-900">
                  {spec.value[locale] || spec.value.en}
                </div>
              </div>
            ))}
          </div>

          {/* Audio Player */}
          {product.audioSample && (
            <AudioPlayer
              audioUrl={product.audioSample}
              title={productName}
              compact={false}
            />
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium text-charcoal-700">
                Quantity:
              </label>
              <div className="flex items-center border border-cream-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-cream-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.inventory}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-0 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                  className="p-2 hover:bg-cream-100 transition-colors"
                  disabled={quantity >= product.inventory}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.isAvailable || isAddingToCart}
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-white h-12"
              >
                {isAddingToCart ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <ShoppingCart className="h-5 w-5 mr-2" />
                )}
                {t('product.addToCart', locale)}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => onToggleWishlist?.(product.id)}
                className={cn(
                  'h-12 px-6 border-gold-500',
                  isInWishlist 
                    ? 'bg-gold-50 text-gold-700 border-gold-500' 
                    : 'text-gold-700 hover:bg-gold-50'
                )}
              >
                <Heart className={cn('h-5 w-5', isInWishlist && 'fill-current')} />
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShare}
                className="h-12 px-6 border-gold-500 text-gold-700 hover:bg-gold-50"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck className="h-4 w-4 text-gold-600" />
              </div>
              <div className="text-xs text-charcoal-600">Free Shipping</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-4 w-4 text-gold-600" />
              </div>
              <div className="text-xs text-charcoal-600">30-Day Returns</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="h-4 w-4 text-gold-600" />
              </div>
              <div className="text-xs text-charcoal-600">Authenticity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="description">{t('product.description', locale)}</TabsTrigger>
            <TabsTrigger value="specifications">{t('product.specifications', locale)}</TabsTrigger>
            <TabsTrigger value="shipping">{t('product.shipping', locale)}</TabsTrigger>
            <TabsTrigger value="reviews" className="hidden lg:flex">{t('product.reviews', locale)}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <div className="text-charcoal-700 leading-relaxed whitespace-pre-line">
                {productDescription}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {product.specifications.map((spec) => (
                  <div key={spec.name.en} className="flex justify-between items-center py-2 border-b border-cream-200">
                    <span className="font-medium text-charcoal-700">
                      {spec.name[locale] || spec.name.en}
                    </span>
                    <span className="text-charcoal-900">
                      {spec.value[locale] || spec.value.en}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="bg-cream-50 p-4 rounded-lg">
                  <h4 className="font-medium text-charcoal-900 mb-3">Materials</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material) => (
                      <Badge key={material} variant="outline" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="bg-cream-50 p-4 rounded-lg">
                  <h4 className="font-medium text-charcoal-900 mb-2">Origin</h4>
                  <p className="text-sm text-charcoal-700">{product.origin}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-charcoal-900">Shipping Information</h3>
                <ul className="space-y-2 text-sm text-charcoal-700">
                  <li>• Free worldwide shipping on orders over $200</li>
                  <li>• Standard shipping: 7-14 business days</li>
                  <li>• Express shipping: 3-5 business days</li>
                  <li>• All items are carefully packaged with sustainable materials</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-charcoal-900">Returns & Exchanges</h3>
                <ul className="space-y-2 text-sm text-charcoal-700">
                  <li>• 30-day return policy</li>
                  <li>• Items must be in original condition</li>
                  <li>• Free return shipping for defective items</li>
                  <li>• Exchanges available for size/color variations</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="text-center py-8 text-charcoal-600">
              <p>Reviews section coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;