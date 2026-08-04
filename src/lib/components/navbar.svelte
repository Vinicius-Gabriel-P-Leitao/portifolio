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
	import * as m from '$lib/paraglide/messages';

	let scrolled = $state(false);
	let scrollProgress = $state(0);

	$effect(() => {
		if (!browser) return;
		const handler = () => {
			scrolled = window.scrollY > 20;
			const total = document.body.scrollHeight - window.innerHeight;
			scrollProgress = total > 0 ? window.scrollY / total : 0;
		};
		window.addEventListener('scroll', handler, { passive: true });
		return () => window.removeEventListener('scroll', handler);
	});

	const NAV_LINKS = [
		{ id: 'hero' as Section, Icon: Home, label: () => m['nav.home']() },
		{ id: 'projects' as Section, Icon: FolderOpen, label: () => m['nav.projects']() },
		{ id: 'about' as Section, Icon: User, label: () => m['nav.about']() },
		{ id: 'contact' as Section, Icon: Mail, label: () => m['nav.contact']() }
	];
</script>

<header class="navbar" class:scrolled>
	<!-- Scroll progress line at bottom of header -->
	<div
		class="progress-line"
		style="transform: scaleX({scrollProgress}); opacity: {scrolled ? 1 : 0};"
	></div>

	<nav class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
		<span class="brand">{m['site.name']()}</span>

		{#if !isMobile.current}
			<div class="nav-links">
				{#each NAV_LINKS as link (link.id)}
					{@const isActive = navigation.active === link.id}
					{@const Icon = link.Icon}
					<a
						href="#{link.id}"
						onclick={() => navigation.navigate(link.id)}
						class="nav-link"
						class:active={isActive}
						aria-current={isActive ? 'page' : undefined}
					>
						<Icon size={12} strokeWidth={isActive ? 2 : 1.5} />
						{link.label()}
					</a>
				{/each}
			</div>
		{/if}

		<div class="lang-switcher">
			{#each locales as locale (locale)}
				<a
					href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}
					class="lang-btn"
					class:active={getLocale() === locale}
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
		inset: 0;
		bottom: auto;
		z-index: 50;
		transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
	}

	.navbar.scrolled {
		background: rgba(10, 10, 10, 0.82);
		border-bottom: 1px solid rgba(255,255,255,0.06);
		backdrop-filter: blur(16px);
	}

	/* Thin progress line at the very bottom of the header */
	.progress-line {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 1px;
		width: 100%;
		background: linear-gradient(90deg, rgba(99,102,241,0.8), rgba(196,181,253,0.5));
		transform-origin: left;
		transition: opacity 0.4s, transform 0.05s linear;
	}

	.brand {
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.45);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 0;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 0.35rem 0.75rem;
		border-radius: 6px;
		font-size: 0.6rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-weight: 500;
		color: rgba(255,255,255,0.3);
		text-decoration: none;
		transition: color 0.2s, background 0.2s;
	}
	.nav-link:hover { color: rgba(255,255,255,0.65); }
	.nav-link.active { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.06); }

	.lang-switcher { display: flex; gap: 2px; }

	.lang-btn {
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 600;
		text-decoration: none;
		color: rgba(255,255,255,0.25);
		transition: color 0.2s, background 0.2s;
	}
	.lang-btn:hover { color: rgba(255,255,255,0.6); }
	.lang-btn.active { color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.06); }
</style>
