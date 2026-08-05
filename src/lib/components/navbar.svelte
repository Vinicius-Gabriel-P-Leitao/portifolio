<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import type { Pathname } from '$app/types';
	import { Home, FolderOpen, User, Mail } from 'lucide-svelte';
	import { isMobile } from '$lib/reactive/is-mobile.svelte';
	import { navigation } from '$lib/stores/navigation.svelte';
	import type { Section } from '$lib/stores/navigation.svelte';
	import GooeyNav from '$lib/components/svelte-bits/gooey-nav.svelte';
	import * as m from '$lib/paraglide/messages';

	import { scrollState } from '$lib/stores/scroll.svelte';

	const scrolled = $derived(scrollState.progress > 0.02);
	const scrollProgress = $derived(scrollState.progress);

	const NAV_ITEMS = $derived([
		{ id: 'hero', icon: Home, label: m['nav.home']() },
		{ id: 'projects', icon: FolderOpen, label: m['nav.projects']() },
		{ id: 'about', icon: User, label: m['nav.about']() },
		{ id: 'contact', icon: Mail, label: m['nav.contact']() }
	]);
</script>

<header class="navbar" class:scrolled aria-label="Main Navigation">
	<!-- Scroll progress line at bottom of header -->
	<div
		class="progress-line"
		style="transform: scaleX({scrollProgress}); opacity: {scrolled ? 1 : 0};"
	></div>

	<nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
		<a
			href="#hero"
			onclick={() => navigation.navigate('hero')}
			class="brand rounded focus:ring-1 focus:ring-white/20 focus:outline-none"
		>
			{m['site.name']()}
		</a>

		{#if !isMobile.current}
			<GooeyNav
				items={NAV_ITEMS}
				activeId={navigation.active}
				onSelect={(id: string) => navigation.navigate(id as Section)}
				class="hidden md:flex"
			/>
		{/if}

		<div
			class="lang-switcher flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md"
		>
			{#each locales as locale (locale)}
				<a
					href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}
					class="lang-btn"
					class:active={getLocale() === locale}
					aria-label="Switch language to {locale === 'pt-br' ? 'Portuguese' : 'English'}"
				>
					{locale === 'pt-br' ? 'PT' : 'EN'}
				</a>
			{/each}
		</div>
	</nav>
</header>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		transition:
			background 0.3s,
			border-color 0.3s,
			backdrop-filter 0.3s;
	}

	.navbar.scrolled {
		background: rgba(10, 10, 10, 0.75);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(16px);
	}

	/* Thin progress line at the very bottom of the header */
	.progress-line {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 1.5px;
		width: 100%;
		background: linear-gradient(90deg, rgba(99, 102, 241, 0.9), rgba(196, 181, 253, 0.6));
		transform-origin: left;
		transition:
			opacity 0.4s,
			transform 0.05s linear;
	}

	.brand {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		transition: color 0.2s;
	}
	.brand:hover {
		color: #fff;
	}

	.lang-switcher {
		display: flex;
	}

	.lang-btn {
		padding: 0.2rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 600;
		text-decoration: none;
		color: rgba(255, 255, 255, 0.35);
		transition:
			color 0.2s,
			background 0.2s;
	}
	.lang-btn:hover {
		color: rgba(255, 255, 255, 0.75);
	}
	.lang-btn.active {
		color: #fff;
		background: rgba(255, 255, 255, 0.15);
	}
</style>
