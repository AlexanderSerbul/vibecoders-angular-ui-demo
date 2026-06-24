import { test, expect } from './fixtures';

const colorScheme = (page: import('@playwright/test').Page) =>
  page.evaluate(() => document.documentElement.style.colorScheme);

test.describe('Переключение темы', () => {
  test('светлая → тёмная по кнопке', async ({ page }) => {
    await page.goto('/');

    await expect.poll(() => colorScheme(page)).toBe('light');

    await page.getByRole('button', { name: /Сменить тему/ }).click();

    await expect.poll(() => colorScheme(page)).toBe('dark');
  });

  test('смена цветной палитры', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Выбрать цвет темы' }).click();
    await page.getByRole('menuitem', { name: 'Зелёная' }).click();

    await expect(page.locator('html')).toHaveClass(/theme-green/);
  });
});
