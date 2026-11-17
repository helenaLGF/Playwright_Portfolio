const { test, expect } = require('@playwright/test');

test('identifier le lien Get started', async ({ page }) => {
  await page.goto('/');

  const lien = page.getByRole('link', { name: 'Get started' });

  await expect(lien).toBeVisible();
});

test('identifier le titre Installation', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Get started' }).click();

  const titre = page.getByRole('heading', { name: 'Installation' });

  await expect(titre).toBeVisible();
});
test('identifier un texte sur la page', async ({ page }) => {
  await page.goto('/');

  const texte = page.getByText('Get started');

  await expect(texte).toBeVisible();
});
test('identifier les boutons de la page', async ({ page }) => {
  await page.goto('/');

  const boutons = page.getByRole('button');

  console.log(await boutons.allTextContents());
});

test('identifier le bouton Search', async ({ page }) => {
  await page.goto('/');

  const bouton = page.getByRole('button', { name: 'Search' });

  await expect(bouton).toBeVisible();
});

test('ouvrir la recherche', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByRole('searchbox')).toBeVisible();
});

test('inspecter les champs de saisie', async ({ page }) => {
  await page.goto('/');

  console.log(await page.locator('input').evaluateAll(inputs =>
    inputs.map(input => ({
      placeholder: input.getAttribute('placeholder'),
      type: input.getAttribute('type'),
      ariaLabel: input.getAttribute('aria-label')
    }))
  ));
});

test('saisir une recherche', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search' }).click();

  await page.getByPlaceholder('Search docs').fill('locators');

  await expect(page.getByPlaceholder('Search docs')).toHaveValue('locators');
});

test('effacer une recherche', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search' }).click();

  const recherche = page.getByPlaceholder('Search docs');

  await recherche.fill('locators');
  await recherche.clear();

  await expect(recherche).toHaveValue('');
});
