var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var del = require('del');



const handleError = function(err){
  console.error(err);
}


//RUN SERVER
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})


//CSS
gulp.task('css', function(){
  return gulp.src('assets/stylesheets/style.scss')
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass())
    .on('error', handleError)
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


//JAVASCRIPT
gulp.task('javascript', function(){
  return gulp.src('assets/js/*.js')
    .pipe(webpack({
      //watch: global.production ? false : true,
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      output: {
        filename: 'bundle.js',
      },
    }))
    .on('error', handleError)
    .pipe(gulpif(global.production, uglify()))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream())
});


//IMAGES
gulp.task('images', function(){
  return gulp.src('assets/img/**/*.+(png|jpg|gif|svg)')
    .pipe(gulpif(global.production, cache(imagemin())))
    .pipe(gulp.dest('public/img'))
});


//WATCH - DEVELOPMENT
gulp.task('watch', ['browserSync', 'css', 'html', 'javascript', 'images'], function(){
  gulp.watch('assets/stylesheets/**/*.scss', ['css']);
  gulp.watch('assets/js/**/*.js', ['javascript']);
  gulp.watch('assets/*.html', ['html']);
})


//CLEAN - PRODUCTION
gulp.task('clean', function(){
  global.production = true;
  return del.sync('public');
})

//BUILD - PRODUCTION
gulp.task('build', function(){
  runSequence('clean',
    ['images', 'css', 'html', 'javascript'],
    function() {
      console.log('Finished building~!');
    }
  )
})






//CSS
  // DEVELOPMENT
  // 1) Compile Sass to CSS - DONE
  // 2) Autoprefix - DONE
  // 3) Create source maps -- DONE
  // 4) Live reload on save of asset files - DONE

  // PRODUCTION
  // 1) Minify -- DONE


//HTML
  // DEVELOPMENT
  // 1) Live reload on save of asset files - DONE

  // PRODUCTION
  // 1) Minify - DONE


//JAVASCRIPT
  // DEVELOPMENT
  // 1) Bundle together all imports into single js file - DONE
  // 2) Live reload on save of asset files - DONE

  // PRODUCTION
  // 1) Minify - DONE


//IMAGES
  // PRODUCTION
  // 1) Optimize - DONE
