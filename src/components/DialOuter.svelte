<script>
	import { onMount } from "svelte";

	export let min = 0;
	export let max = 100;

	export let start = 0;
	export let end = 100;

	// Make sure our numbers are not outside the range
	const startValue = start < min ? min : start;
	const endValue = end > max ? max : end;

	// Take our start and end values (our hi/lo) and make it into a decimal percentage (i.e. 0.5 == 50%)
	// Cut it in half, because we are working with a semi-circle;
	let highlightPercent = (endValue - min) / (max - min) / 2;
	let coverPercent = (startValue - min) / (max - min) / 2;

	// Gives us a 4-quadrant plane. The math is easier when the radius = 1
	const height = 2;
	const width = 2;

	onMount(() => {
		// console.log({ start, end, min, max, highlightPercent, coverPercent });
	});

	function getCoordinatesForPercent(percent) {
		const x = Math.cos(2 * Math.PI * percent);
		const y = Math.sin(2 * Math.PI * percent);
		return [x, y];
	}

	function d(percent) {
		//https://medium.com/hackernoon/a-simple-pie-chart-in-svg-dbdd653b6936
		console.group(percent);
		// let cumulativePercent = 0;

		// destructuring assignment sets the two variables at once
		const [startX, startY] = getCoordinatesForPercent(percent);
		console.log({ startX, startY });
		// each slice starts where the last slice ended, so keep a cumulative percent
		// cumulativePercent += percent;

		const [endX, endY] = getCoordinatesForPercent(percent);
		console.log({ endX, endY });

		// if the slice is more than 50%, take the large arc (the long way around)
		const largeArcFlag = percent > 0.5 ? 1 : 0;

		console.groupEnd();

		// create an array and join it just for code readability
		return [
			`M ${startX} ${startY}`, // Move
			`A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
			`L 0 0`, // Line
			`z`,
		].join(" ");
	}
</script>

<style>
	.circle--outer-dial {
		background: var(--color-outer-dial);
	}

	.cover {
		fill: var(--color-outer-dial);
		fill: red;
	}

	.highlight {
		fill: var(--color-outer-dial-highlight);
	}

	.label {
		position: absolute;
		top: 100%;
		left: 0;
		width: 25%;
	}
</style>

<div class="circle circle--outer-dial">
	<svg
		style="transform: rotate(-180deg)"
		class="circle--outer-dial__highlight"
		viewBox="{-0.5 * width} {-0.5 * height} {width} {height}"
		xmlns="http://www.w3.org/2000/svg">
		<path class="highlight" d={d(highlightPercent)} />
		<path class="cover" d={d(coverPercent)} />
	</svg>
	<p class="label">Average for last month: <strong>6-7 ppb</strong></p>
</div>
