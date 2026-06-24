import { test, expect } from './fixtures';

test.describe('Иконки', () => {
  test('страница показывает галерею иконок', async ({ page }) => {
    await page.goto('/icon');

    await expect(page.getByRole('heading', { name: 'Иконки', level: 1 })).toBeVisible();
    expect(await page.locator('.icon-grid mat-icon').count()).toBeGreaterThan(20);
  });

  test('клик по иконке показывает подтверждение копирования имени', async ({ page }) => {
    await page.goto('/icon');

    await page.locator('.icon-tile', { hasText: 'home' }).first().click();

    await expect(page.locator('.copied')).toBeVisible();
    await expect(page.locator('.copied')).toContainText('home');
  });

  test('размер иконки меняется переключателем', async ({ page }) => {
    await page.goto('/icon');

    await page.locator('mat-button-toggle[value="56"]').click();
    await expect(page.locator('.size-sample')).toHaveCSS('font-size', '56px');
  });

  test('открывается из верхнего меню «Кнопки и индикаторы»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Кнопки и индикаторы' }).click();
    await page.getByRole('menuitem', { name: 'Иконки', exact: true }).click();

    await expect(page).toHaveURL(/\/icon$/);
    await expect(page.getByRole('heading', { name: 'Иконки', level: 1 })).toBeVisible();
  });
});
