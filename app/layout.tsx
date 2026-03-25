import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Himalayan Sound - Authentic Nepali Singing Bowls',
  description: 'Discover authentic handcrafted Nepali singing bowls and sound meditation instruments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}