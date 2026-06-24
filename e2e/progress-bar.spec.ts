import { test, expect } from './fixtures';

test.describe('Прогресс — полоса', () => {
  test('страница показывает полосы', async ({ page }) => {
    await page.goto('/progress-bar');

    await expect(page.getByRole('heading', { name: /Прогресс.*полоса/, level: 1 })).toBeVisible();
    expect(await page.locator('mat-progress-bar').count()).toBeGreaterThan(2);
  });

  test('загрузка наполняется до 100%', async ({ page }) => {
    await page.goto('/progress-bar');

    await page.getByRole('button', { name: 'Запустить загрузку' }).click();
    await expect(page.getByText('Готово')).toBeVisible({ timeout: 8000 });
  });

  test('открывается из верхнего меню «Кнопки и индикаторы»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Кнопки и индикаторы' }).click();
    await page.getByRole('menuitem', { name: 'Прогресс (полоса)', exact: true }).click();

    await expect(page).toHaveURL(/\/progress-bar$/);
    await expect(page.getByRole('heading', { name: /Прогресс.*полоса/, level: 1 })).toBeVisible();
  });
});
