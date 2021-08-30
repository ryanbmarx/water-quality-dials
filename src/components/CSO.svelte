<script>
	import { format } from "date-fns-tz";

	export let cso = "";

	const DATE_FORMAT = "d";
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

	$: time = new Date(cso) || "";
	$: timeFormatted = formatTime(time);

	function formatTime(u) {
		try {
			let date = format(u, DATE_FORMAT);
			let time = format(u, TIME_FORMAT);
			let month = AP_MONTHS[u.getMonth()];

			let formatted = `${time}, ${month} ${date}`;

			return formatted;
		} catch (e) {
			// Invalid timestamp. Acknowledge and move on
			return "";
		}
	}
</script>

<style>
	.cso {
		color: var(--color-accent);
		font-weight: bold;
		display: block;
		margin: 0 auto 0.5em auto;
		max-width: 50%;
		opacity: 0;
		transition: opacity var(--fade-in-speed) ease;
	}

	.cso.visible {
		opacity: 1;
	}
</style>

<span class="cso" class:visible={cso} aria-hidden={!time}>
	CSO, <time datetime={time.getTime()}>{timeFormatted}</time>
</span>
