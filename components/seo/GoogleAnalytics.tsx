'use client';

import { hasAnalyticsConsent } from '@/lib/consent';
import { getGoogleAnalyticsId } from '@/lib/seo';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export function GoogleAnalytics() {
  const gaId = getGoogleAnalyticsId();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!gaId) return;

    const sync = () => setEnabled(hasAnalyticsConsent());
    sync();

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<{ choice?: string }>).detail;
      setEnabled(detail?.choice === 'accepted');
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === 'hs-cookie-consent') sync();
    };

    window.addEventListener('hs-cookie-consent', onConsent as EventListener);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('hs-cookie-consent', onConsent as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, [gaId]);

  if (!gaId || !enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'update', { analytics_storage: 'granted' });
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
