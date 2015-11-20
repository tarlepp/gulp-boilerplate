import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {ENV} from './tools/config';
import {loadTasks, task} from './tools/utils';

gulp.task('default', done => console.log('This is a default task'));
