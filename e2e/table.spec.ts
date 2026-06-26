import { test, expect } from './fixtures';

test.describe('Таблица', () => {
  test('таблица показывает заголовки и данные', async ({ page }) => {
    await page.goto('/table');
    await expect(page.getByRole('heading', { name: 'Таблица', level: 1 })).toBeVisible();

    await expect(page.getByRole('columnheader', { name: 'Категория' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Остаток' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Кофеварка' })).toBeVisible();
  });

  test('клик по строке выбирает и подсвечивает её', async ({ page }) => {
    await page.goto('/table');

    await expect(page.getByText('Выбрана строка: нет')).toBeVisible();

    await page.getByRole('row', { name: /Наушники/ }).click();
    await expect(page.getByText('Выбрана строка: Наушники')).toBeVisible();
  });

  test('открывается из верхнего меню «Таблицы данных»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Таблицы данных' }).click();
    await page.getByRole('menuitem', { name: 'Таблица', exact: true }).click();

    await expect(page).toHaveURL(/\/table$/);
    await expect(page.getByRole('heading', { name: 'Таблица', level: 1 })).toBeVisible();
  });
});
