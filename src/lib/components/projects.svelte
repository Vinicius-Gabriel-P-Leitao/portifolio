<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import ProjectCard from './project-card.svelte';
	import * as m from '$lib/paraglide/messages';

	let {
		projects,
		activeIndex = 0,
		total,
		onSelect
	}: {
		projects: Project[];
		activeIndex: number;
		total: number;
		onSelect?: (project: Project) => void;
	} = $props();
</script>

<section id="projects" class="projects-section">
	<!-- Top Section Header -->
	<div class="projects-header mx-auto mb-6 flex w-full max-w-7xl items-center justify-between px-6">
		<div class="flex items-center gap-4">
			<span
				class="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-xs font-bold tracking-widest text-white/90 uppercase"
			>
				{m['projects.header_index']()}
			</span>
			<div class="h-[1px] w-12 bg-white/20"></div>
		</div>
		<div
			class="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-xs text-white/90"
		>
			<span class="font-bold text-white">01</span>
			<span>/</span>
			<span>03</span>
		</div>
	</div>

	<!-- Continuous Horizontal Ribbon for Projects -->
	<div class="ribbon-viewport">
		<div
			class="ribbon-track"
			style="transform: translateX(calc(50vw - (var(--card-w) / 2) - {activeIndex} * (var(--card-w) + var(--card-gap))))"
		>
			{#each projects as project, i (project.id)}
				{@const dist = Math.abs(i - activeIndex)}
				{@const isCurrent = i === activeIndex}
				<div
					class="card-slot"
					style="
						transform: scale({isCurrent ? 1 : 0.88 - Math.min(dist * 0.05, 0.15)});
						opacity: {isCurrent ? 1 : Math.max(0.2, 0.5 - (dist - 1) * 0.15)};
						filter: {isCurrent ? 'none' : 'blur(' + Math.min(dist * 1.5, 4) + 'px)'};
					"
				>
					<div class="card-meta">
						<span class="card-index"
							>{m['projects.project_prefix']()} [{String(i + 1).padStart(2, '0')}]</span
						>
						<span class="card-tech">{project.tech[0] || 'FULL-STACK'}</span>
					</div>
					<ProjectCard {project} onSelect={() => onSelect?.(project)} />
				</div>
			{/each}
		</div>
	</div>

	<!-- Bottom Section Footer -->
	<div class="projects-footer mx-auto mt-6 flex w-full max-w-7xl items-center justify-between px-6">
		<div class="dots flex items-center gap-2">
			{#each Array(total) as _, i (i)}
				<div
					class="dot"
					class:dot-active={i === activeIndex}
					style="
						width: {i === activeIndex ? '1.75rem' : '0.4rem'};
						background: {i === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.25)'};
					"
				></div>
			{/each}
		</div>

		<span class="font-mono text-xs text-white/50">
			{m['projects.project_prefix']()}
			{String(activeIndex + 1).padStart(2, '0')} <span class="text-white/20">/</span>
			{String(total).padStart(2, '0')}
		</span>
	</div>
</section>

<style>
	.projects-section {
		--card-w: min(460px, 84vw);
		--card-gap: clamp(1rem, 4vw, 2rem);
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 4rem;
		padding-bottom: 2.5rem;
		overflow: hidden;
		position: relative;
	}

	.ribbon-viewport {
		width: 100vw;
		overflow: hidden;
		position: relative;
		padding: 1.5rem 0;
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 6%,
			black 94%,
			transparent 100%
		);
		mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
	}

	.ribbon-track {
		display: flex;
		flex-direction: row;
		gap: var(--card-gap);
		will-change: transform;
		transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.card-slot {
		width: var(--card-w);
		flex-shrink: 0;
		transition:
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.5s ease,
			filter 0.5s ease;
	}

	.card-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.6rem;
		font-family: monospace;
		font-size: 0.7rem;
	}

	.card-index {
		color: #ffffff;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.card-tech {
		color: rgba(255, 255, 255, 0.5);
		letter-spacing: 0.06em;
	}

	.dot {
		height: 0.3rem;
		border-radius: 9999px;
		transition:
			width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			background 0.25s;
	}
</style>
