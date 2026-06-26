import { test, expect } from './fixtures';

test.describe('Боковая панель', () => {
  test('панель открывается, выбор раздела меняет контент', async ({ page }) => {
    await page.goto('/sidenav');
    await expect(page.getByRole('heading', { name: 'Боковая панель', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: 'Открыть боковую панель' }).click();
    await page.getByRole('button', { name: 'Настройки' }).click();

    await expect(page.getByText('содержимое раздела «Настройки»')).toBeVisible();
  });

  test('открывается из верхнего меню «Навигация»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Навигация' }).click();
    await page.getByRole('menuitem', { name: 'Боковая панель', exact: true }).click();

    await expect(page).toHaveURL(/\/sidenav$/);
    await expect(page.getByRole('heading', { name: 'Боковая панель', level: 1 })).toBeVisible();
  });
});
