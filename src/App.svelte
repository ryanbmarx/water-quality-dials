<script>
  import About from "./components/About.svelte";
  import Dial from "./components/Dial.svelte";

  export let headline = "";
  export let about = {};
  export let dials = [];
</script>

<div class="water-quality">
  {#if headline}<h1>{headline}</h1>{/if}
  <div class="dials">
    {#each dials as dial}
      <Dial {...dial} />
    {/each}
  </div>
  <About {...about} />
</div>

<style>
  :global(html body .water-quality) {
    /* TYPOGRAPHY */
    --fonts: "Helvetica", "Arial", sans-serif;
    --grid-gap: 32px;
    --color-text: #222;
  }

  .dials {
    display: flex;
    gap: var(--grid-gap);
    flex-wrap: wrap;
    place-items: top center;
    place-content: top center;
  }

  .dials > :global(*) {
    flex: 1 1 250px;
  }
</style>
