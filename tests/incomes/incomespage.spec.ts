import { test, expect } from '@playwright/test';

test('Incomes page test', async ({ page }) => {
	await page.goto('/incomes', { timeout: 10000 });
	await expect(page.locator('h1')).toHaveText('Страница доходов');
	await expect(page.locator('button').nth(0)).toHaveText('Создать новый доход');

	// check table
	await expect(page.locator('table')).not.toBe(null);
	await expect(page.locator('table > thead > tr > th')).toHaveText([
		'#',
		'Имя',
		'Цена',
		'Категория',
		'Дата',
		'Заметка',
		'Действие',
	]);

	await expect(page.locator('tbody')).not.toBe(null);
});

test('create income', async ({ page }) => {
	await page.goto('/incomes');
	await page.getByRole('button', { name: 'Создать новый доход' }).click();
	await page.getByPlaceholder('car').click();
	await page.getByPlaceholder('car').fill('test name for income');
	await page.getByPlaceholder('500').click();
	await page.getByPlaceholder('500').fill('300');
	await page.getByRole('button', { name: 'Select...' }).click();
	await page.getByRole('option', { name: 'Зарплата' }).click();
	await page.getByTestId('text-area').click();
	await page.getByTestId('text-area').fill('some note for test');
	await page.getByRole('button', { name: 'Создать' }).click();
	await expect(
		page.getByRole('cell', {
			name: 'test name for income',
		}),
	).toContainText('test name for income');
});

test('delete income', async ({ page }) => {
	await page.goto('/incomes');
	await page
		.getByRole('row', { name: 'test name for income 300' })
		.getByRole('button')
		.nth(1)
		.click();
	await page.getByRole('button', { name: 'Удалить' }).click();
	await expect(
		page.getByRole('row', { name: 'test name for income 300' }),
	).not.toBeVisible();
});
