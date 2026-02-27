'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/hooks/useCart';
import { CheckoutFormData, checkoutSchema, countries, shippingRates } from '@/lib/schemas/checkout';
import { Locale, Product } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CreditCard, Lock, ShieldCheck, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CheckoutClientProps {
  locale: Locale;
}

export default function CheckoutClient({ locale }: CheckoutClientProps) {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      sameAsShipping: true,
      shippingMethod: 'standard',
      paymentMethod: 'card',
      acceptTerms: false,
      subscribeNewsletter: false,
    },
  });

  const sameAsShipping = watch('sameAsShipping');
  const shippingMethod = watch('shippingMethod');

  // Fetch product details
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
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [items]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!loading && items.length === 0) {
      router.push(`/${locale}/cart`);
    }
  }, [loading, items, locale, router]);

  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    const product = products[item.productId];
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const shippingCost = shippingMethod && subtotal < 200 
    ? shippingRates[shippingMethod].price 
    : 0;
  const total = subtotal + tax + shippingCost;

  const onSubmit = async (data: CheckoutFormData) => {
    setSubmitting(true);
    
    try {
      // Step 1: Create payment intent
      const paymentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'usd',
          metadata: {
            email: data.email,
            items: items.length,
          },
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }

      const paymentData = await paymentResponse.json();

      // Step 2: Create order in database
      const orderItems = items.map(item => {
        const product = products[item.productId];
        return {
          productId: item.productId,
          name: product.name.en,
          price: product.price,
          quantity: item.quantity,
          sku: product.sku,
        };
      });

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          billingAddress: data.billingAddress,
          shippingAddress: data.sameAsShipping ? data.billingAddress : data.shippingAddress,
          items: orderItems,
          subtotal,
          tax,
          shippingCost,
          total,
          paymentIntentId: paymentData.paymentIntentId,
          paymentMethod: data.paymentMethod,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Step 3: Store email for confirmation page
      localStorage.setItem('checkout_email', data.email);

      // Step 4: Clear cart
      clearCart();

      // Step 5: Show success and redirect
      toast.success('Order placed successfully!');
      router.push(`/${locale}/order-confirmation?orderId=${orderData.order.id}`);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
          <p className="text-charcoal-700">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-gold-50 via-cream-50 to-bronze-50 py-16 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gold-400/20 to-bronze-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-copper-400/20 to-gold-400/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <Link 
              href={`/${locale}/cart`}
              className="inline-flex items-center space-x-2 text-gold-600 hover:text-gold-700 mb-8 transition-all duration-200 hover:translate-x-[-4px] animate-fade-in-up group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="font-medium">Back to Cart</span>
            </Link>
            
            <div className="animate-fade-in-up animation-delay-100">
              <h1 className="text-5xl lg:text-6xl font-bold text-charcoal-900 mb-4">
                Secure Checkout
              </h1>
              <p className="text-xl text-charcoal-700 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold-600" />
                Complete your order with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6 animate-fade-in-up animation-delay-200">
                
                {/* Contact Information */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-gold-50 to-cream-50 border-b border-gold-100">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gold-100 rounded-lg">
                        <Lock className="h-5 w-5 text-gold-600" />
                      </div>
                      <span>Contact Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-charcoal-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your@email.com"
                        className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1 animate-fade-in">
                          <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-bronze-50 to-cream-50 border-b border-bronze-100">
                    <CardTitle className="text-xl">Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingFirstName" className="text-sm font-medium text-charcoal-700">
                          First Name *
                        </Label>
                        <Input
                          id="billingFirstName"
                          {...register('billingAddress.firstName')}
                          className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                        />
                        {errors.billingAddress?.firstName && (
                          <p className="text-sm text-red-600 mt-2 flex items-center gap-1 animate-fade-in">
                            <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                            {errors.billingAddress.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="billingLastName" className="text-sm font-medium text-charcoal-700">
                          Last Name *
                        </Label>
                        <Input
                          id="billingLastName"
                          {...register('billingAddress.lastName')}
                          className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                        />
                        {errors.billingAddress?.lastName && (
                          <p className="text-sm text-red-600 mt-2 flex items-center gap-1 animate-fade-in">
                            <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                            {errors.billingAddress.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billingCompany" className="text-sm font-medium text-charcoal-700">
                        Company (Optional)
                      </Label>
                      <Input
                        id="billingCompany"
                        {...register('billingAddress.company')}
                        className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="billingAddress1" className="text-sm font-medium text-charcoal-700">
                        Address *
                      </Label>
                      <Input
                        id="billingAddress1"
                        {...register('billingAddress.address1')}
                        placeholder="Street address"
                        className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                      />
                      {errors.billingAddress?.address1 && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1 animate-fade-in">
                          <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                          {errors.billingAddress.address1.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="billingAddress2" className="text-sm font-medium text-charcoal-700">
                        Apartment, suite, etc. (Optional)
                      </Label>
                      <Input
                        id="billingAddress2"
                        {...register('billingAddress.address2')}
                        className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingCity" className="text-sm font-medium text-charcoal-700">
                          City *
                        </Label>
                        <Input
                          id="billingCity"
                          {...register('billingAddress.city')}
                          className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                        />
                        {errors.billingAddress?.city && (
                          <p className="text-sm text-red-600 mt-2 flex items-center gap-1 animate-fade-in">
                            <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                            {errors.billingAddress.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="billingProvince" className="text-sm font-medium text-charcoal-700">
                          State/Province *
                        </Label>
                        <Input
                          id="billingProvince"
                          {...register('billingAddress.province')}
                          className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                        />
                        {errors.billingAddress?.province && (
                          <p className="text-sm text-red-600 mt-2 flex items-center gap-1 animate-fade-in">
                            <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                            {errors.billingAddress.province.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingCountry" className="text-sm font-medium text-charcoal-700">
                          Country *
                        </Label>
                        <Select
                          onValueChange={(value) => setValue('billingAddress.country', value)}
                        >
                          <SelectTrigger className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.billingAddress?.country && (
                          <p className="text-sm text-red-600 mt-2 flex items-center gap-1 animate-fade-in">
                            <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                            {errors.billingAddress.country.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="billingZip" className="text-sm font-medium text-charcoal-700">
                          Postal Code *
                        </Label>
                        <Input
                          id="billingZip"
                          {...register('billingAddress.zip')}
                          className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                        />
                        {errors.billingAddress?.zip && (
                          <p className="text-sm text-red-600 mt-2 flex items-center gap-1 animate-fade-in">
                            <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                            {errors.billingAddress.zip.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billingPhone" className="text-sm font-medium text-charcoal-700">
                        Phone (Optional)
                      </Label>
                      <Input
                        id="billingPhone"
                        type="tel"
                        {...register('billingAddress.phone')}
                        placeholder="+1 (555) 123-4567"
                        className="mt-2 h-12 border-2 border-cream-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-copper-50 to-cream-50 border-b border-copper-100">
                    <CardTitle className="text-xl">Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center space-x-3 p-4 bg-cream-50 rounded-lg border border-cream-200 hover:border-gold-300 transition-colors duration-200">
                      <Checkbox
                        id="sameAsShipping"
                        checked={sameAsShipping}
                        onCheckedChange={(checked) => 
                          setValue('sameAsShipping', checked as boolean)
                        }
                        className="border-2"
                      />
                      <Label htmlFor="sameAsShipping" className="cursor-pointer font-medium text-charcoal-800">
                        Same as billing address
                      </Label>
                    </div>

                    {!sameAsShipping && (
                      <div className="space-y-4 pt-4">
                        <p className="text-sm text-charcoal-600">
                          Enter a different shipping address
                        </p>
                        {/* Shipping address fields would go here - similar to billing */}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Shipping Method */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-gold-50 to-cream-50 border-b border-gold-100">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gold-100 rounded-lg">
                        <Truck className="h-5 w-5 text-gold-600" />
                      </div>
                      <span>Shipping Method</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={(value) => 
                        setValue('shippingMethod', value as 'standard' | 'express' | 'overnight')
                      }
                      className="space-y-3"
                    >
                      {Object.entries(shippingRates).map(([key, rate]) => (
                        <div
                          key={key}
                          className="flex items-center space-x-3 border-2 border-cream-200 rounded-xl p-5 hover:border-gold-400 hover:bg-gold-50/30 transition-all duration-200 cursor-pointer group"
                        >
                          <RadioGroupItem value={key} id={key} className="border-2" />
                          <Label htmlFor={key} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-charcoal-900 group-hover:text-gold-700 transition-colors">
                                  {rate.name}
                                </p>
                                <p className="text-sm text-charcoal-600 mt-1">{rate.estimatedDays}</p>
                                <p className="text-xs text-charcoal-500 mt-1">{rate.description}</p>
                              </div>
                              <p className="font-bold text-lg text-charcoal-900 group-hover:text-gold-700 transition-colors">
                                {subtotal >= 200 && key === 'standard' ? (
                                  <span className="text-green-600">FREE</span>
                                ) : (
                                  `$${rate.price}`
                                )}
                              </p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.shippingMethod && (
                      <p className="text-sm text-red-600 mt-3 flex items-center gap-1 animate-fade-in">
                        <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                        {errors.shippingMethod.message}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-bronze-50 to-cream-50 border-b border-bronze-100">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-bronze-100 rounded-lg">
                        <CreditCard className="h-5 w-5 text-bronze-600" />
                      </div>
                      <span>Payment Method</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <RadioGroup
                      defaultValue="card"
                      onValueChange={(value) => 
                        setValue('paymentMethod', value as 'card' | 'paypal')
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 border-2 border-cream-200 rounded-xl p-5 hover:border-bronze-400 hover:bg-bronze-50/30 transition-all duration-200 cursor-pointer group">
                        <RadioGroupItem value="card" id="card" className="border-2" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <p className="font-semibold text-charcoal-900 group-hover:text-bronze-700 transition-colors">
                            Credit Card
                          </p>
                          <p className="text-sm text-charcoal-600 mt-1">Pay with Visa, Mastercard, or Amex</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-cream-200 rounded-xl p-5 hover:border-bronze-400 hover:bg-bronze-50/30 transition-all duration-200 cursor-pointer group">
                        <RadioGroupItem value="paypal" id="paypal" className="border-2" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <p className="font-semibold text-charcoal-900 group-hover:text-bronze-700 transition-colors">
                            PayPal
                          </p>
                          <p className="text-sm text-charcoal-600 mt-1">Pay with your PayPal account</p>
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.paymentMethod && (
                      <p className="text-sm text-red-600 mt-3 flex items-center gap-1 animate-fade-in">
                        <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                        {errors.paymentMethod.message}
                      </p>
                    )}
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl">
                      <p className="text-sm text-blue-900 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Your payment information is secure and encrypted</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Terms and Newsletter */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-6 space-y-5">
                    <div className="flex items-start space-x-3 p-4 bg-cream-50 rounded-lg border border-cream-200">
                      <Checkbox
                        id="acceptTerms"
                        {...register('acceptTerms')}
                        className="border-2 mt-0.5"
                      />
                      <Label htmlFor="acceptTerms" className="cursor-pointer text-sm leading-relaxed">
                        I accept the{' '}
                        <Link href="/terms" className="text-gold-600 hover:text-gold-700 font-medium underline">
                          terms and conditions
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-gold-600 hover:text-gold-700 font-medium underline">
                          privacy policy
                        </Link>
                      </Label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                        {errors.acceptTerms.message}
                      </p>
                    )}

                    <div className="flex items-start space-x-3 p-4 bg-gold-50/30 rounded-lg border border-gold-200">
                      <Checkbox
                        id="subscribeNewsletter"
                        {...register('subscribeNewsletter')}
                        className="border-2 mt-0.5"
                      />
                      <Label htmlFor="subscribeNewsletter" className="cursor-pointer text-sm leading-relaxed">
                        Subscribe to our newsletter for exclusive offers and updates
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1 animate-fade-in-up animation-delay-400">
                <Card className="border-0 shadow-xl sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-gold-50 to-bronze-50 border-b border-gold-100">
                    <CardTitle className="text-xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {/* Cart Items */}
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                      {items.map((item) => {
                        const product = products[item.productId];
                        if (!product) return null;

                        const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

                        return (
                          <div key={item.productId} className="flex gap-4 p-3 bg-cream-50 rounded-lg hover:bg-cream-100 transition-colors duration-200">
                            {primaryImage && (
                              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-cream-200">
                                <Image
                                  src={primaryImage.url}
                                  alt={product.name[locale]}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-charcoal-900 truncate">
                                {product.name[locale]}
                              </p>
                              <p className="text-sm text-charcoal-600 mt-1">
                                Qty: {item.quantity}
                              </p>
                              <p className="text-base font-bold text-gold-700 mt-1">
                                ${(product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-charcoal-700">
                        <span className="font-medium">Subtotal</span>
                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-charcoal-700">
                        <span className="font-medium">Tax (10%)</span>
                        <span className="font-semibold">${tax.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-charcoal-700">
                        <span className="font-medium">Shipping</span>
                        <span className="font-semibold">
                          {shippingCost === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `$${shippingCost.toFixed(2)}`
                          )}
                        </span>
                      </div>

                      <Separator />

                      <div className="flex justify-between text-2xl font-bold text-charcoal-900 pt-2">
                        <span>Total</span>
                        <span className="text-gold-700">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="w-full h-14 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock className="h-5 w-5" />
                          Place Order
                        </span>
                      )}
                    </Button>

                    {/* Trust Signals */}
                    <div className="space-y-3 pt-4 border-t border-cream-200">
                      <div className="flex items-center gap-3 text-sm text-charcoal-600">
                        <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Secure SSL encrypted checkout</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-charcoal-600">
                        <Truck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span>Free shipping on orders over $200</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-charcoal-600">
                        <CreditCard className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        <span>30-day money-back guarantee</span>
                      </div>
                    </div>

                    <p className="text-xs text-center text-charcoal-500 pt-4">
                      By placing your order, you agree to our terms and conditions
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
