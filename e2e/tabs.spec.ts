import { test, expect } from './fixtures';

test.describe('Вкладки', () => {
  test('переключение вкладки меняет содержимое и индикатор', async ({ page }) => {
    await page.goto('/tabs');
    await expect(page.getByRole('heading', { name: 'Вкладки', level: 1 })).toBeVisible();

    await expect(page.getByText('Сейчас открыта: «Описание»')).toBeVisible();

    await page.getByRole('tab', { name: 'Отзывы' }).click();
    await expect(page.getByText('Сейчас открыта: «Отзывы»')).toBeVisible();
    await expect(page.getByText('Звук чистый, бас на месте')).toBeVisible();
  });

  test('вкладки с иконками переключаются', async ({ page }) => {
    await page.goto('/tabs');

    await page.getByRole('tab', { name: 'Профиль' }).click();
    await expect(page.getByText('Имя, фото и контакты.')).toBeVisible();
  });

  test('открывается из верхнего меню «Макет»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Макет' }).click();
    await page.getByRole('menuitem', { name: 'Вкладки', exact: true }).click();

    await expect(page).toHaveURL(/\/tabs$/);
    await expect(page.getByRole('heading', { name: 'Вкладки', level: 1 })).toBeVisible();
  });
});
