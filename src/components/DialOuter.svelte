<script>
	export let uniqueSlug = "";

	export let min;
	export let max;
	let range = parseInt(max) - parseInt(min);

	// This is the value we want to display
	export let average;

	// Let's take a little below and a little above
	// It's a little imprecise, yes, but we need
	// some pixels to display
	$: start = parseInt(average) - 0.5;
	$: end = parseInt(average) + 0.5;

	// Make sure our numbers are not outside the range
	$: startValue = start < min ? min : start;
	$: endValue = end > max ? max : end;

	// Take our start and end values (our hi/lo) and make it into a decimal percentage (i.e. 0.5 == 50%)
	// Cut it in half, because we are working with a semi-circle and want to show a slice of that semicircle;
	$: highlightPercent = (endValue - min) / range / 2;
	$: coverPercent = (startValue - min) / range / 2;

	// Gives us a 4-quadrant plane. The math is easier when the radius = 1
	const height = 2;
	const width = 2;

	function getCoordinatesForPercent(percent) {
		const x = Math.cos(2 * Math.PI * percent);
		const y = Math.sin(2 * Math.PI * percent);
		return [x, y];
	}

	// Returns an SVG arc to slice a % of a semicircle, starting on the left.
	function d(percent) {
		//https://medium.com/hackernoon/a-simple-pie-chart-in-svg-dbdd653b6936
		let cumulativePercent = 0;

		// destructuring assignment sets the two variables at once
		const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

		// each slice starts where the last slice ended, so keep a cumulative percent
		cumulativePercent += percent;

		const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

		// if the slice is more than 50%, take the large arc (the long way around)
		const largeArcFlag = percent > 0.5 ? 1 : 0;

		console.groupEnd();

		// create an array and join it just for code readability
		return [
			`M ${startX} ${startY}`, // Move
			`A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
			`L 0 0`, // Line
		].join(" ");
	}
</script>

<style>
	.circle--outer-dial {
		background: var(--color-outer-dial);
	}

	.cover {
		fill: var(--color-outer-dial);
		transform: rotate(-90deg);
	}

	.highlight {
		fill: var(--color-outer-dial-highlight);
		transform: rotate(-90deg);
	}

	.highlight.visible {
		transform: rotate(0);
	}

	.cover.visible {
		transform: rotate(0);
	}

	.label {
		font: bold 12px/1.3em var(--fonts);
		position: absolute;
		top: 50%;
		left: 0;

		width: 20%;
		text-align: left;

		margin: 0;

		opacity: 0;
		transition: opacity var(--fade-in-speed) ease;
	}

	.label.visible {
		opacity: 1;
	}

	.label::before {
		content: "";
		display: block;
		width: 1px;
		height: var(--arrow-length);
		margin-left: 0.5em;
		background: var(--color-text);
		margin: 0.25em;
	}

	.label strong {
		display: block;
		font-size: 14px;
		line-height: 1.3em;
		color: var(--color-gray);
	}

	@media all and (prefers-reduced-motion: no-preference) {
		.highlight {
			transition: transform calc(2 * var(--fade-in-speed)) ease;
		}
	}
</style>

<div
	class="circle circle--clip circle--outer-dial"
	aria-labelledby="{uniqueSlug}-outer-label">
	<svg
		style="transform: rotate(-180deg)"
		class="circle--outer-dial__highlight"
		viewBox="{-0.5 * width} {-0.5 * height} {width} {height}"
		xmlns="http://www.w3.org/2000/svg">
		<path class:visible={average} class="highlight" d={d(highlightPercent)} />
		<path class:visible={average} class="cover" d={d(coverPercent)} />
	</svg>
</div>
<p id="{uniqueSlug}-outer-label" class="label" class:visible={start && end}>
	Average for last month: <strong>{average} ppb</strong>
</p>
