var common = require('./common.js');
var randomSelect = common.randomSelect;
var writeJson = common.writeJson;
var url  = require('url');
var random = Math.random();
var fs = require('fs');
var path = require('path');

var methodsInfo = [
    {
        name: 'get',
    },
    {
        name: 'head',
    },
    {
        name: 'post',
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

