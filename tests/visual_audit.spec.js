const { test, expect } = require('@playwright/test');

test('Visual Audit - Desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'audit-desktop.png' });
});

test('Visual Audit - Mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'audit-mobile.png' });
});
