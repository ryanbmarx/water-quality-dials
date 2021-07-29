<script>
	import DialOuter from "./DialOuter.svelte";

	export let average_min = 26;
	export let average_max = 40;

	export let min = 0;
	export let max = 100;
	export let main_dial_stops = 10;

	function getStopLabel(stop) {
		let range = max - min;
		let increment = range / main_dial_stops;
		let label = increment * stop + min;
		return stop % 2 === 0 || label === max ? label : "";
	}
</script>

<style>
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
</style>

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
