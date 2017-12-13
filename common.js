
var url = require('url');
var _ = require('underscore');
var assert = require('assert');
var queryString = require('./node_modules/querystring/');

_.extendOwn(module.exports, require('./pretty/'));

// @res http.ServerResponse
function writeResponse(res, code, headers, body) {
    res.writeHead(code, {'Content-Type': 'application/json'});
    res.end(body);
}

function writeJson(res, object) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(object, null, 2));
}

function writeText(res, object) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(object);
}

function writeXml(res, object) {
    res.writeHead(200, {'Content-Type': 'application/xml'});
    res.end(object);
}

function writeBase64(res, object) {
    res.writeHead(200, {'Content-Type': 'application/base64'});
    res.end(object);
}

function writeJavaScript(res, object) {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.end(object);
}

function writeXWWWFormUrlEncode(res, object) {
    res.writeHead(200, {'Content-Type': 'application/x-www-form-urlencoded'});
    res.end(object);
}

function writeOctetStream(res, object) {
    res.writeHead(200, {'Content-Type': 'application/octet-stream'});
    res.end(object);
}

function writeData(res, data) {
    writeJson(res, {
                "data": data,
                "status": "0",
                "code": "00000",
                "msg": ""
            });
}

function writeError(res, errno, object) {
    res.writeHead(errno, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(object, null, 2));
}

function parseQueryParams(req){
    // console.log("req.query", req.query);
    // console.log("req.body", req.body);
    // console.log("req.params", req.params);
    var params = _.extendOwn({}, req.query);
    _.extendOwn(params, req.body);
    return params;
}

_.extendOwn(module.exports, {writeResponse, writeJson, writeData, writeText, writeXml, writeBase64, writeJavaScript, writeXWWWFormUrlEncode, writeOctetStream, writeError, parseQueryParams});

