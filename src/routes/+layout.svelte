<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import {
		locales,
		localizeHref,
		getLocaleForUrl,
		setLocale,
		getLocale
	} from '$lib/paraglide/runtime';
	import Toast from '$lib/components/toast.svelte';
	import BlackHole from '$lib/components/svelte-bits/black-hole.svelte';
	import Noise from '$lib/components/svelte-bits/Noise.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { scrollState } from '$lib/stores/scroll.svelte';

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

<!-- Slim Top Scroll Progress Indicator -->
<div
	class="pointer-events-none fixed top-0 left-0 z-50 h-[2px] bg-gradient-to-r from-amber-500 via-white to-cyan-500 opacity-80 transition-all duration-500"
	style="width: {scrollState.progress * 100}%"
></div>

<!-- Global Fixed Background: Buraco Negro Gargantua em OGL -->
<div aria-hidden="true" class="pointer-events-none fixed inset-0 z-0 opacity-75">
	<BlackHole
		speed={0.4}
		iterations={85}
		enableMouseInteraction={true}
		scrollProgress={scrollState.progress}
		scrollVelocity={scrollState.velocity}
	/>
</div>

<div
	aria-hidden="true"
	class="pointer-events-none fixed inset-0 z-[1]"
	style="background: radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, #0a0a0a 85%);"
></div>

<div aria-hidden="true" class="pointer-events-none fixed inset-0 z-[2]">
	<Noise patternAlpha={8} patternRefreshInterval={4} />
</div>

{#key locale}
	<div class="relative z-10">
		{@render children()}
	</div>

	<Toast />
{/key}

<div style="display:none">
	{#each locales as loc (loc)}
		<a href={localizeHref(page.url.pathname, { locale: loc })}>{loc}</a>
	{/each}
</div>
