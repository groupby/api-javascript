var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  merge = require('merge-stream'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  paths = require('../paths');

var tsProject = ts.createProject('tsconfig.json', { sortOutput: true, declaration: true });

gulp.task('typescript:build', function() {
  var tsResult = gulp.src([
      paths.src + '/**/*.ts',
      paths.test + '/**/*.ts'
    ], { base: paths.src })
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts
    .pipe(concat('index.d.ts'))
    .pipe(gulp.dest(paths.definitions)),
    tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.out))
  ]);
});
