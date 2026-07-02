import { isNativeApp } from '@/lib/native';

/** Radix Dialog/Sheet can leave body locked after navigation in Capacitor WebView. */
export function releaseNativeBodyLock(): void {
  if (typeof document === 'undefined' || !isNativeApp()) return;

  document.body.style.pointerEvents = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.body.removeAttribute('data-scroll-locked');
  document.body.removeAttribute('aria-hidden');

  document.documentElement.style.overflow = '';
  document.documentElement.removeAttribute('data-scroll-locked');

  document.querySelectorAll('[data-radix-dialog-overlay]').forEach((node) => {
    if (node instanceof HTMLElement) {
      node.remove();
    }
  });
}
