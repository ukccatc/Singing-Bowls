import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { NativeBootstrap } from '@/components/native/NativeBootstrap';
import { SpeedInsights } from '@/components/seo/SpeedInsights';
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
