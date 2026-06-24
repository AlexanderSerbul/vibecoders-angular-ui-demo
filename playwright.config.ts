import { defineConfig, devices } from '@playwright/test';

/**
 * E2E-тесты витрины компонентов.
 * На каждую демо-страницу — базовая проверка: маршрут грузится, ключевой
 * компонент виден/работает, в консоли нет ошибок.
 * https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'html' : 'list',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  // Playwright сам поднимет dev-сервер и дождётся порта.
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
