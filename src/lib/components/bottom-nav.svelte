<script lang="ts">
	import { Home, FolderOpen, User, Mail } from 'lucide-svelte';
	import { isMobile } from '$lib/reactive/is-mobile.svelte';
	import { navigation } from '$lib/stores/navigation.svelte';
	import * as m from '$lib/paraglide/messages';

	const ITEMS = [
		{ id: 'hero', Icon: Home, label: () => m['nav.home']() },
		{ id: 'projects', Icon: FolderOpen, label: () => m['nav.projects']() },
		{ id: 'about', Icon: User, label: () => m['nav.about']() },
		{ id: 'contact', Icon: Mail, label: () => m['nav.contact']() }
	] as const;
</script>

{#if isMobile.current}
	<nav class="bottom-nav" aria-label="Mobile navigation">
		{#each ITEMS as item (item.id)}
			{@const isActive = navigation.active === item.id}
			{@const Icon = item.Icon}
			<a
				href="#{item.id}"
				onclick={() => navigation.navigate(item.id)}
				class="bottom-item"
				class:active={isActive}
				aria-current={isActive ? 'page' : undefined}
			>
				<Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
				<span class="bottom-label">{item.label()}</span>
			</a>
		{/each}
	</nav>
{/if}

<style>
	.bottom-nav {
		position: fixed;
		inset-x: 0;
		bottom: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0.5rem 0.5rem 0.875rem;
		background: rgba(10, 10, 10, 0.9);
		backdrop-filter: blur(20px);
		border-top: 1px solid rgba(255,255,255,0.06);
	}

	.bottom-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3px;
		min-width: 52px;
		padding: 0.35rem 0.5rem;
		text-decoration: none;
		color: rgba(255,255,255,0.28);
		transition: color 0.2s;
		border-radius: 8px;
	}
	.bottom-item:hover { color: rgba(255,255,255,0.55); }
	.bottom-item.active { color: rgba(255,255,255,0.85); }

	.bottom-label {
		font-size: 0.55rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-weight: 500;
	}
</style>
