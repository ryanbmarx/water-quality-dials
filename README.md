# water-quality-dials

This is a svelte app. You need node installed.

1) Clone the repo
2) `cd` into the directory root, then `npm install`.
3) `npm generate`
4) `npm run dev` to run it locally at [https://localhost:5000](https://localhost:5000)


## Configuring the dials

This uses a blob of json on the page to feed microcopy and other configuration info. The settings file can be found in `./functions/settings.json`. The configuration is rendered to a `<script>` tag on the index and consumed as App props. 

_example_

```
"south": {
    "name": "South Branch",
    "description": "Near Eleanor Boat House",
    "min": 0,
    "max": 100,
    "main_dial_stops": 10,
    "main_gauge_stops": 5
}
```

Supported options are:

key|value
---|---
name | The main gauge name. Appears in bold at the top of each guage
description | Small italic descriptor underneath the name
min | The lowest _possible_ value reflected on the gauges. Probably `0`.
max | The highest _possible_ value reflected on the gauges. Probably `100`.
main_dial_stops | The number of tick marks along the main dial.
main_gauge_stops | The number of main ticks on the chart at the bottom. 
		



## Deploying/publishing

1) Run `npm run generate` to make `./public/index.html`
2) Run `npm run build` to create the javascript and css bundle files.
3) The HTML contents are rendered to the index file and are suitable for a pym iframe.
4) The bundle files and HTML index should be uploaded to the web server.
