'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CartItem, Product } from '@/lib/types';
import { t, getLocaleFromPathname } from '@/lib/translations';
import { sampleProducts } from '@/lib/data/products';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  className?: string;
}

const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  className,
}) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  // Get product details for cart items
  const cartItemsWithProducts = items.map(item => {
    const product = sampleProducts.find(p => p.id === item.productId);
    return {
      ...item,
      product: product as Product,
    };
  }).filter(item => item.product);

  const subtotal = cartItemsWithProducts.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 200 ? 0 : 25; // Free shipping over $200
  const total = subtotal + tax + shipping;

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsLoading(productId);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onUpdateQuantity(productId, newQuantity);
    setIsLoading(null);
  };

  const handleRemoveItem = async (productId: string) => {
    setIsLoading(productId);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
    onRemoveItem(productId);
    setIsLoading(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : locale === 'uk' ? 'uk-UA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (cartItemsWithProducts.length === 0) {
    return (
      <div className={cn('container mx-auto px-4 py-8', className)}>
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-10 w-10 text-gold-600" />
          </div>
          <h2 className="text-2xl font-bold text-charcoal-900 mb-2">
            {t('cart.empty', locale)}
          </h2>
          <p className="text-charcoal-600 mb-6">
            Discover our beautiful collection of singing bowls and meditation instruments.
          </p>
          <Button asChild className="btn-primary">
            <Link href={`/${locale}/shop`}>
              {t('cart.continueShopping', locale)}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('container mx-auto px-4 py-8', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-charcoal-900">
              {t('cart.title', locale)}
            </h1>
            <Button
              variant="ghost"
              onClick={onClearCart}
              className="text-charcoal-600 hover:text-red-600"
            >
              Clear Cart
            </Button>
          </div>

          <div className="space-y-4">
            {cartItemsWithProducts.map((item) => {
              const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0];
              const productName = item.product.name[locale] || item.product.name.en;
              const isUpdating = isLoading === item.productId;

              return (
                <Card key={item.productId} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-cream-50 flex-shrink-0">
                        {primaryImage && (
                          <Image
                            src={primaryImage.url}
                            alt={primaryImage.alt[locale] || primaryImage.alt.en}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-charcoal-900 truncate">
                          {productName}
                        </h3>
                        <p className="text-sm text-charcoal-600">
                          SKU: {item.product.sku}
                        </p>
                        <p className="text-lg font-bold text-charcoal-900">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          disabled={isUpdating || item.quantity <= 1}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-8 text-center font-medium">
                          {isUpdating ? (
                            <div className="w-4 h-4 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
                          ) : (
                            item.quantity
                          )}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                          disabled={isUpdating || item.quantity >= item.product.inventory}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.productId)}
                        disabled={isUpdating}
                        className="h-8 w-8 text-charcoal-600 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-charcoal-900">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Subtotal */}
              <div className="flex justify-between text-charcoal-700">
                <span>{t('cart.subtotal', locale)}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between text-charcoal-700">
                <span>{t('cart.shipping', locale)}</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              {/* Tax */}
              <div className="flex justify-between text-charcoal-700">
                <span>{t('cart.tax', locale)}</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between text-lg font-bold text-charcoal-900">
                <span>{t('cart.total', locale)}</span>
                <span>{formatPrice(total)}</span>
              </div>

              {/* Shipping Info */}
              {shipping > 0 && (
                <div className="bg-cream-50 p-3 rounded-lg text-sm text-charcoal-600">
                  <p>Add {formatPrice(200 - subtotal)} more for free shipping!</p>
                </div>
              )}

              {/* Checkout Button */}
              <Button asChild className="w-full btn-primary h-12 text-base">
                <Link href={`/${locale}/checkout`} className="flex items-center justify-center">
                  {t('cart.checkout', locale)}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              {/* Continue Shopping */}
              <Button asChild variant="outline" className="w-full">
                <Link href={`/${locale}/shop`}>
                  {t('cart.continueShopping', locale)}
                </Link>
              </Button>

              {/* Trust Signals */}
              <div className="pt-4 space-y-2 text-sm text-charcoal-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Free worldwide shipping over $200</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;