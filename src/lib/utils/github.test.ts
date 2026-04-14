import { afterEach, describe, expect, test, vi } from 'vitest';
import { fetchGitHubUser } from './github';
import type { GitHubUser } from './github';

const MOCK_USER: GitHubUser = {
	login: 'test-user',
	avatar_url: 'https://example.com/avatar.png',
	bio: 'A developer',
	public_repos: 10,
	followers: 42,
	html_url: 'https://github.com/test-user'
};

describe('fetchGitHubUser', () => {
	afterEach(() => vi.unstubAllGlobals());

	test('returns user data on successful response', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(MOCK_USER) })
		);

		const result = await fetchGitHubUser('test-user');

		expect(result).toEqual(MOCK_USER);
	});

	test('calls the GitHub API with the correct URL', async () => {
		const fetchSpy = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(MOCK_USER)
		});
		vi.stubGlobal('fetch', fetchSpy);

		await fetchGitHubUser('test-user');

		expect(fetchSpy).toHaveBeenCalledWith(
			'https://api.github.com/users/test-user',
			expect.objectContaining({ headers: { Accept: 'application/vnd.github+json' } })
		);
	});

	test('returns null when the HTTP response is not ok', async () => {
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

		const result = await fetchGitHubUser('test-user');

		expect(result).toBeNull();
	});

	test('returns null on network error', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

		const result = await fetchGitHubUser('test-user');

		expect(result).toBeNull();
	});
});
