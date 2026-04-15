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

	$effect(() => {
		if (!browser) return;
		const handler = () => {
			scrolled = window.scrollY > 20;
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

<header
	class={[
		'fixed inset-x-0 top-0 z-50 transition-all duration-300',
		scrolled ? 'border-b border-white/8 bg-black/85 backdrop-blur-md' : ''
	].join(' ')}
>
	<nav class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
		<!-- Logo / brand -->
		<span class="shrink-0 text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">
			{m['site.name']()}
		</span>

		<!-- Desktop nav links (icon + label) -->
		{#if !isMobile.current}
			<div class="flex items-center gap-1">
				{#each NAV_LINKS as link (link.id)}
					{@const isActive = navigation.active === link.id}
					{@const Icon = link.Icon}
					<a
						href="#{link.id}"
						onclick={() => navigation.navigate(link.id)}
						class={[
							'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] tracking-widest uppercase transition-colors',
							isActive ? 'bg-white/8 text-white' : 'text-white/40 hover:text-white/70'
						].join(' ')}
						aria-current={isActive ? 'page' : undefined}
					>
						<Icon size={13} strokeWidth={isActive ? 2.5 : 1.5} />
						{link.label()}
					</a>
				{/each}
			</div>
		{/if}

		<!-- Language switcher -->
		<div class="flex shrink-0 items-center gap-1">
			{#each locales as locale (locale)}
				<a
					href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}
					class={[
						'rounded px-2 py-1 text-[10px] tracking-widest uppercase transition-colors',
						getLocale() === locale ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/60'
					].join(' ')}
				>
					{locale === 'pt-br' ? 'PT' : 'EN'}
				</a>
			{/each}
		</div>
	</nav>
</header>
