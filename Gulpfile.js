var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    insertHeader = require('gulp-header'),
    pkg = require('./package.json');


var headerFile = ['/**',
  ' * @Author <%= pkg.author %> | 2015.',
  ' * @version v<%= pkg.version %>',
  ' * @URL https://github.com/benrondeau',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');


gulp.task('default', function() {
  console.log("default task.")
});

//SCSS
gulp.task('scss', function(){
  return gulp.src('public/css/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(
      autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
      }))
    .pipe(sourcemaps.write())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('public/css/build'));
});

//Remove unused CSS, especially from vendor files
gulp.task('uncss', function(){
  return gulp.src('public/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(uncss({
        html: ['public/**/*.html','public/html/**/*.html']
    }))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(rename('main.min.css'))
    .pipe(insertHeader(headerFile, { pkg : pkg } ))
    .pipe(gulp.dest('public/css/build'));
});