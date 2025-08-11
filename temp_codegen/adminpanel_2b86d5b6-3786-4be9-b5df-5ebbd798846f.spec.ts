
import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('AdminPanel_2025-08-11', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('http://localhost:3000/admin/login');

    // Take screenshot
    await page.screenshot({ path: 'admin-login-page.png', { fullPage: true } });

    // Fill input field
    await page.fill('input[type="email"]', 'admin@himalayansound.com');

    // Navigate to URL
    await page.goto('http://localhost:3000/en');

    // Take screenshot
    await page.screenshot({ path: 'main-site.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin');

    // Take screenshot
    await page.screenshot({ path: 'admin-dashboard.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/products');

    // Take screenshot
    await page.screenshot({ path: 'admin-products.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/content');

    // Take screenshot
    await page.screenshot({ path: 'admin-content.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/orders');

    // Take screenshot
    await page.screenshot({ path: 'admin-orders.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/customers');

    // Take screenshot
    await page.screenshot({ path: 'admin-customers.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/localization');

    // Take screenshot
    await page.screenshot({ path: 'admin-localization.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/analytics');

    // Take screenshot
    await page.screenshot({ path: 'admin-analytics.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/settings');

    // Take screenshot
    await page.screenshot({ path: 'admin-settings.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/login');

    // Take screenshot
    await page.screenshot({ path: 'admin-login-working.png' });

    // Fill input field
    await page.fill('#email', 'admin@himalayansound.com');

    // Navigate to URL
    await page.goto('http://localhost:3000/admin');

    // Take screenshot
    await page.screenshot({ path: 'admin-dashboard-fixed.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/products');

    // Take screenshot
    await page.screenshot({ path: 'admin-products-fixed.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/content');

    // Take screenshot
    await page.screenshot({ path: 'admin-content-fixed.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/orders');

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/orders');

    // Take screenshot
    await page.screenshot({ path: 'admin-orders-fixed.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/customers');

    // Take screenshot
    await page.screenshot({ path: 'admin-customers-fixed.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/localization');

    // Take screenshot
    await page.screenshot({ path: 'admin-localization-fixed.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/analytics');

    // Take screenshot
    await page.screenshot({ path: 'admin-analytics-fixed.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/settings');

    // Take screenshot
    await page.screenshot({ path: 'admin-settings-fixed.png' });

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/login');

    // Take screenshot
    await page.screenshot({ path: 'admin-login-fixed.png' });

    // Fill input field
    await page.fill('input[type="email"]', 'admin@himalayansound.com');

    // Fill input field
    await page.fill('input[type="password"]', 'admin123');

    // Navigate to URL
    await page.goto('http://localhost:3000/admin/content');

    // Take screenshot
    await page.screenshot({ path: 'admin-content-working.png' });
});