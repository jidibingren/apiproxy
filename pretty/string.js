var util = require('util');
var assert = require('assert');
var base = require('./base.js');

String.prototype.startsWith = function(s) {
    assert(util.isString(s));
    return this.slice(0, s.length) == s;
};

String.prototype.endsWith = function(s) {
    assert(util.isString(s));
    return this.slice(-s.length) == s;
};
