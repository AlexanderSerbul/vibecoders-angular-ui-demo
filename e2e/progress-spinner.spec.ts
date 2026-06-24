import { test, expect } from './fixtures';

test.describe('Прогресс — круг', () => {
  test('страница показывает спиннеры', async ({ page }) => {
    await page.goto('/progress-spinner');

    await expect(page.getByRole('heading', { name: /Прогресс.*круг/, level: 1 })).toBeVisible();
    expect(await page.locator('mat-progress-spinner, mat-spinner').count()).toBeGreaterThan(2);
  });

  test('определённый процент управляется переключателем', async ({ page }) => {
    await page.goto('/progress-spinner');

    await page.locator('mat-button-toggle[value="75"]').click();
    await expect(page.getByText('Заполнено: 75%')).toBeVisible();
  });

  test('открывается из верхнего меню «Кнопки и индикаторы»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Кнопки и индикаторы' }).click();
    await page.getByRole('menuitem', { name: 'Прогресс (круг)', exact: true }).click();

    await expect(page).toHaveURL(/\/progress-spinner$/);
    await expect(page.getByRole('heading', { name: /Прогресс.*круг/, level: 1 })).toBeVisible();
  });
});
