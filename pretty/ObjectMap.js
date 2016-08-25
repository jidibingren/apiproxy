var _ = require('underscore'),
    util = require('util'),
    assert = require('assert');

var misc = require("./misc.js");
var createClass = misc.createClass;

var __uniqueId = 1;
// a map which can accept a object as a key
var ObjectMap = createClass(Object, function () {
    this._values = {};
    this._keys = {};
}, {
    put: function( obj, value ) {
        var id = obj.__hashtableId;
        if (!id) {
            id = obj.__hashtableId = __uniqueId;
            __uniqueId ++;
        }

        this._values[ id ] = value;
        this._keys[ id ] = obj;
    },

    get: function( obj ) {
        var id = obj.__hashtableId;
        if (!id)
            return undefined;
        return this._values[id];
    },

    size: function() {
        return _.size(this._values);
    },

    values: function() {
        return _.values(this._values);
    },

    keys: function() {
        return _.values(this._keys);
    },

    entries: function() {
        return _.map(this._keys, function(obj) {
            return [obj, this.get(obj)]
        }.bind(this));
    },

    containsKey: function(obj) {
        return undefined != this.get(obj);
    }
});

module.exports = { ObjectMap };
