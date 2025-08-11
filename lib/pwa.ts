'use client';

import { PWAInstallPrompt, NotificationPayload } from './types';

// PWA Installation Management
export class PWAManager {
  private deferredPrompt: any = null;
  private installPromptCallbacks: ((canInstall: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeServiceWorker();
      this.setupInstallPrompt();
      this.setupNotifications();
    }
  }

  // Initialize service worker
  private async initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service worker registered:', registration);

        // Update available
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.showUpdateAvailableNotification();
              }
            });
          }
        });

        // Service worker activated
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });

      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    }
  }

  // Setup install prompt handling
  private setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.notifyInstallPromptAvailable(true);
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.notifyInstallPromptAvailable(false);
      this.showInstallSuccessNotification();
    });
  }

  // Setup push notifications
  private setupNotifications() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NOTIFICATION_CLICKED') {
          this.handleNotificationClick(event.data.payload);
        }
      });
    }
  }

  // Check if app can be installed
  public canInstall(): boolean {
    return this.deferredPrompt !== null;
  }

  // Check if app is already installed
  public isInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true ||
           document.referrer.includes('android-app://');
  }

  // Get install prompt info
  public getInstallPrompt(): PWAInstallPrompt {
    return {
      isInstallable: this.canInstall(),
      isInstalled: this.isInstalled(),
      platform: this.detectPlatform(),
    };
  }

  // Trigger install prompt
  public async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    try {
      const result = await this.deferredPrompt.prompt();
      const outcome = await result.userChoice;
      
      if (outcome === 'accepted') {
        this.deferredPrompt = null;
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Install prompt failed:', error);
      return false;
    }
  }

  // Subscribe to install prompt availability
  public onInstallPromptAvailable(callback: (canInstall: boolean) => void) {
    this.installPromptCallbacks.push(callback);
    // Immediately call with current state
    callback(this.canInstall());
  }

  // Request notification permission
  public async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  // Subscribe to push notifications
  public async subscribeToPushNotifications(): Promise<PushSubscription | null> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
        ),
      });

      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  // Send local notification
  public async sendLocalNotification(payload: NotificationPayload): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icon-192x192.png',
        badge: payload.badge || '/icon-96x96.png',
        data: payload.data,
        requireInteraction: false,
      });
    } catch (error) {
      console.error('Local notification failed:', error);
    }
  }

  // Detect platform
  private detectPlatform(): 'ios' | 'android' | 'desktop' | 'unknown' {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      return 'ios';
    }
    
    if (/android/.test(userAgent)) {
      return 'android';
    }
    
    if (window.innerWidth >= 768) {
      return 'desktop';
    }
    
    return 'unknown';
  }

  // Notify callbacks about install prompt availability
  private notifyInstallPromptAvailable(canInstall: boolean) {
    this.installPromptCallbacks.forEach(callback => {
      callback(canInstall);
    });
  }

  // Show update available notification
  private showUpdateAvailableNotification() {
    this.sendLocalNotification({
      title: 'Update Available',
      body: 'A new version of Himalayan Sound is available. Refresh to update.',
      data: { type: 'app-update' },
      actions: [
        { action: 'update', title: 'Update Now' },
        { action: 'dismiss', title: 'Later' },
      ],
    });
  }

  // Show install success notification
  private showInstallSuccessNotification() {
    this.sendLocalNotification({
      title: 'App Installed',
      body: 'Himalayan Sound has been installed successfully!',
      data: { type: 'install-success' },
    });
  }

  // Handle notification clicks
  private handleNotificationClick(payload: any) {
    if (payload.type === 'app-update' && payload.action === 'update') {
      window.location.reload();
    }
  }

  // Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

// Singleton instance
let pwaManager: PWAManager | null = null;

export const getPWAManager = (): PWAManager => {
  if (!pwaManager && typeof window !== 'undefined') {
    pwaManager = new PWAManager();
  }
  return pwaManager as PWAManager;
};

// Offline storage utilities
export class OfflineStorage {
  private static readonly PRODUCTS_KEY = 'himalayan_products_cache';
  private static readonly CART_KEY = 'himalayan_cart_offline';
  private static readonly WISHLIST_KEY = 'himalayan_wishlist_offline';

  // Cache products for offline access
  static async cacheProducts(products: any[]): Promise<void> {
    try {
      const data = {
        products,
        timestamp: Date.now(),
        version: '1.0.0',
      };
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to cache products:', error);
    }
  }

  // Get cached products
  static getCachedProducts(): any[] {
    try {
      const data = localStorage.getItem(this.PRODUCTS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // Check if cache is less than 24 hours old
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          return parsed.products;
        }
      }
    } catch (error) {
      console.error('Failed to get cached products:', error);
    }
    return [];
  }

  // Save cart offline
  static saveCartOffline(cart: any): void {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart offline:', error);
    }
  }

  // Get offline cart
  static getOfflineCart(): any | null {
    try {
      const data = localStorage.getItem(this.CART_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get offline cart:', error);
      return null;
    }
  }

  // Save wishlist offline
  static saveWishlistOffline(wishlist: string[]): void {
    try {
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Failed to save wishlist offline:', error);
    }
  }

  // Get offline wishlist
  static getOfflineWishlist(): string[] {
    try {
      const data = localStorage.getItem(this.WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get offline wishlist:', error);
      return [];
    }
  }

  // Clear all offline data
  static clearOfflineData(): void {
    try {
      localStorage.removeItem(this.PRODUCTS_KEY);
      localStorage.removeItem(this.CART_KEY);
      localStorage.removeItem(this.WISHLIST_KEY);
    } catch (error) {
      console.error('Failed to clear offline data:', error);
    }
  }
}

// Network status utilities
export class NetworkStatus {
  private static callbacks: ((isOnline: boolean) => void)[] = [];

  static initialize() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.notifyStatusChange(true));
      window.addEventListener('offline', () => this.notifyStatusChange(false));
    }
  }

  static isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  static onStatusChange(callback: (isOnline: boolean) => void) {
    this.callbacks.push(callback);
    // Immediately call with current status
    callback(this.isOnline());
  }

  private static notifyStatusChange(isOnline: boolean) {
    this.callbacks.forEach(callback => callback(isOnline));
  }
}

// Initialize network status monitoring
if (typeof window !== 'undefined') {
  NetworkStatus.initialize();
}