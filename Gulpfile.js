var gulp = require('gulp');
var git = require('gulp-git');
var bump = require('gulp-bump');

gulp.task('bump', function () {

    return gulp.src(['./package.json'])
        .pipe(bump())
        .pipe(gulp.dest('./'));

});

gulp.task('tag', ['bump'], function () {

    var pkg = require('./package.json');
    var v = 'v' + pkg.version;
    var message = 'Release ' + v;

    gulp.src('./')
        .pipe(git.commit(message));

    git.tag(v, message);
    git.push('origin', 'master', '--tags');
});

gulp.task('npm', ['tag'], function (done) {
    require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
        .on('close', done);
});

gulp.task('release', ['npm']);
