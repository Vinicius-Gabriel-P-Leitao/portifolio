<script lang="ts">
	import { Home, FolderOpen, User, Mail } from 'lucide-svelte';
	import { isMobile } from '$lib/store/is-mobile.svelte';
	import { navigation } from '$lib/store/navigation.svelte';
	import type { Section } from '$lib/store/navigation.svelte';
	import * as m from '$lib/paraglide/messages';

	const ITEMS = $derived([
		{ id: 'hero' as Section, Icon: Home, label: m['nav.home']() },
		{ id: 'projects' as Section, Icon: FolderOpen, label: m['nav.projects']() },
		{ id: 'about' as Section, Icon: User, label: m['nav.about']() },
		{ id: 'contact' as Section, Icon: Mail, label: m['nav.contact']() }
	]);
</script>

{#if isMobile.current}
	<aside
		class="pointer-events-none fixed right-4 bottom-[max(0.85rem,env(safe-area-inset-bottom))] left-4 z-50 flex justify-center"
	>
		<nav class="bottom-nav pointer-events-auto" aria-label={m['nav.navigation']()}>
			{#each ITEMS as item (item.id)}
				{@const isActive = navigation.active === item.id}
				{@const Icon = item.Icon}
				<a
					href="#{item.id}"
					onclick={() => navigation.navigate(item.id)}
					class="bottom-item"
					class:active={isActive}
					aria-current={isActive ? 'page' : undefined}
					aria-label={item.label}
				>
					<Icon size={18} strokeWidth={isActive ? 2.2 : 1.5} />
					<span class="bottom-label">{item.label}</span>
				</a>
			{/each}
		</nav>
	</aside>
{/if}

<style>
	.bottom-nav {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.4rem 0.6rem;
		background: rgba(10, 10, 10, 0.75);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 9999px;
		box-shadow:
			0 10px 30px rgba(0, 0, 0, 0.8),
			0 0 20px rgba(255, 255, 255, 0.03);
	}

	.bottom-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		min-width: 56px;
		padding: 0.35rem 0.6rem;
		text-decoration: none;
		color: rgba(255, 255, 255, 0.35);
		transition:
			color 0.2s,
			background 0.2s,
			transform 0.2s;
		border-radius: 9999px;
	}
	.bottom-item:hover {
		color: rgba(255, 255, 255, 0.75);
	}
	.bottom-item.active {
		color: #fff;
		background: rgba(255, 255, 255, 0.12);
		box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
	}

	.bottom-label {
		font-size: 0.55rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-weight: 600;
	}
</style>
