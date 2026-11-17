const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://playwright.dev',
    browserName: 'chromium',
    headless: true,
    trace: 'on-first-retry'
  }
});
