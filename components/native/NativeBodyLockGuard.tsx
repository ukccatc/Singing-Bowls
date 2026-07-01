'use client';

import { releaseNativeBodyLock } from '@/lib/native-body-lock';
import { isNativeApp } from '@/lib/native';
import { useEffect } from 'react';

/** Clears stuck Radix scroll-lock / pointer-events on body in Capacitor WebView. */
export function NativeBodyLockGuard() {
  useEffect(() => {
    if (!isNativeApp()) return;

    releaseNativeBodyLock();

    const tick = () => {
      if (
        document.body.style.pointerEvents === 'none' ||
        document.body.hasAttribute('data-scroll-locked') ||
        document.documentElement.hasAttribute('data-scroll-locked')
      ) {
        releaseNativeBodyLock();
      }
    };

    const observer = new MutationObserver(tick);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'data-scroll-locked'],
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'data-scroll-locked'],
    });

    const interval = window.setInterval(tick, 750);
    document.addEventListener('touchstart', tick, { passive: true, capture: true });

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      document.removeEventListener('touchstart', tick, { capture: true });
    };
  }, []);

  return null;
}
