<script context="module">
	export const contextKey = "water-dials-context";
</script>

<script>
	// import About from "./components/About.svelte";
	import Dial from "./components/Dial.svelte";

	// UTILS
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import { createMediaStore } from "./utils/match-media.js";

	export let dials = [];

	setContext(contextKey, {
		isDesktop: writable(createMediaStore("(min-width:1024px)")),
	});
</script>

<style>
	:global(html body .water-quality) {
		/* TYPOGRAPHY */
		--fonts: "Omnes", "Helvetica", "Arial", sans-serif;
		--grid-gap: 32px;

		--color-blue-dark: #274571;
		--color-brown-dark: #3c2313;
		--color-gray: #888;

		--color-text: #222;
		--color-accent: var(--color-blue-dark);

		/* UI STUFF */
		--arrow-length: 15px;
		--fade-in-speed: 250ms;

		/* DIALS */
		--color-outer-dial: #eee;
		--color-outer-dial-highlight: rgba(0, 0, 0, 0.4);
		--color-inner-dial: linear-gradient(
			to left,
			var(--color-brown-dark),
			var(--color-blue-dark)
		);
		--color-background: #fff;

		--inner-dial-width: 69%;
		--outer-dial-width: 9px;
		--stop-label-width: 20px;

		/* GAUGE / CANDLESTICK CHART */
		--gauge-color-value: #235686;
		--gauge-color-high: #000;
		--gauge-color-low: #a0bbce;
		--gauge-color-average: #cfdde6;

		font-family: var(--fonts);
		font-size: 1rem;
		line-height: 1.3em;
		max-width: 1330px;
		margin: 2em auto;
	}
	/* .headline {
		text-align: center;
		font: bold clamp(1.3em, 6vw, 2em) / 1.3em var(--fonts);
		margin-bottom: 1em;
	} */
	.dials {
		display: flex;
		gap: var(--grid-gap);
		flex-wrap: wrap;
		place-items: top center;
		place-content: top center;
		margin: 1em 0;
	}

	.dials > :global(*) {
		flex: 1 1 250px;
	}
</style>

<div class="water-quality">
	<div class="dials">
		{#each dials as dial}
			<Dial {...dial} />
		{/each}
	</div>
</div>
