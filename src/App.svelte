<script context="module">
	export const contextKey = "water-dials-context";
</script>

<script>
	import Dial from "./components/Dial.svelte";
	import InputSelect from "./components/ui/InputSelect.svelte";

	// UTILS
	import { createMediaStore } from "./utils/match-media.js";
	import { slugify } from "./utils/slugify";

	// STORES
	import { writable } from "svelte/store";
	import { setContext } from "svelte";

	export let dials = [];

	let visibleBranch;
	let options = dials.map(({ name }) => {
		return {
			label: name,
			value: slugify(name),
		};
	});

	const isMobile = createMediaStore("(max-width:1023px)");
	let fetchingData = writable(false);

	setContext(contextKey, {
		fetchingData,
	});
</script>

<style>
	:global(html body .water-quality) {
		/* TYPOGRAPHY */
		--fonts: "Omnes", "Helvetica", "Arial", sans-serif;
		--grid-gap: 32px;

		--color-blue-dark: #274571;
		--color-brown-dark: #3c2313;
		--color-gray-dark: #444;
		--color-gray: #888;
		--color-gray-light: #eee;

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

		/* MOBILE SELECT MENU */
		--select-border-radius: 15px;
		--select-color-background: var(--color-gray-light);
		--select-input-height: 44px;
		--select-carat-color: var(--color-text);

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
		display: grid;
		gap: var(--grid-gap) calc(var(--grid-gap) * 2);
		grid-template-columns: minmax(1px, 1fr);
		margin: 1em 0;
	}

	.dials--grid {
		grid-template-columns: repeat(3, minmax(1px, 1fr));
	}

	.dials > :global(*) {
		flex: 1 1 250px;
	}
</style>

<div class="water-quality">
	{#if $isMobile}
		<InputSelect
			bind:value={visibleBranch}
			{options}
			showAll={false}
			label="Choose a branch" />
	{/if}
	<div class="dials" class:dials--grid={!$isMobile}>
		{#each dials as dial}
			<Dial visible={slugify(dial.name) === visibleBranch || !$isMobile} {...dial} />
		{/each}
	</div>
</div>
