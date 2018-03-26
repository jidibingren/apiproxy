var http = require('http'),
    httpProxy = require('http-proxy'),
    net = require('net'),
    os = require('os');
var common = require('./common');
var proxyhttps = require('./proxyhttps');
var express   = require('express');
var url = require('url');
var specialPaths = {
    0 : require('./test.js'),
    1 : require('./pathsCheezu.js'),
    2 : require('./pathsCarShop.js'),
    3 : require('./pathsHSChannel.js'),
    4 : require('./applibrary.js'),
    1000 : require('./toongine.js'),
    1001 : require('./applibrary2/applibrary.js'),
};

// Create Server
var app = require('express')();
var server = require('http').Server(app);
var proxy = httpProxy.createProxyServer({});

var serverOptions = {};

var appCode;

function apiProxy() {
  return function(req, res, next) {
    if(!specialPaths[appCode][req.path]) {
        var urlObj = url.parse(req.url);
        // var target = urlObj.protocol + "//" + urlObj.host + req.path;
        var target = urlObj.protocol + "//" + urlObj.host;
        console.log("Proxy HTTP request for:", target + req.path);
        // proxy.proxyRequest(req, res, {target:target});
        proxy.web(req, res, {target:target});
    } else {
      next();
    }
  }
}

var bodyParser = require('body-parser');
var multer = require('multer'); 
function generalSet(app,specialPaths){
    app.use(apiProxy());
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(multer()); // for parsing multipart/form-data
    app.all('*', function(req, res) {
        console.log("handle special path", req.path);
        specialPaths[appCode][req.path](req, res);
    });
}



module.exports = {server, proxy, serverOptions};

if (require.main == module) {
    console.log(common.hostIPv4());
    appCode = process.argv[2];
    if (appCode == undefined) {
        console.log('node proxy.js ip/domain 应用代号');
        console.log('应用代号：\n'+
                    '    0 test\n'+
                    '    1 代表车e族\n'+
                    '    2 代表我有一辆车\n'+
                    '    3 代表HSChannel\n'+
                    '    4 代表applibrary\n'+
                    '    1000 代表toongine\n');
        return;
    };

    if (appCode < 1000) {
        generalSet(app, specialPaths);
    } else {
        specialPaths[appCode](app);
    }

    proxy.on('error', function(e) {
        console.error("proxy error", e);
    });

    console.log("listening on port 5050")
    server.listen(5050);
    proxyhttps(server);
}
