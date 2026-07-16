import { isNativeApp } from '@/lib/native';

export async function triggerHapticLight(): Promise<void> {
  if (!isNativeApp()) return;
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    // ignore when plugin unavailable
  }
}

export async function triggerHapticMedium(): Promise<void> {
  if (!isNativeApp()) return;
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch {
    // ignore when plugin unavailable
  }
}

export async function shareProduct(title: string, url: string): Promise<void> {
  if (!isNativeApp()) {
    if (navigator.share) {
      await navigator.share({ title, url });
    }
    return;
  }

  try {
    const { Share } = await import('@capacitor/share');
    await Share.share({ title, url, dialogTitle: 'Share product' });
  } catch {
    // user cancelled
  }
}

export async function openExternalUrl(url: string): Promise<void> {
  if (!isNativeApp()) {
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  try {
    const { Browser } = await import('@capacitor/browser');
    await Browser.open({ url });
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export async function cacheProductsForOffline(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const response = await fetch('/api/products');
    if (!response.ok) return;
    const result = await response.json();
    if (!result.data) return;

    const { OfflineStorage } = await import('@/lib/pwa');
    await OfflineStorage.cacheProducts(result.data);

    if (isNativeApp()) {
      const { Preferences } = await import('@capacitor/preferences');
      await Preferences.set({
        key: 'himalayan_products_cache',
        value: JSON.stringify({
          products: result.data,
          timestamp: Date.now(),
        }),
      });
    }
  } catch (error) {
    console.error('Failed to cache products for offline:', error);
  }
}

export async function syncCartToPreferences(cartJson: string): Promise<void> {
  if (!isNativeApp()) return;
  try {
    const { Preferences } = await import('@capacitor/preferences');
    await Preferences.set({ key: 'himalayan-sound-cart', value: cartJson });
  } catch {
    // ignore
  }
}

export async function syncWishlistToPreferences(wishlistJson: string): Promise<void> {
  if (!isNativeApp()) return;
  try {
    const { Preferences } = await import('@capacitor/preferences');
    await Preferences.set({ key: 'himalayan-sound-wishlist', value: wishlistJson });
  } catch {
    // ignore
  }
}

export async function registerPushToken(locale: string): Promise<void> {
  if (!isNativeApp()) return;

  try {
    const { PushNotifications } = await import('@capacitor/push-notifications');
    let perm = await PushNotifications.checkPermissions();

    if (perm.receive === 'prompt') {
      perm = await PushNotifications.requestPermissions();
    }

    if (perm.receive !== 'granted') return;

    await PushNotifications.register();

    PushNotifications.addListener('registration', async (token) => {
      const platform = (await import('@/lib/native')).getNativePlatform();
      if (platform === 'web') return;

      await fetch('/api/push/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token.value,
          platform,
          locale,
        }),
      });
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      const data = action.notification.data as { url?: string };
      if (data?.url && typeof window !== 'undefined') {
        window.location.href = data.url;
      }
    });
  } catch (error) {
    console.error('Push registration failed:', error);
  }
}
