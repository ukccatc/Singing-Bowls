import { getNativePlatform, isNativeApp } from '@/lib/native';

const ANDROID_STATUS_BAR_FALLBACK_PX = 32;
const ANDROID_NAV_BAR_FALLBACK_PX = 24;

function readEnvInset(prop: '--safe-area-top' | '--safe-area-bottom'): number {
  if (typeof document === 'undefined') return 0;
  const probe = document.createElement('div');
  probe.style.cssText =
    prop === '--safe-area-top'
      ? 'position:fixed;top:0;height:env(safe-area-inset-top,0px);pointer-events:none;visibility:hidden;'
      : 'position:fixed;bottom:0;height:env(safe-area-inset-bottom,0px);pointer-events:none;visibility:hidden;';
  document.body.appendChild(probe);
  const px = probe.getBoundingClientRect().height;
  document.body.removeChild(probe);
  return px;
}

function estimateAndroidTopInset(): number {
  // visualViewport offset can reflect system chrome on some WebViews
  const vvTop = window.visualViewport?.offsetTop ?? 0;
  return Math.max(vvTop, ANDROID_STATUS_BAR_FALLBACK_PX);
}

function estimateAndroidBottomInset(): number {
  const screenH = window.screen.height;
  const innerH = window.innerHeight;
  const vvH = window.visualViewport?.height ?? innerH;
  const fromDiff = Math.max(0, screenH - innerH - estimateAndroidTopInset());
  const fromVv = Math.max(0, innerH - vvH);
  return Math.max(fromDiff, fromVv, ANDROID_NAV_BAR_FALLBACK_PX);
}

/** Inject reliable safe-area CSS variables for Capacitor WebViews (esp. Android). */
export function applyNativeSafeAreaInsets(): void {
  if (typeof document === 'undefined' || !isNativeApp()) return;

  const root = document.documentElement;
  const platform = getNativePlatform();

  root.classList.toggle('native-android', platform === 'android');
  root.classList.toggle('native-ios', platform === 'ios');

  const envTop = readEnvInset('--safe-area-top');
  const envBottom = readEnvInset('--safe-area-bottom');

  let top = envTop;
  let bottom = envBottom;

  if (platform === 'android') {
    top = Math.max(envTop, estimateAndroidTopInset());
    bottom = Math.max(envBottom, estimateAndroidBottomInset());
  }

  root.style.setProperty('--safe-area-top', `${top}px`);
  root.style.setProperty('--safe-area-bottom', `${bottom}px`);
}

export function initNativeSafeAreaListeners(): () => void {
  if (typeof window === 'undefined' || !isNativeApp()) {
    return () => undefined;
  }

  const update = () => applyNativeSafeAreaInsets();
  update();

  window.addEventListener('resize', update);
  window.visualViewport?.addEventListener('resize', update);
  window.visualViewport?.addEventListener('scroll', update);

  return () => {
    window.removeEventListener('resize', update);
    window.visualViewport?.removeEventListener('resize', update);
    window.visualViewport?.removeEventListener('scroll', update);
  };
}
