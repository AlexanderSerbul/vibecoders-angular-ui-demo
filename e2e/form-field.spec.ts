import { test, expect } from './fixtures';

test.describe('Поле ввода', () => {
  test('страница показывает поля', async ({ page }) => {
    await page.goto('/form-field');
    await expect(page.getByRole('heading', { name: 'Поле ввода', level: 1 })).toBeVisible();
    expect(await page.locator('.page mat-form-field').count()).toBeGreaterThan(4);
  });

  test('проверка email показывает и убирает ошибку', async ({ page }) => {
    await page.goto('/form-field');

    const email = page.getByLabel('Email');
    await email.fill('не-почта');
    await email.blur();
    await expect(page.getByText('Введите корректный email')).toBeVisible();

    await email.fill('anna@mail.ru');
    await expect(page.getByText('Введите корректный email')).toBeHidden();
  });

  test('пароль можно показать и скрыть', async ({ page }) => {
    await page.goto('/form-field');

    const pwd = page.getByLabel('Пароль', { exact: true });
    await expect(pwd).toHaveAttribute('type', 'password');

    await page.getByRole('button', { name: 'Показать пароль' }).click();
    await expect(pwd).toHaveAttribute('type', 'text');
  });

  test('открывается из верхнего меню «Поля и контролы форм»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();
    await page.getByRole('menuitem', { name: 'Поле ввода', exact: true }).click();

    await expect(page).toHaveURL(/\/form-field$/);
    await expect(page.getByRole('heading', { name: 'Поле ввода', level: 1 })).toBeVisible();
  });
});
