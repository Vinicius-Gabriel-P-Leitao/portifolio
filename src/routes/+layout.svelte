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
	import BlackHole from '$lib/components/svelte-bits/BlackHole.svelte';
	import Noise from '$lib/components/svelte-bits/Noise.svelte';
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

<!-- Global Fixed Background: Buraco Negro Gargantua em OGL -->
<div aria-hidden="true" class="fixed inset-0 pointer-events-none z-0 opacity-70">
	<BlackHole speed={0.4} iterations={90} enableMouseInteraction={true} />
</div>

<div
	aria-hidden="true"
	class="fixed inset-0 pointer-events-none z-[1]"
	style="background: radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, #0a0a0a 85%);"
></div>

<div aria-hidden="true" class="fixed inset-0 pointer-events-none z-[2]">
	<Noise patternAlpha={8} patternRefreshInterval={4} />
</div>

{#key locale}
	<Navbar />
	<BottomNav />

	<div class="relative z-10">
		{@render children()}
	</div>

	<Toast />
{/key}

<div style="display:none">
	{#each locales as loc (loc)}
		<a href={resolve(localizeHref(page.url.pathname, { locale: loc }) as Pathname)}>{loc}</a>
	{/each}
</div>
