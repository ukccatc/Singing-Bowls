'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Truck, MapPin, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ShippingRate } from '@/lib/types';
import { t, getLocaleFromPathname } from '@/lib/translations';

interface ShippingCalculatorProps {
  subtotal: number;
  onShippingRateSelect: (rate: ShippingRate) => void;
  className?: string;
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({
  subtotal,
  onShippingRateSelect,
  className,
}) => {
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [showRates, setShowRates] = useState(false);
  
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  ];

  const calculateShipping = async () => {
    if (!country || !zipCode) return;
    
    setIsCalculating(true);
    
    // Simulate API call to shipping provider
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockRates: ShippingRate[] = [
      {
        id: 'standard',
        name: 'Standard Shipping',
        price: subtotal > 200 ? 0 : 25,
        currency: 'USD',
        estimatedDays: 7,
        carrier: 'DHL',
        service: 'Standard',
      },
      {
        id: 'express',
        name: 'Express Shipping',
        price: subtotal > 200 ? 15 : 40,
        currency: 'USD',
        estimatedDays: 3,
        carrier: 'DHL',
        service: 'Express',
      },
      {
        id: 'overnight',
        name: 'Overnight Shipping',
        price: subtotal > 200 ? 35 : 60,
        currency: 'USD',
        estimatedDays: 1,
        carrier: 'FedEx',
        service: 'Overnight',
      },
    ];

    // Adjust rates based on country
    const adjustedRates = mockRates.map(rate => ({
      ...rate,
      price: country === 'US' ? rate.price * 0.8 : rate.price,
      estimatedDays: country === 'US' ? rate.estimatedDays - 1 : rate.estimatedDays,
    }));

    setShippingRates(adjustedRates);
    setShowRates(true);
    setIsCalculating(false);
  };

  const handleRateSelect = (rate: ShippingRate) => {
    setSelectedRate(rate);
    onShippingRateSelect(rate);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : locale === 'uk' ? 'uk-UA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-gold-600" />
          <span>Shipping Calculator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Country Selection */}
        <div className="space-y-2">
          <Label htmlFor="country">Shipping Country</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  <div className="flex items-center space-x-2">
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ZIP Code */}
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP / Postal Code</Label>
          <Input
            id="zipCode"
            placeholder="Enter ZIP code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        {/* Calculate Button */}
        <Button
          onClick={calculateShipping}
          disabled={!country || !zipCode || isCalculating}
          className="w-full"
        >
          {isCalculating ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Calculating...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Calculate Shipping</span>
            </div>
          )}
        </Button>

        {/* Shipping Rates */}
        {showRates && shippingRates.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-semibold text-charcoal-900">Available Shipping Options:</h4>
            
            {shippingRates.map((rate) => (
              <div
                key={rate.id}
                className={cn(
                  'p-3 rounded-lg border cursor-pointer transition-colors',
                  selectedRate?.id === rate.id
                    ? 'border-gold-500 bg-gold-50'
                    : 'border-cream-200 hover:border-gold-300'
                )}
                onClick={() => handleRateSelect(rate)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      'w-4 h-4 rounded-full border-2',
                      selectedRate?.id === rate.id
                        ? 'border-gold-500 bg-gold-500'
                        : 'border-cream-300'
                    )}>
                      {selectedRate?.id === rate.id && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-charcoal-900">
                          {rate.name}
                        </span>
                        <span className="text-xs text-charcoal-600">
                          via {rate.carrier}
                        </span>
                      </div>
                      <div className="text-sm text-charcoal-600">
                        {rate.estimatedDays} {rate.estimatedDays === 1 ? 'day' : 'days'} delivery
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-charcoal-900">
                      {rate.price === 0 ? 'Free' : formatPrice(rate.price)}
                    </div>
                    {rate.price === 0 && subtotal > 200 && (
                      <div className="text-xs text-green-600">
                        Free shipping applied
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Free Shipping Info */}
        {subtotal < 200 && (
          <div className="bg-cream-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-charcoal-700">
              <Truck className="h-4 w-4 text-gold-600" />
              <span>
                Add {formatPrice(200 - subtotal)} more for free standard shipping!
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingCalculator;