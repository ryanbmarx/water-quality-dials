# water-quality-dials

This is a svelte app.

1) `npm install`
2) `npm run dev` to run it locally at [https://localhost:5000](https://localhost:5000)


## Configuring the dials

This uses a blob of json on the page to feed microcopy and other configuration info. The settings file can be found in `./functions/settings.json`

TKTKTKTK

## Deploying/publishing

1) Run `npm run generate` to make `./public/dials.html`
2) Run `npm run build` to create the javascript and css bundle files.
3) The HTML contents can be copied en masse and pasted into the CMS, where the code should live.
4) The bundle files should be uploaded to the web server (location TK)

_The generate command also creates `./public/index.html` for local and github.io-based previewing_