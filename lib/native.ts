import { Capacitor } from '@capacitor/core';

export type NativePlatform = 'ios' | 'android' | 'web';

interface CapacitorWindow extends Window {
  Capacitor?: {
    isNativePlatform?: () => boolean;
    getPlatform?: () => string;
  };
  androidBridge?: unknown;
  webkit?: {
    messageHandlers?: {
      bridge?: unknown;
    };
  };
}

function getCapacitorWindow(): CapacitorWindow | null {
  if (typeof window === 'undefined') return null;
  return window as CapacitorWindow;
}

/** Detect Capacitor shell — works before and after React hydration. */
export function isNativeApp(): boolean {
  if (typeof window === 'undefined') return false;

  // Set by NativeBootstrap before React hydrates
  if (document.documentElement.classList.contains('native-app')) {
    return true;
  }

  const win = getCapacitorWindow();
  if (!win) return false;

  if (win.androidBridge) return true;
  if (win.webkit?.messageHandlers?.bridge) return true;

  try {
    if (Capacitor.isNativePlatform()) return true;
    const platform = Capacitor.getPlatform();
    if (platform === 'ios' || platform === 'android') return true;
  } catch {
    // ignore
  }

  const cap = win.Capacitor;
  if (cap?.isNativePlatform?.()) return true;

  const platform = cap?.getPlatform?.();
  if (platform === 'ios' || platform === 'android') return true;

  return false;
}

export function getNativePlatform(): NativePlatform {
  if (typeof window === 'undefined') return 'web';

  try {
    const platform = Capacitor.getPlatform();
    if (platform === 'ios' || platform === 'android') return platform;
  } catch {
    // ignore
  }

  const win = getCapacitorWindow();
  if (!win) return 'web';

  if (win.androidBridge) return 'android';
  if (win.webkit?.messageHandlers?.bridge) return 'ios';

  return 'web';
}

export function syncNativeAppClass(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('native-app', enabled);
}

export function shouldUseNativeCheckout(): boolean {
  return false;
}

export function shouldBlockInAppCheckout(): boolean {
  return isNativeApp();
}
