<script lang="ts">
	import { Send, User, Mail, MessageSquare, Loader2, Paperclip, FileText, X } from 'lucide-svelte';
	import { toast } from '$lib/store/toast.svelte';
	import { sendEmail } from '$lib/service/email.service';
	import * as m from '$lib/paraglide/messages';

	let { onSuccess }: { onSuccess?: () => void } = $props();

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let loading = $state(false);
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
			onSuccess?.();
		} else {
			toast.show(m['toast.error'](), 'error');
		}
	}

	function handleInputKeyDown(e: KeyboardEvent) {
		e.stopPropagation();

		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			const form = (e.target as HTMLElement)?.closest('form');
			if (form) form.requestSubmit();
		}
	}

	async function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return;

		const file = input.files[0];
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

<form onsubmit={handleSubmit} novalidate aria-label="Contact" class="form flex flex-col gap-4">
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
					<span class="truncate text-xs font-semibold text-white">{selectedFile.name}</span>
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
				<span class="text-xs text-white/70">{m['contact.attachment_placeholder']()}</span>
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

<style>
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
