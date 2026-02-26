import { z } from 'zod';

// Address schema
export const addressSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  company: z.string().optional(),
  address1: z.string().min(5, 'Address must be at least 5 characters'),
  address2: z.string().optional(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  province: z.string().min(2, 'State/Province is required'),
  country: z.string().min(2, 'Country is required'),
  zip: z.string().min(3, 'Postal code must be at least 3 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
});

// Checkout form schema
export const checkoutSchema = z.object({
  email: z.string().email('Invalid email address'),
  
  // Billing address
  billingAddress: addressSchema,
  
  // Shipping address
  sameAsShipping: z.boolean().default(false),
  shippingAddress: addressSchema.optional(),
  
  // Shipping method
  shippingMethod: z.enum(['standard', 'express', 'overnight'], {
    required_error: 'Please select a shipping method',
  }),
  
  // Payment method
  paymentMethod: z.enum(['card', 'paypal'], {
    required_error: 'Please select a payment method',
  }),
  
  // Terms
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  
  // Newsletter
  subscribeNewsletter: z.boolean().default(false),
}).refine(
  (data) => {
    // If not same as shipping, shipping address is required
    if (!data.sameAsShipping && !data.shippingAddress) {
      return false;
    }
    return true;
  },
  {
    message: 'Shipping address is required',
    path: ['shippingAddress'],
  }
);

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;

// Shipping rates
export const shippingRates = {
  standard: {
    name: 'Standard Shipping',
    price: 15,
    estimatedDays: '5-7 business days',
    description: 'Reliable delivery',
  },
  express: {
    name: 'Express Shipping',
    price: 30,
    estimatedDays: '2-3 business days',
    description: 'Faster delivery',
  },
  overnight: {
    name: 'Overnight Shipping',
    price: 50,
    estimatedDays: '1 business day',
    description: 'Next day delivery',
  },
};

// Countries list (simplified)
export const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'HU', name: 'Hungary' },
  { code: 'RO', name: 'Romania' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'GR', name: 'Greece' },
  { code: 'PT', name: 'Portugal' },
  { code: 'IE', name: 'Ireland' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'SG', name: 'Singapore' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'IL', name: 'Israel' },
  { code: 'TR', name: 'Turkey' },
  { code: 'RU', name: 'Russia' },
  { code: 'UA', name: 'Ukraine' },
];
