'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Mail, Check, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { t, getLocaleFromPathname } from '@/lib/translations';

interface NewsletterProps {
  variant?: 'default' | 'compact' | 'hero';
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({
  variant = 'default',
  className,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the email to your newsletter service
      // await subscribeToNewsletter(email, locale);
      
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (isSubscribed) {
    return (
      <Card className={cn('bg-gradient-to-r from-gold-50 to-cream-50 border-gold-200', className)}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900">
              Welcome to Our Community!
            </h3>
            <p className="text-charcoal-600">
              {t('messages.subscribed', locale)}
            </p>
            <p className="text-sm text-charcoal-500">
              Check your email for a welcome message and your first sound healing tip.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('bg-gold-50 p-4 rounded-lg', className)}>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="flex-1">
            <Input
              type="email"
              placeholder={t('footer.newsletterPlaceholder', locale)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubscribing}
            className="h-10 px-4 bg-gold-500 hover:bg-gold-600"
          >
            {isSubscribing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
          </Button>
        </form>
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <Card className={cn('bg-gradient-to-br from-gold-50 to-cream-50 border-gold-200', className)}>
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-charcoal-900">
                Join Our Sound Healing Community
              </h3>
              <p className="text-charcoal-600 max-w-md mx-auto">
                Get weekly sound healing tips, meditation guides, and exclusive access to new products.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-charcoal-600">
              <Gift className="h-4 w-4 text-gold-600" />
              <span>Plus, get 10% off your first order!</span>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder={t('footer.newsletterPlaceholder', locale)}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubscribing}
                  className="h-12 px-6 bg-gold-500 hover:bg-gold-600"
                >
                  {isSubscribing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    t('footer.subscribe', locale)
                  )}
                </Button>
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-2 text-left">{error}</p>
              )}
            </form>

            <p className="text-xs text-charcoal-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('bg-gradient-to-r from-gold-50 to-cream-50 border-gold-200', className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900">
              {t('footer.newsletter', locale)}
            </h3>
            <p className="text-charcoal-600">
              {t('footer.newsletterDescription', locale)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="newsletter-email" className="sr-only">
                Email address
              </Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder={t('footer.newsletterPlaceholder', locale)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubscribing}
              className="w-full bg-gold-500 hover:bg-gold-600"
            >
              {isSubscribing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Subscribing...</span>
                </div>
              ) : (
                t('footer.subscribe', locale)
              )}
            </Button>
            
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </form>

          <div className="text-center text-xs text-charcoal-500">
            <p>No spam. Only sound healing wisdom.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Newsletter;