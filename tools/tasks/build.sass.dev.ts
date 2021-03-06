// Dependencies
import {join} from 'path';
import {APP_SRC, APP_DEST} from '../config';

// Actual task implementation
export = function buildSassDev(gulp, plugins, option) {
  return function() {
    return gulp.src(join(APP_SRC, '**', '*.scss'))
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(gulp.dest(APP_DEST));
  };
}
