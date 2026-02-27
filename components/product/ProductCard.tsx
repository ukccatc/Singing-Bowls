'use client';

import { MediaEmbed } from '@/components/media/MediaEmbed';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCart } from '@/lib/hooks/useCart';
import { MediaFile } from '@/lib/media-manager';
import { Product } from '@/lib/types';
import { Heart, ShoppingCart, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  locale: string;
  showAudio?: boolean;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, locale, showAudio = false, viewMode = 'grid' }: ProductCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addItem } = useCart();

  const productName = product.name[locale as keyof typeof product.name] || product.name.en;
  const productDescription = product.description[locale as keyof typeof product.description] || product.description.en;
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  // Convert product audio sample to MediaFile format
  const audioMedia: MediaFile | null = product.audioSample ? {
    id: `audio-${product.id}`,
    type: 'audio',
    title: productName,
    description: product.description[locale as keyof typeof product.description] || product.description.en,
    url: product.audioSample,
    platform: 'soundcloud', // Assuming SoundCloud for audio samples
    thumbnail: primaryImage?.url,
    duration: 180, // Default duration, could be stored in product data
    size: 0,
    metadata: {
      tags: ['singing bowl', 'meditation', 'sound healing'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  } : null;

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success(`${productName} added to cart!`);
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // TODO: Implement wishlist functionality
    console.log('Toggle wishlist:', product.id);
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement audio playback
    console.log('Play audio:', product.id);
  };

  if (viewMode === 'list') {
    return (
      <Card className="card-metal hover-glow-gold overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-48 lg:w-64 flex-shrink-0">
            <Link href={`/${locale}/product/${product.slug}`}>
              <div className="aspect-square relative overflow-hidden">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt[locale as keyof typeof primaryImage.alt] || primaryImage.alt.en}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-cream-100 flex items-center justify-center">
                    <span className="text-cream-400">No image</span>
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Product Info */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <Link href={`/${locale}/product/${product.slug}`}>
                      <h3 className="text-xl font-semibold text-charcoal-900 hover:text-gold-600 transition-colors">
                        {productName}
                      </h3>
                    </Link>
                    <p className="text-charcoal-600 mt-1 line-clamp-2">
                      {productDescription}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleWishlist}
                    className="text-charcoal-400 hover:text-red-500"
                  >
                    <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge className="badge-gold text-xs">
                    {product.category}
                  </Badge>
                  {product.isFeatured && (
                    <Badge className="badge-bronze text-xs">
                      Featured
                    </Badge>
                  )}
                  {product.isHandmade && (
                    <Badge className="badge-copper text-xs">
                      Handmade
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-bold text-gradient-gold">
                    ${product.price}
                  </span>
                  {product.inventory > 0 ? (
                    <Badge className="bg-green-100 text-green-800 border border-green-200 text-xs">
                      In Stock ({product.inventory})
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 border border-red-200 text-xs">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Audio Sample */}
                {showAudio && audioMedia && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Volume2 className="h-4 w-4 text-gold-600" />
                      <span className="text-sm font-medium text-charcoal-700">
                        Audio Sample
                      </span>
                    </div>
                    <div className="w-full max-w-md">
                      <MediaEmbed
                        media={audioMedia}
                        width={400}
                        height={80}
                        controls={true}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-cream-200">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.inventory === 0}
                  className="btn-primary flex-1"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Link href={`/${locale}/product/${product.slug}`}>
                  <Button variant="outline" className="btn-outline">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view (original)
  return (
    <Card className="card-modern group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-gold-300">
      <CardHeader className="p-0 relative">
        <Link href={`/${locale}/product/${product.slug}`}>
          <div className="aspect-square relative overflow-hidden bg-cream-50">
            {primaryImage ? (
              <>
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt[locale as keyof typeof primaryImage.alt] || primaryImage.alt.en}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </>
            ) : (
              <div className="w-full h-full bg-cream-100 flex items-center justify-center">
                <span className="text-cream-400">No image</span>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {product.isFeatured && (
                <Badge className="badge-gold shadow-md animate-fade-in">
                  ⭐ Featured
                </Badge>
              )}
              {product.isHandmade && (
                <Badge className="badge-bronze shadow-md animate-fade-in animation-delay-100">
                  ✋ Handmade
                </Badge>
              )}
            </div>
            
            {/* Wishlist button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleToggleWishlist();
              }}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white text-charcoal-600 hover:text-red-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-md"
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            
            {/* Quick add to cart button */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                disabled={product.inventory === 0}
                className="w-full btn-primary shadow-lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-5">
        <div className="space-y-4">
          <div>
            <Link href={`/${locale}/product/${product.slug}`}>
              <h3 className="font-semibold text-lg text-charcoal-900 hover:text-gold-600 transition-colors line-clamp-2 mb-2">
                {productName}
              </h3>
            </Link>
            <p className="text-sm text-charcoal-600 line-clamp-2 leading-relaxed">
              {productDescription}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-cream-200">
            <div>
              <span className="text-2xl font-bold text-gradient-gold">
                ${product.price}
              </span>
              <span className="text-sm text-charcoal-500 ml-1">USD</span>
            </div>
            <Badge className="badge-gold text-xs">
              {product.category}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            {product.inventory > 0 ? (
              <span className="flex items-center text-green-600 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                In Stock ({product.inventory})
              </span>
            ) : (
              <span className="flex items-center text-red-600 font-medium">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Out of Stock
              </span>
            )}
            {product.craftsman && (
              <span className="text-charcoal-600 text-xs">
                by {product.craftsman}
              </span>
            )}
          </div>

          {/* Audio Sample */}
          {showAudio && audioMedia && (
            <div className="bg-gradient-to-r from-gold-50 to-bronze-50 rounded-lg p-3 border border-gold-100">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-gold-600" />
                <span className="text-xs font-medium text-gold-800">
                  🎵 Audio Sample Available
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}