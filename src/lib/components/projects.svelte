<script lang="ts">
	import { browser } from '$app/environment';
	import { intersect } from '$lib/actions/intersect';
	import { PROJECTS } from '$lib/data/projects';
	import type { Project } from '$lib/data/projects';
	import * as m from '$lib/paraglide/messages';
	import ProjectCard from './project-card.svelte';
	import ProjectDetail from './project-detail.svelte';

	const activeProjects = PROJECTS.filter((p) => p.status !== 'idea');
	const ideaProjects = PROJECTS.filter((p) => p.status === 'idea');

	let selected = $state<Project | null>(null);

	$effect(() => {
		if (!browser) return;
		document.body.style.overflow = selected ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<section id="projects" class="px-4 py-20" use:intersect={{ section: 'projects', threshold: 0.1 }}>
	<div class="mx-auto w-full max-w-6xl">
		<h2 class="mb-8 text-[11px] tracking-[0.3em] text-white/40 uppercase">
			{m['projects.title']()}
		</h2>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
			{#each activeProjects as project (project.id)}
				<ProjectCard {project} onSelect={() => (selected = project)} />
			{/each}
		</div>

		{#if ideaProjects.length > 0}
			<h4 class="mt-16 mb-6 text-[11px] tracking-[0.3em] text-white/25 uppercase">
				{m['projects.ideas_title']()}
			</h4>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each ideaProjects as project (project.id)}
					<ProjectCard {project} onSelect={() => (selected = project)} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<ProjectDetail project={selected} onClose={() => (selected = null)} />
