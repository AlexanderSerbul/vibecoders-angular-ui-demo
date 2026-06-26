import { test, expect } from './fixtures';

test.describe('Слайдер', () => {
  test('страница показывает слайдеры', async ({ page }) => {
    await page.goto('/slider');
    await expect(page.getByRole('heading', { name: 'Слайдер', level: 1 })).toBeVisible();
    expect(await page.getByRole('slider').count()).toBeGreaterThan(3);
  });

  test('слайдер меняет значение и показывает его', async ({ page }) => {
    await page.goto('/slider');

    const volume = page.getByRole('slider', { name: 'Громкость' });
    await expect(volume).toHaveValue('40');

    await volume.focus();
    await volume.press('ArrowRight');
    await volume.press('ArrowRight');

    await expect(volume).toHaveValue('42');
    await expect(page.getByText('Громкость: 42%')).toBeVisible();
  });

  test('открывается из верхнего меню «Поля и контролы форм»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();
    await page.getByRole('menuitem', { name: 'Слайдер', exact: true }).click();

    await expect(page).toHaveURL(/\/slider$/);
    await expect(page.getByRole('heading', { name: 'Слайдер', level: 1 })).toBeVisible();
  });
});
