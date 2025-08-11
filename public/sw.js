const CACHE_NAME = 'himalayan-sound-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/shop',
  '/about',
  '/blog',
  '/contact',
  '/offline',
  '/manifest.json',
];

const RUNTIME_CACHE = 'himalayan-sound-runtime';

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service worker installed');
        return self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // API requests - network first, cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE)
            .then((cache) => {
              cache.put(request, responseClone);
            });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Product images and assets - cache first
  if (url.pathname.includes('/images/') || url.pathname.includes('/audio/')) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request)
            .then((response) => {
              const responseClone = response.clone();
              caches.open(RUNTIME_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
              return response;
            });
        })
    );
    return;
  }

  // HTML pages - network first, cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE)
            .then((cache) => {
              cache.put(request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // Try cache first
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/offline');
            }
            throw new Error('No cached version available');
          });
      })
  );
});

// Background sync for offline cart updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'cart-sync') {
    event.waitUntil(syncCart());
  }
  
  if (event.tag === 'order-sync') {
    event.waitUntil(syncOrders());
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/icon-96x96.png',
    image: data.image,
    data: data.data,
    actions: data.actions || [
      {
        action: 'view',
        title: 'View',
        icon: '/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ],
    tag: data.tag || 'default',
    requireInteraction: data.requireInteraction || false,
    vibrate: [200, 100, 200],
    timestamp: Date.now(),
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const { action, data } = event;
  
  if (action === 'close') {
    return;
  }

  const urlToOpen = data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Try to focus existing window
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Sync functions
async function syncCart() {
  try {
    const cartData = await getStoredCartData();
    if (cartData && cartData.pendingItems.length > 0) {
      const response = await fetch('/api/cart/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });
      
      if (response.ok) {
        await clearPendingCartData();
        console.log('Cart synced successfully');
      }
    }
  } catch (error) {
    console.error('Cart sync failed:', error);
  }
}

async function syncOrders() {
  try {
    const orderData = await getStoredOrderData();
    if (orderData && orderData.pendingOrders.length > 0) {
      for (const order of orderData.pendingOrders) {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });
        
        if (response.ok) {
          await removePendingOrder(order.id);
          console.log('Order synced successfully:', order.id);
        }
      }
    }
  } catch (error) {
    console.error('Order sync failed:', error);
  }
}

// Helper functions for local storage
async function getStoredCartData() {
  return new Promise((resolve) => {
    const data = localStorage.getItem('pendingCartUpdates');
    resolve(data ? JSON.parse(data) : null);
  });
}

async function clearPendingCartData() {
  return new Promise((resolve) => {
    localStorage.removeItem('pendingCartUpdates');
    resolve();
  });
}

async function getStoredOrderData() {
  return new Promise((resolve) => {
    const data = localStorage.getItem('pendingOrders');
    resolve(data ? JSON.parse(data) : null);
  });
}

async function removePendingOrder(orderId) {
  return new Promise((resolve) => {
    const data = localStorage.getItem('pendingOrders');
    if (data) {
      const orderData = JSON.parse(data);
      orderData.pendingOrders = orderData.pendingOrders.filter(order => order.id !== orderId);
      localStorage.setItem('pendingOrders', JSON.stringify(orderData));
    }
    resolve();
  });
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});