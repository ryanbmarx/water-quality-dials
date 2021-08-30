<script>
	export let uniqueSlug;
	export let min;
	export let max;

	export let main_gauge_stops;
	export let value;

	export let average;
	export let high;
	export let low;

	// CALCULATE POSITIONS
	let range = max - min;
	let increment = range / main_gauge_stops;

	// These values are the CSS percentages used to place the icons on the gauge
	$: placeHigh = ((high - min) / range) * 100;
	$: placeLow = ((low - min) / range) * 100;
	$: placeValue = ((value - min) / range) * 100;
	$: placeAvg = ((average - min) / range) * 100;

	const DEFAULT_LABEL_TEXT = "-";

	function getStops() {
		const s = [];

		// Make an array of arrays:
		// [
		//  [stop label, stop left position]
		// ]
		for (let i = 0; i <= main_gauge_stops; i++) {
			const label = increment * i + min;
			const position = ((label - min) / range) * 100;
			s.push([label, position]);
		}
		return s;
	}

	const stops = getStops();

	function getLabel(val) {
		return val ? `${val} ppb` : DEFAULT_LABEL_TEXT;
	}
</script>

<style>
	.gauge {
		--tick-width: 1em;
		margin: 2em 0;
		width: calc(100% - 2em);
		margin: auto;
	}

	.gauge__chart {
		position: relative;
		height: 30px;
	}

	.gauge__chart::after {
		content: "";
		display: block;

		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(0, -50%);

		width: 100%;
		height: 2px;
		background: #aaa;
	}

	/* .tick {
		display: inline-block;
		width: 2px;
		height: 1.2em;
		background: black;
		z-index: 2;
	} */
	/* 
	.average {
		display: inline-block;
		z-index: 2;
		height: 1.2em;

		width: 10px;
		background: var(--gauge-color-value);
		max-height: 2em;
		opacity: 0.9;
	} */

	.tick {
		display: block;
		height: var(--tick-width);
		width: var(--tick-width);
		background: var(--color-accent);
		border: 1px solid var(--color-accent-text);

		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
	}

	.tick.tick--average {
		transform: translate(-50%, -50%) rotate(45deg) scale(0.82);
	}

	.tick.tick--value {
		border-radius: 50%;
	}
	.tick.tick--high {
		clip-path: polygon(0 100%, 50% 0, 100% 100%);
	}

	.legend {
		list-style: none;
		margin: 1em 0 0 0;
		padding: 0;
		/* Adjust for our transformed shapes, so they are left aligned. */
		padding-left: calc(0.5 * var(--tick-width));

		display: grid;
		grid-template: repeat(2, minmax(1px, 1fr)) / repeat(2, minmax(1px, 1fr));
		gap: 8px 0;
	}

	.legend li {
		display: flex;
		gap: 8px;
		align-items: center;
		margin: 0 0 8px 0;
		position: relative;
	}
	.legend__text {
		padding-left: calc(var(--tick-width) / 2 + 0.25em);
	}

	.stops {
		font-size: 12px;
		margin: 0;
		padding: 0;
		list-style: none;

		position: relative;
		width: 100%;
		height: 1.5em;
	}

	.stop {
		position: absolute;
		top: 0;
		transform: translate(-50%, 0);
	}
</style>

<div id="{uniqueSlug}-gauge" class="gauge">
	<ul class="stops">
		{#each stops as [label, position]}
			<li class="stop" style="left:{position}%">
				{label}
			</li>
		{/each}
	</ul>
	<div class="gauge__chart">
		{#if average}
			<span style="left: {placeAvg}%;" class="tick tick--average" />
		{/if}
		{#if high}
			<span style="left: {placeHigh}%" class="tick tick--high" />
		{/if}
		{#if low}
			<span style="left: {placeLow}%" class="tick tick--low" />
		{/if}
		{#if value}
			<span style="left: {placeValue}%" class="tick tick--value" />
		{/if}
	</div>
	<ul class="legend">
		<li class="legend__item">
			<span class="tick tick--average" />
			{#if average}
				<span class="legend__text">Average: {average} ppb</span>
			{:else}
				<span class="legend__text">Average: {DEFAULT_LABEL_TEXT}</span>
			{/if}
		</li>
		<li>
			<span class="tick tick--high" />
			<span class="legend__text">High: {getLabel(high)}</span>
		</li>
		<li>
			<span class="tick tick--low" />
			<span class="legend__text">Low: {getLabel(low)}</span>
		</li>
		<li>
			<span class="tick tick--value" />
			<span class="legend__text">Latest: {getLabel(value)}</span>
		</li>
	</ul>
</div>
