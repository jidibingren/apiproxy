var _ = require('underscore'),
    util = require('util'),
    assert = require('assert');

var base = require('./base.js');

var createTester = function(module) {
    // autoDone optional
    return function(name, func, autoDone) {
        autoDone = optional(autoDone, true);
        module.exports['test_'+name] = function(assert) {
            func(assert);
            assert.ok(true);
            if (autoDone)
                assert.done();
        }
    }
};

var runTests = function(exports) {
    _.each(exports, function(value, name) {
        assert(util.isString(name), name+' is not a string');
        if (name.startsWith('test')) {
            console.log('Run '+name);
            var test = _.extend(assert, {
                done :function(){}
            });
            value(test);
        }
    })
};

module.exports = {createTester, runTests};
