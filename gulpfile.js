const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const kilikki = require('./plugins/kilikki-processor');

gulp.task('copyAssets', () => {
  return gulp.src(['src/html/*', 'images/*'])
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['copyAssets'], () => {
  return gulp.src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      kilikki({
        flag: true
      })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});