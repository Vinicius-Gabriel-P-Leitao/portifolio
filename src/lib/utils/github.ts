export type GitHubUser = {
	login: string;
	avatar_url: string;
	bio: string | null;
	public_repos: number;
	followers: number;
	html_url: string;
};

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
	try {
		const res = await fetch(`https://api.github.com/users/${username}`, {
			headers: { Accept: 'application/vnd.github+json' }
		});

		if (!res.ok) return null;
		return (await res.json()) as GitHubUser;
	} catch {
		return null;
	}
}
