import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, locale } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system

    // For now, we'll simulate a successful submission
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      locale,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending
    await sendContactEmail({
      name,
      email,
      subject,
      message,
      locale,
    });

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
}) {
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real application, you would use a service like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Nodemailer with SMTP
  
  console.log('Email sent to admin:', {
    to: 'info@himalayansound.com',
    subject: `New Contact Form: ${data.subject}`,
    from: data.email,
    replyTo: data.email,
    body: `
      Name: ${data.name}
      Email: ${data.email}
      Subject: ${data.subject}
      Language: ${data.locale}
      
      Message:
      ${data.message}
    `,
  });

  // Send confirmation email to user
  console.log('Confirmation email sent to user:', {
    to: data.email,
    subject: 'Thank you for contacting Himalayan Sound',
    body: `
      Dear ${data.name},
      
      Thank you for reaching out to us. We have received your message and will respond within 24 hours.
      
      Your message:
      Subject: ${data.subject}
      ${data.message}
      
      Best regards,
      The Himalayan Sound Team
    `,
  });
}