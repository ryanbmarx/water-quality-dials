<script>
	export let uniqueSlug;
	export let min;
	export let max;

	export let main_gauge_stops;
	export let value;

	export let average_high;
	export let average_low;
	export let high = 90;
	export let low = 10;

	// CALCULATE POSITIONS
	let range = max - min;
	let increment = range / main_gauge_stops;

	let placeHigh = ((high - min) / range) * 100;
	let placeLow = ((low - min) / range) * 100;
	let placeValue = ((value - min) / range) * 100;

	let placeAvgLow = ((average_low - min) / range) * 100;
	let avgWidth = ((average_high - min) / range) * 100 - placeAvgLow;

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
</script>

<style>
	.gauge {
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

	.tick {
		display: inline-block;
		width: 2px;
		height: 1.2em;
		background: black;
		z-index: 2;
	}

	.average {
		display: inline-block;
		z-index: 2;
		height: 1.2em;
		background: #cfdde6;
		width: 10px;
		max-height: 2em;
	}

	.gauge__chart .average {
		height: 100%;
		position: absolute;
		top: 0;
		display: block;
	}
	.gauge__chart .tick {
		display: block;
		height: 100%;
		position: absolute;
		top: 0;
		transform: translate(-50%, 0);
	}

	.tick--value {
		background: #235686;
	}
	.tick--high {
		background: #000;
	}

	.tick--low {
		background: #a0bbce;
	}

	.legend {
		margin: 1em 0 0 0;
		padding: 0;
		list-style: none;
	}

	.legend li {
		display: flex;
		gap: 8px;
		align-items: center;
		margin: 0 0 8px 0;
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
		<span style="left: {placeAvgLow}%; width: {avgWidth}%" class="average" />
		<span style="left: {placeHigh}%" class="tick tick--high" />
		<span style="left: {placeLow}%" class="tick tick--low" />
		<span style="left: {placeValue}%" class="tick tick--value" />
	</div>
	<ul class="legend">
		<li>
			<span class="average" />
			Average: {average_low}-{average_high} ppb
		</li>
		<li>
			<span class="tick tick--high" />
			High: {high} ppb
		</li>
		<li>
			<span class="tick tick--low" />
			Low: {low} ppb
		</li>
		<li>
			<span class="tick tick--value" />
			Latest: {value} ppb
		</li>
	</ul>
</div>
