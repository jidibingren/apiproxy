
var ObjectMap = require('../ObjectMap.js').ObjectMap;
var testutils = require('../testutils.js');
var test = testutils.createTester(module);

test('ObjectMap', function(assert) {
    var o = new ObjectMap();
    assert.deepEqual([], o.keys());
    assert.deepEqual([], o.values());
    assert.deepEqual([], o.entries());
    assert.deepEqual(0, o.size());
    assert.deepEqual(false, o.containsKey({}));
    assert.deepEqual(undefined, o.get({}));

    var key1 = {}, key2 = {};
    o.put(key1, 1);
    assert.ok(key1.__hashtableId);
    o.put(key2, 2);
    assert.deepEqual(1, o.get(key1));
    assert.deepEqual(2, o.get(key2));
    assert.deepEqual(undefined, o.get({}));

    assert.deepEqual(2, o.size());
    assert.deepEqual([key1, key2], o.keys());
    assert.deepEqual([1, 2], o.values());
    assert.deepEqual([[key1, 1], [key2, 2]], o.entries());
});
