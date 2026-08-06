<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Hero from '$lib/components/hero.svelte';
	import Projects from '$lib/components/projects.svelte';
	import About from '$lib/components/about.svelte';
	import Contact from '$lib/components/contact.svelte';
	import ProjectDetail from '$lib/components/project-detail.svelte';
	import { PROJECTS } from '$lib/data/projects';
	import type { Project } from '$lib/data/projects';
	import { navigation } from '$lib/stores/navigation.svelte';
	import { scrollState } from '$lib/stores/scroll.svelte';
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages';

	let { data }: { data: PageData } = $props();

	const allProjects = [
		...PROJECTS.filter((p) => p.status !== 'idea'),
		...PROJECTS.filter((p) => p.status === 'idea')
	];
	const N = allProjects.length;

	// 4 outer panels: 0=hero, 1=projects, 2=about, 3=contact
	const SECTIONS = 4;

	let sectionIdx = $state(0); // outer panel index
	let projectIdx = $state(0); // inner project carousel index
	let busy = $state(false);
	let selectedProject = $state<Project | null>(null);

	// Scroll progress for the black hole
	$effect(() => {
		const base = sectionIdx / (SECTIONS - 1);
		const inner = sectionIdx === 1 ? (projectIdx / (N - 1)) * (1 / (SECTIONS - 1)) : 0;
		scrollState.progress = Math.min(1, base + inner);
	});

	// Update navbar active section
	const sectionNames = ['hero', 'projects', 'about', 'contact'] as const;
	$effect(() => {
		navigation.setActive(sectionNames[sectionIdx]);
	});

	function advance(dir: 1 | -1) {
		if (busy || selectedProject) return;

		if (sectionIdx === 1) {
			// Inside projects: scroll through individual projects first
			if (dir === 1 && projectIdx < N - 1) {
				projectIdx++;
			} else if (dir === 1 && projectIdx === N - 1) {
				// Reached last project → move to About
				sectionIdx = 2;
			} else if (dir === -1 && projectIdx > 0) {
				projectIdx--;
			} else if (dir === -1 && projectIdx === 0) {
				// At first project → move back to Hero
				sectionIdx = 0;
			}
		} else {
			const next = sectionIdx + dir;
			if (next >= 0 && next < SECTIONS) {
				sectionIdx = next;
				// Reset project index when entering projects section
				if (next === 1 && dir === 1) projectIdx = 0;
				if (next === 1 && dir === -1) projectIdx = N - 1;
			}
		}

		busy = true;
		setTimeout(() => (busy = false), 720);
	}

	function goToSection(idx: number) {
		if (busy || selectedProject) return;
		sectionIdx = idx;
		if (idx === 1) projectIdx = 0;
		busy = true;
		setTimeout(() => (busy = false), 720);
	}

	onMount(() => {
		if (!browser) return;

		// Override navigation.navigate so navbar links use the carousel
		navigation.navigate = (section) => {
			const map = { hero: 0, projects: 1, about: 2, contact: 3 };
			const idx = map[section] ?? 0;
			goToSection(idx);
		};

		// Accumulate wheel delta and fire when threshold reached
		let acc = 0;
		let accTimer: ReturnType<typeof setTimeout>;

		const onWheel = (e: WheelEvent) => {
			if (selectedProject) return; // Don't move carousel when project modal is open
			e.preventDefault();
			if (busy) return;
			acc += e.deltaY;
			clearTimeout(accTimer);
			accTimer = setTimeout(() => (acc = 0), 200);
			if (Math.abs(acc) > 50) {
				advance(acc > 0 ? 1 : -1);
				acc = 0;
			}
		};

		// Touch gesture detection (supports both horizontal & vertical swipes)
		let startX = 0;
		let startY = 0;
		let startTime = 0;

		const onTouchStart = (e: TouchEvent) => {
			if (e.touches.length !== 1) return;
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
			startTime = Date.now();
		};

		const onTouchEnd = (e: TouchEvent) => {
			if (selectedProject) return;
			if (e.changedTouches.length === 0) return;

			const elapsed = Date.now() - startTime;
			if (elapsed > 800) return;

			const dx = startX - e.changedTouches[0].clientX;
			const dy = startY - e.changedTouches[0].clientY;
			const absX = Math.abs(dx);
			const absY = Math.abs(dy);

			if (absX > absY && absX > 35) {
				advance(dx > 0 ? 1 : -1);
			} else if (absY >= absX && absY > 45) {
				advance(dy > 0 ? 1 : -1);
			}
		};

		// Keyboard
		const onKey = (e: KeyboardEvent) => {
			if (selectedProject) return;
			if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
				e.preventDefault();
				advance(1);
			}
			if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
				e.preventDefault();
				advance(-1);
			}
		};

		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchend', onTouchEnd, { passive: true });
		window.addEventListener('keydown', onKey);

		return () => {
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchend', onTouchEnd);
			window.removeEventListener('keydown', onKey);
			clearTimeout(accTimer);
		};
	});
</script>

<svelte:head>
	<title>{m['site.title']()}</title>
</svelte:head>

<!-- Fixed viewport -->
<div class="viewport">
	<!-- 4-panel horizontal strip -->
	<div class="h-strip" style="transform: translateX(-{sectionIdx * 100}vw)">
		<!-- Panel 0: Hero -->
		<div class="panel">
			<Hero github={data.github} />
		</div>

		<!-- Panel 1: Projects (internal carousel) -->
		<div class="panel">
			<Projects
				projects={allProjects}
				activeIndex={projectIdx}
				total={N}
				onSelect={(proj) => (selectedProject = proj)}
			/>
		</div>

		<!-- Panel 2: About -->
		<div class="panel">
			<About />
		</div>

		<!-- Panel 3: Contact -->
		<div class="panel">
			<Contact />
		</div>
	</div>
</div>

<!-- Render Project Detail Modal at root level to prevent CSS transform clipping -->
<ProjectDetail project={selectedProject} onClose={() => (selectedProject = null)} />

<!-- ── RIGHT-SIDE NAVIGATION DOTS ── -->
<nav class="side-nav" aria-label={m['nav.navigation']()}>
	<!-- Home -->
	<button
		class="nav-item"
		class:nav-active={sectionIdx === 0}
		onclick={() => goToSection(0)}
		title={m['nav.home']()}
	>
		<span class="nav-label">{m['nav.home']().toUpperCase()}</span>
		<div class="nav-pip"></div>
	</button>

	<!-- Projects section: shows a cluster of project sub-dots -->
	<div class="nav-projects" class:nav-active={sectionIdx === 1}>
		<span class="nav-label nav-label-proj">{m['nav.projects']().toUpperCase()}</span>
		<div class="nav-proj-dots">
			{#each allProjects as _, i (i)}
				<button
					class="nav-proj-pip"
					class:nav-proj-pip-active={sectionIdx === 1 && projectIdx === i}
					onclick={() => {
						goToSection(1);
						projectIdx = i;
					}}
					title={allProjects[i].title}
				></button>
			{/each}
		</div>
	</div>

	<!-- About -->
	<button
		class="nav-item"
		class:nav-active={sectionIdx === 2}
		onclick={() => goToSection(2)}
		title={m['nav.about']()}
	>
		<span class="nav-label">{m['nav.about']().toUpperCase()}</span>
		<div class="nav-pip"></div>
	</button>

	<!-- Contact -->
	<button
		class="nav-item"
		class:nav-active={sectionIdx === 3}
		onclick={() => goToSection(3)}
		title={m['nav.contact']()}
	>
		<span class="nav-label">{m['nav.contact']().toUpperCase()}</span>
		<div class="nav-pip"></div>
	</button>
</nav>

<!-- Scroll hint: chevron pointing right -->
{#if !(sectionIdx === SECTIONS - 1 && projectIdx === N - 1)}
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
	}

	/* Outer 4-panel strip */
	.h-strip {
		display: flex;
		flex-direction: row;
		height: 100%;
		will-change: transform;
		transition: transform 0.78s cubic-bezier(0.77, 0, 0.175, 1);
	}

	/* Each full-screen panel */
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

	/* ── Right-side nav (desktop only) ── */
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

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.15rem 0;
	}

	.nav-pip {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.22);
		transition:
			background 0.3s,
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s;
		flex-shrink: 0;
	}

	.nav-item.nav-active .nav-pip {
		background: #fff;
		transform: scale(1.5);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.55);
	}

	.nav-label {
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
		user-select: none;
	}

	.nav-item:hover .nav-label,
	.nav-item.nav-active .nav-label {
		opacity: 1;
		transform: translateX(0);
		color: rgba(255, 255, 255, 0.8);
	}

	/* Projects nav group */
	.nav-projects {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.nav-label-proj {
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

	/* Scroll hint (double chevron → right >>) */
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
