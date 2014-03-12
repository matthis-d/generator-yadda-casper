/* global Dictionary, English */

module.exports.init = function () {

    //Define regex used in the feature definitions
    var dictionary = new Dictionary();

    return English.library(dictionary)

        .given('I am on $SITE', function(site) {

            casper.open(site);

            casper.waitForSelector('body', function() {
                casper.test.assertTextExist('Google');
            });
        })

        .when('I search $SEARCH', function (search) {

            casper.fill('form', {
                q: search
            }, true);

            casper.waitForSelector('body', function() {
                casper.test.assertTextExist('Google');
            });
        })

        .then('I should have $NUM results', function (number) {

            casper.test.assertEqual(parseInt(number), parseInt(number));
        });
};