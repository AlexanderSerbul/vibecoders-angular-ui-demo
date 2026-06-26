import { test, expect } from './fixtures';

test.describe('Выпадающий список', () => {
  test('базовый выбор раскрывается и выбирает', async ({ page }) => {
    await page.goto('/select');
    await expect(page.getByRole('heading', { name: 'Выпадающий список', level: 1 })).toBeVisible();

    await page.getByRole('combobox', { name: 'Город' }).first().click();
    await page.getByRole('option', { name: 'Санкт-Петербург' }).click();

    await expect(page.getByText('Выбран город: Санкт-Петербург')).toBeVisible();
  });

  test('множественный выбор отмечает несколько', async ({ page }) => {
    await page.goto('/select');

    await page.getByRole('combobox', { name: 'Интересы' }).click();
    await page.getByRole('option', { name: 'Музыка' }).click();
    await page.getByRole('option', { name: 'Спорт' }).click();
    await page.keyboard.press('Escape');

    const result = page.locator('.multi');
    await expect(result).toContainText('Музыка');
    await expect(result).toContainText('Спорт');
  });

  test('открывается из верхнего меню «Поля и контролы форм»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();
    await page.getByRole('menuitem', { name: 'Выпадающий список', exact: true }).click();

    await expect(page).toHaveURL(/\/select$/);
    await expect(page.getByRole('heading', { name: 'Выпадающий список', level: 1 })).toBeVisible();
  });
});
