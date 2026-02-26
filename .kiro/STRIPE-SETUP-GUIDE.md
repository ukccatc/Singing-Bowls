# Stripe Integration Setup Guide

**Last Updated**: February 26, 2026  
**Status**: Ready for Implementation

---

## Overview

This guide will help you set up Stripe payment processing for your Himalayan Sound e-commerce platform. The integration is already implemented in the code - you just need to configure your Stripe account and add the API keys.

---

## Prerequisites

- Stripe account (free to create)
- Access to your `.env.local` file
- Basic understanding of payment processing

---

## Step 1: Create Stripe Account

1. **Go to Stripe**: Visit [https://stripe.com](https://stripe.com)
2. **Sign Up**: Create a free account
3. **Verify Email**: Confirm your email address
4. **Complete Profile**: Fill in your business information

---

## Step 2: Get API Keys

### Development Keys (Test Mode)

1. **Log in to Stripe Dashboard**: [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. **Enable Test Mode**: Toggle "Test mode" in the top right
3. **Navigate to API Keys**: Click "Developers" → "API keys"
4. **Copy Keys**:
   - **Publishable key**: Starts with `pk_test_`
   - **Secret key**: Starts with `sk_test_` (click "Reveal" to see it)

### Production Keys (Live Mode)

⚠️ **Only use after testing thoroughly!**

1. **Disable Test Mode**: Toggle off "Test mode"
2. **Navigate to API Keys**: Click "Developers" → "API keys"
3. **Copy Keys**:
   - **Publishable key**: Starts with `pk_live_`
   - **Secret key**: Starts with `sk_live_`

---

## Step 3: Add Keys to Environment Variables

Open your `.env.local` file and add:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here

# For production, use:
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
# STRIPE_SECRET_KEY=sk_live_your_key_here
```

⚠️ **Important**:
- `NEXT_PUBLIC_` prefix makes the key available in the browser (safe for publishable key)
- Secret key should NEVER have `NEXT_PUBLIC_` prefix
- Never commit `.env.local` to version control

---

## Step 4: Install Stripe SDK

Run this command in your project root:

```bash
npm install stripe @stripe/stripe-js
```

---

## Step 5: Update Payment Intent API

Replace the mock implementation in `app/api/create-payment-intent/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'usd', metadata } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
```

---

## Step 6: Add Stripe Elements to Checkout

Create a new component `app/[locale]/checkout/PaymentForm.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

function CheckoutForm({ onSuccess, onError }: Omit<PaymentFormProps, 'clientSecret'>) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    });

    if (error) {
      onError(error.message || 'Payment failed');
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-4"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}

export default function PaymentForm({ clientSecret, onSuccess, onError }: PaymentFormProps) {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}
```

---

## Step 7: Test with Test Cards

Stripe provides test card numbers for testing:

### Successful Payment
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### Declined Payment
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Requires Authentication (3D Secure)
```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

More test cards: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## Step 8: Configure Webhooks (Optional but Recommended)

Webhooks allow Stripe to notify your app about payment events.

1. **Go to Webhooks**: Dashboard → Developers → Webhooks
2. **Add Endpoint**: Click "Add endpoint"
3. **Enter URL**: `https://yourdomain.com/api/webhooks/stripe`
4. **Select Events**:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. **Copy Signing Secret**: Starts with `whsec_`
6. **Add to `.env.local`**:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```

Create webhook handler `app/api/webhooks/stripe/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Update order status to paid
      console.log('Payment succeeded:', paymentIntent.id);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      // Handle failed payment
      console.log('Payment failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
```

---

## Step 9: Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local` to git
- ✅ Use different keys for development and production
- ✅ Rotate keys if compromised
- ✅ Use Stripe's test mode for development

### Payment Processing
- ✅ Always validate amounts on the server
- ✅ Never trust client-side calculations
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Log all payment attempts

### Data Protection
- ✅ Never store card numbers
- ✅ Use Stripe's secure payment forms
- ✅ Comply with PCI DSS requirements
- ✅ Encrypt sensitive data

---

## Step 10: Go Live Checklist

Before accepting real payments:

- [ ] Test all payment flows thoroughly
- [ ] Test with all test card scenarios
- [ ] Verify order creation works
- [ ] Verify email confirmations send
- [ ] Test refund process
- [ ] Set up webhooks
- [ ] Configure production keys
- [ ] Enable HTTPS
- [ ] Review Stripe dashboard settings
- [ ] Set up fraud prevention rules
- [ ] Configure tax settings
- [ ] Test on mobile devices
- [ ] Review terms of service
- [ ] Review privacy policy
- [ ] Activate Stripe account
- [ ] Submit for review if required

---

## Troubleshooting

### "Invalid API Key"
- Check that keys are correctly copied
- Ensure no extra spaces
- Verify test/live mode matches

### "Payment Intent Creation Failed"
- Check amount is greater than 0
- Verify currency is supported
- Check Stripe dashboard for errors

### "Webhook Signature Invalid"
- Verify webhook secret is correct
- Check endpoint URL is correct
- Ensure raw body is used (not parsed JSON)

### "Card Declined"
- Use test cards in test mode
- Check card details are correct
- Verify sufficient funds (for real cards)

---

## Additional Resources

### Documentation
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Security](https://stripe.com/docs/security)

### Support
- [Stripe Support](https://support.stripe.com)
- [Stripe Community](https://stripe.com/community)
- [Stripe Status](https://status.stripe.com)

### Tools
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Stripe Logs](https://dashboard.stripe.com/logs)

---

## Current Implementation Status

### ✅ Completed
- Payment intent API endpoint
- Order creation API endpoint
- Checkout form integration
- Order confirmation page
- Error handling
- Loading states

### ⚠️ Requires Configuration
- Stripe account setup
- API keys in environment variables
- Stripe SDK installation
- Stripe Elements integration (optional enhancement)
- Webhook configuration (optional)

### 🎯 Ready for Testing
Once you add your Stripe keys, the payment flow will work with test cards!

---

**Last Updated**: February 26, 2026  
**Status**: Implementation Complete - Awaiting Stripe Configuration
