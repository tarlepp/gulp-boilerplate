// Dependencies
import * as gulp from 'gulp';
import {join} from 'path';
import {APP_DEST} from '../config';

/**
 * Helper function to return all CSS files from APP_DEST as stream.
 *
 * @returns {NodeJS.ReadWriteStream}
 */
export function cssFiles() {
  return gulp.src(getSource('css'), { read: false });
}

/**
 * Helper function to return all JavaScript files from APP_DEST as stream.
 *
 * @returns {NodeJS.ReadWriteStream}
 */
export function jsFiles() {
  return gulp.src(getSource('js'), { read: false });
}

// Private

/**
 * Private helper function to return array of source file specifications.
 *
 * @param   {string}    extension
 * @returns {string[]}
 */
function getSource(extension: string) {
  return [
    join(APP_DEST, '**', '*.' + extension),
    '!' + join(APP_DEST, 'lib', '**', '*.' + extension),
  ];
}
