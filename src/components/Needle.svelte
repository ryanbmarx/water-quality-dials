<script>
	export let title = "";
	export let rotation = 0;
</script>

<style>
	path {
		fill: black;
		stroke: white;
		stroke-width: 2px;
	}

	svg {
		position: absolute;
		right: 50%;
		top: 50%;

		width: calc(var(--inner-dial-width) / 2);
		z-index: 11;
		transform-origin: 86% center;
		transition: transform 250ms ease;
	}

	circle {
		fill: white;
	}
</style>

<svg
	style="transform: translate(14%, -50%) rotate({rotation}deg);"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 96 26">
	{#if title}<title>{title}</title>{/if}
	<path d="M74.36,6.88,1.83,13.06l72.63,6.19a10.84,10.84,0,1,0-.1-12.37Z" />
	<circle cx="83.32" cy="13" r="3.09" />
</svg>
