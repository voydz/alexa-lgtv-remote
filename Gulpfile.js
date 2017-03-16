const gulp = require('gulp');
const babel = require('gulp-babel');
const merge = require('merge-stream');

gulp.task('build', () => {
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
