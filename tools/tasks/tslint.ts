// Dependencies
import {join} from 'path';
import {APP_SRC, TOOLS_DIR} from '../config';

// Actual task implementation
export = function tslint(gulp, plugins) {
  return function() {
    let src = [
      join(APP_SRC, '**/*.ts'),
      join(TOOLS_DIR, '**/*.ts'),
      '!' + join(APP_SRC, '**/*.d.ts'),
      '!' + join(TOOLS_DIR, '**/*.d.ts')
    ];

    return gulp.src(src)
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        emitError: false,
        sort: true,
        bell: true
      }));
  };
};
