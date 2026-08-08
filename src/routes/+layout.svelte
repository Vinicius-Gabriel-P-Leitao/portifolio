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
	import Navbar from '$lib/components/navbar.svelte';
	import Toast from '$lib/components/toast.svelte';
	import Threads from '$lib/components/svelte-bits/threads.svelte';
	import Noise from '$lib/components/svelte-bits/Noise.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { scrollState } from '$lib/store/scroll.svelte';
	import * as m from '$lib/paraglide/messages';

	let { children } = $props();
	const locale = $derived(browser ? (getLocaleForUrl(page.url.href) ?? getLocale()) : getLocale());

	$effect(() => {
		setLocale(locale, { reload: false });
	});

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': 'https://vinicius-gpl.com/#person',
				name: 'Vinícius GPL',
				alternateName: 'Vinícius Gabriel P. Leitão',
				jobTitle: locale === 'pt-br' ? 'Desenvolvedor Full-Stack' : 'Full-Stack Developer',
				description: m['site.description'](),
				url: 'https://vinicius-gpl.com',
				sameAs: ['https://github.com/Vinicius-Gabriel-P-Leitao'],
				knowsAbout: [
					'TypeScript',
					'JavaScript',
					'SvelteKit',
					'Svelte',
					'React',
					'Java',
					'Spring Boot',
					'Rust',
					'Kotlin',
					'Python',
					'FastAPI',
					'Go',
					'Docker',
					'RAG',
					'TailwindCSS'
				]
			},
			{
				'@type': 'WebSite',
				'@id': 'https://vinicius-gpl.com/#website',
				url: 'https://vinicius-gpl.com',
				name: m['site.name'](),
				description: m['site.description'](),
				publisher: {
					'@id': 'https://vinicius-gpl.com/#person'
				},
				inLanguage: [locale === 'pt-br' ? 'pt-BR' : 'en-US']
			},
			{
				'@type': 'ProfilePage',
				'@id': page.url.href,
				url: page.url.href,
				name: m['site.title'](),
				isPartOf: {
					'@id': 'https://vinicius-gpl.com/#website'
				},
				mainEntity: {
					'@id': 'https://vinicius-gpl.com/#person'
				}
			}
		]
	});

	/**
	 * Writes the JSON-LD payload as the script element's textContent.
	 * Avoids both {@html <string>} (raw-HTML injection) and interpolation
	 * inside a nested <script> tag's text (which lint tooling that scans
	 * for <script> boundaries textually fails to associate with `jsonLd`,
	 * flagging it as unused).
	 */
	function bindJsonLd(node: HTMLScriptElement, data: Record<string, unknown>) {
		node.textContent = JSON.stringify(data);
		return {
			update(newData: Record<string, unknown>) {
				node.textContent = JSON.stringify(newData);
			}
		};
	}
</script>

<svelte:head>
	<title>{m['site.title']()}</title>
	<link rel="icon" href={favicon} />

	<!-- Core SEO Meta Tags -->
	<meta name="description" content={m['site.description']()} />
	<meta name="keywords" content={m['site.keywords']()} />
	<meta name="author" content="Vinícius GPL" />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#0a0a0a" />

	<!-- Canonical & Multilingual Alternate Links -->
	<link rel="canonical" href={page.url.href} />
	{#each locales as loc (loc)}
		<link rel="alternate" hreflang={loc} href={localizeHref(page.url.pathname, { locale: loc })} />
	{/each}

	<link
		rel="alternate"
		hreflang="x-default"
		href={localizeHref(page.url.pathname, { locale: 'pt-br' })}
	/>

	<!-- Open Graph Meta Tags -->
	<meta property="og:site_name" content={m['site.name']()} />
	<meta property="og:title" content={m['site.og_title']()} />
	<meta property="og:description" content={m['site.og_description']()} />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:locale" content={locale === 'pt-br' ? 'pt_BR' : 'en_US'} />
	<meta property="og:image" content="https://vinicius-gpl.com/static/social/vinicius-gpl.com.png" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m['site.og_title']()} />
	<meta name="twitter:description" content={m['site.og_description']()} />
	<meta
		name="twitter:image"
		content="https://vinicius-gpl.com/static/social/vinicius-gpl.com.png"
	/>

	<!-- JSON-LD Structured Data for Google & AI Engines.
	     Literal <script> element (not {@html}), content set via the
	     bindJsonLd action instead of text interpolation — see bindJsonLd
	     above for why. -->
	<script type="application/ld+json" use:bindJsonLd={jsonLd}></script>
</svelte:head>

<!-- Slim Top Scroll Progress Indicator -->
<div
	class="pointer-events-none fixed top-0 left-0 z-50 h-0.5 bg-linear-to-r from-amber-500 via-white to-cyan-500 opacity-80 transition-all duration-500"
	style="width: {scrollState.progress * 100}%"
></div>

<!-- Global Fixed Background: Threads em OGL -->
<div aria-hidden="true" class="pointer-events-none fixed inset-0 z-0 opacity-75">
	<Threads amplitude={1.5} distance={0} enableMouseInteraction={true} color={[1, 1, 1]} />
</div>

<div
	aria-hidden="true"
	class="pointer-events-none fixed inset-0 z-1"
	style="background: radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, #0a0a0a 85%);"
></div>

<div aria-hidden="true" class="pointer-events-none fixed inset-0 z-2">
	<Noise patternAlpha={8} patternRefreshInterval={4} />
</div>

{#key locale}
	<div class="relative z-10">
		<Navbar />
		{@render children()}
	</div>

	<Toast />
{/key}

<div style="display:none">
	{#each locales as loc (loc)}
		<a href={localizeHref(page.url.pathname, { locale: loc })}>{loc}</a>
	{/each}
</div>
