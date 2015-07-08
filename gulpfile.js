var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var sources = 'stackframe.js';
var minified = sources.replace('.js', '.min.js');
var sourceMap = sources.replace('.js', '.js.map');
var specs = './spec/*-spec.js';

gulp.task('lint', function() {
    return gulp.src(sources)
        .pipe(jshint())
        .pipe(jshint.reporter('checkstyle'));
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('test-ci', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.ci.js',
        singleRun: true
    }, done);
});

gulp.task('copy', function () {
    var app = gulp.src(sources)
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
    return gulp.src(sources)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(minified))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('default', ['clean'], function (cb) {
    runSequence('lint', ['copy', 'compress'], cb);
});
