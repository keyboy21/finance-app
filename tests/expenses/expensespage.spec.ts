import { test, expect } from '@playwright/test';

test('expenses page test', async ({ page }) => {
	await page.goto('/expenses', { timeout: 10000 });
	await expect(page.locator('h1')).toHaveText('Страница расходов');
	await expect(page.locator('button').nth(0)).toHaveText(
		'Создать новый расход',
	);

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

test('create expense', async ({ page }) => {
	await page.goto('/expenses');
	await page.getByRole('button', { name: 'Создать новый расход' }).click();
	await page.getByPlaceholder('car').click();
	await page.getByPlaceholder('car').fill('test name for expense');
	await page.getByPlaceholder('500').click();
	await page.getByPlaceholder('500').fill('5000');
	await page.getByRole('button', { name: 'Select...' }).click();
	await page.getByRole('option', { name: 'Дом' }).click();
	await page.getByTestId('text-area').click();
	await page.getByTestId('text-area').fill('some note for test');
	await page.getByRole('button', { name: 'Создать' }).click();
	await expect(
		page.getByRole('cell', {
			name: 'test name for expense',
		}),
	).toContainText('test name for expense');
});

test('delete expense', async ({ page }) => {
	await page.goto('/expenses');
	await page
		.getByRole('row', { name: 'test name for expense 5000' })
		.getByRole('button')
		.nth(1)
		.click();
	await page.getByRole('button', { name: 'Удалить' }).click();
	await expect(
		page.getByRole('row', { name: 'test name for expense 5000' }),
	).not.toBeVisible();
});
