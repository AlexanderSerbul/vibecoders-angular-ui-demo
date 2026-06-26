import { test, expect } from './fixtures';

test.describe('Автодополнение', () => {
  test('подсказки фильтруются по вводу и выбираются', async ({ page }) => {
    await page.goto('/autocomplete');
    await expect(page.getByRole('heading', { name: 'Автодополнение', level: 1 })).toBeVisible();

    const input = page.getByRole('combobox', { name: 'Город' });
    await input.click();
    await input.pressSequentially('Сан');

    await expect(page.getByRole('option', { name: 'Санкт-Петербург' })).toBeVisible();
    await page.getByRole('option', { name: 'Санкт-Петербург' }).click();

    await expect(input).toHaveValue('Санкт-Петербург');
  });

  test('открывается из верхнего меню «Поля и контролы форм»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();
    await page.getByRole('menuitem', { name: 'Автодополнение', exact: true }).click();

    await expect(page).toHaveURL(/\/autocomplete$/);
    await expect(page.getByRole('heading', { name: 'Автодополнение', level: 1 })).toBeVisible();
  });
});
