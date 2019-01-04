'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(plumber({errorHandler: notify.onError(
      "Error: <%= error.message %>"
    )}))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});
 

gulp.task('sass:watch', ['sass', 'browser-sync'], function () {
  let watcher = gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch("./*.html", ['bs-reload']);
  watcher.on('change', function(event) {
    console.log('コンパイルOK!');
  });
  gulp.watch("./scss/**/*.scss", ['bs-reload']);
});


gulp.task('default', ['sass:watch', 'browser-sync']);
gulp.task('build', ['minify-css']);


// ブラウザリロード browser-sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ".",
      index : "index.html"
    }
  });
});
gulp.task('bs-reload', function() {
  browserSync.reload();
})


// CSS圧縮 gulp-clean-css
gulp.task('minify-css', function() {
  return gulp.src("./css/*.css")
  .pipe(cleanCSS())
  // .pipe(gulp.dest('./dis/css'));
  .pipe(gulp.dest('./css'));
})


