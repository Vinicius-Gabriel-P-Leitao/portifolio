<script lang="ts">
	import { Send } from 'lucide-svelte';
	import GithubIcon from '$lib/components/github-icon.svelte';
	import { intersect } from '$lib/actions/intersect';
	import { toast } from '$lib/stores/toast.svelte';
	import { sendEmail } from '$lib/services/email.service';
	import FadeContent from '$lib/components/svelte-bits/fade-content.svelte';

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
			name = ''; email = ''; message = '';
		} else {
			toast.show(m['toast.error'](), 'error');
		}
	}
</script>

<section
	id="contact"
	class="px-6 py-24 pb-32 md:pb-24"
	use:intersect={{ section: 'contact', threshold: 0.2 }}
>
	<div class="mx-auto w-full max-w-md">

		<FadeContent blur duration={800} threshold={0.2} class="mb-12">
			<div class="section-header">
				<span class="section-label">{m['contact.title']()}</span>
				<h2 class="section-title">{m['contact.title']()}</h2>
			</div>
		</FadeContent>

		<FadeContent blur duration={900} delay={100} threshold={0.15}>
			<form onsubmit={handleSubmit} novalidate aria-label="Contact" class="form">
				<div class="field">
					<label for="contact-name" class="field-label">{m['contact.name']()}</label>
					<input
						id="contact-name" type="text" bind:value={name}
						placeholder={m['contact.name_placeholder']()}
						required autocomplete="name" class="field-input"
					/>
				</div>

				<div class="field">
					<label for="contact-email" class="field-label">{m['contact.email']()}</label>
					<input
						id="contact-email" type="email" bind:value={email}
						placeholder={m['contact.email_placeholder']()}
						required autocomplete="email" class="field-input"
					/>
				</div>

				<div class="field">
					<label for="contact-message" class="field-label">{m['contact.message']()}</label>
					<textarea
						id="contact-message" bind:value={message}
						placeholder={m['contact.message_placeholder']()}
						required rows="5" class="field-input resize-none"
					></textarea>
				</div>

				<button type="submit" disabled={loading} class="btn-send">
					{loading ? m['contact.sending']() : m['contact.send']()}
					{#if !loading}<Send size={13} />{/if}
				</button>
			</form>

			<div class="contact-links">
				<a
					href="https://github.com/Vinicius-Gabriel-P-Leitao"
					target="_blank" rel="noopener noreferrer"
					class="contact-link"
				>
					<GithubIcon size={14} />
					GitHub
				</a>
				<span class="contact-email select-all">vinicius.gabriel.p.leitao@gmail.com</span>
			</div>
		</FadeContent>
	</div>
</section>

<style>
	.section-label {
		font-size: 0.65rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		display: block;
		margin-bottom: 0.5rem;
	}
	.section-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: rgba(255,255,255,0.9);
		line-height: 1;
	}

	.form { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem; }

	.field { display: flex; flex-direction: column; gap: 0.375rem; }

	.field-label {
		font-size: 0.65rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.3);
		font-weight: 600;
	}

	.field-input {
		width: 100%;
		padding: 0.75rem 0.875rem;
		background: rgba(255,255,255,0.03);
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: 8px;
		color: rgba(255,255,255,0.85);
		font-size: 0.875rem;
		font-family: inherit;
		transition: border-color 0.2s, background 0.2s;
		outline: none;
	}
	.field-input::placeholder { color: rgba(255,255,255,0.16); }
	.field-input:focus {
		border-color: rgba(255,255,255,0.2);
		background: rgba(255,255,255,0.05);
	}

	.btn-send {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 0.7rem 1.5rem;
		border-radius: 6px;
		background: white;
		color: #0a0a0a;
		font-size: 0.8rem;
		font-weight: 600;
		font-family: inherit;
		border: none;
		cursor: pointer;
		transition: opacity 0.2s, transform 0.2s;
	}
	.btn-send:hover { opacity: 0.88; transform: translateY(-1px); }
	.btn-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

	.contact-links {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255,255,255,0.06);
	}
	.contact-link {
		display: flex; align-items: center; gap: 5px;
		font-size: 0.8rem; color: rgba(255,255,255,0.35);
		text-decoration: none; transition: color 0.2s;
	}
	.contact-link:hover { color: rgba(255,255,255,0.75); }
	.contact-email { font-size: 0.75rem; color: rgba(255,255,255,0.2); }
</style>
