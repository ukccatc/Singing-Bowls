'use client';

import { Button } from '@/components/ui/button';
import { ConsentChoice, readConsentChoice, writeConsentChoice } from '@/lib/consent';
import { buildSitePath } from '@/lib/site';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CookieConsentBannerProps {
  locale: Locale;
}

export function CookieConsentBanner({ locale }: CookieConsentBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsentChoice() === null);
  }, []);

  const choose = (choice: ConsentChoice) => {
    writeConsentChoice(choice);
    setVisible(false);
    window.dispatchEvent(
      new CustomEvent('hs-cookie-consent', { detail: { choice } })
    );
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('cookie.title', locale)}
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
    >
      <div
        className={cn(
          'mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-cream-200 bg-white/95 p-5 shadow-xl backdrop-blur sm:flex-row sm:items-end sm:justify-between',
          'ring-1 ring-charcoal-900/5'
        )}
      >
        <div className="space-y-2 text-sm text-charcoal-700">
          <p className="text-base font-semibold text-charcoal-900">
            {t('cookie.title', locale)}
          </p>
          <p>
            {t('cookie.description', locale)}{' '}
            <Link href={buildSitePath(locale, '/privacy')} className={ui.link}>
              {t('footer.privacyPolicy', locale)}
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => choose('rejected')}
            className="min-w-[7rem]"
          >
            {t('cookie.reject', locale)}
          </Button>
          <Button
            type="button"
            onClick={() => choose('accepted')}
            className="min-w-[7rem]"
          >
            {t('cookie.accept', locale)}
          </Button>
        </div>
      </div>
    </div>
  );
}
