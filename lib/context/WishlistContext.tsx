'use client';

import { syncWishlistToPreferences } from '@/lib/native-actions';
import { isNativeApp } from '@/lib/native';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface WishlistContextType {
  productIds: string[];
  isLoaded: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WISHLIST_STORAGE_KEY = 'himalayan-sound-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        let stored = localStorage.getItem(WISHLIST_STORAGE_KEY);

        if (!stored && isNativeApp()) {
          const { Preferences } = await import('@capacitor/preferences');
          const pref = await Preferences.get({ key: WISHLIST_STORAGE_KEY });
          stored = pref.value;
        }

        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setProductIds(parsed.filter((id): id is string => typeof id === 'string'));
          }
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    void load();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      const serialized = JSON.stringify(productIds);
      localStorage.setItem(WISHLIST_STORAGE_KEY, serialized);
      void syncWishlistToPreferences(serialized);
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  }, [productIds, isLoaded]);

  const isInWishlist = (productId: string) => productIds.includes(productId);

  const addToWishlist = (productId: string) => {
    setProductIds((current) =>
      current.includes(productId) ? current : [...current, productId]
    );
  };

  const removeFromWishlist = (productId: string) => {
    setProductIds((current) => current.filter((id) => id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    const exists = productIds.includes(productId);
    if (exists) {
      removeFromWishlist(productId);
      return false;
    }
    addToWishlist(productId);
    return true;
  };

  const clearWishlist = () => setProductIds([]);

  return (
    <WishlistContext.Provider
      value={{
        productIds,
        isLoaded,
        isInWishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        count: productIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
