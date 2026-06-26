import { test, expect } from './fixtures';

test.describe('Тулбар', () => {
  test('кнопка‑действие в тулбаре отмечается', async ({ page }) => {
    await page.goto('/toolbar');
    await expect(page.getByRole('heading', { name: 'Тулбар', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: 'Поиск', exact: true }).click();
    await expect(page.getByText('Последнее действие: Поиск')).toBeVisible();
  });

  test('действие из меню «Ещё» отмечается', async ({ page }) => {
    await page.goto('/toolbar');

    await page.getByRole('button', { name: 'Ещё' }).click();
    await page.getByRole('menuitem', { name: 'Настройки' }).click();

    await expect(page.getByText('Последнее действие: Настройки')).toBeVisible();
  });

  test('открывается из верхнего меню «Навигация»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Навигация' }).click();
    await page.getByRole('menuitem', { name: 'Тулбар', exact: true }).click();

    await expect(page).toHaveURL(/\/toolbar$/);
    await expect(page.getByRole('heading', { name: 'Тулбар', level: 1 })).toBeVisible();
  });
});
