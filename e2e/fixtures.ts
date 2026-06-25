import { test as base, expect } from '@playwright/test';

/**
 * Расширенный `test` с авто-гардом консоли: любой `console.error` или
 * необработанное исключение на странице проваливают тест. Достаточно
 * импортировать `test`/`expect` отсюда — гард включается сам (auto-fixture).
 */
export const test = base.extend<{ consoleGuard: void }>({
  consoleGuard: [
    async ({ page }, use) => {
      const errors: string[] = [];
      // Игнорируем сторонний шум, не относящийся к приложению: GitHub API (звёзды
      // Angular на главной) и безобидный браузерный «ResizeObserver loop».
      const ignore = (text: string, url = ''): boolean =>
        url.includes('github.com') ||
        text.includes('github.com') ||
        text.includes('ResizeObserver loop');

      page.on('console', (msg) => {
        if (msg.type() !== 'error') return;
        if (!ignore(msg.text(), msg.location()?.url ?? '')) errors.push(msg.text());
      });
      page.on('pageerror', (err) => {
        if (!ignore(err.message)) errors.push(err.message);
      });

      await use();

      expect(errors, 'на странице не должно быть ошибок в консоли').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
