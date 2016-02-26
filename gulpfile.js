var gulp = require('gulp');
var connect = require('gulp-connect');
var through2 = require('through2');
var browserify = require('browserify');
var babel = require('gulp-babel');

gulp.task("babel", function () {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("lib"));
});

gulp.task('scriptsTest', ['babel'], function () {
    return gulp.src('test/src/gremlins-data.js')
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path, {
                debug: false
            })
                .bundle(function (err, res) {
                    // assumes file.contents is a Buffer
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(gulp.dest('./test/specs'));
});

gulp.task('connect', function () {
    connect.server({
        root: ['test'],
        port: 8000,
        livereload: false
    });
});

gulp.task("reload", function () {
    gulp.src('lib/index.js')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./src/index.js', './test/src/*.*'], ['scriptsTest', 'reload']);
});

gulp.task('default', ['connect', 'scriptsTest', 'watch']);