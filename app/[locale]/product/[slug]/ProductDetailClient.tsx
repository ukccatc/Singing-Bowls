'use client';

import ProductCard from '@/components/product/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sampleProducts } from '@/lib/data/products';
import { useCart } from '@/lib/hooks/useCart';
import { Locale, Product } from '@/lib/types';
import {
    ArrowLeft,
    Check,
    Heart,
    Minus,
    Play,
    Plus,
    RotateCcw,
    Share2,
    Shield,
    ShoppingCart,
    Truck,
    Volume2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductDetailClientProps {
  product: Product;
  locale: Locale;
}

export default function ProductDetailClient({ product, locale }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addItem, getItem } = useCart();

  const productName = product.name[locale] || product.name.en;
  const productDescription = product.description[locale] || product.description.en;
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const cartItem = getItem(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} × ${productName} added to cart!`);
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: productDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
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

  // Get related products (same category, excluding current)
  const relatedProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Breadcrumb */}
      <section className="bg-white border-b border-cream-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-charcoal-600">
            <Link href={`/${locale}`} className="hover:text-gold-600">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${locale}/shop`} className="hover:text-gold-600">
              Shop
            </Link>
            <span>/</span>
            <span className="text-charcoal-900">{productName}</span>
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
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square relative overflow-hidden rounded-lg bg-white shadow-lg">
                  {product.images[selectedImage] ? (
                    <Image
                      src={product.images[selectedImage].url}
                      alt={product.images[selectedImage].alt[locale] || productName}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-cream-100">
                      <span className="text-cream-400">No image</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-all ${
                          selectedImage === index
                            ? 'border-gold-600 ring-2 ring-gold-200'
                            : 'border-cream-200 hover:border-gold-400'
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
              <div className="space-y-6">
                {/* Title and Badges */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-3xl lg:text-4xl font-bold text-charcoal-900 mb-2">
                        {productName}
                      </h1>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="badge-gold">
                          {product.category}
                        </Badge>
                        {product.isFeatured && (
                          <Badge className="badge-bronze">
                            Featured
                          </Badge>
                        )}
                        {product.isHandmade && (
                          <Badge className="badge-copper">
                            Handmade
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleToggleWishlist}
                        className={isInWishlist ? 'text-red-600 border-red-600' : ''}
                      >
                        <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-600' : ''}`} />
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
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-bold text-gradient-gold">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-charcoal-600">
                      {product.currency}
                    </span>
                  </div>
                </div>

                {/* Stock Status */}
                <div>
                  {product.inventory > 0 ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">
                        In Stock ({product.inventory} available)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <span className="font-medium">Out of Stock</span>
                    </div>
                  )}
                  {cartItem && (
                    <p className="text-sm text-charcoal-600 mt-2">
                      {cartItem.quantity} already in cart
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="prose prose-charcoal">
                  <p className="text-charcoal-700 leading-relaxed">
                    {productDescription}
                  </p>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-charcoal-700">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-2 border-2 border-charcoal-200 rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="h-10 w-10 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium text-lg">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={incrementQuantity}
                        disabled={quantity >= product.inventory}
                        className="h-10 w-10 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={product.inventory === 0}
                    size="lg"
                    className="w-full bg-gold-600 hover:bg-gold-700 text-lg py-6"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
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
                  <TabsTrigger value="audio">Audio Sample</TabsTrigger>
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
                        {product.dimensions.diameter && (
                          <div className="flex justify-between py-2 border-b border-cream-200">
                            <span className="text-charcoal-600">Diameter:</span>
                            <span className="font-medium text-charcoal-900">
                              {product.dimensions.diameter} {product.dimensions.unit}
                            </span>
                          </div>
                        )}
                        {product.dimensions.height && (
                          <div className="flex justify-between py-2 border-b border-cream-200">
                            <span className="text-charcoal-600">Height:</span>
                            <span className="font-medium text-charcoal-900">
                              {product.dimensions.height} {product.dimensions.unit}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between py-2 border-b border-cream-200">
                          <span className="text-charcoal-600">Weight:</span>
                          <span className="font-medium text-charcoal-900">
                            {product.weight}g
                          </span>
                        </div>
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
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="audio" className="mt-6">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-charcoal-900 mb-4">
                        Audio Sample
                      </h3>
                      {product.audioSample ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-charcoal-700">
                            <Volume2 className="h-5 w-5 text-gold-600" />
                            <span>Listen to the authentic sound of this singing bowl</span>
                          </div>
                          <div className="bg-cream-50 rounded-lg p-6 text-center">
                            <Button size="lg" className="bg-gold-600 hover:bg-gold-700">
                              <Play className="h-5 w-5 mr-2" />
                              Play Audio Sample
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-charcoal-600">
                          No audio sample available for this product.
                        </p>
                      )}
                    </CardContent>
                  </Card>
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
