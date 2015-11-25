// Dependencies
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {ENV} from './tools/config';
import {loadTasks, task} from './tools/utils';

// Configuration
loadTasks();

/**
 * Below is all supported gulp main tasks. Note that these task will use sub-tasks to make all magic to work.
 *
 *  gulp serve [--{environment}]
 *
 * Other gulp tasks are just individual tasks that main tasks uses. You can get full gulp task list just by typing
 * following command in shell:
 *
 *  gulp --tasks-simple
 */

// Clean tasks
gulp.task('clean',      task('clean', 'all'));
gulp.task('clean.dist', task('clean', 'dist'));
gulp.task('clean.test', task('clean', 'test'));

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
    'build.deps',
    'build.sass.dev',
    'build.assets',
    'build.js.dev',
    'build.ts.dev',
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
    `build.${ENV}`,
    'server.start',
    'watch.serve',
    done
  )
);

gulp.task('default', done => console.log('This is a default task'));
