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

<!-- SpotlightCard como wrapper interativo: todo o card é clicável -->
<SpotlightCard
	class="project-card cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
	role="article"
	tabindex={0}
	onclick={onSelect}
	onkeydown={(e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onSelect?.();
		}
	}}
	aria-label="{project.title} - {m['projects.learn_more']()}"
	spotlightColor={STATUS_COLORS[project.status]}
>
	<!-- Preview or placeholder -->
	{#if project.preview}
		<div class="preview">
			<img src={project.preview} alt="{project.title} preview" class="preview-img" loading="lazy" />
			<div class="preview-gradient"></div>
		</div>
	{:else}
		<div class="preview-empty">
			<div class="preview-grid-pattern"></div>
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
				<a
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					class="action-link"
					onclick={(e) => e.stopPropagation()}
				>
					<GithubIcon size={12} />
					{m['projects.github']()}
				</a>
			{/if}
			{#if project.demo}
				<a
					href={project.demo}
					target="_blank"
					rel="noopener noreferrer"
					class="action-link"
					onclick={(e) => e.stopPropagation()}
				>
					<ExternalLink size={12} />
					{m['projects.demo']()}
				</a>
			{/if}
			<button
				type="button"
				onclick={(e) => {
					e.stopPropagation();
					onSelect?.();
				}}
				class="action-btn-more ml-auto"
			>
				{m['projects.learn_more']()}
				<ArrowUpRight size={12} />
			</button>
		</div>
	</div>
</SpotlightCard>

<style>
	:global(.project-card) {
		padding: 0 !important;
		border-radius: 20px !important;
		background: rgba(18, 18, 24, 0.92) !important;
		backdrop-filter: blur(24px) !important;
		border-color: rgba(255, 255, 255, 0.15) !important;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8) !important;
		display: flex;
		flex-direction: column;
		height: 440px !important;
		min-height: 440px !important;
		overflow: hidden;
		transition:
			border-color 0.3s,
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s !important;
	}
	:global(.project-card:hover) {
		border-color: rgba(255, 255, 255, 0.4) !important;
		transform: translateY(-4px) !important;
		box-shadow:
			0 20px 45px rgba(0, 0, 0, 0.9),
			0 0 25px rgba(255, 255, 255, 0.08) !important;
	}

	.preview {
		height: 230px;
		position: relative;
		overflow: hidden;
		background: #08080c;
	}
	.preview-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}
	:global(.project-card:hover) .preview-img {
		transform: scale(1.06);
	}

	.preview-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, transparent 35%, rgba(18, 18, 24, 0.95) 100%);
		pointer-events: none;
	}

	.preview-empty {
		height: 230px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(circle at 50% 50%, rgba(30, 30, 42, 0.9), #08080c);
	}
	.preview-grid-pattern {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
		background-size: 16px 16px;
	}
	.preview-initial {
		font-size: 3.5rem;
		font-weight: 900;
		color: rgba(255, 255, 255, 0.12);
		text-transform: uppercase;
		position: relative;
		z-index: 1;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1.1rem 1.25rem 1.25rem 1.25rem;
		justify-content: space-between;
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.35rem;
	}

	.card-title {
		font-size: 1rem;
		font-weight: 800;
		color: #ffffff;
		line-height: 1.2;
		letter-spacing: -0.01em;
	}

	.card-status {
		font-size: 0.6rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-weight: 700;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.card-desc {
		font-size: 0.78rem;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.75);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin-bottom: 0.75rem;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-bottom: 0.75rem;
	}

	.tag {
		font-size: 0.58rem;
		font-family: monospace;
		letter-spacing: 0.06em;
		color: rgba(255, 255, 255, 0.5);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 0.15rem 0.5rem;
		border-radius: 6px;
	}

	.card-actions {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding-top: 0.65rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.action-link {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.45);
		text-decoration: none;
		transition: color 0.2s;
	}
	.action-link:hover {
		color: #ffffff;
	}

	.action-btn-more {
		display: flex;
		align-items: center;
		gap: 3px;
		font-size: 0.7rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.5);
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		padding: 0;
		transition:
			color 0.2s,
			gap 0.2s;
	}
	.action-btn-more:hover {
		color: #ffffff;
		gap: 6px;
	}
</style>
