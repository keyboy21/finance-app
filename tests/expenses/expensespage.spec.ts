import { test, expect } from '@playwright/test';

test('Expenses page test', async ({ page }) => {
	await page.goto('/expenses', { timeout: 10000 });
	await expect(page.locator('h1')).toHaveText('Страница расходов');
	await expect(page.locator('button').nth(0)).toHaveText('Создать новый расход');

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
