<script lang="ts">
	import { ExternalLink, ArrowUpRight } from 'lucide-svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import GithubIcon from '$lib/components/github-icon.svelte';
	import type { Project, ProjectStatus } from '$lib/data/projects';
	import * as m from '$lib/paraglide/messages';

	let { project, onSelect }: { project: Project; onSelect?: () => void } = $props();

	const desc = $derived(getLocale() === 'pt-br' ? project.desc['pt-br'] : project.desc.en);

	const STATUS_STYLES: Record<ProjectStatus, string> = {
		done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
		'pre-release': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
		'in-progress': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
		idea: 'bg-white/5 text-white/30 border-white/10'
	};

	const statusLabel = $derived(() => {
		switch (project.status) {
			case 'done':
				return m['projects.status.done']();
			case 'pre-release':
				return m['projects.status.pre_release']();
			case 'in-progress':
				return m['projects.status.in_progress']();
			case 'idea':
				return m['projects.status.idea']();
		}
	});
</script>

<article
	class="flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] transition-colors hover:bg-white/[0.04]"
>
	<!-- Preview image -->
	{#if project.preview}
		<div class="flex h-48 items-center justify-center overflow-hidden bg-white/[0.03] px-4 py-3">
			<img
				src={project.preview}
				alt="{project.title} preview"
				class="max-h-full max-w-full object-contain drop-shadow-lg"
				loading="lazy"
			/>
		</div>
	{:else}
		<div class="flex h-48 items-center justify-center bg-indigo-600/5">
			<span class="text-5xl font-bold text-white/10">{project.title[0]}</span>
		</div>
	{/if}

	<!-- Body -->
	<div class="flex flex-1 flex-col p-4">
		<div class="mb-2 flex items-start justify-between gap-2">
			<h3 class="text-sm font-semibold text-white">{project.title}</h3>
			<span
				class={[
					'shrink-0 rounded-full border px-2 py-0.5 text-[9px] tracking-widest uppercase',
					STATUS_STYLES[project.status]
				].join(' ')}
			>
				{statusLabel()}
			</span>
		</div>

		<p class="mb-3 text-xs leading-relaxed text-white/50">{desc}</p>

		<!-- Tech chips -->
		<div class="mb-4 flex flex-wrap gap-1.5">
			{#each project.tech as tech (tech)}
				<span
					class="rounded-full border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] tracking-wider text-white/45 uppercase"
				>
					{tech}
				</span>
			{/each}
		</div>

		<!-- Actions -->
		<div class="mt-auto flex items-center gap-3">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			{#if project.github}
				<a
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-1 text-[11px] text-white/40 transition-colors hover:text-white/80"
					aria-label="GitHub repository for {project.title}"
				>
					<GithubIcon size={13} />
					{m['projects.github']()}
				</a>
			{/if}

			{#if project.demo}
				<a
					href={project.demo}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-1 text-[11px] text-white/40 transition-colors hover:text-white/80"
					aria-label="Live demo for {project.title}"
				>
					<ExternalLink size={13} />
					{m['projects.demo']()}
				</a>
			{/if}
			<!-- eslint-enable svelte/no-navigation-without-resolve -->

			<button
				type="button"
				onclick={onSelect}
				class="ml-auto flex items-center gap-1 text-[11px] text-white/40 transition-colors hover:text-white/80"
			>
				{m['projects.learn_more']()}
				<ArrowUpRight size={13} />
			</button>
		</div>
	</div>
</article>
