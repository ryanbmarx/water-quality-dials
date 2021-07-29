import { writable } from "svelte/store";

/**
 * This creates a boolean store value to let your code monitor viewport width in a convenient way.
 *
 * @param {string} query | The valid css media query conditions you want to observe
 */

export function createMediaStore(query) {
	// If we are SSRing, the window is not defined. In that case, just return.
	if (typeof window === "undefined") return;

	const media = window.matchMedia(query);
	const { set, subscribe } = writable(media.matches);

	media.addEventListener("change", e => {
		set(e.matches);
	});

	return { subscribe };
}
