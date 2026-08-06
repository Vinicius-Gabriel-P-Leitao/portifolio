<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Send,
		User,
		Mail,
		MessageSquare,
		Copy,
		Check,
		Loader2,
		ArrowUpRight,
		Paperclip,
		FileText,
		X
	} from 'lucide-svelte';
	import GithubIcon from '$lib/components/github-icon.svelte';
	import WhatsappIcon from '$lib/components/whatsapp-icon.svelte';
	import { toast } from '$lib/stores/toast.svelte';
	import { sendEmail } from '$lib/services/email.service';
	import FadeContent from '$lib/components/svelte-bits/fade-content.svelte';
	import SpotlightCard from '$lib/components/svelte-bits/spotlight-card.svelte';
	import * as m from '$lib/paraglide/messages';

	let sectionEl = $state<HTMLElement | null>(null);

	onMount(() => {
		const t = setTimeout(() => {
			if (sectionEl) sectionEl.dataset.visible = 'true';
		}, 200);
		return () => clearTimeout(t);
	});

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let loading = $state(false);
	let copied = $state(false);
	let emailTouched = $state(false);

	let selectedFile = $state<File | null>(null);
	let fileBase64 = $state<string | null>(null);
	let fileReading = $state(false);

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const isEmailValid = $derived(email === '' || emailPattern.test(email));

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim() || !email.trim() || !message.trim()) {
			toast.show(m['toast.error'](), 'error');
			return;
		}
		if (!emailPattern.test(email)) {
			toast.show(m['contact.invalid_email'](), 'error');
			return;
		}

		loading = true;

		const attachment =
			selectedFile && fileBase64
				? {
						filename: selectedFile.name,
						content: fileBase64
					}
				: null;

		const result = await sendEmail({ name, email, message, attachment });
		loading = false;

		if (result.ok) {
			toast.show(m['toast.success'](), 'success');
			name = '';
			email = '';
			message = '';
			emailTouched = false;
			selectedFile = null;
			fileBase64 = null;
		} else {
			toast.show(m['toast.error'](), 'error');
		}
	}

	function handleInputKeyDown(e: KeyboardEvent) {
		// Stop event propagation so parent carousel keyboard listener won't hijack Space or Arrow keys
		e.stopPropagation();

		// Allow sending message with Ctrl+Enter or Cmd+Enter from textarea
		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			const form = (e.target as HTMLElement)?.closest('form');
			if (form) form.requestSubmit();
		}
	}

	async function copyEmail() {
		const targetEmail = 'vinicius.gabriel.p.leitao@gmail.com';
		try {
			await navigator.clipboard.writeText(targetEmail);
			copied = true;
			toast.show(m['contact.email_copied'](), 'success');
			setTimeout(() => {
				copied = false;
			}, 2500);
		} catch {
			copied = true;
			setTimeout(() => (copied = false), 2500);
		}
	}

	async function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return;

		const file = input.files[0];
		// 5MB limit
		if (file.size > 5 * 1024 * 1024) {
			toast.show(m['contact.file_too_large'](), 'error');
			input.value = '';
			return;
		}

		fileReading = true;
		try {
			const base64 = await fileToBase64(file);
			selectedFile = file;
			fileBase64 = base64;
		} catch {
			toast.show(m['contact.file_read_error'](), 'error');
		} finally {
			fileReading = false;
		}
	}

	function removeFile() {
		selectedFile = null;
		fileBase64 = null;
	}

	function fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				const result = reader.result as string;
				const base64 = result.includes(',') ? result.split(',')[1] : result;
				resolve(base64);
			};
			reader.onerror = (err) => reject(err);
			reader.readAsDataURL(file);
		});
	}
</script>

<section
	id="contact"
	class="flex min-h-full flex-col items-center justify-center px-4 pt-14 pb-20 sm:px-6 sm:pt-16 sm:pb-24"
	bind:this={sectionEl}
>
	<div class="mx-auto w-full max-w-5xl">
		<!-- Section Index Header -->
		<div class="mb-6 flex items-center justify-between sm:mb-8">
			<div class="flex items-center gap-3 sm:gap-4">
				<span
					class="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-white/90 uppercase sm:px-3.5 sm:text-xs"
				>
					{m['contact.header_index']()}
				</span>
				<div class="h-[1px] w-8 bg-white/20 sm:w-12"></div>
			</div>
			<div
				class="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] text-white/90 sm:px-3.5 sm:text-xs"
			>
				<span class="font-bold text-white">03</span>
				<span>/</span>
				<span>03</span>
			</div>
		</div>

		<!-- 2-Column Responsive Layout -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
			<!-- Left Column: Title & Info Cards -->
			<div class="flex flex-col justify-between lg:col-span-5">
				<div>
					<FadeContent blur duration={800} threshold={0.2}>
						<!-- Availability Status Pill -->
						<div
							class="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md"
						>
							<span class="relative flex h-2 w-2">
								<span
									class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
								></span>
								<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
							</span>
							<span>{m['contact.status_available']()}</span>
						</div>

						<h2 class="section-title mb-3">{m['contact.title']()}</h2>
						<p class="subtitle-text mb-6">{m['contact.subtitle']()}</p>
					</FadeContent>

					<FadeContent blur duration={900} delay={100} threshold={0.15}>
						<div class="info-cards flex flex-col gap-3">
							<!-- Email Card with Copy Button -->
							<div class="info-card group">
								<div class="flex min-w-0 items-center gap-3">
									<div class="icon-box">
										<Mail size={16} class="text-white/80" />
									</div>
									<div class="min-w-0 flex-1">
										<span class="info-label">{m['contact.email']()}</span>
										<a
											href="mailto:vinicius.gabriel.p.leitao@gmail.com"
											class="info-value truncate hover:underline"
										>
											vinicius.gabriel.p.leitao@gmail.com
										</a>
									</div>
								</div>
								<button
									type="button"
									onclick={copyEmail}
									class="btn-copy"
									title={m['contact.copy_email']()}
									aria-label={m['contact.copy_email']()}
								>
									{#if copied}
										<Check size={14} class="text-emerald-400" />
									{:else}
										<Copy size={14} />
									{/if}
								</button>
							</div>

							<!-- GitHub Card -->
							<a
								href="https://github.com/Vinicius-Gabriel-P-Leitao"
								target="_blank"
								rel="noopener noreferrer"
								class="info-card group"
							>
								<div class="flex items-center gap-3">
									<div class="icon-box">
										<GithubIcon size={16} />
									</div>
									<div>
										<span class="info-label">GitHub</span>
										<span class="info-value">@Vinicius-Gabriel-P-Leitao</span>
									</div>
								</div>
								<div class="arrow-box">
									<ArrowUpRight
										size={14}
										class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									/>
								</div>
							</a>

							<!-- WhatsApp Card -->
							<a
								href="https://wa.me/5562992952214?text={encodeURIComponent(
									m['contact.whatsapp_text']()
								)}"
								target="_blank"
								rel="noopener noreferrer"
								class="info-card group"
							>
								<div class="flex items-center gap-3">
									<div class="icon-box border-emerald-500/30 bg-emerald-500/10">
										<WhatsappIcon size={16} />
									</div>
									<div>
										<span class="info-label">WhatsApp</span>
										<span class="info-value">+55 62 99295-2214</span>
									</div>
								</div>
								<div class="arrow-box">
									<ArrowUpRight
										size={14}
										class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									/>
								</div>
							</a>
						</div>
					</FadeContent>
				</div>
			</div>

			<!-- Right Column: Interactive Contact Form Card -->
			<div class="lg:col-span-7">
				<FadeContent blur duration={900} delay={150} threshold={0.15}>
					<SpotlightCard class="contact-spotlight-card" spotlightColor="rgba(99, 102, 241, 0.15)">
						<form
							onsubmit={handleSubmit}
							novalidate
							aria-label="Contact"
							class="form flex flex-col gap-4"
						>
							<!-- Field: Name -->
							<div class="field">
								<label for="contact-name" class="field-label flex items-center gap-1.5">
									<User size={12} class="text-white/60" />
									<span>{m['contact.name']()}</span>
								</label>
								<div class="input-wrapper">
									<input
										id="contact-name"
										type="text"
										bind:value={name}
										onkeydown={handleInputKeyDown}
										placeholder={m['contact.name_placeholder']()}
										required
										autocomplete="name"
										class="field-input"
									/>
								</div>
							</div>

							<!-- Field: Email -->
							<div class="field">
								<label for="contact-email" class="field-label flex items-center gap-1.5">
									<Mail size={12} class="text-white/60" />
									<span>{m['contact.email']()}</span>
								</label>
								<div class="input-wrapper">
									<input
										id="contact-email"
										type="email"
										bind:value={email}
										onblur={() => (emailTouched = true)}
										onkeydown={handleInputKeyDown}
										placeholder={m['contact.email_placeholder']()}
										required
										autocomplete="email"
										class="field-input"
										class:input-invalid={emailTouched && !isEmailValid}
									/>
								</div>
								{#if emailTouched && !isEmailValid}
									<span class="field-error">{m['contact.invalid_email']()}</span>
								{/if}
							</div>

							<!-- Field: Message -->
							<div class="field">
								<div class="flex items-center justify-between">
									<label for="contact-message" class="field-label flex items-center gap-1.5">
										<MessageSquare size={12} class="text-white/60" />
										<span>{m['contact.message']()}</span>
									</label>
									<span class="font-mono text-[10px] text-white/40">{message.length}/1000</span>
								</div>
								<div class="input-wrapper">
									<textarea
										id="contact-message"
										bind:value={message}
										onkeydown={handleInputKeyDown}
										placeholder={m['contact.message_placeholder']()}
										required
										rows="4"
										maxlength={1000}
										class="field-input resize-none"
									></textarea>
								</div>
							</div>

							<!-- Field: File Attachment -->
							<div class="field">
								<label for="contact-file" class="field-label flex items-center gap-1.5">
									<Paperclip size={12} class="text-white/60" />
									<span>{m['contact.attachment']()}</span>
								</label>

								{#if selectedFile}
									<div class="file-pill">
										<div class="flex min-w-0 items-center gap-2">
											<FileText size={14} class="shrink-0 text-indigo-400" />
											<span class="truncate text-xs font-semibold text-white"
												>{selectedFile.name}</span
											>
											<span class="shrink-0 font-mono text-[10px] text-white/50"
												>({(selectedFile.size / 1024).toFixed(0)} KB)</span
											>
										</div>
										<button
											type="button"
											onclick={removeFile}
											class="btn-remove-file"
											title={m['contact.remove_attachment']()}
											aria-label={m['contact.remove_attachment']()}
										>
											<X size={13} />
										</button>
									</div>
								{:else}
									<label for="contact-file" class="file-dropzone">
										<Paperclip size={14} class="text-white/50" />
										<span class="text-xs text-white/70"
											>{m['contact.attachment_placeholder']()}</span
										>
										<input
											id="contact-file"
											type="file"
											onchange={handleFileSelect}
											accept=".pdf,.png,.jpg,.jpeg,.docx,.doc,.zip,.txt"
											class="sr-only"
										/>
									</label>
								{/if}
							</div>

							<!-- Footer actions: Shortcut hint & Submit Button -->
							<div
								class="mt-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between"
							>
								<span class="hidden font-mono text-[11px] text-white/40 sm:inline-block">
									{m['contact.shortcut_hint']()}
								</span>

								<button type="submit" disabled={loading || fileReading} class="btn-send">
									{#if loading || fileReading}
										<Loader2 size={15} class="animate-spin" />
										<span>{m['contact.sending']()}</span>
									{:else}
										<span>{m['contact.send']()}</span>
										<Send size={14} class="btn-icon transition-transform duration-200" />
									{/if}
								</button>
							</div>
						</form>
					</SpotlightCard>
				</FadeContent>
			</div>
		</div>
	</div>
</section>

<style>
	.section-title {
		font-size: clamp(2rem, 4.5vw, 3.25rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #ffffff;
		line-height: 1.05;
	}

	.subtitle-text {
		font-size: 0.95rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.75);
		max-width: 42ch;
	}

	:global(.contact-spotlight-card) {
		padding: 1.75rem !important;
		border-radius: 20px !important;
		background: rgba(18, 18, 24, 0.92) !important;
		backdrop-filter: blur(24px) !important;
		border: 1px solid rgba(255, 255, 255, 0.15) !important;
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.8),
			inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
	}

	@media (max-width: 640px) {
		:global(.contact-spotlight-card) {
			padding: 1.25rem !important;
			border-radius: 16px !important;
		}
	}

	.info-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.15rem;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.22);
		box-shadow:
			0 8px 24px rgba(0, 0, 0, 0.6),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		text-decoration: none;
	}
	.info-card:hover {
		background: rgba(255, 255, 255, 0.18);
		border-color: rgba(255, 255, 255, 0.45);
		transform: translateY(-2px);
		box-shadow:
			0 12px 30px rgba(0, 0, 0, 0.7),
			0 0 20px rgba(255, 255, 255, 0.1);
	}

	.icon-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.16);
		border: 1px solid rgba(255, 255, 255, 0.28);
		color: #ffffff;
		flex-shrink: 0;
	}

	.info-label {
		display: block;
		font-size: 0.65rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.7);
	}

	.info-value {
		display: block;
		font-size: 0.88rem;
		font-weight: 700;
		color: #ffffff;
	}

	.btn-copy {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.16);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: #ffffff;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.btn-copy:hover {
		background: rgba(255, 255, 255, 0.32);
		border-color: #ffffff;
		transform: scale(1.05);
	}

	.arrow-box {
		color: rgba(255, 255, 255, 0.75);
		transition: all 0.2s ease;
	}
	.info-card:hover .arrow-box {
		color: #ffffff;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.field-label {
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.75);
		font-weight: 700;
	}

	.input-wrapper {
		position: relative;
		width: 100%;
	}

	.field-input {
		width: 100%;
		padding: 0.75rem 1rem;
		background: rgba(0, 0, 0, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 12px;
		color: #ffffff;
		font-size: 0.88rem;
		font-family: inherit;
		transition: all 0.2s ease;
		outline: none;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
	}
	.field-input::placeholder {
		color: rgba(255, 255, 255, 0.35);
	}
	.field-input:focus {
		border-color: rgba(255, 255, 255, 0.5);
		background: rgba(0, 0, 0, 0.7);
		box-shadow:
			0 0 0 3px rgba(255, 255, 255, 0.1),
			inset 0 2px 4px rgba(0, 0, 0, 0.4);
	}
	.field-input.input-invalid {
		border-color: rgba(239, 68, 68, 0.7);
	}

	.field-error {
		font-size: 0.72rem;
		color: #f87171;
	}

	.file-dropzone {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.65rem 0.9rem;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.4);
		border: 1px dashed rgba(255, 255, 255, 0.25);
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.file-dropzone:hover {
		background: rgba(0, 0, 0, 0.6);
		border-color: rgba(255, 255, 255, 0.45);
	}

	.file-pill {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.55rem 0.85rem;
		border-radius: 10px;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.35);
	}

	.btn-remove-file {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.15);
		color: #ffffff;
		border: none;
		cursor: pointer;
		transition: background 0.2s;
	}
	.btn-remove-file:hover {
		background: rgba(239, 68, 68, 0.8);
	}

	.btn-send {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 0.8rem 1.6rem;
		border-radius: 12px;
		background: #ffffff;
		color: #09090b;
		font-size: 0.88rem;
		font-weight: 700;
		font-family: inherit;
		border: none;
		cursor: pointer;
		box-shadow: 0 4px 15px rgba(255, 255, 255, 0.15);
		transition: all 0.2s ease;
	}
	.btn-send:hover:not(:disabled) {
		background: #f4f4f5;
		transform: translateY(-1.5px);
		box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
	}
	.btn-send:hover:not(:disabled) :global(.btn-icon) {
		transform: translateX(2px) translateY(-1px);
	}
	.btn-send:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}
</style>
