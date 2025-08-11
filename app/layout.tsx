import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Himalayan Sound - Authentic Nepali Singing Bowls',
  description: 'Discover authentic handcrafted Nepali singing bowls and sound meditation instruments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}