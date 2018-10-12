const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const webpack = require('webpack');

const gulpSequence = require('gulp-sequence')
const reactModules = {};

/* **GULP_TAG_reactModulesNames** */
const reactModulesNames = ['cperezv', 'pet'];
/* **GULP_TAG_END_reactModulesNames** */

const webpackError = (err, stats, cb) => {
  if (err) throw new gutil.PluginError('webpack', err);
  // gutil.log('[webpack]', stats.toString({}));
  cb();
}

const callWebpack = (webpackConfig, cb) => {
  webpack(webpackConfig({
    devserver: false
  }), (err, stats) => {
    webpackError(err, stats, cb)
  });
};

gulp.task('clean', () => ( gulp.src('./public/build_react_apps/').pipe(vinylPaths(del))));
gulp.task('build:copy-html', () => ( gulp.src('./src_react_apps/**/*.html').pipe(gulp.dest('./public/build_react_apps/'))));
gulp.task('build:react', (cb) => { gulpSequence('clean', ['build:copy-html', 'build:js:cperezv', 'build:js:pet'], cb); });

/* **GULP_TAG_BUILD:JS:MODULE** */
gulp.task('build:js:cperezv', (cb) => { callWebpack(reactModules.cperezv.config, cb); });
gulp.task('build:js:pet', (cb) => { callWebpack(reactModules.pet.config, cb); });
/* **GULP_TAG_END_BUILD:JS:MODULE** */


gulp.task('react:dev', () => {
  reactModulesNames.forEach((module) => {
    reactModules[module] = {
      config: require(`./src_react_apps/${module}/webpack.config`),
      files: [`src_react_apps/${module}/*`, `src_react_apps/${module}/**/*`, `!src_react_apps/${module}/*.test.*`, `!src_react_apps/${module}/**/*.test.*`]
    }
    gulp.watch(reactModules[module].files, ['build:react']);
  })
});

gulp.task('build', () => {
  reactModulesNames.forEach((module) => {
    gulp.watch(reactModules[module].files, ['build:react']);
  })
});
