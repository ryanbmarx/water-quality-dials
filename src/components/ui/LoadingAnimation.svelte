<script>
	import { fade } from "svelte/transition";
	export let text = "";
</script>

<style>
	.spinner {
		--spinner-height: 80px;
		display: flex;
		position: relative;
	}

	.spinner__wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	p {
		color: var(--color-text, #222);
		font: 14px/1em var(--fonts);
		margin: auto;
	}
	.spinner__animation {
		display: block;
		width: var(--spinner-height, 80px);
		height: var(--spinner-height, 80px);
		margin: 100px auto;
		background-color: var(--color-accent, #009bff);
		opacity: 0.2;
		mix-blend-mode: multiply;
		border-radius: 100%;
	}

	@keyframes sk-scaleout {
		0% {
			-webkit-transform: scale(0);
			transform: scale(0);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 0;
		}
	}

	@media all and (prefers-reduced-motion: no-preference) {
		.spinner__animation {
			opacity: 1;
			animation: sk-scaleout 1s infinite ease-in-out;
		}
	}
</style>

<div class="spinner" transition:fade={{ duration: 250 }}>
	<span class="spinner__wrapper"> <span class="spinner__animation" /> </span>
	{#if text}<p>{text}</p>{/if}
</div>
