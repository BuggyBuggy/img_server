const gulp = require('gulp') // 將 node_modules 的檔案載入
const sass = require('gulp-sass')
// const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const { dest, watch, series } = require('gulp')

// exports.build = series(sass2Css, testAutoFx, es6Tojs)
// exports.dev = series(sass2Css, testAutoFx, es6Tojs, sass2CssWatch, es6TojsWatch)
exports.build = series(sass2Css, es6Tojs)
exports.dev = series(sass2Css, es6Tojs, sass2CssWatch, es6TojsWatch)

function sass2Css() {
  return gulp
    .src('./source/scss/*.scss') // sass 的來源資料夾
    .pipe(
      sass(
        // 編譯 sass
        { outputStyle: 'expanded' } // sass 的輸出格式
      ).on('error', sass.logError)
    )
    .pipe(dest('./public/css')) // sass 編譯完成後的匯出資料夾
}

// function testAutoFx() {
//   //自動加css前綴
//   return gulp
//     .src('./public/css/*.css')
//     .pipe(autoprefixer())
//     .pipe(dest('./public/css'))
// }

function sass2CssWatch() {
  watch('./source/scss/*.scss', series(sass2Css))
  // watch('./public/css/*.css', series(testAutoFx))
}

function es6Tojs() {
  return gulp
    .src('./source/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('./public/js'))
}

function es6TojsWatch() {
  watch('./source/js/*.js', series(es6TojsWatch))
}