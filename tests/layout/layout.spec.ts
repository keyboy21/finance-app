import { test, expect } from '@playwright/test';

test('has header and links, texts', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('header')).not.toBe(null);

	// home link and text
	await page.getByRole('link', { name: 'Главная' }).click();
	await expect(page).toHaveURL('/');

	// expense link
	await page.getByRole('link', { name: 'Расходы' }).click();
	await expect(page).toHaveURL('/expenses');

	// income link
	await page.getByRole('link', { name: 'Доходы' }).click();
	await expect(page).toHaveURL('/incomes');
});
