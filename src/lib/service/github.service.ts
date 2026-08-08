export type GitHubUser = {
	login: string;
	avatar_url: string;
	bio: string | null;
	public_repos: number;
	followers: number;
	html_url: string;
};

export async function fetchGitHubUser(
	username: string,
	token?: string
): Promise<GitHubUser | null> {
	try {
		const headers: Record<string, string> = {
			Accept: 'application/vnd.github+json',
			'User-Agent': 'github.com/Vinicius-Gabriel-P-Leitao/portifolio'
		};

		if (token) headers['Authorization'] = `Bearer ${token}`;
		console.log(`[github] GET /users/${username} (auth: ${token ? 'yes' : 'no'})`);

		const res = await fetch(`https://api.github.com/users/${username}`, { headers });
		console.log(`[github] GET /users/${username} → ${res.status}`);

		if (!res.ok) {
			console.error(`[github] error body:`, await res.text());
			return null;
		}

		return (await res.json()) as GitHubUser;
	} catch (err) {
		console.error(`[github] GET /users/${username} → error:`, err);
		return null;
	}
}
