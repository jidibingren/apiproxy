var _ = require('underscore'),
    util = require('util'),
    assert = require('assert');

var optional = global.optional = function(arg, defaultValue) {
    return util.isUndefined(arg) ? defaultValue : arg;
};

var extendPrototype = global.extendPrototype = function(ctor, name, value) {
    Object.defineProperty(ctor.prototype, name, {
        value:value,
        enumerable:false,
        writable:true,
    });
}

var combineModules = function(module) {
    for(var i = 1; i < arguments.length; i++) {
        _.extendOwn(module.exports, require(arguments[i]));
    }
};

module.exports = {optional, extendPrototype, combineModules};
