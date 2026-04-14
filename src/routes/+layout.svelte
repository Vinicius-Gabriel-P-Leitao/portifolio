<script lang="ts">
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import {
		locales,
		localizeHref,
		getLocaleForUrl,
		setLocale,
		getLocale
	} from '$lib/paraglide/runtime';
	import type { Pathname } from '$app/types';
	import Navbar from '$lib/components/navbar.svelte';
	import BottomNav from '$lib/components/bottom-nav.svelte';
	import Toast from '$lib/components/toast.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	const locale = $derived(browser ? (getLocaleForUrl(page.url.href) ?? getLocale()) : getLocale());

	$effect(() => {
		setLocale(locale, { reload: false });
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Vinícius GPL — Full-Stack Developer portfolio." />
	<meta name="theme-color" content="#0a0a0a" />
</svelte:head>

{#key locale}
	<Navbar />
	<BottomNav />

	{@render children()}

	<Toast />
{/key}

<div style="display:none">
	{#each locales as loc (loc)}
		<a href={resolve(localizeHref(page.url.pathname, { locale: loc }) as Pathname)}>{loc}</a>
	{/each}
</div>
