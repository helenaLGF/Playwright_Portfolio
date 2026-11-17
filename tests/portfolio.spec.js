
const { test, expect } = require('@playwright/test');

const REPORT_URL = 'https://api-testing-portfolio.pages.dev/report/';

test('Le rapport Allure est accessible', async ({ page }) => {
  const response = await page.goto(REPORT_URL);

  expect(response.status()).toBe(200);
  await expect(page).toHaveURL(REPORT_URL);
});

test('Le rapport Allure affiche son contenu', async ({ page }) => {
  await page.goto(REPORT_URL);

  await expect(page.locator('body')).not.toBeEmpty();
});

test('Le rapport Allure possède un titre', async ({ page }) => {
  await page.goto(REPORT_URL);

  await expect(page).toHaveTitle(/Allure/i);
});

test('Afficher le détail du test POST Create', async ({ page }) => {
  await page.goto(REPORT_URL);

  // Déployer la section com
  const section = page.getByTestId('tree-section')
    .filter({ has: page.getByTestId('tree-section-title')
      .filter({ hasText: /^com$/ }) });

  await expect(section).toBeVisible();
  await section.getByTestId('tree-arrow').click();

  // Sélectionner le scénario POST
  const scenario = page.getByTestId('tree-leaf')
    .filter({ hasText: 'POST - Create a new post' });

  await expect(scenario).toHaveCount(1);
  await scenario.click();

  // Vérifier les informations du scénario
  await expect(page.getByTestId('test-result-info-title'))
    .toHaveText('POST - Create a new post');

  await expect(page.getByTestId('test-result-status-passed'))
    .toBeVisible();

  await expect(page.getByTestId('test-result-description'))
    .toBeVisible();

  await expect(page.getByTestId('test-result-steps-root'))
    .toBeVisible();

  await expect(page.getByTestId('test-result-step-title'))
    .toHaveCount(4);
});

test('Rechercher un dépôt GitHub', async ({ page }) => {
  await page.goto('https://github.com/helenaLGF');

  await expect(
    page.getByRole('heading', { name: 'helenaLGF' })
  ).toBeVisible();

  await page.getByRole('link', { name: 'Repositories' }).click();

  await expect(page).toHaveURL(/tab=repositories/);

  await expect(
    page.getByRole('link', { name: 'api-testing-portfolio-showcase' })
  ).toBeVisible();
});
