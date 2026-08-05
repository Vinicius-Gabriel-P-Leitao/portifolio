<script lang="ts">
	import { browser } from '$app/environment';
	import { intersect } from '$lib/actions/intersect';
	import { PROJECTS } from '$lib/data/projects';
	import type { Project } from '$lib/data/projects';
	import * as m from '$lib/paraglide/messages';
	import ProjectCard from './project-card.svelte';
	import ProjectDetail from './project-detail.svelte';
	import FadeContent from '$lib/components/svelte-bits/fade-content.svelte';
	import ShinyText from '$lib/components/svelte-bits/shiny-text.svelte';
	import { ChevronDown } from 'lucide-svelte';

	const activeProjects = PROJECTS.filter((p) => p.status !== 'idea');
	const ideaProjects = PROJECTS.filter((p) => p.status === 'idea');

	let selected = $state<Project | null>(null);

	$effect(() => {
		if (!browser) return;
		document.body.style.overflow = selected ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	});

	// Scroll hint: hide when user scrolls down inside the section
	let sectionEl: HTMLElement;
	let showScrollHint = $state(true);

	function handleSectionScroll(e: Event) {
		const el = e.currentTarget as HTMLElement;
		showScrollHint = el.scrollTop < 40;
	}
</script>

<!-- A section não usa scroll-snap próprio — deixa o scroll geral da página controlar -->
<!-- mas dentro, se o conteúdo ultrapassar a viewport, ele fluye normalmente -->
<section
	id="projects"
	bind:this={sectionEl}
	class="projects-section relative"
	use:intersect={{ section: 'projects', threshold: 0.1 }}
>
	<div class="relative z-10 px-6 pt-24 pb-16 mx-auto w-full max-w-6xl">

		<FadeContent blur duration={800} threshold={0.2} class="mb-12">
			<div class="section-header">
				<div class="title-row">
					<h2 class="section-title">{m['projects.title']()}</h2>
					<span class="project-count">{activeProjects.length}</span>
				</div>
			</div>
		</FadeContent>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
			{#each activeProjects as project, i (project.id)}
				<FadeContent duration={700} delay={i * 80} threshold={0.1}>
					<ProjectCard {project} onSelect={() => (selected = project)} />
				</FadeContent>
			{/each}
		</div>

		{#if ideaProjects.length > 0}
			<FadeContent blur duration={600} threshold={0.2} class="mt-20 mb-8">
				<div class="ideas-header">
					<div class="ideas-line"></div>
					<span class="ideas-label">{m['projects.ideas_title']()}</span>
					<div class="ideas-line"></div>
				</div>
			</FadeContent>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 opacity-50">
				{#each ideaProjects as project, i (project.id)}
					<FadeContent duration={600} delay={i * 60} threshold={0.1}>
						<ProjectCard {project} onSelect={() => (selected = project)} />
					</FadeContent>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Indicador de scroll: pill interativo em alto contraste na base da viewport -->
	<div class="scroll-more-wrapper" class:hidden={!showScrollHint}>
		<button
			type="button"
			onclick={() => {
				if (browser) window.scrollBy({ top: 350, behavior: 'smooth' });
			}}
			class="scroll-more-pill"
			aria-label={m['projects.scroll_more']()}
		>
			<span class="scroll-more-text">{m['projects.scroll_more']()}</span>
			<div class="scroll-more-icon">
				<ChevronDown size={14} />
			</div>
		</button>
	</div>
</section>

<ProjectDetail project={selected} onClose={() => (selected = null)} />

<style>
	.projects-section {
		min-height: 100dvh;
		scroll-snap-align: start;
		background: transparent;
		display: flex;
		flex-direction: column;
	}

	.title-row {
		display: flex;
		align-items: baseline;
		gap: 0.875rem;
	}

	.section-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: #ffffff;
		line-height: 1;
	}

	.project-count {
		font-size: 0.75rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.7);
		background: rgba(255, 255, 255, 0.1);
		padding: 0.2rem 0.6rem;
		border-radius: 9999px;
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.ideas-header {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.ideas-line {
		flex: 1;
		height: 1px;
		background: rgba(255, 255, 255, 0.1);
	}

	.ideas-label {
		font-size: 0.65rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.6);
		white-space: nowrap;
		font-weight: 700;
	}

	/* Scroll hint — pill em alto contraste fixo na base */
	.scroll-more-wrapper {
		position: sticky;
		bottom: 1.5rem;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		pointer-events: none;
		transition: opacity 0.4s ease, transform 0.4s ease;
		z-index: 30;
		padding: 0 1rem;
	}

	.scroll-more-wrapper.hidden {
		opacity: 0;
		transform: translateY(12px);
		pointer-events: none;
	}

	.scroll-more-pill {
		pointer-events: auto;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 1.25rem;
		border-radius: 9999px;
		background: rgba(18, 18, 24, 0.94);
		backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
		color: #ffffff;
		cursor: pointer;
		transition: background 0.2s, border-color 0.2s, transform 0.2s;
	}

	.scroll-more-pill:hover {
		background: rgba(30, 30, 40, 0.98);
		border-color: rgba(255, 255, 255, 0.35);
		transform: translateY(-2px);
	}

	.scroll-more-text {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #ffffff;
	}

	.scroll-more-icon {
		display: flex;
		align-items: center;
		color: #818cf8;
		animation: arrow-bounce 1.6s ease-in-out infinite;
	}

	@keyframes arrow-bounce {
		0%, 100% { transform: translateY(-2px); }
		50% { transform: translateY(3px); }
	}
</style>
