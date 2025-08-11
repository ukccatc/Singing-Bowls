
import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('PageTest_2025-08-11', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('http://localhost:3000');

    // Take screenshot
    await page.screenshot({ path: 'homepage.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/shop');

    // Take screenshot
    await page.screenshot({ path: 'shop-page.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/blog');

    // Take screenshot
    await page.screenshot({ path: 'blog-page.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/about');

    // Take screenshot
    await page.screenshot({ path: 'about-page.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/contact');

    // Take screenshot
    await page.screenshot({ path: 'contact-page.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/cart');

    // Take screenshot
    await page.screenshot({ path: 'cart-page.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/checkout');

    // Take screenshot
    await page.screenshot({ path: 'checkout-page.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/auth/signin');

    // Take screenshot
    await page.screenshot({ path: 'signin-page.png', { fullPage: true } });
});