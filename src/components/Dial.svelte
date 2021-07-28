<script>
	import DialOuter from "./DialOuter.svelte";

	export let name = "";
	export let description = "";
	export let time = "2021-05-01";
	export let main_dial_stops = 10;

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
	function getStopLabel(stop) {
		let range = max - min;
		let increment = range / main_dial_stops;
		let label = increment * stop + min;
		return stop % 2 === 0 || label === max ? label : "";
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

	.chart {
		margin: 1rem auto;
		position: relative;
	}

	.circles {
		outline: 1px solid #009bff;
		height: 0;
		padding-bottom: 100%;

		/* -webkit-clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
		clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%); */
	}

	:global(.circle) {
		height: 100%;
		width: 100%;
		border-radius: 50%;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	@supports (aspect-ratio: 1 / 1) {
		:global(.circle),
		.circles {
			aspect-ratio: 1 / 1;
			height: auto;
			padding-bottom: 0;
		}
	}

	.circle--inner-bg {
		background: var(--color-background);
		width: calc(100% - (2 * var(--outer-dial-width)));
		height: calc(100% - (2 * var(--outer-dial-width)));
	}

	.circle--inner-dial {
		background: var(--color-inner-dial);
		width: var(--inner-dial-width);
		height: var(--inner-dial-width);
		border: 1px solid var(--color-text);
	}

	.stops {
		margin: 0;
		padding: 0;
		list-style: none;

		position: absolute;
		top: 50%;
		left: 50%;
		width: 85%;
		height: 85%;
		transform: translate(-50%, -50%);
	}

	.stop {
		font: 12px/1em var(--fonts);
		display: flex;
		align-items: center;
		justify-content: start;
		width: 50%;
		height: var(--stop-label-width);

		position: absolute;
		top: 50%;
		right: 50%;
		transform-origin: top right;
		overflow: hidden;

		transform: rotate(var(--stop-rotation, 0)) translate(0, -50%);
	}

	.stop::after {
		content: "";
		display: block;
		height: 1px;
		width: 100%;
		min-width: 100%;
		background: var(--color-text);
	}

	.stop__text {
		flex: 0 0 var(--stop-label-width);
		background: var(--color-background);

		display: block;
		height: 1em;
		width: var(--stop-label-width);
		transform: rotate(-90deg);
		text-align: center;
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
	<div class="chart">
		<div class="circles">
			<DialOuter {min} {max} start={average_min} end={average_max} />
			<div class="circle circle--inner-bg" />
			<ul class="stops">
				{#each Array(main_dial_stops + 1) as _, stop}
					<li class="stop" style="--stop-rotation: {(180 / main_dial_stops) * stop}deg">
						<span class="stop__text">{getStopLabel(stop)}</span>
					</li>
				{/each}
			</ul>
			<div class="circle circle--inner-dial" />
		</div>
	</div>

	<span class="timestamp">{timestamp}</span>
	<span class="label">{valueLabel}</span>
	<span class="value">{value} ppb</span>
</div>
