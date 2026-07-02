'use client';

import { cacheProductsForOffline, registerPushToken } from '@/lib/native-actions';
import { isNativeApp, syncNativeAppClass } from '@/lib/native';
import { releaseNativeBodyLock } from '@/lib/native-body-lock';
import { applyNativeSafeAreaInsets, initNativeSafeAreaListeners } from '@/lib/native-safe-area';
import { Locale } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface CapacitorBridgeProps {
  locale: Locale;
}

export function CapacitorBridge({ locale }: CapacitorBridgeProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isNativeApp()) return;

    syncNativeAppClass(true);
    releaseNativeBodyLock();
    let cancelled = false;
    let removeSafeAreaListeners: (() => void) | undefined;
    const cleanups: Array<() => void> = [];

    const init = async () => {
      const { StatusBar, Style } = await import('@capacitor/status-bar');
      const { SplashScreen } = await import('@capacitor/splash-screen');
      const { Keyboard, KeyboardResize } = await import('@capacitor/keyboard');
      const { App } = await import('@capacitor/app');

      removeSafeAreaListeners = initNativeSafeAreaListeners();
      // Re-apply after status bar config settles
      setTimeout(() => applyNativeSafeAreaInsets(), 100);

      try {
        await StatusBar.setOverlaysWebView({ overlay: false });
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#ffffff' });
      } catch {
        // status bar not available on all platforms
      }

      try {
        await Keyboard.setResizeMode({ mode: KeyboardResize.Body });
      } catch {
        // ignore
      }

      const hideSplash = async () => {
        if (cancelled) return;
        try {
          await SplashScreen.hide();
        } catch {
          // ignore
        }
      };

      if (document.readyState === 'complete') {
        setTimeout(hideSplash, 300);
      } else {
        window.addEventListener('load', () => setTimeout(hideSplash, 300), { once: true });
      }

      await cacheProductsForOffline();
      await registerPushToken(locale);

      const urlListener = await App.addListener('appUrlOpen', (event) => {
        try {
          const path = new URL(event.url).pathname;
          if (path) router.push(path);
        } catch {
          // ignore malformed URLs
        }
      });
      cleanups.push(() => urlListener.remove());

      const backListener = await App.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
          router.back();
          return;
        }
        router.push(`/${locale}`);
      });
      cleanups.push(() => backListener.remove());

      const stateListener = await App.addListener('appStateChange', ({ isActive }) => {
        if (isActive) {
          cacheProductsForOffline();
        }
      });
      cleanups.push(() => stateListener.remove());
    };

    init();

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      removeSafeAreaListeners?.();
    };
  }, [locale, router]);

  return null;
}
