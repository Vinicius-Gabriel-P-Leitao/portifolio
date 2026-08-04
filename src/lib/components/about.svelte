<script lang="ts">
	import { intersect } from '$lib/actions/intersect';
	import FadeContent from '$lib/components/svelte-bits/FadeContent.svelte';
	import SpotlightCard from '$lib/components/svelte-bits/SpotlightCard.svelte';
	import ShinyText from '$lib/components/svelte-bits/ShinyText.svelte';
	import * as m from '$lib/paraglide/messages';

	const STACK = [
		{ category: () => m['about.frontend'](), items: ['Tailwind', 'React', 'Svelte', 'Jetpack Compose'] },
		{ category: () => m['about.backend'](), items: ['Java', 'Kotlin', 'Spring Boot', 'Node.js'] },
		{ category: () => m['about.database'](), items: ['PostgreSQL', 'SQLite', 'MongoDB', 'Firebase'] },
		{ category: () => m['about.infra'](), items: ['Docker', 'Git'] }
	];
</script>

<section id="about" class="px-6 py-24" use:intersect={{ section: 'about', threshold: 0.2 }}>
	<div class="mx-auto w-full max-w-3xl">

		<FadeContent blur duration={800} threshold={0.2} class="mb-12">
			<div class="section-header">
				<ShinyText
					text={m['about.title']()}
					color="rgba(255,255,255,0.3)"
					shineColor="rgba(255,255,255,0.7)"
					speed={5}
					class="section-label"
				/>
				<h2 class="section-title">About</h2>
			</div>
		</FadeContent>

		<FadeContent blur duration={900} delay={100} threshold={0.15} class="mb-14">
			<p class="bio-text">{m['about.bio']()}</p>
		</FadeContent>

		<!-- Stack: SpotlightCard em cada grupo -->
		<div class="stack-grid">
			{#each STACK as group, i (group.category())}
				<FadeContent duration={700} delay={i * 100} threshold={0.1}>
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
		font-size: 0.9375rem;
		line-height: 1.8;
		color: rgba(255, 255, 255, 0.5);
		max-width: 60ch;
	}

	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
	}

	/* SpotlightCard override para ter visual mais limpo */
	:global(.stack-card) {
		padding: 1.25rem !important;
		border-radius: 12px !important;
		background: rgba(255,255,255,0.025) !important;
		border-color: rgba(255,255,255,0.06) !important;
	}

	.stack-category {
		display: block;
		font-size: 0.6rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.3);
		margin-bottom: 0.875rem;
		font-weight: 600;
	}

	.stack-items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.stack-item {
		font-size: 0.825rem;
		color: rgba(255,255,255,0.6);
		padding: 0.25rem 0;
		border-bottom: 1px solid rgba(255,255,255,0.05);
		transition: color 0.2s;
	}

	.stack-item:last-child { border-bottom: none; }
	.stack-item:hover { color: rgba(255,255,255,0.9); }
</style>
