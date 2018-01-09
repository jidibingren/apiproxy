
var url = require('url');
var _ = require('underscore');
var assert = require('assert');
var queryString = require('./node_modules/querystring/');
var os = require('os');

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
    return _.extendOwn(params, req.body);
    
}

function hostIPv4() {
    var ipv4;
    var ips = [];
    if(process.platform === 'darwin') {
        var ifaces=os.networkInterfaces();  
        for (var dev in ifaces) {  
          var alias=0;  
          ifaces[dev].forEach(function(details){  
            if (details.family=='IPv4' && details.address!='127.0.0.1') {
              ips.push(details.address);
              console.log(details.address);
            }  
          });
        }
        ipv4 = ips[0];
    } else if(process.platform === 'win32') {
        for(var i = 0; i < os.networkInterfaces()['本地连接'].length; i++) {
            if(os.networkInterfaces()['本地连接'][i].family == 'IPv4') {
                ipv4 = os.networkInterfaces()['本地连接'][i].address;

            }
        }
    }
    return ipv4;
}

_.extendOwn(module.exports, {writeResponse, writeJson, writeData, writeText, writeXml, writeBase64, writeJavaScript, writeXWWWFormUrlEncode, writeOctetStream, writeError, parseQueryParams, hostIPv4});

