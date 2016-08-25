
var pretty = require('../all.js');
var test = pretty.createTester(module);
var _ = require('underscore');

test("exports", function(assert) {
    assert.ok(optional);
});

test("optional", function(assert) {
    assert.deepEqual(1, optional(undefined, 1))
    assert.deepEqual(null, optional(null, 1))
    assert.deepEqual(0, pretty.optional(0, 1))
});


// test("testRunTests", function(assert) {
//     pretty.runTests(pretty.filterObject(module.exports, function(value, key) {
//         return key.indexOf('testRunTests') < 0;
//     }));
// });