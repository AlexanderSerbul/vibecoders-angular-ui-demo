import { test, expect } from './fixtures';

test.describe('Гайд по SEO', () => {
  test('страница грузится и показывает готовые просьбы к Claude Code', async ({ page }) => {
    await page.goto('/seo');
    await expect(
      page.getByRole('heading', { name: 'Чтобы сайт находили в поиске', level: 1 }),
    ).toBeVisible();

    // семь шагов — семь готовых фраз для Claude Code
    await expect(page.locator('.prompt')).toHaveCount(7);
  });

  test('панель «непонятные слова» раскрывается', async ({ page }) => {
    await page.goto('/seo');

    const term = page.getByText('рендеринг в браузере');
    await expect(term).toBeHidden();

    await page.getByRole('button', { name: /Непонятные слова/ }).click();
    await expect(term).toBeVisible();
  });

  test('открывается из верхнего меню «Продвижение»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Продвижение' }).click();
    await page.getByRole('menuitem', { name: 'Поиск и SEO', exact: true }).click();

    await expect(page).toHaveURL(/\/seo$/);
    await expect(
      page.getByRole('heading', { name: 'Чтобы сайт находили в поиске', level: 1 }),
    ).toBeVisible();
  });
});
