<script lang="ts">
	import type { Component, ComponentType } from 'svelte';

	export type NavItem = {
		id: string;
		label: string;
		icon?: ComponentType<any> | Component<any>;
		href?: string;
	};

	type Props = {
		items: NavItem[];
		activeId: string;
		onSelect: (id: string) => void;
		class?: string;
	};

	let { items, activeId, onSelect, class: className = '' }: Props = $props();

	let navRefs = $state<Record<string, HTMLAnchorElement>>({});
	let indicatorLeft = $state(0);
	let indicatorWidth = $state(0);
	let indicatorOpacity = $state(0);

	$effect(() => {
		const target = navRefs[activeId];
		if (target) {
			indicatorLeft = target.offsetLeft;
			indicatorWidth = target.offsetWidth;
			indicatorOpacity = 1;
		}
	});
</script>

<div
	class="relative inline-flex items-center gap-1 rounded-full border border-white/15 bg-[#121215]/90 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl {className}"
	role="navigation"
>
	<!-- Active Pill Highlight Indicator -->
	<div
		class="pointer-events-none absolute top-1.5 bottom-1.5 rounded-full border border-white/20 bg-white/15 backdrop-blur-md transition-all duration-300 ease-out"
		style="left: {indicatorLeft}px; width: {indicatorWidth}px; opacity: {indicatorOpacity};"
	></div>

	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	{#each items as item (item.id)}
		{@const isActive = item.id === activeId}
		{@const Icon = item.icon}
		<a
			bind:this={navRefs[item.id]}
			href={item.href || `#${item.id}`}
			onclick={(e) => {
				e.preventDefault();
				onSelect(item.id);
			}}
			class="relative z-10 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-mono text-xs tracking-wider whitespace-nowrap transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 {isActive
				? 'font-semibold text-white'
				: 'text-neutral-300 hover:text-white'}"
			aria-current={isActive ? 'page' : undefined}
		>
			{#if Icon}
				<Icon size={14} strokeWidth={isActive ? 2 : 1.5} />
			{/if}
			<span>{item.label}</span>
		</a>
	{/each}
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
</div>
