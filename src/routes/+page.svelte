<script lang="ts">
	import { browser } from '$app/environment';
	import Hero from '$lib/components/hero.svelte';
	import Projects from '$lib/components/projects.svelte';
	import About from '$lib/components/about.svelte';
	import Contact from '$lib/components/contact.svelte';
	import ContactDrawer from '$lib/components/contact-drawer.svelte';
	import ProjectDetail from '$lib/components/project-detail.svelte';
	import NavItem from '$lib/components/nav-item.svelte';
	import { PROJECTS } from '$lib/data/projects';
	import type { Project } from '$lib/data/projects';
	import { navigation } from '$lib/store/navigation.svelte';
	import { scrollState } from '$lib/store/scroll.svelte';
	import { advanceCarousel, jumpToSection, computeProgress } from '$lib/utils/carousel';
	import type { CarouselConfig, Direction } from '$lib/utils/carousel';
	import { carouselGestures } from '$lib/actions/carousel-gestures';
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages';

	let { data }: { data: PageData } = $props();

	const TRANSITION_LOCK_MS = 720;
	const SECTION_KEYS = ['hero', 'projects', 'about', 'contact'] as const;
	const PROJECTS_SECTION_IDX = 1;

	const allProjects = [
		...PROJECTS.filter((p) => p.status !== 'idea'),
		...PROJECTS.filter((p) => p.status === 'idea')
	];

	const config: CarouselConfig = {
		sectionCount: SECTION_KEYS.length,
		projectCount: allProjects.length,
		projectsSectionIdx: PROJECTS_SECTION_IDX
	};

	let sectionIdx = $state(0);
	let projectIdx = $state(0);
	let busy = $state(false);
	let selectedProject = $state<Project | null>(null);
	let contactDrawerOpen = $state(false);

	const isInputLocked = () => busy || selectedProject !== null || contactDrawerOpen;

	function lockDuringTransition() {
		busy = true;
		setTimeout(() => (busy = false), TRANSITION_LOCK_MS);
	}

	function handleAdvance(dir: Direction) {
		if (isInputLocked()) return;
		const next = advanceCarousel({ sectionIdx, projectIdx }, dir, config);
		sectionIdx = next.sectionIdx;
		projectIdx = next.projectIdx;
		lockDuringTransition();
	}

	function goToSection(idx: number) {
		if (isInputLocked()) return;
		const next = jumpToSection({ sectionIdx, projectIdx }, idx, config);
		sectionIdx = next.sectionIdx;
		projectIdx = next.projectIdx;
		lockDuringTransition();
	}

	function selectProjectByIndex(i: number) {
		goToSection(PROJECTS_SECTION_IDX);
		projectIdx = i;
	}

	$effect(() => {
		scrollState.progress = computeProgress({ sectionIdx, projectIdx }, config);
	});

	$effect(() => {
		navigation.setActive(SECTION_KEYS[sectionIdx]);
	});

	$effect(() => {
		if (!browser) return;
		const sectionMap = { hero: 0, projects: 1, about: 2, contact: 3 } as const;
		navigation.navigate = (section) => goToSection(sectionMap[section] ?? 0);
	});

	const isLastPanel = $derived(
		sectionIdx === config.sectionCount - 1 && projectIdx === config.projectCount - 1
	);
</script>

<svelte:head>
	<title>{m['site.title']()}</title>
</svelte:head>

<div class="viewport" use:carouselGestures={{ onAdvance: handleAdvance, isLocked: isInputLocked }}>
	<div class="h-strip" style="transform: translateX(-{sectionIdx * 100}vw)">
		<div class="panel">
			<Hero github={data.github} />
		</div>

		<div class="panel">
			<Projects
				projects={allProjects}
				activeIndex={projectIdx}
				total={allProjects.length}
				onSelect={(proj) => (selectedProject = proj)}
			/>
		</div>

		<div class="panel">
			<About />
		</div>

		<div class="panel">
			<Contact onOpenDrawer={() => (contactDrawerOpen = true)} />
		</div>
	</div>
</div>

<ProjectDetail project={selectedProject} onClose={() => (selectedProject = null)} />
<ContactDrawer open={contactDrawerOpen} onClose={() => (contactDrawerOpen = false)} />

<nav class="side-nav" aria-label={m['nav.navigation']()}>
	<NavItem label={m['nav.home']()} active={sectionIdx === 0} onClick={() => goToSection(0)} />

	<div class="nav-projects" class:nav-active={sectionIdx === PROJECTS_SECTION_IDX}>
		<span class="nav-label nav-label-proj">{m['nav.projects']().toUpperCase()}</span>
		<div class="nav-proj-dots">
			{#each allProjects as project, i (i)}
				<button
					class="nav-proj-pip"
					class:nav-proj-pip-active={sectionIdx === PROJECTS_SECTION_IDX && projectIdx === i}
					onclick={() => selectProjectByIndex(i)}
					title={project.title}
				></button>
			{/each}
		</div>
	</div>

	<NavItem label={m['nav.about']()} active={sectionIdx === 2} onClick={() => goToSection(2)} />
	<NavItem label={m['nav.contact']()} active={sectionIdx === 3} onClick={() => goToSection(3)} />
</nav>

{#if !isLastPanel}
	<div class="scroll-hint" aria-hidden="true">
		<div class="chevron"></div>
		<div class="chevron chevron-2"></div>
	</div>
{/if}

<style>
	.viewport {
		position: fixed;
		inset: 0;
		height: 100%;
		height: 100dvh;
		width: 100vw;
		overflow: hidden;
		z-index: 10;
	}

	.h-strip {
		display: flex;
		flex-direction: row;
		height: 100%;
		will-change: transform;
		transition: transform 0.78s cubic-bezier(0.77, 0, 0.175, 1);
	}

	.panel {
		width: 100vw;
		height: 100%;
		height: 100dvh;
		flex-shrink: 0;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		-webkit-overflow-scrolling: touch;
	}

	.side-nav {
		position: fixed;
		right: 1.5rem;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.6rem;
		z-index: 40;
	}

	@media (max-width: 768px) {
		.side-nav {
			display: none;
		}
		.scroll-hint {
			display: none;
		}
	}

	.nav-projects {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.nav-label-proj {
		font-size: 0.48rem;
		letter-spacing: 0.18em;
		color: rgba(255, 255, 255, 0.28);
		font-family: monospace;
		font-weight: 700;
		opacity: 0;
		transform: translateX(4px);
		transition:
			opacity 0.2s,
			transform 0.2s,
			color 0.2s;
	}

	.nav-projects.nav-active .nav-label-proj,
	.nav-projects:hover .nav-label-proj {
		opacity: 1;
		transform: translateX(0);
		color: rgba(255, 255, 255, 0.8);
	}

	.nav-proj-dots {
		display: flex;
		flex-direction: column;
		gap: 0.22rem;
	}

	.nav-proj-pip {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		border: none;
		cursor: pointer;
		padding: 0;
		transition:
			background 0.25s,
			transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.nav-proj-pip.nav-proj-pip-active {
		background: #fff;
		transform: scale(1.5);
	}

	.scroll-hint {
		position: fixed;
		right: 1.5rem;
		bottom: 2rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.15rem;
		pointer-events: none;
		z-index: 40;
	}

	.chevron {
		width: 9px;
		height: 9px;
		border-right: 2px solid rgba(255, 255, 255, 0.6);
		border-bottom: 2px solid rgba(255, 255, 255, 0.6);
		transform: rotate(-45deg);
		animation: chev 1.8s ease-in-out infinite;
	}

	.chevron-2 {
		animation-delay: 0.2s;
		opacity: 0.6;
	}

	@keyframes chev {
		0%,
		100% {
			opacity: 0.3;
			transform: rotate(-45deg) translateX(0);
		}
		50% {
			opacity: 1;
			transform: rotate(-45deg) translateX(3px);
		}
	}
</style>
