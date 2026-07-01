'use client';

import { Button } from '@/components/ui/button';
import { getCheckoutBrowserUrl } from '@/lib/native-checkout';
import { isNativeApp } from '@/lib/native';
import { Locale } from '@/lib/types';
import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NativeCheckoutGateProps {
  locale: Locale;
  children: React.ReactNode;
}

export function NativeCheckoutGate({ locale, children }: NativeCheckoutGateProps) {
  const [blocked, setBlocked] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    setBlocked(isNativeApp());
  }, []);

  const openInBrowser = async () => {
    setOpening(true);
    const url = getCheckoutBrowserUrl(locale);
    try {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url, presentationStyle: 'popover' });
    } catch {
      window.open(url, '_blank');
    } finally {
      setOpening(false);
    }
  };

  if (!blocked) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100">
        <ExternalLink className="h-8 w-8 text-gold-700" />
      </div>
      <h1 className="mb-3 text-2xl font-bold text-charcoal-900">Complete purchase on our website</h1>
      <p className="mb-8 text-charcoal-600">
        In-app payments are not available yet. Your cart is saved — continue checkout in your browser
        to complete your order securely.
      </p>
      <Button
        onClick={openInBrowser}
        disabled={opening}
        className="w-full max-w-sm bg-gold-600 hover:bg-gold-700"
        size="lg"
      >
        {opening ? 'Opening browser...' : 'Continue in Browser'}
      </Button>
    </div>
  );
}
