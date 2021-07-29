<script>
	// COMPONENTS
	import Charts from "./Charts.svelte";
	import Timestamp from "./Timestamp.svelte";

	// UTILS
	import { slugify } from "../utils/slugify.js";

	export let name = "";
	export let description = "";

	export let value = 40;

	export let min = 0;
	export let max = 100;

	export let average_min = 26;
	export let average_max = 40;

	export let labels = [];

	export let uniqueSlug = slugify(name);

	export let updated = "";

	let valueLabel = getValueLabel(value);

	function getValueLabel(value) {
		/*
  
  North Branch: Good (0-33), Low Caution (34 – 54), High Caution (55-100)

South Branch: Good (0-28), Low Caution (29-38), High Caution (39-100)

Main Stem: Good (0-6), Low Caution (7-8), High Caution (9-100)
  */

		for (let [text, maxBound] of labels) {
			if (value <= maxBound) return text;
		}

		// Our number is super-duper high. Just return the largest value
		return labels[labels.length - 1][0];
	}
</script>

<style>
	.dial {
		--color-outer-dial: #eee;
		--color-outer-dial-highlight: rgba(0, 0, 0, 0.4);
		--color-inner-dial: linear-gradient(to left, #3c2313, var(--color-blue-dark));
		--color-background: #fff;

		--inner-dial-width: 69%;
		--outer-dial-width: 9px;
		--stop-label-width: 20px;
		text-align: center;
		outline: 1px solid red;
		box-sizing: border-box;
	}

	.stem {
		margin: 0 0 0.25em 0;
		font-size: 1.5rem;
	}

	.description {
		font-style: italic;
		margin: 0;
	}

	.timestamp {
		display: block;

		margin: 0 auto 0.5em auto;
		max-width: 50%;
	}

	.label {
		font-size: 1.15rem;
		text-transform: uppercase;
		font-weight: bold;
		background: var(--label-color, black);
		color: white;
		text-align: center;

		box-sizing: border-box;
		padding: 0.5em 0.5em 0.4em 0.5em;
		margin: 0 auto 0.5em auto;

		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 50%;
		min-height: 60px;
	}

	.value {
		font-size: clamp(3rem, 2vw, 5rem);
		line-height: 1.3em;
		display: block;
		font-weight: bold;
		font-variant: small-caps;
		color: var(--label-color, black);

		margin: 0 auto;
	}
</style>

<div id={uniqueSlug} class="dial">
	<h2 class="stem">{name}</h2>
	<p class="description">{description}</p>
	<Charts {uniqueSlug} {average_min} {average_max} {min} {max} {value} />
	<Timestamp {updated} />
	<span class="label">{valueLabel}</span>
	<span class="value">{value} ppb</span>
</div>
