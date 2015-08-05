# js-html-kanban
Proof Of Concept for the new kanban in HTML


## Local dependencies

install the local dependencies :

```sh
$ npm install
```

## Watch For Changes

```sh
$ npm start
```

This will perform an initial build and start a watcher process that will update bundle.js with any changes you wish to make.
This watcher is based on Browserify and Watchify, and it transforms React's JSX syntax into standard JavaScript with Reactify.

To run the app, spin up an HTTP server and visit http://localhost/... Or simply open the index.html file in a browser.


## Build

```sh
$ npm run-script build
```

This will perform an production build.
This build phase is based on Browserify, Reactify, Envify and Uglify.
It transforms React's JSX syntax into standard JavaScript with Reactify,
selectively replace Node-style environment variables with plain strings,
And finaly uglify the js code.
