import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { getAdminNotificationEmail, getContactEmail, getSiteName, getSiteUrl } from '@/lib/site';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

function getResendApiKey(): string | undefined {
  const key = process.env.RESEND_API_KEY || process.env.SMTP_PASS;
  return key?.startsWith('re_') ? key : undefined;
}

function getSmtpConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass || pass.startsWith('re_')) {
    return null;
  }

  const host =
    process.env.SMTP_HOST ||
    (user.includes('@gmail.com') ? 'smtp.gmail.com' : 'smtp.resend.com');
  const port = Number(process.env.SMTP_PORT || 465);

  return { user, pass, host, port };
}

function isGmailSmtpConfigured(): boolean {
  const config = getSmtpConfig();
  return Boolean(config?.user?.includes('@gmail.com'));
}

function getMailTransporter() {
  const config = getSmtpConfig();
  if (!config) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });
}

export function isEmailConfigured(): boolean {
  const contact = getContactEmail();
  if (contact.includes('@gmail.com')) {
    return isGmailSmtpConfigured();
  }
  return Boolean(getResendApiKey() || getSmtpConfig());
}

export function getEmailFromAddress(): string {
  if (process.env.EMAIL_FROM_ADDRESS) {
    return process.env.EMAIL_FROM_ADDRESS;
  }
  return getContactEmail();
}

async function sendViaResend(options: SendEmailOptions): Promise<void> {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    throw new Error('Resend API key is not configured.');
  }

  const resend = new Resend(apiKey);
  const fromName = process.env.EMAIL_FROM_NAME || getSiteName();
  const fromAddress = getEmailFromAddress();
  const to = Array.isArray(options.to) ? options.to : [options.to];

  const { error } = await resend.emails.send({
    from: `${fromName} <${fromAddress}>`,
    to,
    subject: options.subject,
    text: options.text,
    html: options.html || options.text.replace(/\n/g, '<br>'),
    replyTo: options.replyTo,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function sendViaSmtp(options: SendEmailOptions): Promise<void> {
  const transporter = getMailTransporter();
  if (!transporter) {
    throw new Error('SMTP is not configured.');
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

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error('Email is not configured. Set SMTP_USER/SMTP_PASS (Gmail) or RESEND_API_KEY.');
  }

  if (isGmailSmtpConfigured()) {
    await sendViaSmtp(options);
    return;
  }

  if (getResendApiKey()) {
    await sendViaResend(options);
    return;
  }

  await sendViaSmtp(options);
}

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
}

export async function sendContactFormEmails(data: ContactFormPayload): Promise<void> {
  const adminInbox = getAdminNotificationEmail();
  const siteName = getSiteName();

  await sendEmail({
    to: adminInbox,
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
      '',
      '---',
      `Reply to this message to reach the customer (${data.email}).`,
    ].join('\n'),
  });

  await sendEmail({
    to: data.email,
    replyTo: getContactEmail(),
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
