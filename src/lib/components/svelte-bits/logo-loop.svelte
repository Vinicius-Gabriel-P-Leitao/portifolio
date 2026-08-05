<script lang="ts">
	type Props = {
		logos: Array<{ name: string }>;
		speed?: number;
		class?: string;
		pauseOnHover?: boolean;
	};

	let { logos, speed = 30, class: className = '', pauseOnHover = true }: Props = $props();
</script>

<div
	class="mask-gradient relative w-full overflow-hidden whitespace-nowrap {className}"
	style="--duration: {speed}s;"
>
	<div
		class="animate-marquee inline-flex items-center gap-8 {pauseOnHover
			? 'hover:[animation-play-state:paused]'
			: ''}"
	>
		{#each Array(2) as _, dup (dup)}
			{#each logos as logo, i (dup + '-' + logo.name + '-' + i)}
				<div
					class="flex items-center rounded-full border border-white/15 bg-[#121218]/90 px-4 py-2 font-mono text-xs font-medium tracking-wider text-white shadow-md backdrop-blur-md transition-colors select-none hover:border-white/40 hover:bg-[#1a1a24]"
					aria-hidden={dup === 1}
				>
					<span>{logo.name}</span>
				</div>
			{/each}
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
			transform: translateX(-50%);
		}
	}
</style>
