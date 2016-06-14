var gulp = require('gulp'),
  del = require('del'),
  paths = require('../paths.js');

gulp.task('clean:typings', function(cb) {
  del([
    paths.typings
  ], cb);
});

gulp.task('clean:dist', function(cb) {
  del([
    paths.dist
  ], cb);
});

gulp.task('clean:out', function(cb) {
  del([
    paths.out
  ], cb);
});

gulp.task('clean', ['clean:dist', 'clean:typings', 'clean:out']);
