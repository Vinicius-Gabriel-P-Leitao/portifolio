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

	const contactBtn = page
		.getByRole('link', { name: /Contato|Contact/i })
		.or(page.getByTitle('Contato'))
		.first();
	await contactBtn.click();

	await expect(page.getByRole('form')).toBeVisible();
});

test('language switcher toggles between EN and PT', async ({ page }) => {
	await page.goto('/');

	// Default is PT-BR (base locale, no prefix). Switch to EN.
	await page
		.getByRole('link', { name: /English|EN/i })
		.first()
		.click();
	await page.waitForURL((url) => url.pathname.startsWith('/en'));
	await expect(page).toHaveURL(/\/en(\/|$)/);

	// Switch back to PT (base locale, no /en/ prefix)
	await page
		.getByRole('link', { name: /Portuguese|PT/i })
		.first()
		.click();
	await page.waitForURL((url) => !url.pathname.startsWith('/en'));
	await expect(page).toHaveURL(/^https?:\/\/[^/]+\/?$/);
});
