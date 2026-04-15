<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';
	import { intersect } from '$lib/actions/intersect';
	import GithubIcon from '$lib/components/github-icon.svelte';
	import type { GitHubUser } from '$lib/services/github.service';
	import * as m from '$lib/paraglide/messages';

	let { github }: { github: GitHubUser | null } = $props();
</script>

<section
	id="hero"
	class="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-24 text-center"
	use:intersect={{ section: 'hero', threshold: 0.4 }}
>
	<!-- Ambient glow -->
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
		<div
			class="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl"
		></div>
	</div>

	<!-- GitHub avatar -->
	{#if github?.avatar_url}
		<img
			src={github.avatar_url}
			alt={github.login}
			width="64"
			height="64"
			class="mb-6 h-16 w-16 rounded-full border border-white/10 opacity-90"
		/>
	{/if}

	<!-- Name -->
	<h1 class="hero-name mb-3 text-6xl leading-none font-bold tracking-tight sm:text-7xl md:text-8xl">
		VINÍCIUS
	</h1>

	<!-- Role -->
	<p class="mb-6 text-[11px] tracking-[0.3em] text-white/40 uppercase">
		{m['hero.role']()}
	</p>

	<!-- Subtitle -->
	<p class="mb-10 max-w-xs text-sm text-white/55 sm:max-w-sm sm:text-base">
		{m['hero.subtitle']()}
	</p>

	<!-- CTAs -->
	<div class="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
		<a
			href="#projects"
			class="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:w-auto"
		>
			{m['hero.cta_projects']()}
			<ChevronRight size={15} />
		</a>

		<a
			href="https://github.com/Vinicius-Gabriel-P-Leitao"
			target="_blank"
			rel="noopener noreferrer"
			class="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white sm:w-auto"
		>
			<GithubIcon size={15} />
			GitHub
		</a>
	</div>

	<!-- Scroll hint -->
	<div
		aria-hidden="true"
		class="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce md:bottom-8"
	>
		<div class="mx-auto h-8 w-px bg-gradient-to-b from-white/70 to-transparent"></div>
	</div>
</section>

<style>
	.hero-name {
		background: linear-gradient(135deg, #e2e8f0 0%, #a5b4fc 50%, #e2e8f0 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
</style>
