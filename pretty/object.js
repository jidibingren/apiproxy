var _ = require('underscore');
var base = require('./base.js');

extendPrototype(Object, 'size', function() {
    return _.size(this);
});

extendPrototype(Object, 'getAt', function(index) {
    return _.values(this)[index];
});

extendPrototype(Object, 'containsKey', function(key) {
    return _.has(this, key);
});