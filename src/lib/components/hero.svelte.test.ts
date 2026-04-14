import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Hero from './hero.svelte';

describe('Hero', () => {
	test('renders the name heading', async () => {
		const { getByRole } = render(Hero, { props: { github: null } });

		await expect.element(getByRole('heading', { level: 1 })).toBeInTheDocument();
	});

	test('renders the CTA link to #projects', async () => {
		const { container } = render(Hero, { props: { github: null } });

		// Find by href — locale-agnostic (text changes between EN and PT-BR)
		const link = container.querySelector('a[href="#projects"]');
		expect(link).not.toBeNull();
	});

	test('renders GitHub link', async () => {
		const { getByRole } = render(Hero, { props: { github: null } });

		const githubLink = getByRole('link', { name: /github/i });
		await expect.element(githubLink).toBeInTheDocument();
	});

	test('shows avatar when github data is provided', async () => {
		const github = {
			login: 'vinicius',
			avatar_url: 'https://example.com/avatar.png',
			bio: null,
			public_repos: 5,
			followers: 10,
			html_url: 'https://github.com/vinicius'
		};

		const { getByRole } = render(Hero, { props: { github } });

		await expect.element(getByRole('img', { name: /vinicius/i })).toBeInTheDocument();
	});

	test('does not render avatar when github is null', async () => {
		const { getByRole } = render(Hero, { props: { github: null } });

		await expect.element(getByRole('img')).not.toBeInTheDocument();
	});
});
