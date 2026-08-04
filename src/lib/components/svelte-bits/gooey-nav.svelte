<script lang="ts">
	import type { Component } from 'svelte';

	export type NavItem = {
		id: string;
		label: string;
		icon?: Component<any> | any;
		href?: string;
	};

	type Props = {
		items: NavItem[];
		activeId: string;
		onSelect: (id: string) => void;
		class?: string;
	};

	let { items, activeId, onSelect, class: className = '' }: Props = $props();

	let containerRef: HTMLDivElement;
	let activeIndex = $derived(items.findIndex((item) => item.id === activeId));
</script>

<!-- SVG Filter for Gooey Liquid Effect -->
<svg class="hidden" aria-hidden="true">
	<defs>
		<filter id="gooey-nav-filter">
			<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
			<feColorMatrix
				in="blur"
				mode="matrix"
				values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
				result="goo"
			/>
			<feComposite in="SourceGraphic" in2="goo" operator="atop" />
		</filter>
	</defs>
</svg>

<div
	bind:this={containerRef}
	class="relative flex items-center gap-1 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] {className}"
	role="navigation"
>
	{#each items as item, i (item.id)}
		{@const isActive = item.id === activeId}
		{@const Icon = item.icon}
		<a
			href={item.href || `#${item.id}`}
			onclick={(e) => {
				e.preventDefault();
				onSelect(item.id);
			}}
			class="relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 {isActive
				? 'text-white font-semibold'
				: 'text-neutral-400 hover:text-neutral-200'}"
			aria-current={isActive ? 'page' : undefined}
		>
			{#if Icon}
				<Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
			{/if}
			<span>{item.label}</span>
		</a>
	{/each}

	<!-- Active Pill Highlight Indicator -->
	<div
		class="absolute top-1.5 bottom-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md transition-all duration-300 ease-out pointer-events-none"
		style="
			width: {100 / items.length}%;
			transform: translateX({Math.max(0, activeIndex) * 100}%);
		"
	></div>
</div>
