const { test, expect } = require('@playwright/test');

test('Atlas component should render with atmosphere color', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for the atlas container
  const atlas = await page.locator('[data-testid="atlas-container"]');
  await expect(atlas).toBeVisible();

  // Check if background color is set (default Kp < 5 is #1a1a1a)
  const backgroundColor = await atlas.evaluate(el => window.getComputedStyle(el).backgroundColor);
  console.log('Background Color:', backgroundColor);

  // RGB for #1a1a1a is (26, 26, 26)
  expect(backgroundColor).toBe('rgb(26, 26, 26)');

  // Take a screenshot
  await page.screenshot({ path: 'atlas_verification.png' });
});
