<script lang="ts">
	import { MessageSquare, X } from 'lucide-svelte';
	import ContactForm from '$lib/components/contact-form.svelte';
	import * as m from '$lib/paraglide/messages';

	let { open, onClose }: { open: boolean; onClose: () => void } = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (open && e.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- Mobile Drawer Sheet Modal -->
	<div
		class="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm lg:hidden"
		role="dialog"
		aria-modal="true"
		aria-label={m['contact.open_form']()}
	>
		<!-- Backdrop overlay button -->
		<button
			type="button"
			class="absolute inset-0 h-full w-full cursor-default border-none bg-transparent"
			onclick={onClose}
			aria-label={m['contact.close_drawer']()}
		></button>

		<!-- Drawer Sheet Card -->
		<div
			class="mobile-drawer-sheet relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl border-t border-white/20 bg-[#121218] p-5 pb-8 shadow-2xl"
			role="document"
		>
			<!-- Handle indicator -->
			<div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/25"></div>

			<!-- Drawer Header -->
			<div class="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
				<div class="flex items-center gap-2.5">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/20 text-indigo-400"
					>
						<MessageSquare size={16} />
					</div>
					<div>
						<h3 class="text-sm font-bold text-white">{m['contact.open_form']()}</h3>
						<span class="text-[11px] text-white/50">{m['contact.fast_response']()}</span>
					</div>
				</div>
				<button
					type="button"
					onclick={onClose}
					class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
					aria-label={m['contact.close_drawer']()}
					title={m['contact.close_drawer']()}
				>
					<X size={18} />
				</button>
			</div>

			<!-- Render Form inside Drawer -->
			<ContactForm onSuccess={onClose} />
		</div>
	</div>
{/if}

<style>
	.mobile-drawer-sheet {
		animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
