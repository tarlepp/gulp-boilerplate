// Dependencies
import * as runSequence from 'run-sequence';

// Actual task implementation
export = function linters() {
  return function(done) {
    runSequence(
      'linter.ts',
      'linter.js',
      'linter.scss',
      done
    );
  };
}
