<script>
	export let title = "";
	export let rotation = 0;
</script>

<style>
	.needle-1 {
		fill: white;
		stroke: black;
		stroke-width: 2px;
	}

	svg {
		position: absolute;
		right: 50%;
		top: 50%;

		width: calc(var(--inner-dial-width) / 2);
		z-index: 11;
		transform-origin: 86% center;
		transition: transform var(--fade-in-speed) ease;
	}

	circle {
		fill: white;
	}
</style>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 132.33 29.21"
	style="transform: translate(12%, -50%) rotate({rotation}deg);">
	{#if title}<title>{title}</title>{/if}

	<path
		class="needle-1"
		d="M119.71,28.57a14,14,0,0,1-2.15.13C87.27,28.27,22.43,16.6,3,13c6.59-1,18.32-2.83,32-4.73C61.18,4.61,96.46.36,117,.5l.95.07a14.07,14.07,0,0,1,1.75,28" />
	<path fill="black" d="M112.71,15.1a3.59,3.59,0,1,1,4,3.06,3.59,3.59,0,0,1-4-3.06" />
</svg>
