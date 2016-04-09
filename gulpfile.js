var gulp = require('gulp'),
  runSequence = require('run-sequence');

require('git-guppy')(gulp);
require('require-dir')('build/tasks');

gulp.task('docs', () => {
  return gulp.src(['src/*.ts'])
   .pipe(typedoc({
     module: 'commonjs',
     target: 'es5',
     includeDeclarations: true,

     out: './docs',
     includeDeclarations: false,

     name: 'groupby-api',
     ignoreCompilerErrors: true,
     excludeExternals: true,
     version: true
   }));
});

/**
 * Default
 */
gulp.task('default', function(cb) {
  runSequence(
    'build',
    // 'test',
    cb
  );
});


/**
 * Build
 */
gulp.task('build', function(cb) {
  runSequence(
    'clean',
    'typings:install', ['typescript:build', 'webpack:bundle', 'webpack:minify', 'typings:copy'],
    'typescript:definitions',
    cb
  );
});
