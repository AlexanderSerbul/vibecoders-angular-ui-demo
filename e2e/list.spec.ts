import { test, expect } from './fixtures';

test.describe('Списки', () => {
  test('обычный список показывает строки', async ({ page }) => {
    await page.goto('/list');
    await expect(page.getByRole('heading', { name: 'Списки', level: 1 })).toBeVisible();

    await expect(page.getByText('Отчёт.pdf')).toBeVisible();
  });

  test('список с галочками: выбранное собирается внизу', async ({ page }) => {
    await page.goto('/list');

    await expect(page.getByText('Выбрано: ничего')).toBeVisible();

    await page.getByRole('option', { name: 'Грибы' }).click();
    await page.getByRole('option', { name: 'Оливки' }).click();

    const result = page.locator('.result');
    await expect(result).toContainText('Грибы');
    await expect(result).toContainText('Оливки');
  });

  test('открывается из верхнего меню «Макет»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Макет' }).click();
    await page.getByRole('menuitem', { name: 'Списки', exact: true }).click();

    await expect(page).toHaveURL(/\/list$/);
    await expect(page.getByRole('heading', { name: 'Списки', level: 1 })).toBeVisible();
  });
});
