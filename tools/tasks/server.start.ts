// Dependencies
import {serveSPA} from '../utils';

// Actual task implementation
export = function serverStart(gulp, plugins) {
  return function() {
    serveSPA();
  };
};
