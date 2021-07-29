<script>
	import Gauges from "./Gauges.svelte";

	export let name = "";
	export let description = "";
	export let time = "2021-05-01";

	export let value = 29;

	export let min = 0;
	export let max = 100;

	export let average_min = 26;
	export let average_max = 40;

	export let labels = [];

	let timestamp = formatTimestamp(time);
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

	function formatTimestamp(time) {
		try {
			let t = new Date(time);
			return `Water conditions: ${t.getUTCDate()}`;
		} catch (e) {
			// Invalid timestamp
			return "";
		}
	}
</script>

<style>
	.dial {
		--color-outer-dial: #eee;
		--color-outer-dial-highlight: rgba(0, 0, 0, 0.4);
		--color-inner-dial: linear-gradient(to left, #3c2313, #2e6eb2);
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
		display: block;
		font-weight: bold;
		background: var(--label-color, black);
		color: white;
		text-align: center;

		box-sizing: border-box;
		padding: 0.5em 0.5em 0.4em 0.5em;
		margin: 0 auto 0.5em auto;
		max-width: 50%;
	}

	.value {
		font-size: clamp(3rem, 2vw, 5rem);
		display: block;
		font-weight: bold;
		font-variant: small-caps;
		color: var(--label-color, black);
		max-width: 50%;

		margin: 0 auto;
	}
</style>

<div class="dial">
	<h2 class="stem">{name}</h2>
	<p class="description">{description}</p>
	<Gauges {average_min} {average_max} {min} {max} />
	<span class="timestamp">{timestamp}</span>
	<span class="label">{valueLabel}</span>
	<span class="value">{value} ppb</span>
</div>
