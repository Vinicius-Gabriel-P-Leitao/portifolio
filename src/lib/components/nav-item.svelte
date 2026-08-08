<script lang="ts">
	let {
		label,
		active,
		onClick
	}: {
		label: string;
		active: boolean;
		onClick: () => void;
	} = $props();
</script>

<button class="nav-item" class:nav-active={active} onclick={onClick} title={label}>
	<span class="nav-label">{label.toUpperCase()}</span>
	<div class="nav-pip"></div>
</button>

<style>
	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.15rem 0;
	}

	.nav-pip {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.22);
		transition:
			background 0.3s,
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s;
		flex-shrink: 0;
	}

	.nav-item.nav-active .nav-pip {
		background: #fff;
		transform: scale(1.5);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.55);
	}

	.nav-label {
		font-size: 0.48rem;
		letter-spacing: 0.18em;
		color: rgba(255, 255, 255, 0.28);
		font-family: monospace;
		font-weight: 700;
		opacity: 0;
		transform: translateX(4px);
		transition:
			opacity 0.2s,
			transform 0.2s,
			color 0.2s;
		user-select: none;
	}

	.nav-item:hover .nav-label,
	.nav-item.nav-active .nav-label {
		opacity: 1;
		transform: translateX(0);
		color: rgba(255, 255, 255, 0.8);
	}
</style>
