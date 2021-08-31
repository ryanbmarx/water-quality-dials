<script>
	import { format } from "date-fns-tz";

	export let updated = "";

	const DATE_FORMAT = "d, yyyy";
	// const TIME_FORMAT = "h:mm aa zzz";
	const TIME_FORMAT = "h:mm aa";
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

	$: time = new Date(updated) || "";
	$: timeFormatted = formatTime(time);

	function formatTime(u) {
		if (!updated) return;
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
		opacity: 0;
		transition: opacity var(--fade-in-speed) ease;

		/* Timestamp probably will be ~2 lines, at 1.3em per line. This (hopefully) keeps reflows down */
		min-height: 3em;
	}

	.timestamp.visible {
		opacity: 1;
	}
</style>

<span class="timestamp" class:visible={updated} aria-hidden={!updated}>
	Water conditions:<br /><time datetime={time.getTime()}>{timeFormatted}</time>
</span>
