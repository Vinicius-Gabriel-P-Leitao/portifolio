import { fetchGitHubUser } from '$lib/utils/github';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const github = await fetchGitHubUser('Vinicius-Gabriel-P-Leitao');
	return { github };
};
