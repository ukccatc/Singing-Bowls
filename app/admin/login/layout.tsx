import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Himalayan Sound',
  description: 'Sign in to the Himalayan Sound admin panel',
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
