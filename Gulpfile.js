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
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    babelES6 = require('gulp-babel').
    //Tests
    karma = require('gulp-karma'),
    //Server
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


//Header file inserted in CSS/JS files
var headerFile = ['/**',
    ' * @Author <%= pkg.author %> | 2015.',
    ' * @version v<%= pkg.version %>',
    ' * @URL https://github.com/benrondeau',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');


//Development Server
gulp.task('serve', ['browser-sync', 'watch']);


// Browser Reload
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "public/"
        }
    });
});


//File watching for BrowserSync
gulp.task('watch', function() {
    gulp.watch('public/css/**/*.scss', ['scss']);
    gulp.watch('public/js/**/*.js', ['clientJS']);
    gulp.watch('public/**/*.html');
    // gulp.watch('img/*', ['imgmin']);
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
    .pipe(gulp.dest('public/dist/css'))
    .pipe(reload({stream:true}));
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
    .pipe(gulp.dest('public/dist/css'));
});


// Minify Images
gulp.task('imagemin', function () {
    return gulp.src('public/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/dist/img'));
});


//Javascript Processing
gulp.task('clientJS', function () {
    return gulp.src('public/js/author/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('everything.js'))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(babelES6())
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(insertHeader(headerFile, { pkg : pkg } ))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/dist/js'))
        .pipe(reload({stream:true}));
});


//HTML Processing
gulp.task('html', function () {
    //TBD
});


//Task Running
gulp.task('tests', function() {
  gulp.src('tests/**/*.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});