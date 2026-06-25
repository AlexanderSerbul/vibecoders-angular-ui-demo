import { test, expect } from './fixtures';

test.describe('Нижний лист', () => {
  test('открытие, выбор действия и результат', async ({ page }) => {
    await page.goto('/bottom-sheet');
    await expect(page.getByRole('heading', { name: 'Нижний лист', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: 'Поделиться' }).click();

    const sheet = page.locator('mat-bottom-sheet-container');
    await expect(sheet).toBeVisible();
    await expect(sheet).toContainText('Поделиться отчётом');

    await sheet.getByRole('button', { name: 'Telegram' }).click();

    await expect(page.locator('mat-bottom-sheet-container')).toBeHidden();
    await expect(page.getByText('Поделились через: Telegram')).toBeVisible();
  });

  test('открывается из верхнего меню «Поповеры и модалки»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поповеры и модалки' }).click();
    await page.getByRole('menuitem', { name: 'Нижний лист', exact: true }).click();

    await expect(page).toHaveURL(/\/bottom-sheet$/);
    await expect(page.getByRole('heading', { name: 'Нижний лист', level: 1 })).toBeVisible();
  });
});
