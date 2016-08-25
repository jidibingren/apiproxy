
require('../object.js');
var testutils = require('../testutils.js');
var test = testutils.createTester(module);

test("Object extensions", function(assert) {
    assert.deepEqual(2, {x:1, y:2}.size());
    assert.deepEqual(2, [1,2].size());
    assert.deepEqual(2, [1,2].getAt(1));
    assert.deepEqual(2, {x:1, y:2}.getAt(1));
    assert.deepEqual(true, {x:1, y:2}.containsKey('x'));
    assert.deepEqual(false, {x:1, y:2}.containsKey('something'));
});
