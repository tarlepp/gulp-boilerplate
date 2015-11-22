// Dependencies
import * as del from 'del';
import {APP_DEST, TEST_DEST} from '../config';

// Actual task implementation
export = function clean(gulp, plugins, option) {
  return function(done) {
    let task;

    switch(option) {
      case 'all':
        task = cleanAll();
        break;
      case 'dist':
        task = cleanDist();
        break;
      case 'test':
        task = cleanTest();
        break;
      default:
        done();
    }

    task.then(function() {
      done();
    }).catch(function(error) {
      done(error);
    });
  };
};

// Private

function cleanAll() {
  return Promise.all([
    cleanDist(),
    cleanTest()
  ]);
}

function cleanDist() {
  return del(APP_DEST);
}

function cleanTest() {
  return del(TEST_DEST);
}
