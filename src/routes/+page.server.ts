import { env } from '$env/dynamic/private';
import { fetchGitHubUser } from '$lib/utils/github';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const github = await fetchGitHubUser('Vinicius-Gabriel-P-Leitao', env.GITHUB_TOKEN);
	return { github };
};
