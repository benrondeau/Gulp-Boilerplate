var gulp = require('gulp'),
    //Utility dependencies
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    insertHeader = require('gulp-header'),
    pkg = require('./package.json'),
    //CSS dependencies
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'), 
    uncss = require('gulp-uncss'),
    //Image processing dependencies
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    //Javascript dependencies
    babelES6 = require('gulp-babel');


//Header file inserted in CSS/JS files
var headerFile = ['/**',
  ' * @Author <%= pkg.author %> | 2015.',
  ' * @version v<%= pkg.version %>',
  ' * @URL https://github.com/benrondeau',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');


// Server task for development
gulp.task('serve', function() {
  console.log("default task.")
});


//SCSS Compike/minify
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
gulp.task('uncss', ['scss'], function(){
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


// Minify Images
gulp.task('imagemin', function () {
    return gulp.src('public/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/img/'));
});


//Javascript Processing
gulp.task('clientJS', function () {
    return gulp.src('public/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babelES6())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'));
});