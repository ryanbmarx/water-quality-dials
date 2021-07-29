<script>
	import { format } from "date-fns-tz";

	export let updated = "";

	const DATE_FORMAT = "d, yyyy";
	const TIME_FORMAT = "h:mm aa zzz";
	const AP_MONTHS = [
		"Jan.",
		"Feb.",
		"March",
		"April",
		"May",
		"June",
		"July",
		"Aug.",
		"Sept.",
		"Oct.",
		"Nov.",
		"Dec.",
	];
	let time = new Date(updated) || "";
	let timeFormatted = formatTime(time);
	function formatTime(u) {
		try {
			let date = format(u, DATE_FORMAT);
			let time = format(u, TIME_FORMAT);
			let month = AP_MONTHS[u.getMonth()];

			let formatted = `${time}, ${month} ${date}`;

			return formatted;
		} catch (e) {
			// Invalid timestamp
			console.error(e);
			return "";
		}
	}
</script>

<style>
	.timestamp {
		display: block;

		margin: 0 auto 0.5em auto;
		max-width: 50%;
	}
</style>

{#if timeFormatted}
	<span class="timestamp">
		Water conditions: <time datetime={time.getTime()}>{timeFormatted}</time>
	</span>
{/if}
