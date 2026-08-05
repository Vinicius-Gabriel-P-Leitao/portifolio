<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		text: string | string[];
		typingSpeed?: number; // ms per char
		deletingSpeed?: number; // ms per char
		pauseDuration?: number; // pause after full text typed
		initialDelay?: number;
		loop?: boolean;
		showCursor?: boolean;
		cursorChar?: string;
		class?: string;
	};

	let {
		text,
		typingSpeed = 60,
		deletingSpeed = 30,
		pauseDuration = 2000,
		initialDelay = 300,
		loop = false,
		showCursor = true,
		cursorChar = '|',
		class: className = ''
	}: Props = $props();

	const textArray = $derived(Array.isArray(text) ? text : [text]);

	let displayedText = $state('');
	let textIndex = $state(0);
	let charIndex = $state(0);
	let isDeleting = $state(false);
	let isComplete = $state(false);

	$effect(() => {
		// Reset when text changes
		const targetText = textArray[textIndex] ?? '';
		void text;

		let timeout: ReturnType<typeof setTimeout>;

		const currentTarget = textArray[textIndex] ?? '';

		function tick() {
			if (!isDeleting) {
				if (charIndex < currentTarget.length) {
					charIndex++;
					displayedText = currentTarget.slice(0, charIndex);
					timeout = setTimeout(tick, typingSpeed);
				} else if (loop && textArray.length > 1) {
					timeout = setTimeout(() => {
						isDeleting = true;
						tick();
					}, pauseDuration);
				} else {
					isComplete = true;
				}
			} else {
				if (charIndex > 0) {
					charIndex--;
					displayedText = currentTarget.slice(0, charIndex);
					timeout = setTimeout(tick, deletingSpeed);
				} else {
					isDeleting = false;
					textIndex = (textIndex + 1) % textArray.length;
					timeout = setTimeout(tick, typingSpeed);
				}
			}
		}

		timeout = setTimeout(tick, initialDelay);

		return () => clearTimeout(timeout);
	});
</script>

<span class="text-type-container {className}">
	<span class="typed-text">{displayedText}</span>{#if showCursor}<span
			class="type-cursor"
			class:complete={isComplete && !loop}>{cursorChar}</span
		>{/if}
</span>

<style>
	.text-type-container {
		display: inline-flex;
		align-items: center;
		white-space: nowrap;
	}

	.typed-text {
		white-space: nowrap;
	}

	.type-cursor {
		display: inline-block;
		margin-left: 2px;
		color: currentColor;
		opacity: 0.8;
		animation: blink 0.8s infinite;
		font-weight: 300;
	}

	.type-cursor.complete {
		animation: blink 1.2s infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
