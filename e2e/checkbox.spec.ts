import { test, expect } from './fixtures';

test.describe('Чекбокс', () => {
  test('базовый чекбокс переключается', async ({ page }) => {
    await page.goto('/checkbox');
    await expect(page.getByRole('heading', { name: 'Чекбокс', level: 1 })).toBeVisible();

    const agree = page.getByRole('checkbox', { name: 'Согласен с условиями' });
    await expect(agree).not.toBeChecked();
    await agree.click();
    await expect(agree).toBeChecked();
  });

  test('«Выбрать всё» отмечает все пункты', async ({ page }) => {
    await page.goto('/checkbox');

    await page.getByRole('checkbox', { name: 'Выбрать всё' }).click();

    await expect(page.getByRole('checkbox', { name: 'Грибы' })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Оливки' })).toBeChecked();
  });

  test('частичный выбор делает «Выбрать всё» промежуточным', async ({ page }) => {
    await page.goto('/checkbox');

    // изначально отмечен только «Сыр» (1 из 4) → промежуточное состояние
    const all = page.getByRole('checkbox', { name: 'Выбрать всё' });
    await expect(all).toHaveJSProperty('indeterminate', true);
    await expect(all).not.toBeChecked();
  });

  test('открывается из верхнего меню «Поля и контролы форм»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();
    await page.getByRole('menuitem', { name: 'Чекбокс', exact: true }).click();

    await expect(page).toHaveURL(/\/checkbox$/);
    await expect(page.getByRole('heading', { name: 'Чекбокс', level: 1 })).toBeVisible();
  });
});
