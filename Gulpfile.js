var gulp = require('gulp');
var git = require('gulp-git');
var bump = require('gulp-bump');
var exec = require('gulp-exec');

gulp.task('bump', function () {

    return gulp.src(['./package.json'])
        .pipe(bump())
        .pipe(gulp.dest('./'));

});

gulp.task('tag', ['bump'], function () {

    var pkg = require('./package.json');
    var message = 'Release ' + pkg.version;

    gulp.src('./')
        .pipe(git.commit(message));

    git.tag(pkg.version, message);
    git.push('origin', 'master', '--tags');
});

gulp.task('npm', ['tag'], function () {

    var version = require('./package.json').version;

    var options = {
        silent: false,
        version: version
    };

    gulp.src('./')
        .pipe(exec('npm publish --tag <%= options.version %>', options));
});

gulp.task('release', ['npm']);
