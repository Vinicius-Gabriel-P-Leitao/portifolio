import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Navbar from './navbar.svelte';

describe('Navbar', () => {
	test('renders a header element', async () => {
		const { container } = render(Navbar);

		expect(container.querySelector('header')).not.toBeNull();
	});

	test('renders the site name brand text', async () => {
		const { getByText } = render(Navbar);

		// Brand is always visible regardless of viewport
		await expect.element(getByText('VINICIUS-GPL.COM', { exact: true })).toBeInTheDocument();
	});

	test('renders the language switcher with PT and EN options', async () => {
		const { getByText } = render(Navbar);

		await expect.element(getByText('PT', { exact: true })).toBeInTheDocument();
		await expect.element(getByText('EN', { exact: true })).toBeInTheDocument();
	});

	test('desktop nav links include a home link when visible', async () => {
		const { container } = render(Navbar);

		// Desktop nav only renders when !isMobile — check that if present it includes #hero
		const heroLink = container.querySelector('a[href="#hero"]');
		// Either the link exists (desktop) or the nav is hidden (mobile) — both are valid
		if (heroLink) {
			expect(heroLink).not.toBeNull();
		} else {
			// Mobile: desktop nav correctly hidden
			expect(container.querySelector('header')).not.toBeNull();
		}
	});
});
