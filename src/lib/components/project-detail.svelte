<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { X, ExternalLink, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import { isMobile } from '$lib/hooks/is-mobile.svelte';
	import GithubIcon from '$lib/components/github-icon.svelte';
	import type { Project, ProjectStatus } from '$lib/data/projects';
	import * as m from '$lib/paraglide/messages';

	let { project, onClose }: { project: Project | null; onClose: () => void } = $props();

	let imageIndex = $state(0);
	let zoomed = $state(false);

	const locale = $derived(getLocale());
	const images = $derived(project?.images ?? []);
	const highlights = $derived(project?.highlights ?? []);

	$effect(() => {
		if (project) {
			imageIndex = 0;
			zoomed = false;
		}
	});

	const STATUS_STYLES: Record<ProjectStatus, string> = {
		done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
		'pre-release': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
		'in-progress': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
		idea: 'bg-white/5 text-white/30 border-white/10'
	};

	const statusLabel = $derived(() => {
		if (!project) return '';
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

	function prev() {
		imageIndex = (imageIndex - 1 + images.length) % images.length;
	}

	function next() {
		imageIndex = (imageIndex + 1) % images.length;
	}

	function openZoom() {
		if (!isMobile.current) zoomed = true;
	}

	function closeZoom() {
		zoomed = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (zoomed) {
			if (e.key === 'Escape') closeZoom();
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
			return;
		}
		if (e.key === 'Escape') onClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if project}
	<!-- Backdrop -->
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
		onclick={onClose}
		role="presentation"
	></div>

	<!-- Panel: right drawer on desktop, bottom sheet on mobile -->
	<div
		transition:fly={isMobile.current
			? { y: 800, duration: 350, opacity: 1 }
			: { x: 600, duration: 320, opacity: 1 }}
		role="dialog"
		aria-modal="true"
		aria-label={project.title}
		class={[
			'fixed z-50 overflow-y-auto border-white/8 bg-[#0c0c0c]',
			isMobile.current
				? 'inset-x-0 bottom-0 max-h-[90dvh] rounded-t-2xl border-t'
				: 'top-0 right-0 h-full w-full max-w-xl border-l'
		].join(' ')}
	>
		<!-- Sticky header -->
		<div
			class="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#0c0c0c]/95 px-5 py-4 backdrop-blur-md"
		>
			<!-- Mobile drag handle -->
			{#if isMobile.current}
				<div class="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2">
					<div class="h-1 w-8 rounded-full bg-white/15"></div>
				</div>
			{/if}

			<div class="flex items-center gap-3">
				<h2 class="text-sm font-semibold text-white">{project.title}</h2>
				{#if project.status}
					<span
						class={[
							'rounded-full border px-2 py-0.5 text-[9px] tracking-widest uppercase',
							STATUS_STYLES[project.status]
						].join(' ')}
					>
						{statusLabel()}
					</span>
				{/if}
			</div>

			<button
				onclick={onClose}
				class="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/8 hover:text-white"
				aria-label={m['projects.close']()}
			>
				<X size={17} />
			</button>
		</div>

		<div class="space-y-8 px-5 py-6">
			<!-- Description -->
			<p class="text-sm leading-relaxed text-white/60">
				{locale === 'pt-br' ? project.desc['pt-br'] : project.desc.en}
			</p>

			<!-- Tech chips -->
			<div class="flex flex-wrap gap-1.5">
				{#each project.tech as tech (tech)}
					<span
						class="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[10px] tracking-wider text-white/40 uppercase"
					>
						{tech}
					</span>
				{/each}
			</div>

			<!-- Links -->
			{#if project.github || project.demo}
				<div class="flex gap-5">
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					{#if project.github}
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/80"
						>
							<GithubIcon size={14} />
							GitHub
						</a>
					{/if}
					{#if project.demo}
						<a
							href={project.demo}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/80"
						>
							<ExternalLink size={14} />
							Demo
						</a>
					{/if}
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				</div>
			{/if}

			<!-- Highlights -->
			{#if highlights.length > 0}
				<div>
					<h3 class="mb-4 text-[10px] tracking-[0.3em] text-white/25 uppercase">
						{m['projects.highlights']()}
					</h3>
					<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{#each highlights as highlight (highlight.title.en)}
							<div class="rounded-xl border border-white/6 bg-white/[0.02] p-4">
								<p class="mb-1.5 text-xs font-medium text-white/80">
									{locale === 'pt-br' ? highlight.title['pt-br'] : highlight.title.en}
								</p>
								<p class="text-[11px] leading-relaxed text-white/40">
									{locale === 'pt-br' ? highlight.body['pt-br'] : highlight.body.en}
								</p>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Gallery -->
			{#if images.length > 0}
				<div>
					<h3 class="mb-4 text-[10px] tracking-[0.3em] text-white/25 uppercase">
						{m['projects.gallery']()}
					</h3>

					<div class="group relative">
						<button
							type="button"
							onclick={openZoom}
							class={[
								'w-full overflow-hidden rounded-xl',
								!isMobile.current ? 'cursor-zoom-in' : 'cursor-default'
							].join(' ')}
							aria-label="Zoom screenshot"
						>
							<img
								src={images[imageIndex].url}
								alt={images[imageIndex].title}
								class="max-h-80 w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
								loading="lazy"
							/>
						</button>

						<!-- Zoom hint (desktop only) -->
						{#if !isMobile.current}
							<div
								class="pointer-events-none absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
							>
								<ZoomIn size={11} class="text-white/70" />
								<span class="text-[9px] text-white/60">Zoom</span>
							</div>
						{/if}

						{#if images.length > 1}
							<button
								type="button"
								onclick={prev}
								class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
								aria-label="Previous screenshot"
							>
								<ChevronLeft size={16} />
							</button>
							<button
								type="button"
								onclick={next}
								class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
								aria-label="Next screenshot"
							>
								<ChevronRight size={16} />
							</button>
						{/if}
					</div>

					{#if images.length > 1}
						<div class="mt-3 flex justify-center gap-1.5">
							{#each images as _image, i (i)}
								<button
									type="button"
									onclick={() => (imageIndex = i)}
									class={[
										'h-1.5 rounded-full transition-all duration-200',
										i === imageIndex ? 'w-4 bg-indigo-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
									].join(' ')}
									aria-label="Screenshot {i + 1}"
								></button>
							{/each}
						</div>
					{/if}

					<p class="mt-2 text-center text-[11px] text-white/30">{images[imageIndex].title}</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- Lightbox (desktop only) -->
	{#if zoomed && images.length > 0 && !isMobile.current}
		<div
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
			onclick={closeZoom}
			role="presentation"
		>
			<!-- Close -->
			<button
				type="button"
				onclick={closeZoom}
				class="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
				aria-label="Close zoom"
			>
				<X size={20} />
			</button>

			<!-- Counter -->
			{#if images.length > 1}
				<span class="absolute top-4 left-1/2 -translate-x-1/2 text-[11px] text-white/40">
					{imageIndex + 1} / {images.length}
				</span>
			{/if}

			<!-- Image — stop propagation so clicking it doesn't close -->
			<button
				type="button"
				onclick={(e) => e.stopPropagation()}
				class="cursor-default rounded-xl focus:outline-none"
				aria-label={images[imageIndex].title}
			>
				<img
					src={images[imageIndex].url}
					alt={images[imageIndex].title}
					class="max-h-[90dvh] max-w-[85vw] rounded-xl object-contain"
				/>
			</button>

			<!-- Arrows -->
			{#if images.length > 1}
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						prev();
					}}
					class="absolute top-1/2 left-6 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
					aria-label="Previous screenshot"
				>
					<ChevronLeft size={22} />
				</button>
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						next();
					}}
					class="absolute top-1/2 right-6 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
					aria-label="Next screenshot"
				>
					<ChevronRight size={22} />
				</button>
			{/if}

			<!-- Caption -->
			<p class="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/30">
				{images[imageIndex].title}
			</p>
		</div>
	{/if}
{/if}
