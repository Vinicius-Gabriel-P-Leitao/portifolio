<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Lenis from 'lenis';
	import {
		locales,
		localizeHref,
		getLocaleForUrl,
		setLocale,
		getLocale
	} from '$lib/paraglide/runtime';
	import type { Pathname } from '$app/types';
	import Toast from '$lib/components/toast.svelte';
	import BlackHole from '$lib/components/svelte-bits/black-hole.svelte';
	import Noise from '$lib/components/svelte-bits/Noise.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	const locale = $derived(browser ? (getLocaleForUrl(page.url.href) ?? getLocale()) : getLocale());

	let scrollProgress = $state(0);
	let scrollVelocity = $state(0);

	$effect(() => {
		setLocale(locale, { reload: false });
	});

	onMount(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true
		});

		lenis.on('scroll', (e: any) => {
			const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
			scrollProgress = maxScroll > 0 ? e.scroll / maxScroll : 0;
			scrollVelocity = e.velocity || 0;
		});

		let animationFrameId: number;
		function raf(time: number) {
			lenis.raf(time);
			animationFrameId = requestAnimationFrame(raf);
		}

		animationFrameId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(animationFrameId);
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Vinícius GPL — Full-Stack Developer portfolio." />
	<meta name="theme-color" content="#0a0a0a" />
</svelte:head>

<!-- Slim Top Scroll Progress Indicator -->
<div
	class="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-white to-cyan-500 z-50 transition-all duration-75 pointer-events-none opacity-80"
	style="width: {scrollProgress * 100}%"
></div>

<!-- Global Fixed Background: Buraco Negro Gargantua em OGL -->
<div aria-hidden="true" class="fixed inset-0 pointer-events-none z-0 opacity-75">
	<BlackHole
		speed={0.4}
		iterations={85}
		enableMouseInteraction={true}
		{scrollProgress}
		{scrollVelocity}
	/>
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
