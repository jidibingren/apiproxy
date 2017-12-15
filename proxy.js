var http = require('http'),
    httpProxy = require('http-proxy'),
    net = require('net'),
    os = require('os');
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
    4 : require('./applibrary.js'),
    1000 : require('./toongine.js'),
};

// Create Server
var app = require('express')();
var server = require('http').Server(app);
var proxy = httpProxy.createProxyServer({});

var serverOptions = {};

var appCode;

function hostIp() {
    var IPv4;
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
        IPv4 = ips[0];
    } else if(process.platform === 'win32') {
        for(var i = 0; i < os.networkInterfaces()['本地连接'].length; i++) {
            if(os.networkInterfaces()['本地连接'][i].family == 'IPv4') {
                IPv4 = os.networkInterfaces()['本地连接'][i].address;

            }
        }
    }
    return IPv4;
}

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

        var queryParams;
        if (req['method'] == 'GET') {
            // queryParams = common.parseQueryParams(req);
        } else if (req['method'] == 'POST') {
            queryParams = common.parseQueryParams(req);
            console.log(queryParams);
        }
        console.log("handle special path", req.path);
        specialPaths[appCode][req.path](req, res);
    });
}

var regex_hostport = /^([^:]+)(:([0-9]+))?$/;
var getHostPortFromString = function (hostString, defaultPort) {
  var host = hostString;
  var port = defaultPort;
  var result = regex_hostport.exec(hostString);
  if (result != null) {
    host = result[1];
    if (result[2] != null) {
      port = result[3];
    }
  }

  return ( [host, port] );
};

function proxyhttps(){
    server.addListener('connect', function (req, socket, bodyhead) {
      var hostPort = getHostPortFromString(req.url, 443);
      var hostDomain = hostPort[0];
      var port = parseInt(hostPort[1]);
      console.log("Proxying HTTPS request for:", hostDomain, port);

      var proxySocket = new net.Socket();
      proxySocket.connect(port, hostDomain, function () {
          proxySocket.write(bodyhead);
          socket.write("HTTP/" + req.httpVersion + " 200 Connection established\r\n\r\n");
        }
      );

      proxySocket.on('data', function (chunk) {
        socket.write(chunk);
      });

      proxySocket.on('end', function () {
        socket.end();
      });

      proxySocket.on('error', function () {
        socket.write("HTTP/" + req.httpVersion + " 500 Connection error\r\n\r\n");
        socket.end();
      });

      socket.on('data', function (chunk) {
        proxySocket.write(chunk);
      });

      socket.on('end', function () {
        proxySocket.end();
      });

      socket.on('error', function () {
        console.log("socket HTTPS error", hostDomain, port);
        proxySocket.end();
      });

    });
}

module.exports = {server, proxy, serverOptions};

if (require.main == module) {
    var address = hostIp();
    console.log(address);
    if (address == undefined) {
        console.log('请输入代理的ip地址或域名');
        return;
    };
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

    if (!address.startsWith('http://') && !address.startsWith('https://')) {
        address = 'http://'+address;
    }
    serverOptions.target = address;

    proxy.on('error', function(e) {
        console.error("proxy error", e);
    });

    console.log("listening on port 5050")
    server.listen(5050);
    proxyhttps();
}
