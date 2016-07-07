var gulp = require('gulp'),
  shell = require('gulp-shell'),
  typings = require('gulp-typings'),
  paths = require('../paths');

gulp.task('typings:install', function(cb) {
  gulp.src('typings.json')
    .pipe(typings())
    .on('finish', cb);
});

gulp.task('typings:vendor:copy', function() {
  gulp.src([paths.typings + '/**/*'])
    .pipe(gulp.dest(paths.dist.typings));
});

gulp.task('typings:custom:copy', function() {
  gulp.src([paths.customTypings + '/**/*'])
    .pipe(gulp.dest(paths.dist.customTypings));
});

gulp.task('typings:copy', ['typings:vendor:copy', 'typings:custom:copy']);
