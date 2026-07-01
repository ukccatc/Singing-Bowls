'use client';

import { useNetworkStatus } from '@/components/native/NetworkContext';
import { WifiOff } from 'lucide-react';

export function NetworkStatusBanner() {
  const { isOnline } = useNetworkStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="site-native-offline-banner fixed left-0 right-0 top-[var(--safe-area-top)] z-[60] flex items-center justify-center gap-2 bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-md">
      <WifiOff className="h-4 w-4 shrink-0" />
      <span>You&apos;re offline — showing cached content where available</span>
    </div>
  );
}
