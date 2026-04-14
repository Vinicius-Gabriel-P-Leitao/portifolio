<script lang="ts">
	import { Home, FolderOpen, User, Mail } from 'lucide-svelte';
	import { isMobile } from '$lib/hooks/is-mobile.svelte';
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
	<nav
		class="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-white/8 bg-black/90 px-2 py-2 backdrop-blur-md"
		aria-label="Mobile navigation"
	>
		{#each ITEMS as item (item.id)}
			{@const isActive = navigation.active === item.id}
			{@const Icon = item.Icon}
			<a
				href="#{item.id}"
				onclick={() => navigation.navigate(item.id)}
				class={[
					'flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-all duration-200',
					isActive ? 'text-white' : 'text-white/30 hover:text-white/60'
				].join(' ')}
				aria-current={isActive ? 'page' : undefined}
			>
				<span class={['transition-transform duration-200', isActive ? 'scale-110' : ''].join(' ')}>
					<Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
				</span>
				<span class="text-[9px] leading-none tracking-widest uppercase">{item.label()}</span>
			</a>
		{/each}
	</nav>
{/if}
