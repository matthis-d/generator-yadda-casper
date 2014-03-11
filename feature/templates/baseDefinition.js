/* global Dictionary, English */

module.exports.init = function () {

    //Define regex used in the feature definitions
    var dictionary = new Dictionary();

    return English.library(dictionary)

        .given('I am on $SITE', function(site) {

            casper.open(site);
        })

        .when('I click on $LABEL', function (labelTitle) {

            casper.clickLabel(labelTitle);
        })

        .then('I should have $NUM results', function (number) {

            casper.test.assertEqual(parseInt(number), parseInt(number));
        });
};