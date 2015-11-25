// Dependencies
import {join} from 'path';
import {APP_SRC, APP_DEST, DEV_DEPENDENCIES} from '../config';
import {cssFiles, jsFiles, transformPath, templateLocals} from '../utils';

// Actual task implementation
export = function buildIndexDev(gulp, plugins) {
  return function () {
    return gulp.src(join(APP_SRC, 'index.html'))
      // NOTE: There might be a way to pipe in loop.
      .pipe(inject('shims'))
      .pipe(inject())
      .pipe(inject('', cssFiles()))
      .pipe(inject('', jsFiles()))
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };

  /**
   * Helper inject method to return stream with specified injectables.
   *
   * @param   {string}                  [name]
   * @param   {NodeJS.ReadWriteStream}  [source]
   * @returns {NodeJS.ReadWriteStream}
   */
  function inject(name?: string, source?: NodeJS.ReadWriteStream) {
    // No source given so get default ones
    if (!source) {
      source = gulp.src(getInjectablesDependenciesRef(name), { read: false });
    }

    return plugins.inject(source, {
      name,
      transform: transformPath(plugins, 'dev')
    });
  }

  /**
   * Helper method to get injectables dependencies (npm packages) from configuration file.
   *
   * @param   {string}  name
   * @returns {string[]}
   */
  function getInjectablesDependenciesRef(name?: string) {
    return DEV_DEPENDENCIES
      .filter(dep => dep['inject'] && dep['inject'] === (name || true))
      .map(dep => `${dep.dest}/${dep.src.split('/').pop()}`);
  }
}
