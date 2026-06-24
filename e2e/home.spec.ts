import { test, expect } from './fixtures';

test.describe('Главная', () => {
  test('загружается и показывает каркас каталога', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Material Site/);
    await expect(
      page.getByRole('heading', { name: 'Каталог компонентов Angular Material' }),
    ).toBeVisible();

    // 6 разделов в верхнем меню (desktop-ширина вьюпорта по умолчанию)
    await expect(page.locator('nav.nav > button')).toHaveCount(6);

    // 3 карточки-фичи на главной
    await expect(page.locator('mat-card')).toHaveCount(3);
  });

  test('раздел меню раскрывается, пункты помечены «скоро»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();

    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible();
    // пока ни одна страница не готова — первый пункт неактивен
    await expect(menu.getByRole('menuitem').first()).toBeDisabled();
  });
});
