// Dependencies
import * as gulp from 'gulp';
import * as plugins from 'gulp-load-plugins';
import {readdirSync, existsSync, lstatSync} from 'fs';
import {join} from 'path';
import {TOOLS_DIR} from '../config';

// Set task path
const TASKS_PATH = join(TOOLS_DIR, 'tasks');

/**
 * Function to load all task so that gulp would be enable to use those.
 */
export function loadTasks(): void {
  scanDir(TASKS_PATH, (taskName) => registerTask(taskName));
}

/**
 * Function to load specified task with options.
 *
 * @param   {string}        taskName
 * @param   {string|object} option
 * @returns {any}
 */
export function task(taskName: string, option?: string | Object) {
  return require(join('..', 'tasks', taskName))(gulp, plugins(), option);
}

// Private

/**
 * Helper function to determine if given string ends with specified pattern.
 *
 * @param   {string}  string
 * @param   {string}  suffix
 * @returns {boolean}
 */
function endsWith(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
}

/**
 * Helper function to register specified task.
 *
 * @param {string} taskName   Name of the task
 * @param {string} [filename] Filename of the task
 * @param {string} [option]   Task option
 */
function registerTask(taskName: string, filename?: string, option: string = ''): void {
  gulp.task(taskName, task(filename || taskName, option));
}

/**
 * Helper function to scan specified directory for gulp task files for this project.
 *
 * @param {string}    root  Path root where to start
 * @param {function}  cb    Callback function
 */
function scanDir(root: string, cb: (taskName: string) => void) {
  if (!existsSync(root)) {
    return;
  }

  walk(root);

  function walk(path) {
    readdirSync(path).forEach(function iterator(file) {
      let currentPath = join(path, file);

      if (lstatSync(currentPath).isDirectory()) { // recurse
        path = file;

        walk(currentPath);
      }

      if (lstatSync(currentPath).isFile() && endsWith(file, '.ts')) {
        let taskName = file.replace(/(\.ts)/, '');

        cb(taskName);
      }
    });
  }
}
