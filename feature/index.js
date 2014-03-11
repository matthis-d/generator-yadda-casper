'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var FeatureGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('Generate feature and definition file for you. \n');
  },

  files: function () {
    this.copy('baseFeature.feature', 'features/' + this._.slugify(this.name) + '.feature');
    this.copy('baseDefinition.js', 'definitions/' + this._.slugify(this.name) + '.js');
  }
});

module.exports = FeatureGenerator;