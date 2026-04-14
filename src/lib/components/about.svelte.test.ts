import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import About from './about.svelte';

describe('About', () => {
	test('renders the section with id="about"', async () => {
		const { container } = render(About);

		const section = container.querySelector('#about');
		expect(section).not.toBeNull();
	});

	test('renders a heading for the section', async () => {
		const { getByRole } = render(About);

		await expect.element(getByRole('heading', { level: 2 })).toBeInTheDocument();
	});

	test('renders tech stack items', async () => {
		const { getByText } = render(About);

		// Spot-check a few known tech items — use exact: true to avoid matching substrings in the bio
		await expect.element(getByText('Tailwind', { exact: true })).toBeInTheDocument();
		await expect.element(getByText('Docker', { exact: true })).toBeInTheDocument();
	});
});
