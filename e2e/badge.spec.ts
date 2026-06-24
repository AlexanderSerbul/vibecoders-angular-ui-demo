import { test, expect } from './fixtures';

test.describe('Бейдж', () => {
  test('страница показывает бейджи', async ({ page }) => {
    await page.goto('/badge');

    await expect(page.getByRole('heading', { name: 'Бейдж', level: 1 })).toBeVisible();
    expect(await page.locator('.page .mat-badge').count()).toBeGreaterThan(3);
  });

  test('корзина: бейдж считает и прячется при нуле', async ({ page }) => {
    await page.goto('/badge');

    // пустая корзина → бейдж скрыт
    await expect(page.locator('.cart-demo .mat-badge')).toHaveClass(/mat-badge-hidden/);

    await page.getByRole('button', { name: 'Добавить товар' }).click();
    await page.getByRole('button', { name: 'Добавить товар' }).click();
    await expect(page.locator('.cart-demo .mat-badge-content')).toHaveText('2');

    await page.getByRole('button', { name: 'Очистить' }).click();
    await expect(page.locator('.cart-demo .mat-badge')).toHaveClass(/mat-badge-hidden/);
  });

  test('открывается из верхнего меню «Кнопки и индикаторы»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Кнопки и индикаторы' }).click();
    await page.getByRole('menuitem', { name: 'Бейдж', exact: true }).click();

    await expect(page).toHaveURL(/\/badge$/);
    await expect(page.getByRole('heading', { name: 'Бейдж', level: 1 })).toBeVisible();
  });
});
