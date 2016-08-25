
var pretty = require('../all.js');
var testutils = require('../testutils.js');
var test = testutils.createTester(module);

test('startsWith', function(assert) {
    assert.ok('123'.startsWith('12'));
    assert.ok(!'123'.startsWith('23'));
});

test('endswith', function(assert) {
    assert.ok('123'.endsWith('23'));
    assert.ok(!'123'.endsWith('12'));
});