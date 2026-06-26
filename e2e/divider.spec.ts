import { test, expect } from './fixtures';

test.describe('Разделитель', () => {
  test('разделители отрисованы на странице', async ({ page }) => {
    await page.goto('/divider');
    await expect(page.getByRole('heading', { name: 'Разделитель', level: 1 })).toBeVisible();

    // разделители доступны как role="separator"
    const separators = page.locator('.page').getByRole('separator');
    await expect(separators.first()).toBeVisible();
    expect(await separators.count()).toBeGreaterThan(3);
  });

  test('есть и горизонтальные, и вертикальные разделители', async ({ page }) => {
    await page.goto('/divider');

    await expect(page.locator('.mat-divider-horizontal').first()).toBeVisible();
    await expect(page.locator('.mat-divider-vertical').first()).toBeVisible();
  });

  test('открывается из верхнего меню «Макет»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Макет' }).click();
    await page.getByRole('menuitem', { name: 'Разделитель', exact: true }).click();

    await expect(page).toHaveURL(/\/divider$/);
    await expect(page.getByRole('heading', { name: 'Разделитель', level: 1 })).toBeVisible();
  });
});
