import { test, expect } from './fixtures';

test.describe('Переключатель', () => {
  test('базовый переключатель меняет состояние', async ({ page }) => {
    await page.goto('/slide-toggle');
    await expect(page.getByRole('heading', { name: 'Переключатель', level: 1 })).toBeVisible();

    const toggle = page.getByRole('switch', { name: 'Уведомления' });
    await expect(toggle).toBeChecked();
    await toggle.click();
    await expect(toggle).not.toBeChecked();
  });

  test('переключатель сразу включает кнопку', async ({ page }) => {
    await page.goto('/slide-toggle');

    const cont = page.getByRole('button', { name: 'Продолжить' });
    await expect(cont).toBeDisabled();

    await page.getByRole('switch', { name: 'Я принимаю условия' }).click();
    await expect(cont).toBeEnabled();
  });

  test('открывается из верхнего меню «Поля и контролы форм»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();
    await page.getByRole('menuitem', { name: 'Переключатель', exact: true }).click();

    await expect(page).toHaveURL(/\/slide-toggle$/);
    await expect(page.getByRole('heading', { name: 'Переключатель', level: 1 })).toBeVisible();
  });
});
