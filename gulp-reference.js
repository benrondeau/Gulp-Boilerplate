// Gulp has 4 apis: task, src, watch, ?dest?

/* gulp.task */
gulp.task('name', [tasks run prior to this task], function(){});

/* gulp.src */
gulp.src('files', [options]);

/* gulp.dest */
gulp.dest('destination', [options]);

/* gulp.watch */
gulp.watch('files', [tasks to run when files change], optional callback fn);