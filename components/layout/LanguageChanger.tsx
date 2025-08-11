'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Locale } from '@/lib/types';
import { getAvailableLocales, getLocaleDisplayName, getLocaleFlag, getLocaleFromPathname } from '@/lib/translations';

interface LanguageChangerProps {
  className?: string;
  variant?: 'dropdown' | 'inline';
}

const LanguageChanger: React.FC<LanguageChangerProps> = ({
  className,
  variant = 'dropdown',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocaleFromPathname(pathname);
  const availableLocales = getAvailableLocales();

  const handleLocaleChange = (newLocale: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    
    // Remove current locale if it exists
    if (segments[0] && ['en', 'ru', 'uk'].includes(segments[0])) {
      segments.shift();
    }
    
    // Add new locale (except for English which is default)
    const newPath = newLocale === 'en' 
      ? `/${segments.join('/')}`
      : `/${newLocale}/${segments.join('/')}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        {availableLocales.map((locale) => (
          <Button
            key={locale}
            variant={currentLocale === locale ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleLocaleChange(locale)}
            className={cn(
              'h-8 px-3 text-xs font-medium transition-colors',
              currentLocale === locale
                ? 'bg-gold-500 text-white hover:bg-gold-600'
                : 'text-charcoal-600 hover:text-gold-600 hover:bg-gold-50'
            )}
          >
            <span className="mr-1">{getLocaleFlag(locale)}</span>
            <span className="hidden sm:inline">{getLocaleDisplayName(locale)}</span>
            <span className="sm:hidden">{locale.toUpperCase()}</span>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-3 text-charcoal-700 hover:text-gold-600 hover:bg-gold-50"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline mr-1">
          {getLocaleDisplayName(currentLocale)}
        </span>
        <span className="sm:hidden mr-1">
          {currentLocale.toUpperCase()}
        </span>
        <ChevronDown className={cn(
          'h-3 w-3 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <Card className="absolute top-full right-0 mt-2 w-48 z-50 shadow-lg border border-cream-200">
            <CardContent className="p-2">
              <div className="space-y-1">
                {availableLocales.map((locale) => (
                  <Button
                    key={locale}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLocaleChange(locale)}
                    className={cn(
                      'w-full justify-start h-9 px-3 text-sm font-medium transition-colors',
                      currentLocale === locale
                        ? 'bg-gold-50 text-gold-700'
                        : 'text-charcoal-700 hover:bg-cream-50 hover:text-gold-600'
                    )}
                  >
                    <span className="mr-3 text-base">{getLocaleFlag(locale)}</span>
                    <span className="flex-1 text-left">{getLocaleDisplayName(locale)}</span>
                    {currentLocale === locale && (
                      <Check className="h-4 w-4 text-gold-600" />
                    )}
                  </Button>
                ))}
              </div>
              
              <div className="mt-3 pt-2 border-t border-cream-200">
                <p className="text-xs text-charcoal-500 px-3">
                  Language preferences are saved automatically
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default LanguageChanger;