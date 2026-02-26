'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/hooks/useCart';
import { t } from '@/lib/translations';
import { Locale, Product } from '@/lib/types';
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const { items, removeItem, updateQuantity } = useCart();
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);

  // Fetch product details for cart items
  useEffect(() => {
    const fetchProducts = async () => {
      if (items.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/products');
        const result = await response.json();
        
        if (result.success && result.data) {
          const productMap: Record<string, Product> = {};
          result.data.forEach((product: Product) => {
            productMap[product.id] = product;
          });
          setProducts(productMap);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [items]);

  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    const product = products[item.productId];
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 200 ? 0 : 15; // Free shipping over $200
  const total = subtotal + tax + shipping;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <section className="bg-gradient-to-br from-gold-50 to-cream-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6">
                {t('cart.title', locale)}
              </h1>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-charcoal-700">Loading...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <section className="bg-gradient-to-br from-gold-50 to-cream-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                <Link href={`/${locale}/shop`} className="flex items-center space-x-2 text-gold-600 hover:text-gold-700">
                  <ArrowLeft className="h-5 w-5" />
                  <span>{t('common.back', locale)}</span>
                </Link>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6">
                {t('cart.title', locale)}
              </h1>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShoppingCart className="h-12 w-12 text-gold-600" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-4">
                      {t('cart.empty', locale)}
                    </h2>
                    
                    <p className="text-charcoal-700 mb-8 max-w-md mx-auto">
                      Start your journey with authentic Himalayan sound healing instruments.
                    </p>
                    
                    <Button asChild size="lg" className="bg-gold-600 hover:bg-gold-700">
                      <Link href={`/${locale}/shop`}>
                        {t('cart.continueShopping', locale)}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Header */}
      <section className="bg-gradient-to-br from-gold-50 to-cream-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <Link href={`/${locale}/shop`} className="flex items-center space-x-2 text-gold-600 hover:text-gold-700">
                <ArrowLeft className="h-5 w-5" />
                <span>{t('common.back', locale)}</span>
              </Link>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6">
              {t('cart.title', locale)}
            </h1>
            <p className="text-lg text-charcoal-700">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const product = products[item.productId];
                  if (!product) return null;

                  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

                  return (
                    <Card key={item.productId} className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          {/* Product Image */}
                          {primaryImage && (
                            <div className="relative w-24 h-24 flex-shrink-0">
                              <Image
                                src={primaryImage.url}
                                alt={primaryImage.alt[locale] || product.name[locale]}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          )}

                          {/* Product Details */}
                          <div className="flex-1">
                            <Link 
                              href={`/${locale}/product/${product.slug}`}
                              className="text-lg font-semibold text-charcoal-900 hover:text-gold-600 transition-colors"
                            >
                              {product.name[locale]}
                            </Link>
                            <p className="text-sm text-charcoal-600 mt-1">
                              SKU: {product.sku}
                            </p>
                            <p className="text-lg font-bold text-gold-600 mt-2">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col items-end justify-between">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.productId)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center gap-2 border border-charcoal-200 rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                disabled={item.quantity >= product.inventory}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <p className="text-lg font-bold text-charcoal-900 mt-2">
                              ${(product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-lg sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                      Order Summary
                    </h2>

                    <div className="space-y-4">
                      <div className="flex justify-between text-charcoal-700">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-charcoal-700">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-charcoal-700">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                      </div>

                      {subtotal < 200 && (
                        <p className="text-sm text-gold-600">
                          Add ${(200 - subtotal).toFixed(2)} more for free shipping!
                        </p>
                      )}

                      <div className="border-t border-charcoal-200 pt-4">
                        <div className="flex justify-between text-xl font-bold text-charcoal-900">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full mt-6 bg-gold-600 hover:bg-gold-700"
                    >
                      <Link href={`/${locale}/checkout`}>
                        Proceed to Checkout
                      </Link>
                    </Button>

                    <Button 
                      asChild 
                      variant="outline" 
                      size="lg" 
                      className="w-full mt-3"
                    >
                      <Link href={`/${locale}/shop`}>
                        Continue Shopping
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
