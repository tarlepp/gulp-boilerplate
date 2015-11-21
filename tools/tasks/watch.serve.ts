// Dependencies
import * as runSequence from 'run-sequence';
import {join} from 'path';
import {APP_SRC} from '../config';
import {notifyLiveReload} from '../utils';

// Actual task implementation
export = function watchServe(gulp, plugins) {
  return function() {
    plugins.watch(join(APP_SRC, '**'), event =>
      runSequence('build.dev', () => notifyLiveReload(event))
    );
  };
};