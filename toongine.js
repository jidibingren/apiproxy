var common = require('./common.js');
var randomSelect = common.randomSelect;
var writeJson = common.writeJson;
var url  = require('url');
var random = Math.random();
var fs = require('fs');
var path = require('path');
var responseInfo = {
    'json':{
        data:{
            code:0,
            msg:'successed',
            data:'json'
        },
        handler:common.writeJson
    },
    'text':{
        data:'text',
        handler:common.writeText
    },
    'js':{
        data:"function(){alert('javascript');}",
        handler:common.writeJavaScript
    },
    'xml': {
        data:"<?xml version=\"1.0\" encoding=\"UTF-8\" ?>"
           + "<root>"
               + "<ucAccount>"
                + "zkf48267"
               + "</ucAccount>"
               + "<passWord>"
                + "zkf48267"
               + "</passWord>"
           + "</root>",
        handler:common.writeXml
    },
    'base64':{
        data:'data:image/png;base64,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',
        handler:common.writeBase64
    }
};

function responseHandler(req, res){
    console.log(req);
    var queryParams = common.parseQueryParams(req);
    var username = queryParams['dataType'];
    var handler = responseInfo[username]['handler'];
    if (typeof handler == 'function') {
        handler(res, responseInfo[username]['data']);
    } else {
        common.writeError(res, 500, {code:-1, msg:'server error'});
    }  
}

var methodsInfo = [
    {
        name: 'get',
        handler: responseHandler
    },
    {
        name: 'head',
    },
    {
        name: 'post',
        handler: responseHandler
    },
    {
        name: 'put',
    },
    {
        name: 'delete',
    },
    {
        name: 'options',
    },
    {
        name: 'trace',
        handler: function(req, res){
            writeData(res, requestCache);
        }
    },
];

var requestCache = [];

function writeDataCustom(res) {
    var dict = {};
    dict['code'] = '0';
    dict['msg'] = 'successed';
    for( var i = 1; i < arguments.length; i += 2 ){  
        dict[arguments[i]] = arguments[i+1]; 
    } 
    writeJson(res, dict);
}

function writeData(res, data) {
    writeDataCustom(res, 'data', data);
}

module.exports = function init(app){
    methodsInfo.forEach(function (item){
        app[item.name]('/toongine/request/'+item.name, function (req, res){
            requestCache.push(req.route['path']);
            if (item['handler'] == undefined) {
                writeData(res, item.name);
            } else {
                item.handler(req, res);
            }
        });
    });
};

