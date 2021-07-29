<script>
	import About from "./components/About.svelte";
	import Dial from "./components/Dial.svelte";

	export let headline = "";
	export let about = {};
	export let dials = [];
</script>

<style>
	:global(html body .water-quality) {
		/* TYPOGRAPHY */
		--fonts: "Omnes", "Helvetica", "Arial", sans-serif;
		--grid-gap: 32px;

		--color-blue-dark: #274571;
		--color-gray: #888;

		--color-text: #222;
		--color-accent: var(--color-blue-dark);

		/* UI STUFF */
		--arrow-length: 15px;

		font-family: var(--fonts);
		font-size: 1rem;
		line-height: 1.3em;
		max-width: 1330px;
		margin: 2em auto;
	}
	.headline {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 1em;
	}
	.dials {
		display: flex;
		gap: var(--grid-gap);
		flex-wrap: wrap;
		place-items: top center;
		place-content: top center;
		margin: 1em 0;
	}

	.dials > :global(*) {
		flex: 1 1 250px;
	}
</style>

<div class="water-quality">
	{#if headline}<h1 class="headline">{headline}</h1>{/if}
	<div class="dials">
		{#each dials as dial}
			<Dial {...dial} />
		{/each}
	</div>
	<About {...about} />
</div>
