var http = require('http'),
    httpProxy = require('http-proxy');
var express   = require('express');

var url = require('url');
var _ = require('underscore');
var assert = require('assert');
var common = require('./common.js');
// var specialPaths = require('./specialPaths.js');
var specialPaths = {
    0 : require('./test.js'),
    1 : require('./pathsCheezu.js'),
    2 : require('./pathsCarShop.js'),
    3 : require('./pathsHSChannel.js'),
};

// Create Server
var server = require('express')(), app = server;

var proxy = httpProxy.createProxyServer({});

var serverOptions = {};

var appCode;

function apiProxy() {
  return function(req, res, next) {
    console.log("req.path", req.path);
    if(!specialPaths[appCode][req.path]) {
      proxy.proxyRequest(req, res, {target:serverOptions.target});
    } else {
      next();
    }
  }
}

app.use(apiProxy());

// Make it parse body
// http://expressjs.com/4x/api.html#req
var bodyParser = require('body-parser');
var multer = require('multer'); 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.all('*', function(req, res) {
    console.log("handle special path", req.path);
    specialPaths[appCode][req.path](req, res);
});

module.exports = {server, proxy, serverOptions};

if (require.main == module) {
    var address = process.argv[2];
    if (address == undefined) {
        console.log('请输入代理的ip地址或域名');
        return;
    };
    appCode = process.argv[3];
    if (appCode == undefined) {
        console.log('node proxy.js ip/domain 应用代号');
        console.log('应用代号：\n'+
                    '    0 test\n'+
                    '    1 代表车e族\n'+
                    '    2 代表我有一辆车\n'+
                    '    3 代表我有HSChannel\n');
        return;
    };
    if (!address.startsWith('http://') && !address.startsWith('https://')) {
        address = 'http://'+address;
    }
    serverOptions.target = address;

    proxy.on('error', function(e) {
        console.error("proxy error", e);
    });

    console.log("listening on port 5050")
    server.listen(5050);
}
