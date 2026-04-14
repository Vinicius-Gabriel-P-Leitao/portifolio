<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import Projects from '$lib/components/projects.svelte';
	import About from '$lib/components/about.svelte';
	import Contact from '$lib/components/contact.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Vinícius GPL — Full-Stack Developer</title>
</svelte:head>

<main>
	<Hero github={data.github} />
	<Projects />
	<About />
	<Contact />
</main>
