// Dependencies
import {join} from 'path';
import {APP_SRC, TOOLS_DIR} from '../config';

// Actual task implementation
export = function linterJs(gulp, plugins) {
  return function() {
    let src = [
      join(APP_SRC, '**/*.js'),
      join(TOOLS_DIR, '**/*.js')
    ];

    return gulp.src(src)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'));
  };
};
