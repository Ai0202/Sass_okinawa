'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber({errorHandler: notify.onError(
      "Error: <%= error.message %>"
    )}))
    .pipe(plumber())
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', ['sass', 'browser-sync'], function () {
  gulp.watch("./*.html", ['bs-reload']);
  gulp.watch('./sass/**/*.scss', ['sass', 'bs-reload']);
});

gulp.task('minify', function() {
  return gulp.src("./css/*.css")
  .pipe(cleanCSS())
  .pipe(gulp.dest('./css'));
});


//browser-sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ".",
      index: "index.html"
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
})
