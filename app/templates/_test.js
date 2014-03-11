// The following code requires casper 1.1 after the following commit
// https://github.com/n1k0/casperjs/commit/2378537a716a492533a279b8e3bc560ae3deca5a

/* exported Dictionary, English */

var fs = require('fs');
var async = require('async');
var Yadda = require('yadda');
var feature = casper.cli.get('feature');

var Dictionary = Yadda.Dictionary;
var English = Yadda.localisation.English;

function requireLibrary(libraries, library) {
    return libraries.concat(require('./definitions/' + library).init());
}

function requireLibraries() {
    return fs.readdirSync('./definitions/').reduce(requireLibrary, []);
}

var parser = new Yadda.parsers.FeatureParser();
var yadda = new Yadda.Yadda(requireLibraries());
Yadda.plugins.casper(yadda, casper);

function casperTest(file) {
    var feature = parser.parse(fs.read(file));

    casper.test.begin(feature.title, function suite() {
        async.eachSeries(feature.scenarios, function (scenario, next) {
            casper.start();
            casper.echo('-- Scenario: ' + scenario.title + ' --', 'INFO_BAR');
            casper.yadda(scenario.steps);
            casper.run(function () {
                next();
            });
        }, function (err) {

            if (err) {
                console.log(err);
            }

            casper.test.done();
        });
    });
}

if (feature) {
    casperTest(feature);
} else {
    new Yadda.FeatureFileSearch('features').each(casperTest);
}
