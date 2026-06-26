import { test, expect } from './fixtures';

test.describe('Меню', () => {
  test('меню действий открывается и пункт выбирается', async ({ page }) => {
    await page.goto('/menu');
    await expect(page.getByRole('heading', { name: 'Меню', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: 'Действия', exact: true }).click();
    await page.getByRole('menuitem', { name: 'Редактировать' }).click();

    await expect(page.getByText('Выбрано: Редактировать')).toBeVisible();
  });

  test('вложенное меню открывается и пункт подменю выбирается', async ({ page }) => {
    await page.goto('/menu');

    await page.getByRole('button', { name: 'Открыть меню' }).click();
    await page.getByRole('menuitem', { name: 'Экспорт' }).click();
    await page.getByRole('menuitem', { name: 'PDF' }).click();

    await expect(page.getByText('Выбрано: Экспорт в PDF')).toBeVisible();
  });

  test('открывается из верхнего меню «Навигация»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Навигация' }).click();
    await page.getByRole('menuitem', { name: 'Меню', exact: true }).click();

    await expect(page).toHaveURL(/\/menu$/);
    await expect(page.getByRole('heading', { name: 'Меню', level: 1 })).toBeVisible();
  });
});
