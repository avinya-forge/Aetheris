const { test, expect } = require('@playwright/test');

test('homepage renders Atlas component correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for the Atlas container to be visible
  const atlasContainer = page.locator('[data-testid="atlas-container"]');
  await expect(atlasContainer).toBeVisible({ timeout: 10000 });

  // Ensure the UI element inside Atlas is rendered
  const textElement = page.locator('text=Atlas Vector Engine Active');
  await expect(textElement).toBeVisible();
});
