var gulp = require('gulp'),
  webpack = require('webpack-stream'),
  pjson = require('../../package.json'),
  paths = require('../paths.js'),
  assign = require('object-assign'),
  packConfig = require('../../webpack.config');

gulp.task('webpack:bundle', function() {
  return gulp.src('')
    .pipe(webpack(packConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack:watch', function() {
  return gulp.src('')
    .pipe(webpack(assign({}, packConfig, { watch: true })))
    .pipe(gulp.dest('dist/'));
});
