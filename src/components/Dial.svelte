<script>
	// COMPONENTS
	import Charts from "./Charts.svelte";
	import Timestamp from "./Timestamp.svelte";
	import Gauge from "./Gauge.svelte";

	// UTILS
	import { slugify } from "../utils/slugify.js";
	import { onMount } from "svelte";

	export let visible;
	export let name = "";
	export let description = "";

	export let min = 0;
	export let max = 100;
	export let main_dial_stops = 10;
	export let main_gauge_stops = 5;

	export let value;
	export let average_low;
	export let average_high;
	export let high;
	export let low;

	// The scale of "badness"
	export let labels = [];

	export let uniqueSlug = slugify(name);

	$: updated = "";
	$: valueLabel = getValueLabel(value);
	$: formattedValue = value ? `${value} ppb` : "-";

	// Takes the thresholds as defined in the config data and finds the proper text label
	function getValueLabel(value) {
		if (!value) return "Loading ...";
		for (let [text, maxBound] of labels) {
			if (value <= maxBound) return text;
		}

		// Our number is super-duper high. Just return the largest value
		return labels[labels.length - 1][0];
	}

	onMount(() => {
		console.log("No data ...");
		setTimeout(function () {
			console.log("... DATA!");
			value = 50;
			average_low = 13;
			average_high = 54;
			high = 90;
			low = 10;
			updated = "2021-07-23T10:33:36.743";
		}, 2000);
	});
</script>

<style>
	.dial {
		text-align: center;
		box-sizing: border-box;
		display: none;
	}

	.dial.visible {
		display: block;
	}

	.stem {
		font: bold clamp(1em, 3vw, 1.5em) / 1.3em var(--fonts);
		margin: 0 0;
	}

	.description {
		font-style: italic;
		margin: 0;
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

		opacity: 0.2;
		transition: opacity var(--fade-in-speed) ease;
	}

	.value {
		font-size: clamp(3rem, 2vw, 5rem);
		line-height: 1.3em;
		display: block;
		font-weight: bold;
		font-variant: small-caps;
		color: var(--label-color, black);
		white-space: nowrap;
		margin: 0 auto;

		opacity: 0.2;
		transition: opacity var(--fade-in-speed) ease;
	}

	.label.visible,
	.value.visible {
		opacity: 1;
	}
</style>

<div id={uniqueSlug} class="dial" class:visible>
	<h2 class="stem">{name}</h2>
	<p class="description">{description}</p>
	<Charts
		{uniqueSlug}
		{average_low}
		{average_high}
		{min}
		{max}
		{value}
		{main_dial_stops} />
	<Timestamp {updated} />
	<span class:visible={value} class="label">{valueLabel}</span>
	<span class:visible={value} class="value">{formattedValue}</span>
	<Gauge
		{uniqueSlug}
		{average_low}
		{average_high}
		{high}
		{low}
		{min}
		{max}
		{value}
		{main_gauge_stops} />
</div>
