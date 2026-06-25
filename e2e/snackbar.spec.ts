import { test, expect } from './fixtures';

test.describe('Снэкбар', () => {
  test('простое уведомление появляется', async ({ page }) => {
    await page.goto('/snackbar');
    await expect(page.getByRole('heading', { name: 'Снэкбар', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(page.locator('.mat-mdc-snack-bar-container')).toContainText('Сохранено');
  });

  test('действие «Отменить» обрабатывается', async ({ page }) => {
    await page.goto('/snackbar');

    await page.getByRole('button', { name: 'Удалить письмо' }).click();
    await expect(page.getByText('Письмо удалено')).toBeVisible();

    await page.getByRole('button', { name: 'Отменить' }).click();
    await expect(page.getByText('Удаление отменено')).toBeVisible();
  });

  test('открывается из верхнего меню «Поповеры и модалки»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поповеры и модалки' }).click();
    await page.getByRole('menuitem', { name: 'Снэкбар', exact: true }).click();

    await expect(page).toHaveURL(/\/snackbar$/);
    await expect(page.getByRole('heading', { name: 'Снэкбар', level: 1 })).toBeVisible();
  });
});
