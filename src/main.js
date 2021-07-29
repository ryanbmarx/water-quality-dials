import App from "./App.svelte";

const SELECTOR = "#dials";

const target = document.querySelector(SELECTOR);

if (target) {
	const data = document.querySelector(`${SELECTOR}-config`).innerText || {};
	const app = new App({
		hydrate: true,
		target: target,
		props: JSON.parse(data),
	});
}
export default app;
