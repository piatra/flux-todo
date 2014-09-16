var gulp       = require('gulp');
var clean      = require('gulp-clean');
var concat     = require('gulp-concat');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return gulp.src(['dist/js/**/*.*', '.module-cache'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean', 'browserify', 'copy']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['default']);
});
