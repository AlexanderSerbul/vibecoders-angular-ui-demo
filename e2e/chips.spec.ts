import { test, expect } from './fixtures';

test.describe('Чипы', () => {
  test('тег-бирку можно удалить', async ({ page }) => {
    await page.goto('/chips');
    await expect(page.getByRole('heading', { name: 'Чипы', level: 1 })).toBeVisible();

    const chip = page.locator('mat-chip', { hasText: 'Срочно' });
    await expect(chip).toBeVisible();
    await chip.getByRole('button', { name: 'Удалить тег' }).click();

    await expect(page.locator('mat-chip', { hasText: 'Срочно' })).toHaveCount(0);
  });

  test('чип-фильтр выбирается', async ({ page }) => {
    await page.goto('/chips');

    await page.getByRole('option', { name: 'Дешёвые' }).click();
    await expect(page.getByText('Выбрано: Дешёвые')).toBeVisible();
  });

  test('можно добавить свой тег', async ({ page }) => {
    await page.goto('/chips');

    const input = page.getByPlaceholder('Новый тег…');
    await input.click();
    await input.fill('Котики');
    await input.press('Enter');

    await expect(page.locator('mat-chip-row', { hasText: 'Котики' })).toBeVisible();
  });

  test('открывается из верхнего меню «Поля и контролы форм»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();
    await page.getByRole('menuitem', { name: 'Чипы', exact: true }).click();

    await expect(page).toHaveURL(/\/chips$/);
    await expect(page.getByRole('heading', { name: 'Чипы', level: 1 })).toBeVisible();
  });
});
