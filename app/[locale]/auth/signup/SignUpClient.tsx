'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignUpClient({ locale }: { locale: Locale }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center py-16">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link href={`/${locale}`} className="flex items-center space-x-2 text-gold-600 hover:text-gold-700">
            <ArrowLeft className="h-5 w-5" />
            <span>{t('common.back', locale)}</span>
          </Link>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Sign Up</h1>
              <p className="text-charcoal-700">Join Himalayan Sound</p>
            </div>

            <form className="space-y-6">
              <div>
                <Label htmlFor="name">{t('form.fullName', locale)}</Label>
                <Input id="name" type="text" required autoComplete="name" />
              </div>

              <div>
                <Label htmlFor="email">{t('form.email', locale)}</Label>
                <Input id="email" type="email" required autoComplete="email" />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required autoComplete="new-password" />
              </div>

              <Button type="submit" className="w-full bg-gold-600 hover:bg-gold-700">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-charcoal-700">
                Already have an account?{' '}
                <Link href={`/${locale}/auth/signin`} className="text-gold-600 hover:text-gold-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
