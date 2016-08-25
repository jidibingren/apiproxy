
var url = require('url');
var _ = require('underscore');
var assert = require('assert');
var queryString = require('./node_modules/querystring/');

_.extendOwn(module.exports, require('./pretty/'));

// @res http.ServerResponse
function writeJson(res, object) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(object, null, 2));
}

function writeData(res, data) {
    writeJson(res, {
                "data": data,
                "status": "0",
                "code": "00000",
                "msg": ""
            });
}

function parseQueryParams(req){
    // console.log("req.query", req.query);
    // console.log("req.body", req.body);
    // console.log("req.params", req.params);
    var params = _.extendOwn({}, req.query);
    _.extendOwn(params, req.body);
    return params;
}

_.extendOwn(module.exports, {writeJson, writeData, parseQueryParams});