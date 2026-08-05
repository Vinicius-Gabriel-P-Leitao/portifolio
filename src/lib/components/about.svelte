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
		{ category: () => m['about.frontend'](), items: ['Tailwind', 'React', 'Svelte', 'Jetpack Compose'] },
		{ category: () => m['about.backend'](), items: ['Java', 'Kotlin', 'Spring Boot', 'Node.js'] },
		{ category: () => m['about.database'](), items: ['PostgreSQL', 'SQLite', 'MongoDB', 'Firebase'] },
		{ category: () => m['about.infra'](), items: ['Docker', 'Git', 'Linux', 'CI/CD'] }
	];

	const ALL_LOGOS = [
		{ name: 'Svelte' }, { name: 'Tailwind' }, { name: 'React' }, { name: 'Java' },
		{ name: 'Kotlin' }, { name: 'Spring Boot' }, { name: 'Node.js' }, { name: 'PostgreSQL' },
		{ name: 'Docker' }, { name: 'Git' }
	];
</script>

<section id="about" class="h-full flex flex-col items-center justify-center px-6 py-10" bind:this={sectionEl}>
	<div class="mx-auto w-full max-w-4xl">

		<!-- Section Index Header -->
		<div class="flex items-center justify-between mb-8">
			<div class="flex items-center gap-4">
				<span class="font-mono text-xs font-bold tracking-widest text-white/90 uppercase bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
					// 02 . SOBRE E TECH STACK
				</span>
				<div class="h-[1px] w-12 bg-white/20"></div>
			</div>
			<div class="flex items-center gap-2 font-mono text-xs text-white/90 bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
				<span class="text-white font-bold">02</span>
				<span>/</span>
				<span>03</span>
			</div>
		</div>

		<FadeContent blur duration={800} threshold={0.2} class="mb-8">
			<div class="section-header">
				<h2 class="section-title">{m['about.title']()}</h2>
			</div>
		</FadeContent>

		<FadeContent blur duration={900} delay={100} threshold={0.15} class="mb-12">
			<p class="bio-text">{m['about.bio']()}</p>
		</FadeContent>

		<!-- Logo Loop Marquee -->
		<FadeContent duration={600} delay={150} threshold={0.1} class="mb-12">
			<LogoLoop logos={ALL_LOGOS} speed={25} />
		</FadeContent>

		<!-- Stack: SpotlightCard em cada grupo -->
		<div class="stack-grid">
			{#each STACK as group, i (group.category())}
				<FadeContent duration={700} delay={i * 100} threshold={0.1} class="h-full">
					<SpotlightCard
						class="stack-card"
						spotlightColor="rgba(99, 102, 241, 0.12)"
					>
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
	.section-label {
		font-size: 0.65rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		display: block;
		margin-bottom: 0.5rem;
	}

	.section-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: rgba(255,255,255,0.9);
		line-height: 1;
	}

	.bio-text {
		font-size: 1rem;
		line-height: 1.8;
		color: rgba(255, 255, 255, 0.88);
		max-width: 65ch;
	}

	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.25rem;
		align-items: stretch;
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

	.stack-category {
		display: block;
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.65);
		margin-bottom: 0.5rem;
		font-weight: 700;
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

	.stack-item:last-child {
		border-bottom: none;
	}

	.stack-item:hover {
		color: #ffffff;
	}
</style>
