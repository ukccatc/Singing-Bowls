'use client';

import { CapacitorBridge } from '@/components/native/CapacitorBridge';
import { NativeBodyLockGuard } from '@/components/native/NativeBodyLockGuard';
import { NativeBottomNav } from '@/components/native/NativeBottomNav';
import { NativeChromePortal } from '@/components/native/NativeChromePortal';
import { NativeHeader } from '@/components/native/NativeHeader';
import { NetworkStatusBanner } from '@/components/native/NetworkStatusBanner';
import { NetworkProvider, useNetworkStatus } from '@/components/native/NetworkContext';
import { isNativeTabRoot, shouldShowNativeBottomNav } from '@/lib/native-navigation';
import { releaseNativeBodyLock } from '@/lib/native-body-lock';
import { isNativeApp } from '@/lib/native';
import { Locale } from '@/lib/types';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function NativeLayoutClasses({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    if (!isNativeApp()) return;

    const el = document.documentElement;
    const tabRoot = isNativeTabRoot(pathname, locale);
    const hasBottomNav = shouldShowNativeBottomNav(pathname);

    el.classList.toggle('native-tab-root', tabRoot);
    el.classList.toggle('native-stack', !tabRoot);
    el.classList.toggle('native-has-bottom-nav', hasBottomNav);
    el.classList.toggle('native-offline', !isOnline);
    releaseNativeBodyLock();

    return () => {
      el.classList.remove('native-tab-root', 'native-stack', 'native-has-bottom-nav', 'native-offline');
    };
  }, [pathname, locale, isOnline]);

  return null;
}

function NativeChrome({ locale }: { locale: Locale }) {
  return (
    <NativeChromePortal>
      <CapacitorBridge locale={locale} />
      <NativeBodyLockGuard />
      <NativeLayoutClasses locale={locale} />
      <NetworkStatusBanner />
      <NativeHeader locale={locale} />
      <NativeBottomNav locale={locale} />
    </NativeChromePortal>
  );
}

/** Client-only native shell — chrome always mounts; visibility via html.native-app CSS. */
export function NativeShell({ locale }: { locale: Locale }) {
  return (
    <NetworkProvider>
      <NativeChrome locale={locale} />
    </NetworkProvider>
  );
}
