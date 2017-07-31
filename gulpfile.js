var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');




//RUN SERVER
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})


//DEVELOPMENT + PRODUCTION CSS
gulp.task('css', function(){
  return gulp.src('assets/stylesheets/style.scss')
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 3 versions']}))
    .pipe(gulpif(global.production, cssnano({preset: 'default'})))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(browserSync.stream())
});


//HTML
gulp.task('html', function(){
  return gulp.src('assets/*.html')
    .pipe(gulpif(global.production, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
});



//WATCH - DEVELOPMENT
gulp.task('watch', ['browserSync', 'css', 'html'], function(){
  gulp.watch('assets/stylesheets/**/*.scss', ['css']);

  // Reloads the browser whenever HTML or JS files change
  gulp.watch('assets/*.html', ['html']);
  gulp.watch('assets/js/**/*.js', browserSync.reload);
})



//BUILD
gulp.task('build', ['browserSync'], function(){
  global.production = true;

  gulp.watch('assets/stylesheets/**/*.scss', ['css']);

  // Reloads the browser whenever HTML or JS files change
  gulp.watch('assets/*.html', ['html']);
  gulp.watch('assets/js/**/*.js', browserSync.reload);
})



//JAVASCRIPT
  // DEVELOPMENT
  // 1) Bundle together all imports into single js file
  // 2) Live reload on save of asset files

  // PRODUCTION
  // 1) Minify


//HTML
  // DEVELOPMENT
  // 1) Live reload on save of asset files - DONE

  // PRODUCTION
  // 1) Minify


//IMAGES
  // PRODUCTION
  // 1) Optimize



  //CSS
  // DEVELOPMENT
  // 1) Compile Sass to CSS - DONE
  // 2) Autoprefix - DONE
  // 3) Create source maps -- DONE
  // 4) Live reload on save of asset files - DONE

  // PRODUCTION
  // 1) Minify -- DONE




//BUILD TASK FOR PROUDCTION
// gulp.task('build', [`clean`, `sass`, `useref`, `images`, `fonts`], function (){
//   console.log('Building files');
// })
