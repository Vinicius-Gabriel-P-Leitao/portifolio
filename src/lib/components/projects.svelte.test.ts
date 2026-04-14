import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Projects from './projects.svelte';
import { PROJECTS } from '$lib/data/projects';

describe('Projects', () => {
	test('renders the section with id="projects"', async () => {
		const { container } = render(Projects);

		const section = container.querySelector('#projects');
		expect(section).not.toBeNull();
	});

	test('renders a card for every project', async () => {
		const { getByRole } = render(Projects);

		const articles = await getByRole('article').all();
		expect(articles.length).toBe(PROJECTS.length);
	});

	test('each card has a heading with the project title', async () => {
		const { getByRole } = render(Projects);

		const headings = await getByRole('heading', { level: 3 }).all();
		expect(headings.length).toBe(PROJECTS.length);
	});
});
