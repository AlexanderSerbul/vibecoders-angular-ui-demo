import { test, expect } from './fixtures';

test.describe('Карточка', () => {
  test('кнопка «В корзину» на карточке увеличивает счётчик', async ({ page }) => {
    await page.goto('/cards');
    await expect(page.getByRole('heading', { name: 'Карточка', level: 1 })).toBeVisible();

    await expect(page.getByText('В корзине: 0')).toBeVisible();

    await page.getByRole('button', { name: 'В корзину' }).first().click();
    await expect(page.getByText('В корзине: 1')).toBeVisible();

    await page.getByRole('button', { name: 'В корзину' }).nth(1).click();
    await expect(page.getByText('В корзине: 2')).toBeVisible();
  });

  test('«Очистить» сбрасывает счётчик', async ({ page }) => {
    await page.goto('/cards');

    await page.getByRole('button', { name: 'В корзину' }).first().click();
    await expect(page.getByText('В корзине: 1')).toBeVisible();

    await page.getByRole('button', { name: 'Очистить' }).click();
    await expect(page.getByText('В корзине: 0')).toBeVisible();
  });

  test('открывается из верхнего меню «Макет»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Макет' }).click();
    await page.getByRole('menuitem', { name: 'Карточка', exact: true }).click();

    await expect(page).toHaveURL(/\/cards$/);
    await expect(page.getByRole('heading', { name: 'Карточка', level: 1 })).toBeVisible();
  });
});
