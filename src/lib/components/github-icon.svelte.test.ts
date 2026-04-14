import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import GithubIcon from './github-icon.svelte';

describe('GithubIcon', () => {
	test('renders an svg element', async () => {
		const { container } = render(GithubIcon);

		expect(container.querySelector('svg')).not.toBeNull();
	});

	test('applies the size prop to width and height', async () => {
		const { container } = render(GithubIcon, { props: { size: 32 } });

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('32');
		expect(svg?.getAttribute('height')).toBe('32');
	});

	test('defaults to size 24 when no prop is given', async () => {
		const { container } = render(GithubIcon);

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('24');
		expect(svg?.getAttribute('height')).toBe('24');
	});

	test('is aria-hidden by default', async () => {
		const { container } = render(GithubIcon);

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('aria-hidden')).toBe('true');
	});
});
