import { test, expect } from './fixtures';

test.describe('Дерево', () => {
  test('развернуть всё / свернуть всё показывает и прячет ветки', async ({ page }) => {
    await page.goto('/tree');
    await expect(page.getByRole('heading', { name: 'Дерево', level: 1 })).toBeVisible();

    // на старте дерево развёрнуто — глубокий файл виден
    await expect(page.getByText('app.ts')).toBeVisible();

    await page.getByRole('button', { name: 'Свернуть всё' }).click();
    await expect(page.getByText('app.ts')).toBeHidden();

    await page.getByRole('button', { name: 'Развернуть всё' }).click();
    await expect(page.getByText('app.ts')).toBeVisible();
  });

  test('щелчок по папке сворачивает её ветку', async ({ page }) => {
    await page.goto('/tree');

    await expect(page.getByText('home.spec.ts')).toBeVisible();
    await page.getByRole('button', { name: 'Свернуть e2e' }).click();
    await expect(page.getByText('home.spec.ts')).toBeHidden();
  });

  test('открывается из верхнего меню «Макет»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Макет' }).click();
    await page.getByRole('menuitem', { name: 'Дерево', exact: true }).click();

    await expect(page).toHaveURL(/\/tree$/);
    await expect(page.getByRole('heading', { name: 'Дерево', level: 1 })).toBeVisible();
  });
});
