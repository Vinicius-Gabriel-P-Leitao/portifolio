<script lang="ts">
	import { ExternalLink, ArrowUpRight } from 'lucide-svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import GithubIcon from '$lib/components/github-icon.svelte';
	import SpotlightCard from '$lib/components/svelte-bits/spotlight-card.svelte';
	import type { Project, ProjectStatus } from '$lib/data/projects';
	import * as m from '$lib/paraglide/messages';

	let { project, onSelect }: { project: Project; onSelect?: () => void } = $props();

	const desc = $derived(getLocale() === 'pt-br' ? project.desc['pt-br'] : project.desc.en);

	const STATUS_COLORS: Record<ProjectStatus, string> = {
		done: 'rgba(16, 185, 129, 0.12)',
		'pre-release': 'rgba(245, 158, 11, 0.12)',
		'in-progress': 'rgba(99, 102, 241, 0.12)',
		idea: 'rgba(255, 255, 255, 0.04)'
	};

	const STATUS_TEXT: Record<ProjectStatus, string> = {
		done: 'color: rgba(52, 211, 153, 0.8)',
		'pre-release': 'color: rgba(251, 191, 36, 0.8)',
		'in-progress': 'color: rgba(129, 140, 248, 0.8)',
		idea: 'color: rgba(255, 255, 255, 0.25)'
	};

	const statusLabel = $derived(() => {
		switch (project.status) {
			case 'done': return m['projects.status.done']();
			case 'pre-release': return m['projects.status.pre_release']();
			case 'in-progress': return m['projects.status.in_progress']();
			case 'idea': return m['projects.status.idea']();
		}
	});
</script>

<!-- SpotlightCard como wrapper: spotlight muda de cor por status -->
<SpotlightCard
	class="project-card"
	role="article"
	spotlightColor={STATUS_COLORS[project.status]}
>
	<!-- Preview or placeholder -->
	{#if project.preview}
		<div class="preview">
			<img
				src={project.preview}
				alt="{project.title} preview"
				class="preview-img"
				loading="lazy"
			/>
		</div>
	{:else}
		<div class="preview-empty">
			<span class="preview-initial">{project.title[0]}</span>
		</div>
	{/if}

	<div class="card-body">
		<div class="card-top">
			<h3 class="card-title">{project.title}</h3>
			<span class="card-status" style={STATUS_TEXT[project.status]}>
				{statusLabel()}
			</span>
		</div>

		<p class="card-desc">{desc}</p>

		<!-- Tech tags -->
		<div class="card-tags">
			{#each project.tech as tech (tech)}
				<span class="tag">{tech}</span>
			{/each}
		</div>

		<!-- Actions -->
		<div class="card-actions">
			{#if project.github}
				<a href={project.github} target="_blank" rel="noopener noreferrer" class="action-link">
					<GithubIcon size={12} />
					{m['projects.github']()}
				</a>
			{/if}
			{#if project.demo}
				<a href={project.demo} target="_blank" rel="noopener noreferrer" class="action-link">
					<ExternalLink size={12} />
					{m['projects.demo']()}
				</a>
			{/if}
			<button type="button" onclick={onSelect} class="action-btn-more ml-auto">
				{m['projects.learn_more']()}
				<ArrowUpRight size={12} />
			</button>
		</div>
	</div>
</SpotlightCard>

<style>
	:global(.project-card) {
		padding: 0 !important;
		border-radius: 12px !important;
		background: rgba(255,255,255,0.025) !important;
		border-color: rgba(255,255,255,0.07) !important;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		transition: border-color 0.25s !important;
	}
	:global(.project-card:hover) {
		border-color: rgba(255,255,255,0.13) !important;
	}

	.preview {
		height: 160px;
		overflow: hidden;
		background: rgba(255,255,255,0.02);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}
	.preview-img {
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
		opacity: 0.85;
	}
	.preview-empty {
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255,255,255,0.015);
	}
	.preview-initial {
		font-size: 2.5rem;
		font-weight: 700;
		color: rgba(255,255,255,0.06);
	}

	.card-body { display: flex; flex-direction: column; flex: 1; padding: 1.125rem; }

	.card-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.card-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: rgba(255,255,255,0.85);
		line-height: 1.3;
	}

	.card-status {
		font-size: 0.6rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-weight: 600;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.card-desc {
		font-size: 0.75rem;
		line-height: 1.65;
		color: rgba(255,255,255,0.38);
		flex: 1;
		margin-bottom: 0.875rem;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-bottom: 0.875rem;
	}

	.tag {
		font-size: 0.6rem;
		letter-spacing: 0.06em;
		color: rgba(255,255,255,0.35);
		border: 1px solid rgba(255,255,255,0.07);
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
	}

	.card-actions {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding-top: 0.75rem;
		border-top: 1px solid rgba(255,255,255,0.05);
	}

	.action-link {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 0.7rem;
		color: rgba(255,255,255,0.3);
		text-decoration: none;
		transition: color 0.2s;
	}
	.action-link:hover { color: rgba(255,255,255,0.7); }

	.action-btn-more {
		display: flex;
		align-items: center;
		gap: 3px;
		font-size: 0.7rem;
		color: rgba(255,255,255,0.3);
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		padding: 0;
		transition: color 0.2s, gap 0.2s;
	}
	.action-btn-more:hover { color: rgba(255,255,255,0.75); gap: 6px; }
</style>
