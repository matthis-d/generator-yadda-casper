/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('casper-yadda generator', function () {

    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('casper-yadda:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.editorconfig',
            '.gitignore',
            'package.json',
            'test.js',
            'yadda.sh',
            'README.md',
            'Gulpfile.js'
        ];

        helpers.mockPrompt(this.app, {});
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });
});
