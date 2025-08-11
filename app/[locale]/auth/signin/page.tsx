import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Generate metadata for the signin page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const locale = params.locale;
  
  return {
    title: 'Sign In',
    description: 'Sign in to your Himalayan Sound account',
    openGraph: {
      title: 'Sign In',
      description: 'Sign in to your Himalayan Sound account',
    },
  };
}

export default function SignInPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center py-16">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <div className="mb-8">
          <Link href={`/${locale}`} className="flex items-center space-x-2 text-gold-600 hover:text-gold-700">
            <ArrowLeft className="h-5 w-5" />
            <span>{t('common.back', locale)}</span>
          </Link>
        </div>

        {/* Sign In Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-charcoal-900 mb-2">
                Sign In
              </h1>
              <p className="text-charcoal-700">
                Welcome back to Himalayan Sound
              </p>
            </div>
            
            <form className="space-y-6">
              <div>
                <Label htmlFor="email">{t('form.email', locale)}</Label>
                <Input id="email" type="email" required />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              
              <Button type="submit" className="w-full bg-gold-600 hover:bg-gold-700">
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-charcoal-700">
                Don't have an account?{' '}
                <Link href={`/${locale}/auth/signup`} className="text-gold-600 hover:text-gold-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
