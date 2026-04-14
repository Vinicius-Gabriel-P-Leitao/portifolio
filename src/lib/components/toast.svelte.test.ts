import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Toast from './toast.svelte';

describe('Toast', () => {
	test('renders the live region container', async () => {
		const { container } = render(Toast);

		const region = container.querySelector('[aria-live="polite"]');
		expect(region).not.toBeNull();
	});

	test('renders no toast items when the store is empty', async () => {
		const { container } = render(Toast);

		// No alert roles when store is empty
		expect(container.querySelector('[role="alert"]')).toBeNull();
	});
});
