<script>
	import Button from "./ui/Button.svelte";
	export let link = "";
	export let blurb = "";
	export let label = "";
</script>

<style>
	.about {
		text-align: center;
	}
</style>

<div class="about">
	{#if blurb}<p>{blurb}</p>{/if}
	{#if link && label}
		<Button {label} href={link} />
	{/if}
</div>
