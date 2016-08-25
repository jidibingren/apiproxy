
var base = require('./base.js');
var assert = require('assert');
var util = require('util');
var _ = require('underscore');

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

Array.prototype.last = function() {
    return this[this.length-1]
}

Array.prototype.clone = function() {
    return this.slice();
}

Array.prototype.contains = function(e) {
    return this.indexOf(e) >= 0;
}

Array.prototype.removeAt = function(index) {
    this.splice(index, 1);
    return this;
}

Array.prototype.removeRange = function(start, end) {
    end = optional(end, this.length)
    if (end < 0) {
        end = this.length + end;
    }
    this.splice(start, end-start)
    return this;
}

Array.prototype.removeAll = function(elements) {
    assert(util.isArray(elements));
    _.each(elements, function(e){
        var pos = this.indexOf(e, 0);
        while(pos >= 0) {
            this.splice(pos, 1);
            pos = this.indexOf(e, pos+1);
        }
    }.bind(this));
    return this;
}

// optional index
Array.prototype.addAll = function(elements, index) {
    index = optional(index, this.length);
    Array.prototype.splice.bind(this, index, 0).apply(this, elements)
    return this;
}

// 数组乘以一个数字
// [] * n
// [1] * 0 == []
// [1] * 1 == [1]
// [1] * 2 == [1, 1]
Array.prototype.mul = function(n) {
    if (n == 0) {
        this.splice(0, this.length);
        return this;
    }

    if (n > 1) {
        n -= 1;
        var originLength = this.length;
        while (n-- > 0) {
            for (var i = 0; i < originLength; i++) {
                this.push(this[i]);
            }
        }
    }
    return this;
};