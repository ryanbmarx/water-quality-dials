<script>
	// COMPONENTS
	import Charts from "./Charts.svelte";
	import Timestamp from "./Timestamp.svelte";
	import CSO from "./CSO.svelte";
	import Gauge from "./Gauge.svelte";
	import LoadingAnimation from "./ui/LoadingAnimation.svelte";

	// UTILS
	import { slugify } from "../utils/slugify.js";
	import { getContext } from "svelte";
	import { contextKey } from "../utils/context.js";
	import { format } from "date-fns-tz";

	export let visible;
	export let name = "";
	export let description = "";

	// Default values for the gauges, how low and high should they go? And how many tick marks, etc.
	export let min = 0;
	export let max = 100;
	export let main_dial_stops = 10;
	export let main_gauge_stops = 5;

	// Our caution-level values
	export let caution;
	// The lookup of human-readable texts for the caution level, i.e. "High caution"
	export let labels = "";
	export let cso = "";

	// The featured value of the whole gauge
	export let value;

	// The average `value` for the gauge
	export let average;

	// The desired high and low value for a predetermined period of time.
	export let high;
	export let low;

	// Timestamp... Data is as current as:
	export let updated = "";

	export let uniqueSlug = slugify(name);

	const { fetchingData } = getContext(contextKey);

	$: label = labels[caution];
	$: updated = "";
</script>

<style>
	.dial {
		--color-accent: black;
		--color-accent-text: white;
		text-align: center;
		box-sizing: border-box;
		display: none;
		position: relative;
	}

	:global(.dial.dial--high) {
		--color-accent: var(--color-high);
		--color-accent-text: var(--color-high-text);
	}
	:global(.dial.dial--low) {
		--color-accent: var(--color-low);
		--color-accent-text: var(--color-low-text);
	}
	:global(.dial.dial--good) {
		--color-accent: var(--color-good);
		--color-accent-text: var(--color-good-text);
	}

	:global(.spinner) {
		position: absolute !important;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
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
		background: var(--color-accent);
		color: var(--color-accent-text);
		text-align: center;

		box-sizing: border-box;
		padding: 0.25em 0.5em 0.2em 0.5em;
		margin: 0 auto 0.5em auto;

		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 50%;
		min-height: 60px;

		opacity: 0;
		transition: opacity var(--fade-in-speed) ease;
	}

	.value {
		font-size: clamp(3rem, 2vw, 5rem);
		line-height: 1em;
		display: block;
		font-weight: bold;
		font-variant: small-caps;
		color: var(--color-accent);
		white-space: nowrap;
		margin: 0 auto;

		opacity: 0;
		transition: opacity var(--fade-in-speed) ease;
	}

	.label.visible,
	.value.visible {
		opacity: 1;
	}
</style>

<div id={uniqueSlug} class="dial dial--{caution}" class:visible aria-hidden={!visible}>
	<h2 class="stem">{name}</h2>
	<p class="description">{description}</p>
	<Charts {uniqueSlug} {average} {min} {max} {value} {main_dial_stops} />
	<Timestamp {updated} />
	<span class:visible={value} aria-hidden={!value} class="label">{label}</span>
	<span class:visible={value} aria-hidden={!value} class="value">{value} ppb</span>
	<CSO {cso} />
	<Gauge {uniqueSlug} {average} {high} {low} {min} {max} {value} {main_gauge_stops} />
	{#if !value}
		<LoadingAnimation text={$fetchingData ? "Refreshing data" : "Data not available"} />
	{/if}
</div>
