var gulp = require('gulp');

//SASS + CSS
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

//SERVER
var browserSync = require('browser-sync').create();






//RUN SERVER
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})


//COMPILE SASS
gulp.task('compile-sass', function(){
  return gulp.src('assets/stylesheets/style.scss')
    .pipe(sass()) //compile sass to css
    .pipe(postcss([ autoprefixer({browsers: ['last 3 versions']}) ])) //autoprefixer
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


//DEVELOPMENT + PRODUCTION CSS
  // return gulp.src(paths.src)
  //   .pipe(gulpif(!global.production, sourcemaps.init()))
  //   .pipe(sass(TASK_CONFIG.stylesheets.sass))
  //   .pipe(autoprefixer(TASK_CONFIG.stylesheets.autoprefixer))
  //   .pipe(gulpif(global.production, cssnano(cssnanoConfig)))
  //   .pipe(gulpif(!global.production, sourcemaps.write()))
  //   .pipe(gulp.dest(paths.dest))
  //   .pipe(browserSync.stream())




//WATCH
gulp.task('watch', ['browserSync', 'compile-sass'], function(){
  gulp.watch('assets/stylesheets/**/*.scss', ['compile-sass']);

  // Reloads the browser whenever HTML or JS files change
  gulp.watch('public/*.html', browserSync.reload);
  gulp.watch('assets/js/**/*.js', browserSync.reload);
})




//CSS
  // DEVELOPMENT
  // 1) Compile Sass to CSS - DONE
  // 2) Autoprefix - DONE
  // 3) Live reload on save of asset files - DONE

  // PRODUCTION
  // 1) Create source maps
  // 2) Minify


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


//BUILD TASK FOR PROUDCTION
// gulp.task('build', [`clean`, `sass`, `useref`, `images`, `fonts`], function (){
//   console.log('Building files');
// })
