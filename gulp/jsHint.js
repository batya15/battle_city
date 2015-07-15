var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var config = require('./config.json');
var jscs = require('gulp-jscs');
var stylishjscs = require('gulp-jscs-stylish');

module.exports = function(gulp) {
    gulp.task('jsHint', function () {
        return gulp.src(config.path.jsHint)
            .pipe(jscs())
            .on('error', function () {
            }) // don't stop on error
            .pipe(stylishjscs())
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .on('error', function (error) {
                console.error(String(error));
            });
    });
};