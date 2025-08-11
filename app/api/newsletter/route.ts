import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale = 'en', consent = false } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Check consent
    if (!consent) {
      return NextResponse.json(
        { error: 'Consent is required for newsletter subscription' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Check if email already exists
    // 2. Add to newsletter database
    // 3. Send welcome email
    // 4. Add to email marketing service (Mailchimp, ConvertKit, etc.)

    console.log('Newsletter subscription:', {
      email,
      locale,
      consent,
      timestamp: new Date().toISOString(),
    });

    // Simulate adding to email service
    await addToEmailService({ email, locale, consent });

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function addToEmailService(data: {
  email: string;
  locale: string;
  consent: boolean;
}) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real application, you would integrate with:
  // - Mailchimp
  // - ConvertKit
  // - SendGrid
  // - Klaviyo
  // - etc.
  
  console.log('Added to email service:', data);
  
  // Send welcome email
  console.log('Welcome email sent:', {
    to: data.email,
    subject: 'Welcome to Himalayan Sound Newsletter',
    template: `welcome_${data.locale}`,
  });
}