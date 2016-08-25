
var array = require('../array.js');
var testutils = require('../testutils.js');
var test = testutils.createTester(module);

test('array', function(assert) {
    assert.deepEqual(3, [1,2,3].max());
    assert.deepEqual(1, [1,2,3].min());
    assert.deepEqual(3, [1,2,3].last());
    assert.deepEqual([1,2,3], [1,2,3].clone());
    assert.deepEqual(true, [1,2,3].contains(1))
    assert.deepEqual(false, [1,2,3].contains(4))
    assert.deepEqual([1,3], [1,2,3].removeAt(1))
    assert.deepEqual([1], [1,2,3].removeRange(1,3))
    assert.deepEqual([1], [1,2,3].removeRange(1))
    assert.deepEqual([2], [1,2,1].removeAll([1]))
    assert.deepEqual([1,2,1,1,4], [1,2,1].addAll([1, 4]))
    assert.deepEqual([1,4,1,2,1], [1,2,1].addAll([1, 4],0))
});