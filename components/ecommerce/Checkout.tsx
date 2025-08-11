'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CreditCard, Lock, Truck, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CartItem, Address } from '@/lib/types';
import { t, getLocaleFromPathname } from '@/lib/translations';
import { sampleProducts } from '@/lib/data/products';

interface CheckoutProps {
  items: CartItem[];
  onPlaceOrder: (orderData: any) => void;
  className?: string;
}

const Checkout: React.FC<CheckoutProps> = ({
  items,
  onPlaceOrder,
  className,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: '',
    zip: '',
    phone: '',
  });
  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: '',
    zip: '',
    phone: '',
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  // Calculate totals
  const cartItemsWithProducts = items.map(item => {
    const product = sampleProducts.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = cartItemsWithProducts.reduce((sum, item) => {
    return sum + (item.product!.price * item.quantity);
  }, 0);

  const tax = subtotal * 0.08;
  const shipping = subtotal > 200 ? 0 : 25;
  const total = subtotal + tax + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : locale === 'uk' ? 'uk-UA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    const orderData = {
      items: cartItemsWithProducts,
      shipping: shippingAddress,
      billing: sameAsShipping ? shippingAddress : billingAddress,
      paymentMethod,
      subtotal,
      tax,
      shippingCost: shipping,
      total,
    };

    onPlaceOrder(orderData);
    setIsProcessing(false);
  };

  const updateShippingAddress = (field: keyof Address, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  const updateBillingAddress = (field: keyof Address, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { id: 1, title: 'Shipping Information', icon: Truck },
    { id: 2, title: 'Payment Details', icon: CreditCard },
    { id: 3, title: 'Review Order', icon: Lock },
  ];

  return (
    <div className={cn('container mx-auto px-4 py-8', className)}>
      <div className="max-w-6xl mx-auto">
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    isActive ? 'bg-gold-500 text-white' : 
                    isCompleted ? 'bg-green-500 text-white' : 
                    'bg-cream-200 text-charcoal-600'
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={cn(
                    'ml-2 text-sm font-medium',
                    isActive ? 'text-gold-600' : 
                    isCompleted ? 'text-green-600' : 
                    'text-charcoal-600'
                  )}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'w-16 h-0.5 mx-4',
                      isCompleted ? 'bg-green-500' : 'bg-cream-200'
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-gold-600" />
                    <span>{t('checkout.shippingAddress', locale)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shipping-firstName">{t('form.firstName', locale)}</Label>
                      <Input
                        id="shipping-firstName"
                        value={shippingAddress.firstName}
                        onChange={(e) => updateShippingAddress('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-lastName">{t('form.lastName', locale)}</Label>
                      <Input
                        id="shipping-lastName"
                        value={shippingAddress.lastName}
                        onChange={(e) => updateShippingAddress('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="shipping-address1">{t('form.address', locale)}</Label>
                    <Input
                      id="shipping-address1"
                      value={shippingAddress.address1}
                      onChange={(e) => updateShippingAddress('address1', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="shipping-address2">{t('form.address2', locale)}</Label>
                    <Input
                      id="shipping-address2"
                      value={shippingAddress.address2}
                      onChange={(e) => updateShippingAddress('address2', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="shipping-city">{t('form.city', locale)}</Label>
                      <Input
                        id="shipping-city"
                        value={shippingAddress.city}
                        onChange={(e) => updateShippingAddress('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-province">{t('form.state', locale)}</Label>
                      <Input
                        id="shipping-province"
                        value={shippingAddress.province}
                        onChange={(e) => updateShippingAddress('province', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-zip">{t('form.zipCode', locale)}</Label>
                      <Input
                        id="shipping-zip"
                        value={shippingAddress.zip}
                        onChange={(e) => updateShippingAddress('zip', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="shipping-country">{t('form.country', locale)}</Label>
                    <Input
                      id="shipping-country"
                      value={shippingAddress.country}
                      onChange={(e) => updateShippingAddress('country', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gold-600" />
                    <span>{t('checkout.paymentMethod', locale)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input
                        id="card-name"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="card-expiry">Expiry Date</Label>
                      <Input
                        id="card-expiry"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="card-cvc">CVC</Label>
                      <Input
                        id="card-cvc"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Billing Address Toggle */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="same-as-shipping"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                      className="w-4 h-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
                    />
                    <Label htmlFor="same-as-shipping" className="text-sm">
                      {t('checkout.sameAsShipping', locale)}
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Place Order Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full btn-primary h-12 text-base"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('checkout.processing', locale)}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock className="h-5 w-5" />
                    <span>{t('checkout.placeOrder', locale)} • {formatPrice(total)}</span>
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>{t('checkout.orderSummary', locale)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Order Items */}
                <div className="space-y-3">
                  {cartItemsWithProducts.map((item) => {
                    const productName = item.product!.name[locale] || item.product!.name.en;
                    const primaryImage = item.product!.images.find(img => img.isPrimary) || item.product!.images[0];
                    
                    return (
                      <div key={item.productId} className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream-50">
                          <img
                            src={primaryImage.url}
                            alt={productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal-900 truncate">
                            {productName}
                          </p>
                          <p className="text-xs text-charcoal-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-charcoal-900">
                          {formatPrice(item.product!.price * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-charcoal-700">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-charcoal-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-charcoal-700">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold text-charcoal-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Security Info */}
                <div className="bg-cream-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-charcoal-700">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;