// Dependencies
import * as connectLivereload from 'connect-livereload';
import * as express from 'express';
import * as tinyLrFn from 'tiny-lr';
import * as openResource from 'open';
import * as serveStatic from 'serve-static';
import {resolve} from 'path';
import {APP_BASE, APP_DEST, LIVE_RELOAD_PORT, PORT} from '../config';

let tinyLr = tinyLrFn();

/**
 * Function to serve SPA application.
 *
 * This will do following jobs:
 *  1) Start express server
 *  2) Listen possible changes on codes
 *  3) Attach necessary middleware to application
 *    - Live reload (within changes)
 *    - Serve static files
 *  4) Serve application index file
 *  6) Open application to browser
 */
export function serveSPA() {
  let server = express();

  tinyLr.listen(LIVE_RELOAD_PORT);

  server.use(
    APP_BASE,
    connectLivereload({ port: LIVE_RELOAD_PORT, foo: 'bar' }),
    serveStatic(resolve(process.cwd(), APP_DEST))
  );

  server.all(APP_BASE + '*', (req, res) =>
    res.sendFile(resolve(process.cwd(), APP_DEST, 'index.html'))
  );

  server.listen(PORT, () =>
    openResource('http://localhost:' + PORT + APP_BASE)
  );
}

/**
 * Helper function to notify live reload whenever some file changes on server.
 *
 * @todo  How to prevent all jobs to be run after this?
 *
 * @param event
 */
export function notifyLiveReload(event) {
  let fileName = event.path;

  tinyLr.changed({
    body: { files: [fileName] }
  });
}
