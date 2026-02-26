'use client';

import { MediaEmbed } from '@/components/media/MediaEmbed';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MediaFile } from '@/lib/media-manager';
import { Product } from '@/lib/types';
import { Heart, ShoppingCart, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
    <Card className="card-metal hover-glow-gold group overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/${locale}/product/${product.slug}`}>
          <div className="aspect-square relative overflow-hidden">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt[locale as keyof typeof primaryImage.alt] || primaryImage.alt.en}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full bg-cream-100 flex items-center justify-center">
                <span className="text-cream-400">No image</span>
              </div>
            )}
            
            {/* Quick Actions Overlay */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleWishlist}
                className="bg-white/90 hover:bg-white text-charcoal-700"
              >
                <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
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
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Link href={`/${locale}/product/${product.slug}`}>
              <h3 className="font-semibold text-charcoal-900 hover:text-gold-600 transition-colors line-clamp-2">
                {productName}
              </h3>
            </Link>
            <p className="text-sm text-charcoal-600 mt-1 line-clamp-2">
              {productDescription}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gradient-gold">
              ${product.price}
            </span>
            <Badge className="badge-gold text-xs">
              {product.category}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className={product.inventory > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.inventory > 0 ? `In Stock (${product.inventory})` : 'Out of Stock'}
            </span>
            {product.craftsman && (
              <span className="text-charcoal-600">
                by {product.craftsman}
              </span>
            )}
          </div>

          {/* Audio Sample */}
          {showAudio && audioMedia && (
            <div className="bg-cream-50 rounded-lg p-2">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-gold-600" />
                <span className="text-xs text-charcoal-600">
                  Audio Sample
                </span>
              </div>
              {/* Mini audio player could be added here */}
            </div>
          )}

          <Button
            onClick={handleAddToCart}
            disabled={product.inventory === 0}
            className="btn-primary w-full"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}