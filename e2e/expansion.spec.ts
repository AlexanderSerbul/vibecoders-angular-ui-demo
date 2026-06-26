import { test, expect } from './fixtures';

test.describe('Раскрывающиеся панели', () => {
  test('аккордеон: вопрос раскрывает ответ, открыта одна панель', async ({ page }) => {
    await page.goto('/expansion');
    await expect(
      page.getByRole('heading', { name: 'Раскрывающиеся панели', level: 1 }),
    ).toBeVisible();

    const a1 = page.getByText('исходники лежат на GitHub');
    const a2 = page.getByText('собран вайбкодингом');
    await expect(a1).toBeHidden();

    await page.getByRole('button', { name: 'Это бесплатно?' }).click();
    await expect(a1).toBeVisible();

    // открываем другой вопрос — первый должен закрыться (режим аккордеона)
    await page.getByRole('button', { name: 'Нужно ли уметь программировать?' }).click();
    await expect(a2).toBeVisible();
    await expect(a1).toBeHidden();
  });

  test('режим «несколько сразу»: панели открыты одновременно', async ({ page }) => {
    await page.goto('/expansion');

    await page.getByRole('button', { name: 'Доставка' }).click();
    await page.getByRole('button', { name: 'Оплата' }).click();

    await expect(page.getByText('Курьером и в пункты выдачи')).toBeVisible();
    await expect(page.getByText('Картой онлайн или наличными')).toBeVisible();
  });

  test('открывается из верхнего меню «Макет»', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Макет' }).click();
    await page.getByRole('menuitem', { name: 'Раскрывающиеся панели', exact: true }).click();

    await expect(page).toHaveURL(/\/expansion$/);
    await expect(
      page.getByRole('heading', { name: 'Раскрывающиеся панели', level: 1 }),
    ).toBeVisible();
  });
});
