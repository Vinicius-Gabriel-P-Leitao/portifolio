<script lang="ts">
	type Props = {
		logos: Array<{ name: string; icon?: string }>;
		speed?: number;
		class?: string;
		pauseOnHover?: boolean;
	};

	let {
		logos,
		speed = 30,
		class: className = '',
		pauseOnHover = true
	}: Props = $props();
</script>

<div
	class="relative w-full overflow-hidden whitespace-nowrap mask-gradient {className}"
	style="--duration: {speed}s;"
>
	<div
		class="inline-flex items-center gap-8 animate-marquee {pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}"
	>
		{#each logos as logo, i (logo.name + i)}
			<div
				class="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm text-xs font-mono tracking-wider text-neutral-400 select-none hover:text-white hover:border-white/20 transition-colors"
			>
				<span class="w-1.5 h-1.5 rounded-full bg-indigo-500/60"></span>
				<span>{logo.name}</span>
			</div>
		{/each}
	</div>

	<!-- Duplicate for seamless looping -->
	<div
		class="inline-flex items-center gap-8 animate-marquee aria-hidden {pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}"
		aria-hidden="true"
	>
		{#each logos as logo, i (logo.name + '-dup-' + i)}
			<div
				class="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm text-xs font-mono tracking-wider text-neutral-400 select-none hover:text-white hover:border-white/20 transition-colors"
			>
				<span class="w-1.5 h-1.5 rounded-full bg-indigo-500/60"></span>
				<span>{logo.name}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.mask-gradient {
		mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
	}

	.animate-marquee {
		animation: marquee var(--duration) linear infinite;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
