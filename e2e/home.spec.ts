import { test, expect } from './fixtures';

test.describe('Главная', () => {
  test('загружается и показывает каркас каталога', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/вайбкодера/);
    await expect(
      page.getByRole('heading', { name: 'Каталог компонентов Angular Material' }),
    ).toBeVisible();

    // 6 разделов в верхнем меню (desktop-ширина вьюпорта по умолчанию)
    await expect(page.locator('nav.nav > button')).toHaveCount(6);
  });

  test('раздел меню раскрывается, пункты помечены «скоро»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();

    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('menuitem').first()).toBeDisabled();
  });

  test('показывает блок «для вайбкодеров» с фразами и ссылкой на исходники', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByText('Давай сделаем минимальный сайт на Angular Material'),
    ).toBeVisible();
    await expect(page.getByText('Добавь в раздел такой-то компонент такой-то')).toBeVisible();

    const actions = page.locator('.vibe-actions');
    await expect(actions.getByRole('link', { name: /Исходники на GitHub/ })).toHaveAttribute(
      'href',
      /github\.com\/AlexanderSerbul/,
    );
    await expect(actions.getByRole('link', { name: /Angular/ })).toHaveAttribute(
      'href',
      /github\.com\/angular\/angular/,
    );
  });

  test('бренд «вайбкодера» ведёт на vibecode, внизу — копирайт', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'вайбкодера' })).toHaveAttribute(
      'href',
      'https://vibecode.bitrix24.tech',
    );

    const footer = page.locator('.site-footer');
    await expect(footer).toContainText('Александр Сербул');
    await expect(footer).toContainText(String(new Date().getFullYear()));
  });
});
