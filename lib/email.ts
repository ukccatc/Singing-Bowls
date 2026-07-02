import nodemailer from 'nodemailer';
import { getContactEmail, getSiteName, getSiteUrl } from '@/lib/site';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

function getZohoTransporter() {
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  const host = process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com';
  const port = Number(process.env.ZOHO_SMTP_PORT || 587);

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASS);
}

export function getEmailFromAddress(): string {
  if (process.env.EMAIL_FROM_ADDRESS) {
    return process.env.EMAIL_FROM_ADDRESS;
  }
  const smtpUser = process.env.ZOHO_SMTP_USER;
  // Zoho uses the mailbox address as SMTP username; Resend uses "resend".
  if (smtpUser?.includes('@')) {
    return smtpUser;
  }
  return getContactEmail();
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const transporter = getZohoTransporter();

  if (!transporter) {
    throw new Error('Email is not configured. Set ZOHO_SMTP_USER and ZOHO_SMTP_PASS.');
  }

  const fromName = process.env.EMAIL_FROM_NAME || getSiteName();
  const fromAddress = getEmailFromAddress();

  await transporter.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html || options.text.replace(/\n/g, '<br>'),
    replyTo: options.replyTo,
  });
}

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
}

export async function sendContactFormEmails(data: ContactFormPayload): Promise<void> {
  const adminEmail = getContactEmail();
  const siteName = getSiteName();

  await sendEmail({
    to: adminEmail,
    replyTo: data.email,
    subject: `[${siteName}] Contact: ${data.subject}`,
    text: [
      `New contact form message (${data.locale})`,
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Subject: ${data.subject}`,
      '',
      'Message:',
      data.message,
    ].join('\n'),
  });

  await sendEmail({
    to: data.email,
    subject: `Thank you for contacting ${siteName}`,
    text: [
      `Dear ${data.name},`,
      '',
      'Thank you for reaching out to us. We have received your message and will respond within 24–48 hours.',
      '',
      `Subject: ${data.subject}`,
      '',
      'Your message:',
      data.message,
      '',
      'Best regards,',
      `The ${siteName} Team`,
      getSiteUrl(),
    ].join('\n'),
  });
}

export interface OrderConfirmationPayload {
  email: string;
  customerName: string;
  orderId: string;
  total: number;
  currency: string;
  locale: string;
}

export async function sendOrderConfirmationEmail(
  data: OrderConfirmationPayload
): Promise<void> {
  const siteName = getSiteName();
  const siteUrl = getSiteUrl();

  await sendEmail({
    to: data.email,
    subject: `Your ${siteName} order ${data.orderId}`,
    text: [
      `Dear ${data.customerName},`,
      '',
      'Thank you for your order! We have received it and will begin processing shortly.',
      '',
      `Order reference: ${data.orderId}`,
      `Total: ${data.currency} ${data.total.toFixed(2)}`,
      '',
      `You can contact us anytime at ${getContactEmail()}.`,
      '',
      'Best regards,',
      `The ${siteName} Team`,
      siteUrl,
    ].join('\n'),
  });
}
