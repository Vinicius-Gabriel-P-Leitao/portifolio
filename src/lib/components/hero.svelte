<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';
	import { intersect } from '$lib/actions/intersect';
	import GithubIcon from '$lib/components/github-icon.svelte';
	import Threads from '$lib/components/svelte-bits/Threads.svelte';
	import Noise from '$lib/components/svelte-bits/Noise.svelte';
	import RotatingText from '$lib/components/svelte-bits/RotatingText.svelte';
	import ShinyText from '$lib/components/svelte-bits/ShinyText.svelte';
	import type { GitHubUser } from '$lib/services/github.service';
	import * as m from '$lib/paraglide/messages';

	let { github }: { github: GitHubUser | null } = $props();

	const roles = $derived([
		m['hero.role'](),
		'Backend Engineer',
		'UI Craftsman'
	]);
</script>

<section
	id="hero"
	class="hero relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
	use:intersect={{ section: 'hero', threshold: 0.4 }}
>
	<!-- Threads: WebGL background de linhas fluidas elegantes -->
	<div aria-hidden="true" class="absolute inset-0 pointer-events-none z-0 opacity-40">
		<Threads
			color={[0.39, 0.4, 0.95]}
			amplitude={1.2}
			distance={0.2}
			enableMouseInteraction={true}
		/>
	</div>

	<!-- Vignette forte: suaviza as bordas e destaca o conteúdo -->
	<div
		aria-hidden="true"
		class="absolute inset-0 pointer-events-none z-[1]"
		style="background: radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, #0a0a0a 85%);"
	></div>

	<!-- Noise: textura de grain sutil por cima -->
	<div aria-hidden="true" class="absolute inset-0 pointer-events-none z-[2]">
		<Noise patternAlpha={8} patternRefreshInterval={4} />
	</div>

	<!-- Conteúdo -->
	<div class="relative z-10 flex flex-col items-center">
		{#if github?.avatar_url}
			<img
				src={github.avatar_url}
				alt={github.login}
				width="52"
				height="52"
				class="mb-10 h-13 w-13 rounded-full border border-white/10 opacity-70"
			/>
		{/if}

		<!-- Nome -->
		<h1 class="hero-name">Vinícius Gabriel</h1>

		<!-- Cargo rotativo -->
		<div class="hero-role-container">
			<RotatingText
				texts={roles}
				rotationInterval={3200}
				staggerDuration={0.018}
				staggerFrom="first"
				splitBy="characters"
				mainClassName="hero-role"
				elementLevelClassName="hero-role-char"
			/>
		</div>

		<!-- Separador visual fino -->
		<div class="hero-divider"></div>

		<!-- Subtítulo -->
		<p class="hero-subtitle">{m['hero.subtitle']()}</p>

		<!-- CTAs -->
		<div class="hero-ctas">
			<a href="#projects" class="btn-primary">
				{m['hero.cta_projects']()}
				<ChevronRight size={14} />
			</a>
			<a
				href="https://github.com/Vinicius-Gabriel-P-Leitao"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-ghost"
			>
				<GithubIcon size={14} />
				GitHub
			</a>
		</div>

		<!-- Scroll hint -->
		<div class="scroll-hint">
			<ShinyText
				text="scroll"
				color="rgba(255,255,255,0.18)"
				shineColor="rgba(255,255,255,0.45)"
				speed={5}
				class="scroll-label"
			/>
			<div class="scroll-line"></div>
		</div>
	</div>
</section>

<style>
	.hero {
		background: #0a0a0a;
	}

	/* Nome */
	.hero-name {
		font-size: clamp(2.75rem, 9vw, 6rem);
		font-weight: 700;
		letter-spacing: -0.035em;
		color: rgba(255, 255, 255, 0.92);
		line-height: 1.05;
		margin-bottom: 0.75rem;
	}

	/* Wrapper do RotatingText com altura fixa para não deslocar layout */
	.hero-role-container {
		height: 1.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.75rem;
		overflow: hidden;
	}

	:global(.hero-role) {
		font-size: 0.8125rem;
		letter-spacing: 0.04em;
		color: rgba(255, 255, 255, 0.38);
		font-weight: 400;
		overflow: hidden;
		height: 1.2em;
	}

	/* Linha separadora */
	.hero-divider {
		width: 32px;
		height: 1px;
		background: rgba(255, 255, 255, 0.12);
		margin-bottom: 1.5rem;
	}

	/* Subtítulo */
	.hero-subtitle {
		max-width: 36ch;
		font-size: 0.875rem;
		line-height: 1.75;
		color: rgba(255, 255, 255, 0.4);
		margin-bottom: 2.5rem;
	}

	/* CTAs */
	.hero-ctas {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
	}

	@media (min-width: 480px) {
		.hero-ctas { flex-direction: row; width: auto; }
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 0.65rem 1.375rem;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.95);
		color: #0a0a0a;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		text-decoration: none;
		transition: background 0.2s, transform 0.15s;
		white-space: nowrap;
	}
	.btn-primary:hover {
		background: white;
		transform: translateY(-1px);
	}

	.btn-ghost {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 0.65rem 1.375rem;
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.45);
		font-size: 0.8rem;
		font-weight: 500;
		text-decoration: none;
		transition: border-color 0.2s, color 0.2s, transform 0.15s;
		white-space: nowrap;
	}
	.btn-ghost:hover {
		border-color: rgba(255, 255, 255, 0.22);
		color: rgba(255, 255, 255, 0.75);
		transform: translateY(-1px);
	}

	/* Scroll hint */
	.scroll-hint {
		margin-top: 4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	:global(.scroll-label) {
		font-size: 0.6rem;
		letter-spacing: 0.35em;
		text-transform: uppercase;
	}

	.scroll-line {
		width: 1px;
		height: 36px;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.18), transparent);
		animation: line-pulse 2s ease-in-out infinite;
	}

	@keyframes line-pulse {
		0%, 100% { opacity: 0.3; transform: scaleY(0.7); transform-origin: top; }
		50% { opacity: 0.8; transform: scaleY(1); }
	}
</style>
