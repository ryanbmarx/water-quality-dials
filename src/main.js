import App from "./App.svelte";

const SELECTOR = "#dials";

const target = document.querySelector(SELECTOR);

console.log({ target });

if (target) {
  const data = target.querySelector(`${SELECTOR}-config`).innerText || {};
  console.log({ data: JSON.parse(data) });
  const app = new App({
    hydrate: true,
    target: target,
    props: JSON.parse(data),
  });
}
export default app;
