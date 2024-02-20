import { test, expect } from '@playwright/test';

test('Home page test', async ({ page }) => {
	await page.goto('/', { timeout: 10000 });
	await expect(page.locator('h1')).toHaveText('Главная страница');
	await expect(page.locator('h2').nth(0)).toHaveText('Обший доход и расход');
	await expect(page.locator('h2').nth(1)).toHaveText('Обший доход и расход по датам');
	await expect(page.locator('form')).toHaveText('Показат');
});
