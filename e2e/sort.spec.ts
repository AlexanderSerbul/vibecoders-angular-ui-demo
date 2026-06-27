import { test, expect } from './fixtures';

test.describe('Сортировка', () => {
  test('клик по заголовку сортирует строки', async ({ page }) => {
    await page.goto('/sort');
    await expect(page.getByRole('heading', { name: 'Сортировка', level: 1 })).toBeVisible();

    const rows = page.locator('tr.mat-mdc-row');
    // по умолчанию порядок исходный — первой идёт «Кофеварка»
    await expect(rows.first()).toContainText('Кофеварка');

    // сортировка по цене вверх — дешёвое наверх
    await page.getByRole('columnheader', { name: 'Цена' }).click();
    await expect(rows.first()).toContainText('Коврик для мыши');
    await expect(page.getByText('Цена — по возрастанию')).toBeVisible();

    // ещё клик — по убыванию, дорогое наверх
    await page.getByRole('columnheader', { name: 'Цена' }).click();
    await expect(rows.first()).toContainText('Кофеварка');
    await expect(page.getByText('Цена — по убыванию')).toBeVisible();
  });

  test('сортировка по названию — по алфавиту', async ({ page }) => {
    await page.goto('/sort');

    await page.getByRole('columnheader', { name: 'Название' }).click();
    const rows = page.locator('tr.mat-mdc-row');
    await expect(rows.first()).toContainText('Клавиатура');
    await expect(page.getByText('Название — по возрастанию')).toBeVisible();
  });

  test('открывается из верхнего меню «Таблицы данных»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Таблицы данных' }).click();
    await page.getByRole('menuitem', { name: 'Сортировка', exact: true }).click();

    await expect(page).toHaveURL(/\/sort$/);
    await expect(page.getByRole('heading', { name: 'Сортировка', level: 1 })).toBeVisible();
  });
});
