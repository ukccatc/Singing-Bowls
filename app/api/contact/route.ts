import { isEmailConfigured, sendContactFormEmails } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, locale } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (!isEmailConfigured()) {
      console.warn('Contact form received but Zoho SMTP is not configured:', {
        name,
        email,
        subject,
        locale,
      });
      return NextResponse.json(
        { error: 'Email service is not configured yet. Please try again later or email us directly.' },
        { status: 503 }
      );
    }

    await sendContactFormEmails({
      name: String(name),
      email: String(email),
      subject: String(subject),
      message: String(message),
      locale: String(locale || 'en'),
    });

    return NextResponse.json({ message: 'Contact form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
