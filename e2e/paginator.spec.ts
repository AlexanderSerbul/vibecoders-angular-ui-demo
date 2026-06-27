import { test, expect } from './fixtures';

test.describe('Пагинатор', () => {
  test('листалка перелистывает страницы таблицы', async ({ page }) => {
    await page.goto('/paginator');
    await expect(page.getByRole('heading', { name: 'Пагинатор', level: 1 })).toBeVisible();

    // на первой странице видны строки 1–5, но не 6-я
    await expect(page.getByRole('cell', { name: 'Заказ №1', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Заказ №6', exact: true })).toHaveCount(0);

    await page.getByRole('button', { name: 'Следующая страница' }).click();

    // на второй странице — строки 6–10, первой уже нет
    await expect(page.getByRole('cell', { name: 'Заказ №6', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Заказ №1', exact: true })).toHaveCount(0);
  });

  test('подписи листалки на русском', async ({ page }) => {
    await page.goto('/paginator');

    await expect(page.getByText('Строк на странице:')).toBeVisible();
    await expect(page.getByText(/из 23/)).toBeVisible();
  });

  test('открывается из верхнего меню «Таблицы данных»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Таблицы данных' }).click();
    await page.getByRole('menuitem', { name: 'Пагинатор', exact: true }).click();

    await expect(page).toHaveURL(/\/paginator$/);
    await expect(page.getByRole('heading', { name: 'Пагинатор', level: 1 })).toBeVisible();
  });
});
