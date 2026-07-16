'use client';

import ProductCard from '@/components/product/ProductCard';
import { ProductReviews } from '@/components/product/ProductReviews';
import { SoundSamplePanel } from '@/components/product/SoundSamplePanel';
import { StarRating } from '@/components/product/StarRating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/hooks/useCart';
import { ReviewSummary } from '@/lib/reviews';
import { buildAbsoluteSiteUrl } from '@/lib/site';
import { t } from '@/lib/translations';
import { Locale, Product } from '@/lib/types';
import {
    ArrowLeft,
    Heart,
    Minus,
    Plus,
    RotateCcw,
    Share2,
    Shield,
    ShoppingCart,
    Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ProductDetailClientProps {
  product: Product;
  locale: Locale;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  locale,
  relatedProducts,
}: ProductDetailClientProps) {
  const initialImageIndex = (() => {
    const primaryIndex = product.images.findIndex((img) => img.isPrimary);
    return primaryIndex >= 0 ? primaryIndex : 0;
  })();
  const [selectedImage, setSelectedImage] = useState(initialImageIndex);
  const [quantity, setQuantity] = useState(1);
  const [reviewSummary, setReviewSummary] = useState<ReviewSummary | null>(null);
  const { addItem, getItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const productName = product.name[locale] || product.name.en;
  const productDescription = product.description[locale] || product.description.en;
  const cartItem = getItem(product.id);
  const hasSound =
    Boolean(product.audioSample) ||
    Boolean(product.videoSample) ||
    Boolean(product.soundcloudAudio?.streamUrl) ||
    Boolean(product.youtubeVideo?.videoId);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await fetch(`/api/products/${product.id}/reviews`);
        if (!response.ok) return;
        const json = await response.json();
        setReviewSummary(json.data?.summary || null);
      } catch {
        // ignore
      }
    };
    void loadSummary();
  }, [product.id]);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} × ${productName} added to cart!`);
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product.id);
    toast.success(
      added ? t('messages.addedToWishlist', locale) : t('product.removeFromWishlist', locale)
    );
  };

  const handleShare = async () => {
    const shareUrl = buildAbsoluteSiteUrl(locale, `/product/${product.slug}`);

    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: productDescription,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-cream-100">
      {/* Breadcrumb */}
      <section className="bg-gradient-to-r from-white to-cream-50 border-b border-cream-200 py-4 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-charcoal-600">
              <Link href={`/${locale}`} className="hover:text-gold-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href={`/${locale}/shop`} className="hover:text-gold-600 transition-colors">
                Shop
              </Link>
              <span>/</span>
              <span className="text-charcoal-900">{productName}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Link 
              href={`/${locale}/shop`}
              className="inline-flex items-center space-x-2 text-gold-600 hover:text-gold-700 mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Shop</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4 animate-fade-in-left">
                {/* Main Image */}
                <div className="aspect-square relative overflow-hidden rounded-2xl bg-white shadow-2xl group">
                  {product.images[selectedImage] ? (
                    <>
                      <Image
                        src={product.images[selectedImage].url}
                        alt={product.images[selectedImage].alt[locale] || productName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-cream-100">
                      <span className="text-cream-400">No image</span>
                    </div>
                  )}
                  
                  {/* Image counter */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-charcoal-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {selectedImage + 1} / {product.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                          selectedImage === index
                            ? 'border-gold-600 ring-4 ring-gold-200 scale-105 shadow-lg'
                            : 'border-cream-200 hover:border-gold-400 hover:scale-105 shadow-md'
                        }`}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt[locale] || productName}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6 animate-fade-in-right">
                {/* Title and Badges */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-4xl lg:text-5xl font-bold text-gradient-gold mb-4 font-serif">
                        {productName}
                      </h1>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="badge-gold shadow-sm">
                          {product.category}
                        </Badge>
                        {product.isFeatured && (
                          <Badge className="badge-bronze shadow-sm">
                            ⭐ Featured
                          </Badge>
                        )}
                        {product.isHandmade && (
                          <Badge className="badge-copper shadow-sm">
                            ✋ Handmade
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleToggleWishlist}
                        className={`transition-all duration-300 hover:scale-110 ${inWishlist ? 'text-copper-700 border-copper-600 bg-copper-50' : 'hover:bg-gold-50'}`}
                        aria-label={
                          inWishlist
                            ? t('product.removeFromWishlist', locale)
                            : t('product.addToWishlist', locale)
                        }
                      >
                        <Heart className={`h-5 w-5 ${inWishlist ? 'fill-copper-700' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleShare}
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-gradient-to-br from-gold-50 to-bronze-50 rounded-2xl p-6 border-2 border-gold-200 shadow-lg">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-5xl font-bold text-gradient-gold">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xl text-charcoal-600">
                        {product.currency}
                      </span>
                    </div>
                    {reviewSummary && reviewSummary.count > 0 ? (
                      <div className="mb-2">
                        <StarRating
                          value={reviewSummary.average}
                          showValue
                          count={reviewSummary.count}
                        />
                      </div>
                    ) : null}
                    <p className="text-sm text-charcoal-600">
                      Free shipping on orders over $200
                    </p>
                  </div>
                </div>

                {hasSound ? (
                  <SoundSamplePanel product={product} productName={productName} />
                ) : null}

                {/* Stock Status */}
                <div className="bg-white rounded-xl p-4 border border-cream-200 shadow-sm">
                  {product.inventory > 0 ? (
                    <div className="flex items-center gap-3 text-green-600">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-lg">
                        In Stock ({product.inventory} available)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-red-600">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="font-semibold text-lg">Out of Stock</span>
                    </div>
                  )}
                  {cartItem && (
                    <p className="text-sm text-charcoal-600 mt-2 ml-6">
                      ✓ {cartItem.quantity} already in cart
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="prose prose-lg prose-charcoal">
                  <p className="text-charcoal-700 leading-relaxed text-lg">
                    {productDescription}
                  </p>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="space-y-4 bg-white rounded-2xl p-6 border border-cream-200 shadow-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-base font-semibold text-charcoal-900">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-2 border-2 border-gold-300 rounded-xl bg-white shadow-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="h-12 w-12 p-0 hover:bg-gold-50 transition-colors"
                      >
                        <Minus className="h-5 w-5" />
                      </Button>
                      <span className="w-16 text-center font-bold text-xl text-charcoal-900">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={incrementQuantity}
                        disabled={quantity >= product.inventory}
                        className="h-12 w-12 p-0 hover:bg-gold-50 transition-colors"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={product.inventory === 0}
                    size="lg"
                    className="w-full btn-primary text-xl py-7 shadow-xl hover:shadow-2xl group"
                  >
                    <ShoppingCart className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>

                {/* Features */}
                <Card className="border-0 shadow-md bg-cream-50">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-gold-600 mt-1" />
                      <div>
                        <p className="font-medium text-charcoal-900">Free Shipping</p>
                        <p className="text-sm text-charcoal-600">On orders over $200</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-gold-600 mt-1" />
                      <div>
                        <p className="font-medium text-charcoal-900">Authenticity Guaranteed</p>
                        <p className="text-sm text-charcoal-600">100% authentic Himalayan instruments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <RotateCcw className="h-5 w-5 text-gold-600 mt-1" />
                      <div>
                        <p className="font-medium text-charcoal-900">30-Day Returns</p>
                        <p className="text-sm text-charcoal-600">Not satisfied? Full refund</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-charcoal-600">SKU:</span>
                    <span className="ml-2 font-medium text-charcoal-900">{product.sku}</span>
                  </div>
                  <div>
                    <span className="text-charcoal-600">Origin:</span>
                    <span className="ml-2 font-medium text-charcoal-900">{product.origin}</span>
                  </div>
                  {product.craftsman && (
                    <div className="col-span-2">
                      <span className="text-charcoal-600">Craftsman:</span>
                      <span className="ml-2 font-medium text-charcoal-900">{product.craftsman}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-16">
              <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="audio">Audio & Video</TabsTrigger>
                  <TabsTrigger value="reviews">{t('product.reviews', locale)}</TabsTrigger>
                </TabsList>

                <TabsContent value="specifications" className="mt-6">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-charcoal-900 mb-4">
                        Product Specifications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.specifications.map((spec, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-cream-200">
                            <span className="text-charcoal-600">
                              {spec.name[locale] || spec.name.en}:
                            </span>
                            <span className="font-medium text-charcoal-900">
                              {spec.value[locale] || spec.value.en} {spec.unit}
                            </span>
                          </div>
                        ))}
                        {product.dimensions?.diameter ? (
                          <div className="flex justify-between py-2 border-b border-cream-200">
                            <span className="text-charcoal-600">Diameter:</span>
                            <span className="font-medium text-charcoal-900">
                              {product.dimensions.diameter}{' '}
                              {product.dimensions.unit || 'cm'}
                            </span>
                          </div>
                        ) : null}
                        {product.dimensions?.height ? (
                          <div className="flex justify-between py-2 border-b border-cream-200">
                            <span className="text-charcoal-600">Height:</span>
                            <span className="font-medium text-charcoal-900">
                              {product.dimensions.height}{' '}
                              {product.dimensions.unit || 'cm'}
                            </span>
                          </div>
                        ) : null}
                        {product.weight > 0 ? (
                          <div className="flex justify-between py-2 border-b border-cream-200">
                            <span className="text-charcoal-600">Weight:</span>
                            <span className="font-medium text-charcoal-900">
                              {product.weight}g
                            </span>
                          </div>
                        ) : null}
                        {!product.specifications?.length &&
                          !product.dimensions?.diameter &&
                          !product.dimensions?.height &&
                          !(product.weight > 0) && (
                            <p className="text-charcoal-600 md:col-span-2">
                              No specifications listed for this product yet.
                            </p>
                          )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="materials" className="mt-6">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-charcoal-900 mb-4">
                        Materials & Craftsmanship
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-charcoal-900 mb-2">Materials Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.materials.map((material, index) => (
                              <Badge key={index} variant="outline" className="text-sm">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {product.isHandmade && (
                          <div>
                            <h4 className="font-medium text-charcoal-900 mb-2">Handmade:</h4>
                            <p className="text-charcoal-700">
                              This product is handcrafted by skilled artisans using traditional techniques
                              passed down through generations. Each piece is unique and may have slight
                              variations that add to its authentic character.
                            </p>
                          </div>
                        )}
                        {product.tags?.length > 0 && (
                          <div>
                            <h4 className="font-medium text-charcoal-900 mb-2">Tags:</h4>
                            <div className="flex flex-wrap gap-2">
                              {product.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-sm">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="audio" className="mt-6">
                  {hasSound ? (
                    <SoundSamplePanel product={product} productName={productName} />
                  ) : (
                    <Card className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <p className="text-charcoal-600">
                          No audio or video sample available for this product.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <ProductReviews productId={product.id} locale={locale} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-charcoal-900 mb-8">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <ProductCard
                      key={relatedProduct.id}
                      product={relatedProduct}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
