'use client';

import { isNativeApp } from '@/lib/native';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface NetworkContextValue {
  isOnline: boolean;
}

const NetworkContext = createContext<NetworkContextValue>({ isOnline: true });

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const setOnline = (value: boolean) => setIsOnline(value);
    setOnline(navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    let removeNative: (() => void) | undefined;

    if (isNativeApp()) {
      import('@capacitor/network').then(async ({ Network }) => {
        const status = await Network.getStatus();
        setOnline(status.connected);
        const listener = await Network.addListener('networkStatusChange', (s) => {
          setOnline(s.connected);
        });
        removeNative = () => listener.remove();
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      removeNative?.();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline }}>{children}</NetworkContext.Provider>
  );
}

export function useNetworkStatus() {
  return useContext(NetworkContext);
}
