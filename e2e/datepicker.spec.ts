import { test, expect } from './fixtures';

test.describe('Дата', () => {
  test('календарь открывается и дата выбирается', async ({ page }) => {
    await page.goto('/datepicker');
    await expect(page.getByRole('heading', { name: 'Дата', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: 'Open calendar' }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.locator('.mat-calendar-body-cell', { hasText: '15' }).first().click();
    await expect(page.getByText(/Выбрано:\s*\d{2}\.\d{2}\.\d{4}/)).toBeVisible();
  });

  test('открывается из верхнего меню «Поля и контролы форм»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();
    await page.getByRole('menuitem', { name: 'Дата', exact: true }).click();

    await expect(page).toHaveURL(/\/datepicker$/);
    await expect(page.getByRole('heading', { name: 'Дата', level: 1 })).toBeVisible();
  });
});
