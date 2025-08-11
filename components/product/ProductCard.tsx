'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Heart, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  locale: Locale;
  className?: string;
  showAudio?: boolean;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  locale,
  className,
  showAudio = true,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const productName = product.name[locale] || product.name.en;
  const productSlug = product.slug;

  const handleAudioToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.audioSample) return;

    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
    } else {
      if (audio) {
        audio.play();
      } else {
        const newAudio = new Audio(product.audioSample);
        newAudio.addEventListener('ended', () => setIsPlaying(false));
        newAudio.addEventListener('error', () => setIsPlaying(false));
        newAudio.play();
        setAudio(newAudio);
      }
      setIsPlaying(true);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.(product.id);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : locale === 'uk' ? 'uk-UA' : 'en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <Link href={`/${locale}/product/${productSlug}`}>
      <div className={cn(
        'group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden card-hover',
        'border border-cream-200 hover:border-gold-300',
        className
      )}>
        
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-cream-50">
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt[locale] || primaryImage.alt.en}
              fill
              className={cn(
                'object-cover transition-all duration-300 group-hover:scale-105',
                imageLoading ? 'blur-sm' : 'blur-0'
              )}
              onLoad={() => setImageLoading(false)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          
          {/* Loading placeholder */}
          {imageLoading && (
            <div className="absolute inset-0 bg-cream-100 animate-pulse" />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.isFeatured && (
              <Badge variant="secondary" className="bg-gold-500 text-white text-xs">
                Featured
              </Badge>
            )}
            {product.isHandmade && (
              <Badge variant="outline" className="bg-white/90 text-charcoal-700 text-xs">
                Handmade
              </Badge>
            )}
            {product.inventory < 5 && product.inventory > 0 && (
              <Badge variant="destructive" className="text-xs">
                {t('product.limitedStock', locale, { count: product.inventory })}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {onToggleWishlist && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleWishlist}
                className={cn(
                  'w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-sm',
                  isInWishlist ? 'text-red-500' : 'text-charcoal-600'
                )}
                aria-label="Toggle wishlist"
              >
                <Heart className={cn('h-4 w-4', isInWishlist && 'fill-current')} />
              </Button>
            )}
            
            {showAudio && product.audioSample && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAudioToggle}
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-sm text-charcoal-600"
                aria-label={isPlaying ? t('product.pauseAudio', locale) : t('product.playAudio', locale)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </Button>
            )}
          </div>

          {/* Out of Stock Overlay */}
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <Badge variant="secondary" className="bg-charcoal-700 text-white">
                {t('product.outOfStock', locale)}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          
          {/* Product Name */}
          <h3 className="font-semibold text-charcoal-900 line-clamp-2 group-hover:text-gold-700 transition-colors">
            {productName}
          </h3>

          {/* Specifications Summary */}
          <div className="flex items-center space-x-4 text-xs text-charcoal-600">
            {product.specifications.find(spec => spec.name.en.toLowerCase().includes('diameter')) && (
              <span>
                ⌀ {product.specifications.find(spec => spec.name.en.toLowerCase().includes('diameter'))?.value[locale] || 
                   product.specifications.find(spec => spec.name.en.toLowerCase().includes('diameter'))?.value.en}
              </span>
            )}
            {product.materials.length > 0 && (
              <span className="truncate">
                {product.materials.slice(0, 2).join(', ')}
                {product.materials.length > 2 && '+'}
              </span>
            )}
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-charcoal-900">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.inventory <= 10 && product.inventory > 0 && (
                <span className="text-xs text-orange-600">
                  {t('product.limitedStock', locale, { count: product.inventory })}
                </span>
              )}
            </div>

            {product.isAvailable && onAddToCart && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddToCart}
                className="border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white transition-colors"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">
                  {t('product.addToCart', locale)}
                </span>
              </Button>
            )}
          </div>

          {/* Origin and Craftsman */}
          {product.craftsman && (
            <div className="text-xs text-charcoal-500 pt-1 border-t border-cream-200">
              <span>
                {t('product.craftsman', locale)}: {product.craftsman}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;