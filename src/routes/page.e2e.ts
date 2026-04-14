import { expect, test } from '@playwright/test';

test('home page loads and shows the hero heading', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('projects section is present on the page', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('#projects')).toBeAttached();
});

test('about section is present on the page', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('#about')).toBeAttached();
});

test('contact form is visible after scrolling to it', async ({ page }) => {
	await page.goto('/');
	await page.locator('#contact').scrollIntoViewIfNeeded();

	await expect(page.getByRole('form')).toBeVisible();
});

test('language switcher toggles between EN and PT', async ({ page }) => {
	await page.goto('/');

	// Default is PT-BR (base locale, no prefix). Switch to EN.
	await page.getByRole('link', { name: 'EN' }).click();
	await expect(page).toHaveURL(/\/en(\/|$)/);

	// Switch back to PT (base locale, no /pt-br/ prefix)
	await page.getByRole('link', { name: 'PT' }).click();
	await expect(page).not.toHaveURL(/\/en(\/|$)/);
});
