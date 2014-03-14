var gulp = require('gulp');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');

function doTests(casperChild, done) {

    casperChild.stdout.on('data', function (data) {
        gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
    });

    casperChild.on('close', function (code) {
        var success = code === 0; // Will be 1 in the event of failure

        if (done) {
            done();
        }
    });
}

gulp.task('test-all', function (done) {
    var tests = ['test.js'];

    var casperChild = spawn('casperjs', ['test'].concat(tests));

    doTests(casperChild, done);
});

gulp.task('test-feature', function (done) {

    done();

});

gulp.task('watch-all', function() {

    gulp.watch(['./definitions/*.js', './features/*.feature'], ['test-all']);
});

gulp.task('watch', function() {

    gulp.watch(['./features/*.feature'], function(file) {

        var filePath = file.path;

        var casperChild = spawn('node_modules/casperjs/bin/casperjs', ['test', '--feature=' + filePath, './test.js']);

        doTests(casperChild);
    });
});
