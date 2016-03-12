'use strict';

const
    gulp = require('gulp'),
    jshint = require('gulp-jshint');

function lint() {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
}

gulp.task('lint', lint);

gulp.task('default', lint);
