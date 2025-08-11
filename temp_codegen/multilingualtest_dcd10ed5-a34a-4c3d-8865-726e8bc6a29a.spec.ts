
import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('MultilingualTest_2025-08-11', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('http://localhost:3000');

    // Take screenshot
    await page.screenshot({ path: 'root-redirect.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/en');

    // Take screenshot
    await page.screenshot({ path: 'english-homepage.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/ru');

    // Take screenshot
    await page.screenshot({ path: 'russian-homepage.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/uk');

    // Take screenshot
    await page.screenshot({ path: 'ukrainian-homepage.png', { fullPage: true } });

    // Click element
    await page.click('[aria-label="Change language"]');

    // Take screenshot
    await page.screenshot({ path: 'language-dropdown.png' });

    // Click element
    await page.click('button:has-text("English")');

    // Take screenshot
    await page.screenshot({ path: 'switched-to-english.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/en/shop');

    // Take screenshot
    await page.screenshot({ path: 'english-shop.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/ru/shop');

    // Take screenshot
    await page.screenshot({ path: 'russian-shop.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/en/about');

    // Navigate to URL
    await page.goto('http://localhost:3000/en/contact');

    // Take screenshot
    await page.screenshot({ path: 'english-contact.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('http://localhost:3000/ru/contact');

    // Take screenshot
    await page.screenshot({ path: 'russian-contact.png', { fullPage: true } });
});