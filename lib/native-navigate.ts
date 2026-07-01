import { releaseNativeBodyLock } from '@/lib/native-body-lock';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function nativeNavigate(
  router: AppRouterInstance,
  href: string,
  options?: { replace?: boolean; scroll?: boolean }
): void {
  releaseNativeBodyLock();

  const scroll = options?.scroll ?? true;

  try {
    if (options?.replace) {
      router.replace(href, { scroll });
    } else {
      router.push(href, { scroll });
    }
  } catch {
    window.location.assign(href);
  }
}
