<script lang="ts">
	import { Send } from 'lucide-svelte';
	import GithubIcon from '$lib/components/github-icon.svelte';
	import { intersect } from '$lib/actions/intersect';
	import { toast } from '$lib/stores/toast.svelte';
	import { sendEmail } from '$lib/utils/email';
	import * as m from '$lib/paraglide/messages';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let loading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		const result = await sendEmail({ name, email, message });
		loading = false;

		if (result.ok) {
			toast.show(m['toast.success'](), 'success');
			name = '';
			email = '';
			message = '';
		} else {
			toast.show(m['toast.error'](), 'error');
		}
	}

	const INPUT_CLASS =
		'w-full rounded-lg border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors focus:border-indigo-500/50 focus:outline-none';
	const LABEL_CLASS = 'block text-[10px] uppercase tracking-wider text-white/35';
</script>

<section
	id="contact"
	class="px-4 py-20 pb-32 md:pb-20"
	use:intersect={{ section: 'contact', threshold: 0.2 }}
>
	<div class="mx-auto w-full max-w-xl">
		<h2 class="mb-8 text-[11px] tracking-[0.3em] text-white/40 uppercase">
			{m['contact.title']()}
		</h2>

		<form onsubmit={handleSubmit} novalidate aria-label="Contact" class="mb-10 space-y-4">
			<div class="space-y-1.5">
				<label for="contact-name" class={LABEL_CLASS}>{m['contact.name']()}</label>
				<input
					id="contact-name"
					type="text"
					bind:value={name}
					placeholder={m['contact.name_placeholder']()}
					required
					autocomplete="name"
					class={INPUT_CLASS}
				/>
			</div>

			<div class="space-y-1.5">
				<label for="contact-email" class={LABEL_CLASS}>{m['contact.email']()}</label>
				<input
					id="contact-email"
					type="email"
					bind:value={email}
					placeholder={m['contact.email_placeholder']()}
					required
					autocomplete="email"
					class={INPUT_CLASS}
				/>
			</div>

			<div class="space-y-1.5">
				<label for="contact-message" class={LABEL_CLASS}>{m['contact.message']()}</label>
				<textarea
					id="contact-message"
					bind:value={message}
					placeholder={m['contact.message_placeholder']()}
					required
					rows="4"
					class="{INPUT_CLASS} resize-none"
				></textarea>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? m['contact.sending']() : m['contact.send']()}
				{#if !loading}
					<Send size={14} />
				{/if}
			</button>
		</form>

		<!-- Links -->
		<div
			class="flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:gap-6"
		>
			<a
				href="https://github.com/Vinicius-Gabriel-P-Leitao"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
			>
				<GithubIcon size={15} />
				GitHub
			</a>
			<span class="text-sm text-white/25 select-all">vinicius.gabriel.p.leitao@gmail.com</span>
		</div>
	</div>
</section>
