const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const gulpSequence = require('gulp-sequence')

const reactApps = ['cperezv', 'pet'];
const reactModules = {
  cperezv: ['src_react_apps/cperezv/*','!src_react_apps/cperezv/*.test.*','!src_react_apps/cperezv/**/*.test.*'],
  pet: ['src_react_apps/pet/*','!src_react_apps/pet/*.test.*','!src_react_apps/pet/**/*.test.*'],
};

const webpackError = (err, stats, cb) => {
  if(err) throw new gutil.PluginError('webpack', err);
  // gutil.log('[webpack]', stats.toString({}));
  cb();
}

gulp.task('clean',() => {
  return gulp.src('./public/build_react_apps/').pipe(vinylPaths(del));
});
gulp.task('build:copy-html', () => {
  return gulp.src('./src_react_apps/**/*.html').pipe(gulp.dest('./public/build_react_apps/'));
});
gulp.task('build:react', (cb) => {
  console.log("here i am");
  gulpSequence('clean', ['build:copy-html','build:js:cperezv','build:js:pet'], cb)
});


gulp.task('build:js:cperezv', (cb) => {
  const webpackConfig = require('./src_react_apps/cperezv/webpack.config');
  webpack(webpackConfig({ devserver: false }), (err, stats) => { webpackError(err, stats, cb)});
});
gulp.task('build:js:pet', (cb) => {
  const webpackConfig = require('./src_react_apps/pet/webpack.config');
  webpack(webpackConfig({ devserver: false }), (err, stats) => { webpackError(err, stats, cb)});
});



gulp.task('build:cperezv', (cb) => {
  gulpSequence('clean', ['build:copy-html','build:js:cperezv'], cb)
});
gulp.task('build:pet', (cb) => {
  gulpSequence('clean', ['build:copy-html','build:js:pet'], cb)
});

gulp.task('react:dev', (cb) => {
  gulp.watch(reactModules.cperezv, ['build:react']);
  gulp.watch(reactModules.pet, ['build:react']);
});
