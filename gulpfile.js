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
  return gulp.src('assets/js/main.js')
    .pipe(webpack({
      watch: global.production ? false : true,
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



//WATCH - DEVELOPMENT
gulp.task('watch', ['css', 'html', 'javascript', 'browserSync'], function(){
  gulp.watch('assets/stylesheets/**/*.scss', ['css']);

  // Reloads the browser whenever HTML or JS files change
  gulp.watch('assets/*.html', ['html']);

})

gulp.task('clean', function(){
  return global.production = true;
})


//BUILD - PRODUCTION
gulp.task('build', ['clean', 'css', 'html', 'javascript'], function(){
  console.log('Finished building!')
})




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




//BUILD TASK FOR PROUDCTION
// gulp.task('build', [`clean`, `sass`, `useref`, `images`, `fonts`], function (){
//   console.log('Building files');
// })
