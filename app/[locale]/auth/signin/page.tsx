import { Locale } from '@/lib/types';
import { Metadata } from 'next';
import SignInClient from './SignInClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return {
    title: 'Sign In',
    description: 'Sign in to your Himalayan Sound account',
    robots: { index: false, follow: false },
    openGraph: {
      title: 'Sign In',
      description: 'Sign in to your Himalayan Sound account',
    },
  };
}

export default async function SignInPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <SignInClient locale={locale} />;
}
