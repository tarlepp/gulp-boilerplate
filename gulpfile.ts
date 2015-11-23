// Dependencies
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {ENV} from './tools/config';
import {loadTasks, task} from './tools/utils';

// Configuration
loadTasks();

/**
 * Below is all supported gulp main tasks. Note that these task will use sub-tasks to make all magic to work.
 * Following gulp task are supported:
 *  - gulp serve [--{environment}]
 *
 * Other gulp tasks (following are just 'sub' tasks
 *  - gulp clean
 *  - gulp clean.dist
 *  - gulp clean.test
 *  - gulp postinstall
 */

// Clean tasks
gulp.task('clean',       task('clean', 'all'));
gulp.task('clean.dist',  task('clean', 'dist'));
gulp.task('clean.test',  task('clean', 'test'));

// Post install.
gulp.task('postinstall', done =>
  runSequence(
    'clean',
    'npm',
    done
  )
);

// Build dev.
gulp.task('build.dev', done =>
  runSequence(
    'clean.dist',
    'tslint',
    'build.sass.dev',
    'build.assets',
    'build.js.dev',
    'build.index.dev',
    done
  )
);

gulp.task('build.dev.watch', done =>
  runSequence(
    'build.dev',
    'watch.dev',
    done
  )
);

// Serve each environment
gulp.task('serve', done =>
  runSequence(
    // `build.${ENV}`, this needs work still...
    'server.start',
    'watch.serve',
    done
  )
);

gulp.task('default', done => console.log('This is a default task'));
