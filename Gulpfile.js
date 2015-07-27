var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename');

gulp.task('default', function() {
  console.log("default task.")
});

//CSS
gulp.task('scss', function(){
  return gulp.src('css/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('css/build'));
})