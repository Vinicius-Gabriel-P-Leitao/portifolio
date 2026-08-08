<script lang="ts">
	import { onMount } from 'svelte';
	import { Mail, Copy, Check, ArrowUpRight, MessageSquare, Send } from 'lucide-svelte';
	import GithubIcon from '$lib/components/github-icon.svelte';
	import WhatsappIcon from '$lib/components/whatsapp-icon.svelte';
	import { toast } from '$lib/stores/toast.svelte';
	import FadeContent from '$lib/components/svelte-bits/fade-content.svelte';
	import SpotlightCard from '$lib/components/svelte-bits/spotlight-card.svelte';
	import ContactForm from '$lib/components/contact-form.svelte';
	import * as m from '$lib/paraglide/messages';

	let { onOpenDrawer }: { onOpenDrawer?: () => void } = $props();

	let sectionEl = $state<HTMLElement | null>(null);
	let copied = $state(false);

	onMount(() => {
		const t = setTimeout(() => {
			if (sectionEl) sectionEl.dataset.visible = 'true';
		}, 200);
		return () => clearTimeout(t);
	});

	async function copyEmail() {
		const targetEmail = 'contato@vinicius-gpl.com';
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
											href="mailto:contato@vinicius-gpl.com"
											class="info-value truncate hover:underline"
										>
											contato@vinicius-gpl.com
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

							<!-- Mobile Action Button to open Message Drawer -->
							<button
								type="button"
								onclick={onOpenDrawer}
								class="mobile-drawer-btn group mt-2 flex w-full items-center justify-between gap-3 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-3.5 text-left shadow-lg backdrop-blur-md transition-all hover:border-indigo-500/50 hover:bg-indigo-500/20 active:scale-[0.98] lg:hidden"
							>
								<div class="flex items-center gap-3">
									<div
										class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/20 text-indigo-300"
									>
										<MessageSquare size={16} />
									</div>
									<div>
										<span class="block text-xs font-bold text-white"
											>{m['contact.open_form']()}</span
										>
										<span class="block text-[11px] text-white/60"
											>{m['contact.mobile_drawer_hint']()}</span
										>
									</div>
								</div>
								<div
									class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-200 group-hover:translate-x-0.5"
								>
									<Send size={13} />
								</div>
							</button>
						</div>
					</FadeContent>
				</div>
			</div>

			<!-- Right Column: Interactive Contact Form Card (Desktop) -->
			<div class="hidden lg:col-span-7 lg:block">
				<FadeContent blur duration={900} delay={150} threshold={0.15}>
					<SpotlightCard class="contact-spotlight-card" spotlightColor="rgba(99, 102, 241, 0.15)">
						<ContactForm />
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
</style>
