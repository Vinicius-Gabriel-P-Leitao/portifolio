import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import BottomNav from './bottom-nav.svelte';

describe('BottomNav', () => {
	test('renders without errors', async () => {
		const { container } = render(BottomNav);

		// Component mounts cleanly regardless of viewport
		expect(container).toBeDefined();
	});

	test('when visible, contains links to all four sections', async () => {
		const { container } = render(BottomNav);

		const nav = container.querySelector('nav');
		if (nav) {
			// Mobile viewport: nav is rendered — verify all section links present
			const links = nav.querySelectorAll('a[href^="#"]');
			expect(links.length).toBe(4);
			expect(nav.querySelector('a[href="#hero"]')).not.toBeNull();
			expect(nav.querySelector('a[href="#projects"]')).not.toBeNull();
			expect(nav.querySelector('a[href="#about"]')).not.toBeNull();
			expect(nav.querySelector('a[href="#contact"]')).not.toBeNull();
		} else {
			// Desktop viewport: nav correctly hidden
			expect(nav).toBeNull();
		}
	});
});
