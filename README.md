# water-quality-dials

This is a svelte app.

1) `npm install`
2) `npm run dev` to run it locally at [https://localhost:5000](https://localhost:5000)


## Configuring the dials

This uses a blob of json on the page to feed microcopy and other configuration info. The settings file can be found in `./functions/settings.json`

TKTKTKTK

## Deploying/publishing

1) Run `npm run generate` to make `./public/index.html`
2) Run `npm run build` to create the javascript and css bundle files.
3) The HTML contents are rendered to the index file and are suitable for a pym iframe.
4) The bundle files and HTML index should be uploaded to the web server.
