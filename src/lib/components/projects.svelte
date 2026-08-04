<script lang="ts">
	import { browser } from '$app/environment';
	import { intersect } from '$lib/actions/intersect';
	import { PROJECTS } from '$lib/data/projects';
	import type { Project } from '$lib/data/projects';
	import * as m from '$lib/paraglide/messages';
	import ProjectCard from './project-card.svelte';
	import ProjectDetail from './project-detail.svelte';
	import FadeContent from '$lib/components/svelte-bits/FadeContent.svelte';
	import ShinyText from '$lib/components/svelte-bits/ShinyText.svelte';
	import Particles from '$lib/components/svelte-bits/Particles.svelte';

	const activeProjects = PROJECTS.filter((p) => p.status !== 'idea');
	const ideaProjects = PROJECTS.filter((p) => p.status === 'idea');

	let selected = $state<Project | null>(null);

	$effect(() => {
		if (!browser) return;
		document.body.style.overflow = selected ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	});

	// Scroll hint: some when user scrolls down inside the section
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
	<!-- Particles muito sutis como textura de fundo -->
	<div aria-hidden="true" class="absolute inset-0 pointer-events-none z-0">
		<Particles
			particleCount={60}
			particleSpread={20}
			speed={0.02}
			particleColors={['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)']}
			particleBaseSize={30}
			alphaParticles={true}
			disableRotation={true}
			moveParticlesOnHover={false}
		/>
	</div>

	<div class="relative z-10 px-6 pt-24 pb-16 mx-auto w-full max-w-6xl">

		<FadeContent blur duration={800} threshold={0.2} class="mb-12">
			<div class="section-header">
				<ShinyText
					text={m['projects.title']()}
					color="rgba(255,255,255,0.3)"
					shineColor="rgba(255,255,255,0.7)"
					speed={5}
					class="section-label"
				/>
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

	<!-- Indicador de scroll: aparece fixo na base da viewport quando dentro da seção -->
	<div class="scroll-more" class:hidden={!showScrollHint} aria-hidden="true">
		<span class="scroll-more-text">
			{m['projects.title']()} · scroll
		</span>
		<div class="scroll-more-arrows">
			<svg width="12" height="20" viewBox="0 0 12 20" fill="none">
				<path d="M6 1 L6 14 M2 10 L6 15 L10 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
	</div>
</section>

<ProjectDetail project={selected} onClose={() => (selected = null)} />

<style>
	/* A section cresce com o conteúdo — sem altura mínima forçada aqui.
	   O scroll-snap da página inteira faz a snap no topo desta section. */
	.projects-section {
		min-height: 100dvh;
		scroll-snap-align: start;
		background: transparent;
		display: flex;
		flex-direction: column;
	}

	/* Header */
	.section-label {
		font-size: 0.65rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		display: block;
		margin-bottom: 0.75rem;
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
		color: rgba(255, 255, 255, 0.9);
		line-height: 1;
	}

	/* Contador de projetos ao lado do título */
	.project-count {
		font-size: 0.75rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.18);
		letter-spacing: 0.05em;
		font-variant-numeric: tabular-nums;
		padding: 0.1rem 0.45rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 4px;
	}

	/* Ideas divider */
	.ideas-header {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.ideas-line {
		flex: 1;
		height: 1px;
		background: rgba(255, 255, 255, 0.07);
	}

	.ideas-label {
		font-size: 0.6rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.2);
		white-space: nowrap;
		font-weight: 500;
	}

	/* Scroll hint — fixo na base da viewport, visível só quando dentro desta section */
	.scroll-more {
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 1rem;
		background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 60%, transparent);
		pointer-events: none;
		transition: opacity 0.4s;
		z-index: 20;
	}

	.scroll-more.hidden {
		opacity: 0;
	}

	.scroll-more-text {
		font-size: 0.55rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.2);
		font-weight: 500;
	}

	.scroll-more-arrows {
		color: rgba(255, 255, 255, 0.2);
		animation: arrow-bounce 1.6s ease-in-out infinite;
	}

	@keyframes arrow-bounce {
		0%, 100% { transform: translateY(-3px); opacity: 0.4; }
		50% { transform: translateY(3px); opacity: 1; }
	}
</style>
