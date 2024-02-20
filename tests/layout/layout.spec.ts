import { test, expect } from '@playwright/test';

test('has header and links, texts', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('header')).not.toBe(null);

	// home link and text
	const Homelink = await page.locator('header > div > a').nth(0);
	const homehrefAttributeValue = await Homelink.getAttribute('href');
	await expect(homehrefAttributeValue).toBe('/');
	await expect(Homelink).toHaveText('Главная');

	// expense link
	const Expenselink = await page.locator('header > div > a').nth(1);
	const expenseshrefAttributeValue = await Expenselink.getAttribute('href');
	await expect(expenseshrefAttributeValue).toBe('/expenses');
	expect(Expenselink).toHaveText('Расходы');

	// income link
	const Incomeslink = await page.locator('header > div > a').nth(2);
	const incomsehrefAttributeValue = await Incomeslink.getAttribute('href');
	await expect(incomsehrefAttributeValue).toBe('/incomes');
	await expect(Incomeslink).toHaveText('Доходы');
});
