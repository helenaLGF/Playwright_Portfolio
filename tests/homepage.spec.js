const { test, expect } = require('@playwright/test');

test("la page d'accueil présente le titre Playwright", async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Playwright/);
});

test("le lien Get started ouvre la documentation", async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});

test("le titre contient volontairement une valeur incorrecte", async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Selenium/);
});