var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');


gulp.task('sass', function() {
    return gulp.src('./media/src/scss/app.scss')
        .pipe(sass().on("error", notify.onError(function (error) {
            return "Error compiling SCSS: " + error.message;
        })))
        .pipe(gulp.dest('./media/css'))
        .pipe(notify({ message: 'Successfully compiled SCSS' }));
});




gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('media/src/scss/**/*.scss', ['sass']);

});



