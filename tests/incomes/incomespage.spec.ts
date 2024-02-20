import { test, expect } from '@playwright/test';

test('Incomes page test', async ({ page }) => {
	await page.goto('/incomes', { timeout: 10000 });
	await expect(page.locator('h1')).toHaveText('Страница доходов');
	await expect(page.locator('button').nth(0)).toHaveText(
		'Создать новый доход',
	);

	// check table
	const table = await page.$('table');
	expect(table).not.toBe(null);
	await expect(page.locator('table > thead > tr > th')).toHaveText([
		'#',
		'Имя',
		'Цена',
		'Категория',
		'Дата',
		'Заметка',
		'Действие',
	]);

	const tableBody = await page.$('tbody');
	expect(tableBody).not.toBe(null);
});
