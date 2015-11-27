// Dependencies
import {VERSION_NPM, VERSION_NODE} from '../config';

// Actual task implementation
export = function() {
  return function(done) {
    let exec = require('child-process-promise').exec;
    let semver = require('semver');

    Promise.all([
      checkNpm(),
      checkNode()
    ]).then(function() {
      done();
    }).catch(done);

    function checkNpm() {
      return exec('npm --version')
        .then(function(result) {
          if (!semver.gte(result.stdout, VERSION_NPM)) {
            throw new Error('NPM is not in required version! Required is ' + VERSION_NPM + ' and you\'re using ' + result.stdout);
          }
        });
    }

    function checkNode() {
      return exec('node --version')
        .then(function(result) {
          if (!semver.gte(result.stdout, VERSION_NODE)) {
            throw new Error('NODE is not in required version! Required is ' + VERSION_NODE + ' and you\'re using ' + result.stdout);
          }
        });
    }
  };
}
