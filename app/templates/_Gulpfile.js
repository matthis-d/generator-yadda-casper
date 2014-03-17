var gulp = require('gulp');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var u = require('underscore');
var unimplementedSteps = [];

function generateMissingStep(step) {

    //Define regex of each case
    var given = '(?:[Gg]iven|[Ww]ith|[Aa]nd|[Bb]ut|[Ee]xcept)',
        when = '(?:[Ww]hen|[Ii]f|[Aa]nd|[Bb]ut)',
        then = '(?:[Tt]hen|[Ee]xpect|[Aa]nd|[Bb]ut)',
        stepCase = '',
        caseLength = 0,
        stepContent = '';

    //If it is a "Given" step or associate
    //This can also be a "When" or "Then" step but we cannot check it
    if (step.match(given)) {

        stepCase = step.match(given)[0];
        caseLength = stepCase.length;
        stepContent = step.slice(caseLength);

        return 'given(\'' + stepContent.trim() + '\', function() {});';

    } else if (step.match(when)) {
        //This is a "When" step or associate
        //This can also be a "Then" step but we cannot check it

        stepCase = step.match(when)[0];
        caseLength = stepCase.length;
        stepContent = step.slice(caseLength);

        return 'when(\'' + stepContent.trim() + '\', function() {});';

    } else {
        //This is a "Then" step or associate

        stepCase = step.match(then)[0];
        caseLength = stepCase.length;
        stepContent = step.slice(caseLength);

        return 'then(\'' + stepContent.trim() + '\', function() {});';
    }

}

function doTests(casperChild, done) {

    //The casper log for unimplemented step follow this regex
    var stepRegex = /^(([Gg]iven|[Ww]ith|[Aa]nd|[Bb]ut|[Ee]xcept|[Ww]hen|[Ii]f|[Aa]nd|[Bb]ut|[Tt]hen|[Ee]xpect|[Aa]nd|[Bb]ut) (.+)) <-- Undefined Step$/;

    //When casper has somethin to log
    casperChild.stdout.on('data', function (data) {

        //Convert the data in string and split it to get each line of log.
        var dataString = data.toString(),
            strings = dataString.split('\n');

        u.each(strings, function(line) {

            //We check on each line if it says a step is missing
            if (line.match(stepRegex)) {

                //In this case, get the not implemented step
                var unimplementedStep = line.match(stepRegex)[1];

                //Add it to the array of unimplented steps
                unimplementedSteps.push(unimplementedStep.trim());
            }
        });

        //Log the data anyway
        gutil.log('CasperJS:', dataString.slice(0, -1)); // Remove \n
    });

    //Once the test is finished
    casperChild.on('close', function (code) {
        var success = code === 0; // Will be 1 in the event of failure

        //If there are some undefined steps
        if (unimplementedSteps.length > 0) {

            //Reduce the array to unique values (uses underscore)
            unimplementedSteps = u.uniq(unimplementedSteps);

            //Then log each function that should be created
            gutil.log('WARN: There were unimplemented steps, here is the code you should write');
            u.each(unimplementedSteps, function(step) {

                var method = generateMissingStep(step);
                gutil.log(method);
            });
        }

        //Reset the array
        unimplementedSteps = [];

        //If the callback "done" was given as a parameter
        if (done) {

            //Do the callback
            done();
        }
    });
}

//Task to test all cases at once
gulp.task('test-all', function (done) {
    var tests = ['test.js'];

    var casperChild = spawn('casperjs', ['test'].concat(tests));

    doTests(casperChild, done);


});

//Do a watch on all features and definitions files
gulp.task('watch-all', function() {

    gulp.watch(['./definitions/*.js', './features/*.feature'], ['test-all']);
});

//Watch on only changed features files and execute tests only on this file
gulp.task('watch', function() {

    gulp.watch(['./features/*.feature'], function(file) {

        var filePath = file.path;

        var casperChild = spawn('node_modules/casperjs/bin/casperjs', ['test', '--feature=' + filePath, './test.js']);

        doTests(casperChild);
    });
});
