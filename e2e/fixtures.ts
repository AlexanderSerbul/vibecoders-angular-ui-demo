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
      page.on('console', (msg) => {
        if (msg.type() !== 'error') return;
        // Сторонний GitHub API (звёзды Angular на главной) — его лимиты/сеть не наша ошибка.
        const url = msg.location()?.url ?? '';
        if (url.includes('github.com') || msg.text().includes('github.com')) return;
        errors.push(msg.text());
      });
      page.on('pageerror', (err) => errors.push(err.message));

      await use();

      expect(errors, 'на странице не должно быть ошибок в консоли').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
