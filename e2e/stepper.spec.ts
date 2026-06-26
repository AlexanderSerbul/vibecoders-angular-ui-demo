import { test, expect } from './fixtures';

test.describe('Шаги', () => {
  test('мастер проходит шаги по порядку и собирает сводку', async ({ page }) => {
    await page.goto('/stepper');
    await expect(page.getByRole('heading', { name: 'Шаги', level: 1 })).toBeVisible();

    // шаг 1 — корзина
    await expect(page.getByText('В корзине: наушники и чехол')).toBeVisible();
    await page.getByRole('button', { name: 'К доставке' }).click();

    // шаг 2 — выбираем самовывоз
    await expect(page.getByText('Как доставить заказ?')).toBeVisible();
    await page.getByRole('radio', { name: 'Самовывоз из пункта выдачи' }).click();
    await page.getByRole('button', { name: 'К оплате' }).click();

    // шаг 3 — оплата наличными
    await expect(page.getByText('Чем оплатить?')).toBeVisible();
    await page.getByRole('radio', { name: 'Наличными при получении' }).click();
    await page.getByRole('button', { name: 'Оплатить' }).click();

    // шаг 4 — сводка из выбранного
    await expect(page.getByText('Заказ оформлен!')).toBeVisible();
    await expect(page.getByText('Доставка: самовывозом, оплата: наличными')).toBeVisible();
  });

  test('«Назад» возвращает на предыдущий шаг', async ({ page }) => {
    await page.goto('/stepper');

    await page.getByRole('button', { name: 'К доставке' }).click();
    await expect(page.getByText('Как доставить заказ?')).toBeVisible();

    await page.getByRole('button', { name: 'Назад' }).first().click();
    await expect(page.getByText('В корзине: наушники и чехол')).toBeVisible();
  });

  test('открывается из верхнего меню «Макет»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Макет' }).click();
    await page.getByRole('menuitem', { name: 'Шаги', exact: true }).click();

    await expect(page).toHaveURL(/\/stepper$/);
    await expect(page.getByRole('heading', { name: 'Шаги', level: 1 })).toBeVisible();
  });
});
