<script lang="ts">
	import { browser } from '$app/environment';
	import { intersect } from '$lib/actions/intersect';
	import { PROJECTS } from '$lib/data/projects';
	import type { Project } from '$lib/data/projects';
	import * as m from '$lib/paraglide/messages';
	import ProjectCard from './project-card.svelte';
	import ProjectDetail from './project-detail.svelte';
	import { ArrowRight } from 'lucide-svelte';

	const activeProjects = PROJECTS.filter((p) => p.status !== 'idea');
	const ideaProjects = PROJECTS.filter((p) => p.status === 'idea');
	const allProjects = [...activeProjects, ...ideaProjects];

	let selected = $state<Project | null>(null);

	let containerEl = $state<HTMLElement | null>(null);
	let scrollRatio = $state(0);

	$effect(() => {
		if (!browser) return;
		document.body.style.overflow = selected ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	$effect(() => {
		if (!browser) return;

		const handleScroll = () => {
			if (!containerEl) return;
			const rect = containerEl.getBoundingClientRect();
			const totalScrollable = rect.height - window.innerHeight;
			if (totalScrollable <= 0) return;

			// Calculates scroll progress inside this pinned section (0.0 to 1.0)
			const current = -rect.top;
			const progress = Math.max(0, Math.min(1, current / totalScrollable));
			scrollRatio = progress;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<!-- Outer container creating crisp horizontal scrubbing without dead scroll -->
<section
	id="projects"
	bind:this={containerEl}
	class="relative h-[120vh] w-full"
	use:intersect={{ section: 'projects', threshold: 0.05 }}
>
	<!-- Sticky 100vh viewport stage -->
	<div class="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden py-8">

		<!-- Top section label & index bar (fades out as section ends) -->
		<div
			class="mx-auto flex w-full max-w-7xl items-center justify-between px-6 mb-6 transition-opacity duration-200"
			style="opacity: {scrollRatio > 0.88 ? Math.max(0, 1 - (scrollRatio - 0.88) * 8) : 1}"
		>
			<div class="flex items-center gap-4">
				<span class="font-mono text-xs font-bold tracking-widest text-white/90 uppercase bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
					// 01 . PROJETOS E ARQUITETURA
				</span>
				<div class="h-[1px] w-12 bg-white/20"></div>
			</div>
			<div class="flex items-center gap-2 font-mono text-xs text-white/90 bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
				<span class="text-white font-bold">01</span>
				<span>/</span>
				<span>03</span>
			</div>
		</div>

		<!-- Horizontal card ribbon transformed by vertical scrollRatio -->
		<div
			class="flex items-center gap-6 px-6 md:px-16 transition-transform duration-100 ease-out will-change-transform"
			style="transform: translateX(calc(-{scrollRatio * (allProjects.length - 1) * 78}%))"
		>
			{#each allProjects as project, i (project.id)}
				<div
					class="w-[85vw] max-w-[440px] shrink-0 transition-all duration-300"
					style="transform: scale({1 - Math.abs(scrollRatio - i / (allProjects.length - 1)) * 0.12}); opacity: {1 - Math.abs(scrollRatio - i / (allProjects.length - 1)) * 0.45}"
				>
					<div class="mb-3 flex items-center justify-between font-mono text-xs text-white/60">
						<span class="text-white font-bold">PROJECT [{String(i + 1).padStart(2, '0')}]</span>
						<span class="text-white/80">{project.tech[0] || 'FULL-STACK'}</span>
					</div>
					<ProjectCard {project} onSelect={() => (selected = project)} />
				</div>
			{/each}
		</div>

		<!-- Scroll progress indicator bar bottom (fades out as section ends) -->
		<div
			class="mx-auto mt-8 flex w-full max-w-7xl items-center justify-between px-6 transition-opacity duration-200"
			style="opacity: {scrollRatio > 0.88 ? Math.max(0, 1 - (scrollRatio - 0.88) * 8) : 1}"
		>
			<div class="h-1.5 w-48 rounded-full bg-white/20 overflow-hidden">
				<div
					class="h-full bg-gradient-to-r from-white via-cyan-400 to-indigo-400 transition-all duration-75"
					style="width: {scrollRatio * 100}%"
				></div>
			</div>
			<div class="flex items-center gap-2 font-mono text-xs text-white font-bold bg-zinc-900/90 border border-white/30 px-4 py-2 rounded-full shadow-xl backdrop-blur-md">
				<span>DESLIZE PARA EXPLORAR</span>
				<ArrowRight size={14} class="text-white animate-pulse" />
			</div>
		</div>

	</div>
</section>

<ProjectDetail project={selected} onClose={() => (selected = null)} />
