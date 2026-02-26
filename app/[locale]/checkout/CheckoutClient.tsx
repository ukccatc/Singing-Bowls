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
        <p className="text-charcoal-700">Loading checkout...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Header */}
      <section className="bg-gradient-to-br from-gold-50 to-cream-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Link 
              href={`/${locale}/cart`}
              className="inline-flex items-center space-x-2 text-gold-600 hover:text-gold-700 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Cart</span>
            </Link>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-4">
              Checkout
            </h1>
            <p className="text-lg text-charcoal-700">
              Complete your order securely
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Contact Information */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-gold-600" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your@email.com"
                        className="mt-1"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingFirstName">First Name *</Label>
                        <Input
                          id="billingFirstName"
                          {...register('billingAddress.firstName')}
                          className="mt-1"
                        />
                        {errors.billingAddress?.firstName && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.billingAddress.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="billingLastName">Last Name *</Label>
                        <Input
                          id="billingLastName"
                          {...register('billingAddress.lastName')}
                          className="mt-1"
                        />
                        {errors.billingAddress?.lastName && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.billingAddress.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billingCompany">Company (Optional)</Label>
                      <Input
                        id="billingCompany"
                        {...register('billingAddress.company')}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="billingAddress1">Address *</Label>
                      <Input
                        id="billingAddress1"
                        {...register('billingAddress.address1')}
                        placeholder="Street address"
                        className="mt-1"
                      />
                      {errors.billingAddress?.address1 && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.billingAddress.address1.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="billingAddress2">Apartment, suite, etc. (Optional)</Label>
                      <Input
                        id="billingAddress2"
                        {...register('billingAddress.address2')}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingCity">City *</Label>
                        <Input
                          id="billingCity"
                          {...register('billingAddress.city')}
                          className="mt-1"
                        />
                        {errors.billingAddress?.city && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.billingAddress.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="billingProvince">State/Province *</Label>
                        <Input
                          id="billingProvince"
                          {...register('billingAddress.province')}
                          className="mt-1"
                        />
                        {errors.billingAddress?.province && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.billingAddress.province.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingCountry">Country *</Label>
                        <Select
                          onValueChange={(value) => setValue('billingAddress.country', value)}
                        >
                          <SelectTrigger className="mt-1">
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
                          <p className="text-sm text-red-600 mt-1">
                            {errors.billingAddress.country.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="billingZip">Postal Code *</Label>
                        <Input
                          id="billingZip"
                          {...register('billingAddress.zip')}
                          className="mt-1"
                        />
                        {errors.billingAddress?.zip && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.billingAddress.zip.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billingPhone">Phone (Optional)</Label>
                      <Input
                        id="billingPhone"
                        type="tel"
                        {...register('billingAddress.phone')}
                        placeholder="+1 (555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsShipping"
                        checked={sameAsShipping}
                        onCheckedChange={(checked) => 
                          setValue('sameAsShipping', checked as boolean)
                        }
                      />
                      <Label htmlFor="sameAsShipping" className="cursor-pointer">
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
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-gold-600" />
                      Shipping Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                          className="flex items-center space-x-3 border border-charcoal-200 rounded-lg p-4 hover:border-gold-400 transition-colors"
                        >
                          <RadioGroupItem value={key} id={key} />
                          <Label htmlFor={key} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-charcoal-900">{rate.name}</p>
                                <p className="text-sm text-charcoal-600">{rate.estimatedDays}</p>
                                <p className="text-xs text-charcoal-500">{rate.description}</p>
                              </div>
                              <p className="font-bold text-charcoal-900">
                                {subtotal >= 200 && key === 'standard' ? 'FREE' : `$${rate.price}`}
                              </p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.shippingMethod && (
                      <p className="text-sm text-red-600 mt-2">{errors.shippingMethod.message}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-gold-600" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      defaultValue="card"
                      onValueChange={(value) => 
                        setValue('paymentMethod', value as 'card' | 'paypal')
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 border border-charcoal-200 rounded-lg p-4">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <p className="font-medium text-charcoal-900">Credit Card</p>
                          <p className="text-sm text-charcoal-600">Pay with Visa, Mastercard, or Amex</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border border-charcoal-200 rounded-lg p-4">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <p className="font-medium text-charcoal-900">PayPal</p>
                          <p className="text-sm text-charcoal-600">Pay with your PayPal account</p>
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.paymentMethod && (
                      <p className="text-sm text-red-600 mt-2">{errors.paymentMethod.message}</p>
                    )}
                    
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <ShieldCheck className="h-4 w-4 inline mr-1" />
                        Your payment information is secure and encrypted
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Terms and Newsletter */}
                <Card className="border-0 shadow-md">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        {...register('acceptTerms')}
                      />
                      <Label htmlFor="acceptTerms" className="cursor-pointer text-sm">
                        I accept the{' '}
                        <Link href="/terms" className="text-gold-600 hover:underline">
                          terms and conditions
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-gold-600 hover:underline">
                          privacy policy
                        </Link>
                      </Label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
                    )}

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="subscribeNewsletter"
                        {...register('subscribeNewsletter')}
                      />
                      <Label htmlFor="subscribeNewsletter" className="cursor-pointer text-sm">
                        Subscribe to our newsletter for exclusive offers and updates
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-lg sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Cart Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => {
                        const product = products[item.productId];
                        if (!product) return null;

                        const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

                        return (
                          <div key={item.productId} className="flex gap-3">
                            {primaryImage && (
                              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={primaryImage.url}
                                  alt={product.name[locale]}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-charcoal-900 truncate">
                                {product.name[locale]}
                              </p>
                              <p className="text-sm text-charcoal-600">
                                Qty: {item.quantity}
                              </p>
                              <p className="text-sm font-bold text-charcoal-900">
                                ${(product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
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
                        <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                      </div>

                      <Separator />

                      <div className="flex justify-between text-xl font-bold text-charcoal-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="w-full bg-gold-600 hover:bg-gold-700"
                    >
                      {submitting ? 'Processing...' : 'Place Order'}
                    </Button>

                    <p className="text-xs text-center text-charcoal-600">
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
