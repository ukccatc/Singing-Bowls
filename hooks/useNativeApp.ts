'use client';

import { isNativeApp, syncNativeAppClass } from '@/lib/native';
import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void): () => void {
  const apply = (): boolean => {
    if (!isNativeApp()) return false;
    syncNativeAppClass(true);
    onChange();
    return true;
  };

  if (apply()) {
    return () => undefined;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (apply() || attempts >= 80) {
      window.clearInterval(timer);
    }
  }, 50);

  return () => window.clearInterval(timer);
}

function getSnapshot(): boolean {
  return isNativeApp();
}

function getServerSnapshot(): boolean {
  return false;
}

export function useNativeApp(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
