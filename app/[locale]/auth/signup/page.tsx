import { Locale } from '@/lib/types';
import { Metadata } from 'next';
import SignUpClient from './SignUpClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return {
    title: 'Sign Up',
    description: 'Create your Himalayan Sound account',
    robots: { index: false, follow: false },
    openGraph: {
      title: 'Sign Up',
      description: 'Create your Himalayan Sound account',
    },
  };
}

export default async function SignUpPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <SignUpClient locale={locale} />;
}
