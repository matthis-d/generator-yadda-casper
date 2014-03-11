'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var CasperYaddaGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('You\'re using the fantastic CasperYaddaGenerator generator.'));

        var prompts = [];

        this.prompt(prompts, function (props) {
            this.projectName = props.projectName;

            done();
        }.bind(this));
    },

    app: function () {
        this.mkdir('definitions');
        this.mkdir('features');

        this.copy('_package.json', 'package.json');
        this.copy('_test.js', 'test.js');
        this.copy('_yadda.sh', 'yadda.sh');
        this.copy('_README.md', 'README.md');
    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('gitignore', '.gitignore');
    }
});

module.exports = CasperYaddaGenerator;