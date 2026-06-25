import { test, expect } from './fixtures';

test.describe('Подсказка', () => {
  test('подсказка появляется при наведении', async ({ page }) => {
    await page.goto('/tooltip');
    await expect(page.getByRole('heading', { name: 'Подсказка', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: 'Наведи на меня' }).hover();

    const tip = page.locator('.mat-mdc-tooltip');
    await expect(tip).toBeVisible();
    await expect(tip).toContainText('всплывающая подсказка');
  });

  test('подсказка на кнопке-иконке', async ({ page }) => {
    await page.goto('/tooltip');

    await page.getByRole('button', { name: 'Поделиться' }).hover();
    await expect(page.locator('.mat-mdc-tooltip')).toContainText('Поделиться');
  });

  test('открывается из верхнего меню «Поповеры и модалки»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поповеры и модалки' }).click();
    await page.getByRole('menuitem', { name: 'Подсказка', exact: true }).click();

    await expect(page).toHaveURL(/\/tooltip$/);
    await expect(page.getByRole('heading', { name: 'Подсказка', level: 1 })).toBeVisible();
  });
});
