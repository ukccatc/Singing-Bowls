import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { NativeBootstrap } from '@/components/native/NativeBootstrap';
import { SpeedInsights } from '@/components/seo/SpeedInsights';
import { BRAND } from '@/components/brand/Logo';
import { getMetadataBase } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: 'Himalayan Sound - Authentic Nepali Singing Bowls',
  description:
    'Discover authentic handcrafted Nepali singing bowls and sound meditation instruments.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: BRAND.icon192, sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#d4b27a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <NativeBootstrap />
      </head>
      <body className="font-sans antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
