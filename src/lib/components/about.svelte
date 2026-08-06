<script lang="ts">
	import { onMount } from 'svelte';
	import FadeContent from '$lib/components/svelte-bits/fade-content.svelte';
	import SpotlightCard from '$lib/components/svelte-bits/spotlight-card.svelte';
	import LogoLoop from '$lib/components/svelte-bits/logo-loop.svelte';
	import * as m from '$lib/paraglide/messages';

	let sectionEl = $state<HTMLElement | null>(null);

	onMount(() => {
		// Trigger entrance animation after a short delay (slide transition takes ~750ms)
		const t = setTimeout(() => {
			if (sectionEl) sectionEl.dataset.visible = 'true';
		}, 200);
		return () => clearTimeout(t);
	});

	const STACK = [
		{
			category: () => m['about.frontend'](),
			items: ['Tailwind', 'React', 'Svelte', 'Jetpack Compose']
		},
		{ category: () => m['about.backend'](), items: ['Java', 'Kotlin', 'Spring Boot', 'Node.js'] },
		{
			category: () => m['about.database'](),
			items: ['PostgreSQL', 'SQLite', 'MongoDB', 'Firebase']
		},
		{ category: () => m['about.infra'](), items: ['Docker', 'Git', 'Linux', 'CI/CD'] }
	];

	const ALL_LOGOS = [
		{ name: 'Svelte' },
		{ name: 'Tailwind' },
		{ name: 'React' },
		{ name: 'Java' },
		{ name: 'Kotlin' },
		{ name: 'Spring Boot' },
		{ name: 'Node.js' },
		{ name: 'PostgreSQL' },
		{ name: 'Docker' },
		{ name: 'Git' }
	];
</script>

<section
	id="about"
	class="flex min-h-full flex-col items-center justify-center px-4 pt-14 pb-20 sm:px-6 sm:pt-16 sm:pb-24"
	bind:this={sectionEl}
>
	<div class="mx-auto w-full max-w-4xl">
		<!-- Section Index Header -->
		<div class="mb-4 flex items-center justify-between sm:mb-8">
			<div class="flex items-center gap-4">
				<span
					class="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-white/90 uppercase sm:px-3.5 sm:text-xs"
				>
					{m['about.header_index']()}
				</span>
				<div class="h-[1px] w-8 bg-white/20 sm:w-12"></div>
			</div>
			<div
				class="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] text-white/90 sm:px-3.5 sm:text-xs"
			>
				<span class="font-bold text-white">02</span>
				<span>/</span>
				<span>03</span>
			</div>
		</div>

		<FadeContent blur duration={800} threshold={0.2} class="mb-3 sm:mb-8">
			<div class="section-header">
				<h2 class="section-title">{m['about.title']()}</h2>
			</div>
		</FadeContent>

		<FadeContent blur duration={900} delay={100} threshold={0.15} class="mb-5 sm:mb-12">
			<p class="bio-text">{m['about.bio']()}</p>
		</FadeContent>

		<!-- Logo Loop Marquee -->
		<FadeContent duration={600} delay={150} threshold={0.1} class="mb-5 sm:mb-12">
			<LogoLoop logos={ALL_LOGOS} speed={25} />
		</FadeContent>

		<!-- Stack: SpotlightCard em cada grupo -->
		<div class="stack-grid">
			{#each STACK as group, i (group.category())}
				<FadeContent duration={700} delay={i * 100} threshold={0.1} class="h-full">
					<SpotlightCard class="stack-card" spotlightColor="rgba(99, 102, 241, 0.12)">
						<span class="stack-category">{group.category()}</span>
						<ul class="stack-items">
							{#each group.items as item (item)}
								<li class="stack-item">{item}</li>
							{/each}
						</ul>
					</SpotlightCard>
				</FadeContent>
			{/each}
		</div>
	</div>
</section>

<style>
	.section-title {
		font-size: clamp(1.6rem, 5vw, 3.5rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.05;
	}

	.bio-text {
		font-size: 1rem;
		line-height: 1.75;
		color: rgba(255, 255, 255, 0.88);
		max-width: 65ch;
	}

	@media (max-width: 640px) {
		.bio-text {
			font-size: 0.85rem;
			line-height: 1.5;
		}
	}

	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1.25rem;
		align-items: stretch;
	}

	@media (max-width: 640px) {
		.stack-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.6rem;
		}
	}

	/* SpotlightCard override para ter visual mais limpo e alto contraste */
	:global(.stack-card) {
		height: 100% !important;
		display: flex !important;
		flex-direction: column !important;
		padding: 1.25rem !important;
		border-radius: 16px !important;
		background: rgba(18, 18, 24, 0.88) !important;
		backdrop-filter: blur(20px) !important;
		border-color: rgba(255, 255, 255, 0.15) !important;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7) !important;
	}

	@media (max-width: 640px) {
		:global(.stack-card) {
			padding: 0.65rem 0.75rem !important;
			border-radius: 12px !important;
		}
	}

	.stack-category {
		display: block;
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.65);
		margin-bottom: 0.5rem;
		font-weight: 700;
	}

	@media (max-width: 640px) {
		.stack-category {
			font-size: 0.6rem;
			margin-bottom: 0.2rem;
		}
	}

	.stack-items {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.stack-item {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.88);
		padding: 0.35rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		transition: color 0.2s;
	}

	@media (max-width: 640px) {
		.stack-item {
			font-size: 0.72rem;
			padding: 0.2rem 0;
		}
	}

	.stack-item:last-child {
		border-bottom: none;
	}

	.stack-item:hover {
		color: #ffffff;
	}
</style>
