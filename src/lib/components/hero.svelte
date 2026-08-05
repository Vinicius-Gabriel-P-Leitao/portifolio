<script lang="ts">
	import { ChevronRight, ArrowDown } from 'lucide-svelte';
	import GithubIcon from '$lib/components/github-icon.svelte';
	import TextType from '$lib/components/svelte-bits/text-type.svelte';
	import type { GitHubUser } from '$lib/services/github.service';
	import * as m from '$lib/paraglide/messages';

	let { github }: { github: GitHubUser | null } = $props();
</script>

<section
	id="hero"
	class="hero relative flex min-h-full flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-20 text-center overflow-hidden"
>
	<div class="relative z-10 flex flex-col items-center max-w-4xl">
		{#if github?.avatar_url}
			<img
				src={github.avatar_url}
				alt={github.login}
				width="68"
				height="68"
				class="mb-6 h-[68px] w-[68px] rounded-full border-2 border-white/30 shadow-2xl"
			/>
		{/if}

		<!-- Kinetic Typography -->
		<h1 class="hero-name">VINÍCIUS GABRIEL</h1>

		<div class="hero-role-container">
			<TextType
				text={m['hero.role']()}
				typingSpeed={50}
				showCursor={true}
				cursorChar="|"
				class="hero-role font-mono"
			/>
		</div>

		<!-- Subtitle with high contrast -->
		<p class="hero-subtitle">{m['hero.subtitle']()}</p>

		<!-- CTAs with high contrast -->
		<div class="hero-ctas">
			<a href="#projects" class="btn-primary">
				{m['hero.cta_projects']()}
				<ChevronRight size={14} />
			</a>
			<a
				href="https://github.com/Vinicius-Gabriel-P-Leitao"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-github"
			>
				<GithubIcon size={16} />
				<span>GitHub</span>
			</a>
		</div>

		<!-- High contrast Glass Scroll Prompt -->
		<div class="scroll-hint">
			<div class="scroll-label-pill font-mono">
				<span>DESLIZE PARA NAVEGAR NA TRILHA 3D</span>
				<ArrowDown size={14} class="text-white animate-bounce" />
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		background: transparent;
	}

	.hero-name {
		font-size: clamp(3rem, 10vw, 6.5rem);
		font-weight: 900;
		letter-spacing: -0.04em;
		color: #ffffff;
		line-height: 0.95;
		margin-bottom: 1rem;
		text-transform: uppercase;
		background: linear-gradient(180deg, #ffffff 60%, rgba(255, 255, 255, 0.6) 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.hero-role-container {
		width: 100%;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.25rem;
	}

	:global(.hero-role) {
		font-size: 0.85rem;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.75);
		font-weight: 600;
		text-transform: uppercase;
	}

	.hero-subtitle {
		max-width: 44ch;
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
		margin-bottom: 2rem;
	}

	.hero-ctas {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.875rem;
		width: 100%;
	}

	@media (min-width: 480px) {
		.hero-ctas { flex-direction: row; justify-content: center; }
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 0.75rem 1.6rem;
		border-radius: 9999px;
		background: #ffffff;
		color: #0a0a0a;
		font-size: 0.85rem;
		font-weight: 700;
		text-decoration: none;
		box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
		transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
	}
	.btn-primary:hover {
		background: #f1f5f9;
		transform: translateY(-2px);
		box-shadow: 0 6px 25px rgba(255, 255, 255, 0.35);
	}

	.btn-github {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 0.75rem 1.6rem;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: #ffffff;
		font-size: 0.85rem;
		font-weight: 600;
		text-decoration: none;
		backdrop-filter: blur(12px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
		transition: background 0.2s, border-color 0.2s, transform 0.15s;
	}
	.btn-github:hover {
		background: rgba(255, 255, 255, 0.22);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
	}

	.scroll-hint {
		margin-top: 1.75rem;
		display: flex;
		justify-content: center;
	}

	@media (min-width: 640px) {
		.scroll-hint {
			margin-top: 3.5rem;
		}
	}

	.scroll-label-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: #ffffff;
		background: rgba(18, 18, 24, 0.88);
		border: 1px solid rgba(255, 255, 255, 0.25);
		padding: 0.65rem 1.35rem;
		border-radius: 9999px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(16px);
	}
</style>
