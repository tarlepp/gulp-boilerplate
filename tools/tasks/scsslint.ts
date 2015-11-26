// Dependencies
import {join} from 'path';
import {APP_SRC} from '../config';

// Actual task implementation
export = function scsslint(gulp, plugins) {
  return function() {
    let src = [
      join(APP_SRC, '**', '*.scss')
    ];

    let reporter = plugins.scssLintStylish2();

    return gulp.src(src)
      .pipe(plugins.scssLint({ customReport: reporter.issues }));
  };
};
