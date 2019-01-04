'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber'); 
var notify = require('gulp-notify');
var postcss = require('gulp-postcss');
var mqpacker = require('css-mqpacker');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(
      plumber(
        {
          errorHandler: notify.onError(
            "Error: <%= error.message %>"
          )
        }
      )
    )//コンパイル失敗の時にエラー通知
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([mqpacker()]))
    .pipe(sourcemaps.write('./css'))//引数を指定することで別ファイルにsourcemapを書き出せる
    .pipe(plumber())//エラーでもwatchを止めないようにする
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});