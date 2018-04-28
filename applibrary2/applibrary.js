
var common = require('../common.js');
var randomSelect = common.randomSelect;
var writeJson = common.writeJson;
var url  = require('url');
var random = Math.random();

var fs = require('fs');
var path = require('path');
var baseUrl = 'http://'+common.hostIPv4() + ':5050/';


function round(){
	return Math.round(Math.random()*100);
}

function writeDataCustom(res) {
	var meta = {};
	var dict = {};
	meta['code'] = 0;
	meta['msg'] = '';
	dict['meta'] = meta;
	for( var i = 1; i < arguments.length; i += 2 ){  
        dict[arguments[i]] = arguments[i+1]; 
    } 
    writeJson(res, dict);
}

function writeData(res, data) {
 	writeDataCustom(res, 'data', data);
}

function writeMetaData(res, data) {
	writeDataCustom(res, 'meta', {'code':0,'message':'successed'}, 'data', data);
}

var appInfoMap = {
	tb1:	{
			"appId": "tb1",
	        "appTitle": "百度",
	        "appIcon": "http://fast.scloud.systoon.com/f/TZqpmDXS81VJKJwXHAloFiDufKg4o7IOtvzGPvfnuqAfF.png",
	        "remark": "百度一下",
	        "appUrl": baseUrl+'tb1'+'/manifest.json',
	        "appInfo": '[{\"desc\":\"获取用户信息\",\"level\":1},{\"desc\":\"获取用户token\",\"level\":2}]',
	        "toonEngine": 3,
	        "startUrl": "http://www.baidu.com",
	        "downloadUrl": "",
	        "md5": "",
	        "deployType": 0,
		},
	tb2:	{
			"appId": "tb2",
	        "appTitle": "新浪",
	        "appIcon": "http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png",
	        "remark": "新浪",
	        "appUrl": baseUrl+'tb2'+'/manifest.json',
	        "appInfo": '[{\"desc\":\"获取用户信息\",\"level\":1},{\"desc\":\"获取用户token\",\"level\":2}]',
	        "toonEngine": 3,
	        "startUrl": "http://sina.cn",
	        "downloadUrl": "",
	        "md5": "",
	        "deployType": 0,
		},
	tb3:	{
			"appId": "tb3",
	        "appTitle": "引擎示例",
	        "appIcon": "http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png",
	        "remark": "应用引擎api调用示例",
	        "appUrl": baseUrl+'tb3'+'/manifest.json',
	        "appInfo": '[{\"desc\":\"获取用户信息\",\"level\":1},{\"desc\":\"获取用户token\",\"level\":2}]',
	        "toonEngine": 3,
	        "startUrl": "http://p100toongine.systoon.com",
	        "downloadUrl": "",
	        "md5": "",
	        "deployType": 0,
		},
	tb4:	{
			"appId": "tb4",
	        "appTitle": "活动",
	        "appIcon": "http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png",
	        "remark": "你你你-2",
	        "appUrl": baseUrl+'tb4'+'/manifest.json',
	        "appInfo": '[{\"desc\":\"获取用户信息\",\"level\":1},{\"desc\":\"获取用户token\",\"level\":2}]',
	        "toonEngine": 3,
			"startUrl":"/src/index.html",
			"downloadUrl":"http://p100activities.toon.mobi/716.zip",
			"md5":"3540ebc6f309a4e11bcde6e0e0cb8675",
			"deployType": 1,
		},
};


var specialPaths = {
    '/applib/app/queryAppList': function(req, res) {
    	// console.log(req)
    	// return;
        var queryParams = common.parseQueryParams(req);
        var exclusiveAppIds = queryParams['exclusive'];
        var toonEngine = queryParams['toonEngine'];
        var apps = [];
        for (var item in appInfoMap) {
        	if (!exclusiveAppIds || exclusiveAppIds.indexOf(item) < 0) {
        		apps.push(appInfoMap[item]);
        	}
        }
     //    appInfoMap.keys.forEach(function (item){
     //    	if (exclusiveAppIds.contains(item) == false) {
     //    		apps.append(appInfoMap[item]);
     //    	}
    	// });
        writeMetaData(res, {
        	data:apps,
        	count:apps.length
        });
    },
};


module.exports = function init(app){
    var bodyParser = require('body-parser');
    var multer = require('multer'); 
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(multer()); // for parsing multipart/form-data
    
    for (var item in specialPaths){
    	app.all(item, function (req, res){
            if (specialPaths[item] != undefined) {
                specialPaths[item](req, res);
            } 
        });
    }

	app.all('/:appid/manifest.json', function (req, res){
		var appId = req.params.appid
		var appInfo = appInfoMap[appId];
		var appStatus = appId == "tb2"
		var navStatus = appId == "tb2"
		var rotation = appId == "tb2"
	    if (appInfoMap[appId+'handler'] == undefined) {
	        common.writeJson(res,{
	        	"appId": appInfo['appId'],
				"name": appInfo['title'],
				"version": 3,
				"appIcon": appInfo['appIcon'],
				"description": appInfo['remark'],
				"startUrl": appInfo['startUrl'],
				"downloadUrl": appInfo['downloadUrl'],
				"md5": appInfo['md5'],
				"deployType": appInfo['deployType'],
				"minVersionCode": {
					"ios": 1,
					"android": 1
				},
				"authApiInfo":{
					"action_user_getUserInfo": 1,
					"action_user_getUserToken": 1,
				},
				"authApiLevel":1,
				"status":appStatus,
				"navHidden":navStatus,
				"rotation":rotation
	        });
	    } else {
	        item.handler(req, res);
	    }
	});
};