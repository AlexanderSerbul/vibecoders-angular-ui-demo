import { test, expect } from './fixtures';

test.describe('Диалог', () => {
  test('подтверждение: открыть и удалить', async ({ page }) => {
    await page.goto('/dialog');
    await expect(page.getByRole('heading', { name: 'Диалог', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: 'Удалить файл' }).click();

    const dlg = page.getByRole('dialog');
    await expect(dlg).toBeVisible();
    await expect(dlg.getByRole('heading', { name: 'Удалить файл?' })).toBeVisible();

    await dlg.getByRole('button', { name: 'Удалить' }).click();

    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.getByText('Файл удалён')).toBeVisible();
  });

  test('подтверждение: отмена ничего не удаляет', async ({ page }) => {
    await page.goto('/dialog');

    await page.getByRole('button', { name: 'Удалить файл' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Отмена' }).click();

    await expect(page.getByText('Отменено')).toBeVisible();
  });

  test('окно с полем ввода возвращает имя на страницу', async ({ page }) => {
    await page.goto('/dialog');

    await page.getByRole('button', { name: 'Представиться' }).click();

    const dlg = page.getByRole('dialog');
    await dlg.getByRole('textbox').fill('Александр');
    await dlg.getByRole('button', { name: 'Готово' }).click();

    await expect(page.getByText('Привет, Александр!')).toBeVisible();
  });

  test('открывается из верхнего меню «Поповеры и модалки»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Поповеры и модалки' }).click();
    await page.getByRole('menuitem', { name: 'Диалог', exact: true }).click();

    await expect(page).toHaveURL(/\/dialog$/);
    await expect(page.getByRole('heading', { name: 'Диалог', level: 1 })).toBeVisible();
  });
});
