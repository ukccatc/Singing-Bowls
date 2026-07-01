import Script from 'next/script';

/**
 * Inline in <head> so it runs before first paint in Capacitor WebView.
 * Sets html.native-app which toggles native nav CSS and isNativeApp().
 */
const BOOTSTRAP = `
(function () {
  function detected() {
    var w = window;
    if (w.androidBridge) return true;
    if (w.webkit && w.webkit.messageHandlers && w.webkit.messageHandlers.bridge) return true;
    var c = w.Capacitor;
    if (c) {
      if (c.isNativePlatform && c.isNativePlatform()) return true;
      if (c.getPlatform && c.getPlatform() !== 'web') return true;
      if (c.platform && c.platform !== 'web') return true;
    }
    if (/Capacitor/i.test(navigator.userAgent)) return true;
    return false;
  }
  function apply() {
    if (detected()) {
      var el = document.documentElement;
      el.classList.add('native-app');
      if (/android/i.test(navigator.userAgent)) {
        el.classList.add('native-android');
        el.style.setProperty('--safe-area-top', '32px');
        el.style.setProperty('--safe-area-bottom', '24px');
      }
      if (/iphone|ipad|ipod/i.test(navigator.userAgent)) el.classList.add('native-ios');
      return true;
    }
    return false;
  }
  if (!apply()) {
    var i = 0;
    var t = setInterval(function () {
      if (apply() || ++i > 150) clearInterval(t);
    }, 30);
  }
})();
`;

export function NativeBootstrap() {
  return (
    <Script
      id="native-bootstrap"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: BOOTSTRAP }}
    />
  );
}
