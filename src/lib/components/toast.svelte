<script lang="ts">
	import { CheckCircle, XCircle, X } from 'lucide-svelte';
	import { toast } from '$lib/stores/toast.svelte';
	import { fade, fly } from 'svelte/transition';
</script>

<div
	class="pointer-events-none fixed right-4 bottom-20 z-[100] flex w-full max-w-xs flex-col gap-2 md:bottom-6"
	aria-live="polite"
	aria-atomic="false"
>
	{#each toast.items as item (item.id)}
		<div
			in:fly={{ y: 12, duration: 200 }}
			out:fade={{ duration: 150 }}
			class={[
				'pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-sm backdrop-blur-sm',
				item.variant === 'success'
					? 'border-green-800/40 bg-green-950/90 text-green-100'
					: 'border-red-800/40 bg-red-950/90 text-red-100'
			].join(' ')}
			role="alert"
		>
			{#if item.variant === 'success'}
				<CheckCircle size={16} class="mt-0.5 shrink-0 text-green-400" />
			{:else}
				<XCircle size={16} class="mt-0.5 shrink-0 text-red-400" />
			{/if}

			<span class="flex-1 leading-snug">{item.message}</span>

			<button
				type="button"
				onclick={() => toast.dismiss(item.id)}
				class="shrink-0 text-white/30 transition-colors hover:text-white"
				aria-label="Dismiss notification"
			>
				<X size={14} />
			</button>
		</div>
	{/each}
</div>
