import { fetchGitHubUser } from '$lib/services/github.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const token = platform?.env?.GITHUB_TOKEN;
	const github = await fetchGitHubUser('Vinicius-Gabriel-P-Leitao', token);

	return { github };
};
