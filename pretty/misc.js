var _ = require('underscore'),
    util = require('util'),
    assert = require('assert');
var base = require('./base.js');

var createClass = exports.createClass = function(superCtor, ctor, methods) {
    assert(util.isFunction(superCtor));
    assert(ctor == null || util.isFunction(ctor));
    assert(util.isObject(methods));

    if (!ctor) {
        ctor = function() {
            superCtor.call(this);
        };
    }

    util.inherits(ctor, superCtor);
    _.each(methods, function(method, name) {
        ctor.prototype[name] = method;
    });
    return ctor;
};

var filterObject = exports.filterObject = function(obj, predicate) {
    var results = {};
    _.each(obj, function(value, key, obj) {
      if (predicate(value, key, obj)) results[key] = value;
    });
    return results;
};

// 随机返回输入的参数之一
function randomSelect() {
    assert(arguments.length > 0);
    return arguments[_.random(0, arguments.length-1)];
}

module.exports = {createClass, filterObject, randomSelect};