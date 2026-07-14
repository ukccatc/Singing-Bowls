'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Locale } from '@/lib/types';
import {
  getLocaleDisplayName,
  getLocaleFlag,
  getLocaleFromPathname,
  getAvailableLocales,
} from '@/lib/translations';
import { setLocalePreferenceCookie } from '@/lib/locale-detection';

interface LanguageChangerProps {
  className?: string;
  variant?: 'dropdown' | 'inline';
}

const LanguageChanger: React.FC<LanguageChangerProps> = ({
  className,
  variant = 'dropdown',
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocaleFromPathname(pathname);
  const availableLocales = getAvailableLocales();

  const handleLocaleChange = (newLocale: Locale) => {
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] && ['en', 'ru', 'uk'].includes(segments[0])) {
      segments.shift();
    }

    const suffix = segments.length > 0 ? `/${segments.join('/')}` : '';
    const newPath = `/${newLocale}${suffix}`;

    setLocalePreferenceCookie(newLocale);
    router.push(newPath);
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-9 px-3 text-charcoal-700 hover:text-gold-600 hover:bg-gold-50',
            className
          )}
          aria-label="Change language"
        >
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline mr-1">
            {getLocaleDisplayName(currentLocale)}
          </span>
          <span className="sm:hidden mr-1">{currentLocale.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-[200] w-52 border-cream-200 bg-white p-2 shadow-xl"
      >
        {availableLocales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={cn(
              'flex h-9 cursor-pointer items-center rounded-md px-3 text-sm font-medium',
              currentLocale === locale
                ? 'bg-gold-50 text-gold-700 focus:bg-gold-50 focus:text-gold-700'
                : 'text-charcoal-700 focus:bg-cream-50 focus:text-gold-600'
            )}
          >
            <span className="mr-3 text-base">{getLocaleFlag(locale)}</span>
            <span className="flex-1">{getLocaleDisplayName(locale)}</span>
            {currentLocale === locale && (
              <Check className="h-4 w-4 text-gold-600" />
            )}
          </DropdownMenuItem>
        ))}

        <div className="mt-2 border-t border-cream-200 pt-2">
          <p className="px-3 text-xs text-charcoal-500">
            Language preferences are saved automatically
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageChanger;
