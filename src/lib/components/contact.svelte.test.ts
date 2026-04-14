import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Contact from './contact.svelte';

describe('Contact', () => {
	test('renders the contact form', async () => {
		const { getByRole } = render(Contact);

		await expect.element(getByRole('form')).toBeInTheDocument();
	});

	test('renders name, email and message inputs', async () => {
		const { container } = render(Contact);

		// Use element IDs — locale-agnostic
		expect(container.querySelector('#contact-name')).not.toBeNull();
		expect(container.querySelector('#contact-email')).not.toBeNull();
		expect(container.querySelector('#contact-message')).not.toBeNull();
	});

	test('renders a submit button', async () => {
		const { container } = render(Contact);

		expect(container.querySelector('button[type="submit"]')).not.toBeNull();
	});

	test('renders the GitHub link', async () => {
		const { getByRole } = render(Contact);

		const link = getByRole('link', { name: /github/i });
		await expect.element(link).toHaveAttribute('href', expect.stringContaining('github.com'));
	});
});
