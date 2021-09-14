<script>
	import Dial from "./components/Dial.svelte";
	import InputSelect from "./components/ui/InputSelect.svelte";

	// UTILS
	import { createMediaStore } from "./utils/match-media.js";

	// STORES
	import { writable } from "svelte/store";
	import { afterUpdate, onMount, setContext } from "svelte";
	import { contextKey } from "./utils/context.js";

	export let dials = [];
	let gaugeData = writable({
		main: {},
		north: {},
		south: {},
	});

	let visibleBranch;
	let options = Object.keys(dials).map(key => {
		const { name } = dials[key];
		return {
			label: name,
			value: key,
		};
	});
	// A lookup of CSO dates
	let csoEvents = {};
	const isMobile = createMediaStore("(max-width:1023px)");
	let fetchingData = writable(false);

	// CSO timespan for high caution, in hours
	const CSO_DURATION = 72;
	const MAIN_STEM =
		"https://dvlzjowx88.execute-api.us-west-2.amazonaws.com/h2now/tryptophan/main-stem/latest";
	const NORTH_AND_SOUTH =
		"https://dvlzjowx88.execute-api.us-west-2.amazonaws.com/h2now/tryptophan/north-south/latest";
	const CSO =
		"https://dvlzjowx88.execute-api.us-west-2.amazonaws.com/h2now/all-branches/cso-event/latest";

	let labels = {
		good: "Good",
		low: "Low caution",
		high: "High caution",
	};

	function getCaution(branch, value, csoEvents) {
		// Start with CSO. If a date is found, then return high caution no matter what
		if (csoEvents[branch]) return "high";

		// An object of arrays, in order. Starting from good, and working up the severity scale.
		// Each element is a pair of caution keyword and max value
		let breaks = {
			main: [
				["good", 3],
				["low", 6],
			],
			south: [
				["good", 24],
				["low", 37],
			],
			north: [
				["good", 33],
				["low", 52],
			],
		};

		for (let [caution, max] of breaks[branch]) {
			if (value <= max) return caution;
		}
		return "high";
	}

	setContext(contextKey, {
		fetchingData,
	});

	onMount(async () => {
		$fetchingData = true;
		// Do the main

		csoEvents = await fetch(CSO)
			.then(r => r.json())
			.then(data => {
				const tagsList = data?.data?.dataModel?.tagsList;
				if (tagsList) {
					const today = new Date();

					return tagsList.reduce((acc, cur) => {
						const { title, valueDate } = cur;

						if (title.toLowerCase().includes("downstream")) {
							try {
								let csoDate = new Date(valueDate);
								// If the time of the last CSO was less than 3 days ago, store the date
								acc.south =
									(today - csoDate) / 1000 / 60 / 60 > CSO_DURATION
										? ""
										: new Date(valueDate);
							} catch (e) {
								// This is not a valid date. Ignore it.
								acc.south = "";
							}
						} else if (title.toLowerCase().includes("upstream")) {
							try {
								let csoDate = new Date(valueDate);
								// If the time of the last CSO was less than 72 hours ago, store the date
								acc.north =
									(today - csoDate) / 1000 / 60 / 60 > CSO_DURATION
										? ""
										: new Date(valueDate);
							} catch (e) {
								// This is not a valid date. Ignore it.
								acc.north = "";
							}
						} else if (title.toLowerCase().includes("ms")) {
							try {
								let csoDate = new Date(valueDate);
								// If the time of the last CSO was less than 72 hours ago, store the date
								acc.main =
									(today - csoDate) / 1000 / 60 / 60 > CSO_DURATION
										? ""
										: new Date(valueDate);
							} catch (e) {
								// This is not a valid date. Ignore it.
								acc.main = "";
							}
						}
						return acc;
					}, {});
				}
			})
			.catch(console.error);

		fetch(MAIN_STEM)
			.then(r => r.json())
			.then(data => {
				const { tagsList } = data?.data?.dataModel;
				if (tagsList) {
					for (let tag of tagsList) {
						const { title, value, dateRange } = tag;
						switch (title) {
							case "Last Hour Average":
								if (value) {
									$gaugeData.main.value = value;
									$gaugeData.main.caution = getCaution("main", value, csoEvents);
								}
								break;
							case "Last Month Average":
								if (value) $gaugeData.main.average = value;
								break;
							case "Last Month Maximum":
								if (value) $gaugeData.main.high = value;
								break;
							case "Last Month Minimum":
								if (value) $gaugeData.main.low = value;
								break;
						}
					}
				}

				if (data.timestamp) {
					$gaugeData.main.updated = data.timestamp;
				}
			})
			.catch(console.error);
		// Also do the NORTH/SOUTH
		fetch(NORTH_AND_SOUTH)
			.then(r => r.json())
			.then(data => {
				let tagsList = data?.data?.dataModel?.tagsList;
				if (tagsList) {
					for (let tag of tagsList) {
						const { title, value, dateRange } = tag;
						switch (title) {
							case "NB Last Hour Average":
								if (value) {
									$gaugeData.north.value = value;
									$gaugeData.north.caution = getCaution("north", value, csoEvents);
									$gaugeData.north.updated = dateRange.to;
								}
								break;
							case "NB Last Month Average":
								if (value) $gaugeData.north.average = value;
								break;
							case "NB Last Month Maximum":
								if (value) $gaugeData.north.high = value;
								break;
							case "NB Last Month Minimum":
								if (value) $gaugeData.north.low = value;
								break;
							case "SB Last Hour Average":
								if (value) {
									$gaugeData.south.value = value;
									$gaugeData.south.caution = getCaution("south", value, csoEvents);
									$gaugeData.south.updated = dateRange.to;
								}
								break;
							case "SB Last Month Average":
								if (value) $gaugeData.south.average = value;
								break;
							case "SB Last Month Maximum":
								if (value) $gaugeData.south.high = value;
								break;
							case "SB Last Month Minimum":
								if (value) $gaugeData.south.low = value;
								break;
						}
					}
				}

				if (data.timestamp) {
					$gaugeData.north.updated = data.timestamp;
					$gaugeData.south.updated = data.timestamp;
				}
			})
			.catch(console.error);
	});

	afterUpdate(() => {
		// Update the iframe height
		if (typeof window != "undefined") window?.pymChild?.sendHeight();
	});
</script>

<style>
	:global(html body .water-quality) {
		/* TYPOGRAPHY */
		--fonts: "Omnes", "Helvetica", "Arial", sans-serif;
		--grid-gap: 32px;

		--color-blue-dark: #274571;
		--color-brown-dark: #3c2313;
		--color-gray-dark: #444;
		--color-gray: #888;
		--color-gray-light: #eee;

		--color-high: #8c6239;
		--color-low: #737373;
		--color-good: #00578a;
		--color-high-text: #ffffff;
		--color-low-text: #ffffff;
		--color-good-text: #ffffff;

		--color-text: #222;

		/* UI STUFF */
		--arrow-length: 15px;
		--fade-in-speed: 250ms;

		/* DIALS */
		--color-outer-dial: #eee;
		--color-outer-dial-highlight: rgba(0, 0, 0, 0.4);
		--color-inner-dial: linear-gradient(to left, var(--color-high), var(--color-good));
		--color-background: #fff;

		--inner-dial-width: 69%;
		--outer-dial-width: 9px;
		--stop-label-width: 20px;

		/* MOBILE SELECT MENU */
		--select-border-radius: 15px;
		--select-color-background: var(--color-gray-light);
		--select-input-height: 44px;
		--select-carat-color: var(--color-text);

		/* GAUGE / CANDLESTICK CHART */
		--gauge-color-value: #235686;
		--gauge-color-high: #000;
		--gauge-color-low: #a0bbce;
		--gauge-color-average: #cfdde6;

		font-family: var(--fonts);
		font-size: 1rem;
		line-height: 1.3em;
		max-width: 1330px;
		margin: 0;
	}

	.dials {
		display: grid;
		gap: var(--grid-gap) calc(var(--grid-gap) * 2);
		grid-template-columns: minmax(1px, 1fr);
		margin: 0;
	}

	.dials--grid {
		grid-template-columns: repeat(3, minmax(1px, 1fr));
	}

	.dials > :global(*) {
		flex: 1 1 250px;
	}

	.water-quality :global(.select) {
		margin-bottom: 16px;
	}
</style>

<div class="water-quality">
	{#if $isMobile}
		<InputSelect
			bind:value={visibleBranch}
			{options}
			showAll={false}
			on:input={e => {
				if (typeof window != "undefined") window?.pymChild?.sendHeight();
			}}
			label="Choose a branch" />
	{/if}
	<div class="dials" class:dials--grid={!$isMobile}>
		{#each Object.entries(dials) as [id, dial]}
			<Dial
				visible={id === visibleBranch || !$isMobile}
				{...dial}
				{...$gaugeData[id]}
				{labels}
				cso={csoEvents[id]} />
		{/each}
	</div>
</div>
