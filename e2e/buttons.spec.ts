import { test, expect } from './fixtures';

test.describe('Кнопки', () => {
  test('страница показывает основные варианты кнопок', async ({ page }) => {
    await page.goto('/buttons');

    // ограничиваемся контентом страницы (.page), чтобы не цеплять кнопки тулбара
    const demo = page.locator('.page');
    await expect(page.getByRole('heading', { name: 'Кнопки', level: 1 })).toBeVisible();
    await expect(demo.locator('[matButton="filled"]').first()).toBeVisible();
    await expect(demo.locator('[matButton="outlined"]').first()).toBeVisible();
    await expect(demo.locator('[matButton="tonal"]').first()).toBeVisible();
    await expect(demo.locator('[matIconButton]').first()).toBeVisible();
    await expect(demo.locator('[matFab]').first()).toBeVisible();
  });

  test('интерактивный счётчик увеличивается по клику', async ({ page }) => {
    await page.goto('/buttons');

    await expect(page.getByText('Нажато: 0')).toBeVisible();
    const btn = page.getByRole('button', { name: 'Нажми меня' });
    await btn.click();
    await btn.click();
    await expect(page.getByText('Нажато: 2')).toBeVisible();

    await page.getByRole('button', { name: 'Сбросить' }).click();
    await expect(page.getByText('Нажато: 0')).toBeVisible();
  });

  test('открывается из верхнего меню «Кнопки и индикаторы»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Кнопки и индикаторы' }).click();
    await page.getByRole('menuitem', { name: 'Кнопки', exact: true }).click();

    await expect(page).toHaveURL(/\/buttons$/);
    await expect(page.getByRole('heading', { name: 'Кнопки', level: 1 })).toBeVisible();
  });
});
