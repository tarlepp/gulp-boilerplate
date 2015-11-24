// Dependencies
import {join} from 'path';
import {APP_SRC, APP_DEST} from '../config';

// Actual task implementation
export = function buildJSDev(gulp, plugins) {
  return function() {
    let src = [
      join(APP_SRC, '**/*.js'),
      '!' + join(APP_SRC, '**/*_spec.js')
    ];

    return gulp.src(src)
      .pipe(gulp.dest(APP_DEST));
  };
};
