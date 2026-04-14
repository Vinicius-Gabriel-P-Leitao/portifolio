import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ProjectCard from './project-card.svelte';
import type { Project } from '$lib/data/projects';

const PROJECT: Project = {
	id: 'test-project',
	title: 'Test Project',
	desc: { en: 'A test project.', 'pt-br': 'Um projeto de teste.' },
	tech: ['TypeScript', 'Svelte'],
	github: 'https://github.com/example/test',
	demo: 'https://example.com',
	status: 'done'
};

describe('ProjectCard', () => {
	test('renders the project title', async () => {
		const { getByRole } = render(ProjectCard, { props: { project: PROJECT } });

		await expect.element(getByRole('heading', { level: 3 })).toBeInTheDocument();
	});

	test('renders tech stack chips', async () => {
		const { getByText } = render(ProjectCard, { props: { project: PROJECT } });

		await expect.element(getByText('TypeScript', { exact: true })).toBeInTheDocument();
		await expect.element(getByText('Svelte', { exact: true })).toBeInTheDocument();
	});

	test('renders a GitHub link when github is provided', async () => {
		const { container } = render(ProjectCard, { props: { project: PROJECT } });

		const link = container.querySelector('a[href="https://github.com/example/test"]');
		expect(link).not.toBeNull();
	});

	test('renders a demo link when demo is provided', async () => {
		const { container } = render(ProjectCard, { props: { project: PROJECT } });

		const link = container.querySelector('a[href="https://example.com"]');
		expect(link).not.toBeNull();
	});

	test('does not render github or demo links when absent', async () => {
		const minimal: Project = { ...PROJECT, github: undefined, demo: undefined };
		const { container } = render(ProjectCard, { props: { project: minimal } });

		expect(container.querySelector('a[href="https://github.com/example/test"]')).toBeNull();
		expect(container.querySelector('a[href="https://example.com"]')).toBeNull();
	});

	test('shows a placeholder when no preview image is set', async () => {
		const { container } = render(ProjectCard, { props: { project: PROJECT } });

		// No <img> for preview when project.preview is undefined
		expect(container.querySelector('img[alt*="preview"]')).toBeNull();
	});

	test('renders preview image when provided', async () => {
		const withPreview: Project = { ...PROJECT, preview: '/img/preview.png' };
		const { container } = render(ProjectCard, { props: { project: withPreview } });

		const img = container.querySelector('img');
		expect(img?.getAttribute('src')).toBe('/img/preview.png');
	});
});
