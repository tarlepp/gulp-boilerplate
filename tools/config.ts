import {readFileSync} from 'fs';
import {argv} from 'yargs';

// Configuration
export const ENV              = argv['env']         || 'dev';
export const DEBUG            = argv['debug']       || false;
export const PORT             = argv['port']        || 5555;
export const LIVE_RELOAD_PORT = argv['reload-port'] || 4002;
export const APP_BASE         = argv['base']        || '/';

export const APP_TITLE        = '';
export const APP_SRC          = 'app';
export const ASSETS_SRC       = `${APP_SRC}/assets/**/*`;

export const TOOLS_DIR        = 'tools';
export const TEST_DEST        = 'test';
export const APP_DEST         = `dist/${ENV}`;
export const ASSETS_DEST      = `${APP_DEST}/assets`;
export const CSS_DEST         = `${APP_DEST}/css`;
export const LIB_DEST         = `${APP_DEST}/lib`;
export const VERSION          = appVersion();

export const SYSTEM_CONFIG = {
  defaultJSExtensions: true,
  paths: { }
};

// Configuration for minimum versions of npm and node
export const VERSION_NPM      = '3.0.0';
export const VERSION_NODE     = '4.0.0';

// Dev dependencies
export const DEV_DEPENDENCIES = [
  { dest: LIB_DEST, src: 'systemjs/dist/system-polyfills.js' },

  { dest: LIB_DEST, inject: 'shims', src: 'es6-shim/es6-shim.min.js' },
  { dest: LIB_DEST, inject: 'shims', src: 'reflect-metadata/Reflect.js' },
  { dest: LIB_DEST, inject: 'shims', src: 'systemjs/dist/system.src.js' }
];

// Private

/**
 * Helper function to determine application version from package.json
 *
 * @returns {any}
 */
function appVersion(): number|string {
  let pkg = JSON.parse(readFileSync('package.json').toString());

  return pkg.version;
}
