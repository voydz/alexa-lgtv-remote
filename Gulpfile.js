const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const merge = require('merge-stream');
const nodemon = require('nodemon');

gulp.task('lint', () => {
    return gulp.src(['**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', ['lint'], () => {
    var src = gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/src'));

    var bin = gulp.src('bin/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/bin'));

    var index = gulp.src('index.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/'));

    return merge(src, bin, index);
});

gulp.task('watch', function () {
    return gulp.watch([
        'index.js',
        'bin/**/*.js',
        'src/**/*.js',
    ], ['build']);
});

gulp.task('serve', ['watch'], function () {
    return nodemon({
        script: 'dist/index.js',
    });
});
