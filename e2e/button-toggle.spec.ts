import { test, expect } from './fixtures';

test.describe('Кнопки-переключатели', () => {
  test('одиночный выбор меняет выравнивание образца', async ({ page }) => {
    await page.goto('/button-toggle');

    await expect(
      page.getByRole('heading', { name: 'Кнопки-переключатели', level: 1 }),
    ).toBeVisible();

    const sample = page.locator('.sample').first();
    await expect(sample).toHaveCSS('text-align', 'left');

    await page.locator('mat-button-toggle[value="center"]').click();
    await expect(sample).toHaveCSS('text-align', 'center');
  });

  test('множественный выбор включает несколько форматов', async ({ page }) => {
    await page.goto('/button-toggle');

    const sample = page.locator('.sample').nth(1);
    await expect(sample).toHaveCSS('font-style', 'normal');

    await page.locator('mat-button-toggle[value="italic"]').click();
    await expect(sample).toHaveCSS('font-style', 'italic');
  });

  test('открывается из верхнего меню «Кнопки и индикаторы»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Кнопки и индикаторы' }).click();
    await page.getByRole('menuitem', { name: 'Кнопки-переключатели', exact: true }).click();

    await expect(page).toHaveURL(/\/button-toggle$/);
    await expect(
      page.getByRole('heading', { name: 'Кнопки-переключатели', level: 1 }),
    ).toBeVisible();
  });
});
