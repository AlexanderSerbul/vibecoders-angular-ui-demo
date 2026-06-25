import { test, expect } from './fixtures';

test.describe('Радио-кнопки', () => {
  test('страница показывает радио-кнопки', async ({ page }) => {
    await page.goto('/radio');
    await expect(page.getByRole('heading', { name: 'Радио-кнопки', level: 1 })).toBeVisible();
    expect(await page.getByRole('radio').count()).toBeGreaterThan(5);
  });

  test('выбор одного варианта снимает предыдущий и меняет результат', async ({ page }) => {
    await page.goto('/radio');

    await expect(page.getByRole('radio', { name: 'Курьер' })).toBeChecked();

    await page.getByRole('radio', { name: 'Самовывоз' }).click();

    await expect(page.getByRole('radio', { name: 'Самовывоз' })).toBeChecked();
    await expect(page.getByRole('radio', { name: 'Курьер' })).not.toBeChecked();
    await expect(page.getByText('Выбрано: Самовывоз')).toBeVisible();
  });

  test('открывается из верхнего меню «Поля и контролы форм»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поля и контролы форм' }).click();
    await page.getByRole('menuitem', { name: 'Радио-кнопки', exact: true }).click();

    await expect(page).toHaveURL(/\/radio$/);
    await expect(page.getByRole('heading', { name: 'Радио-кнопки', level: 1 })).toBeVisible();
  });
});
