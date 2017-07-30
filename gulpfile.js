var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('compile-css', function(){
  return gulp.src('assets/scss/style.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'assets'
    },
  })
})

gulp.task('watch', ['browserSync', 'compile-css'], function(){
  gulp.watch('assets/scss/**/*.scss', ['compile-css']);

  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})
