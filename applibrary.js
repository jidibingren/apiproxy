
var common = require('./common.js');
var randomSelect = common.randomSelect;
var writeJson = common.writeJson;
var url  = require('url');
var random = Math.random();

var fs = require('fs');
var path = require('path');

function round(){
	return Math.round(Math.random()*100);
}

function writeDataCustom(res) {
	var dict = {};
	dict['code'] = 0;
	dict['msg'] = '';
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
	1:	{
			'appId':1,
			'appName':'baidu',
			'appIcon':'http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png',
			'remark':'desc for app',
			'appUrl':'https://m.baidu.com',
			'recommend':2,
			'isGroup':false,
			'appType':1,
			'isCustom':false,
			'iconList':['a','a'],
			'sourceScope':'scope',
			"appRegisterId": 27566,
			"userId": 0,
			"feedId": "c_1520042507770196",
			"linkType": 0,
			"registerType": 1,
			"updateUrl": "111?9edf116b62b0f72a55acc393a9adfcb2",
			"deleteUrl": "111?9edf116b62b0f72a55acc393a9adfcb2",
			"objectId": 1520042507770196,
			"objectType": 1,
			"title": "baidu",
			'icon':'http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png',
			'url':'https://m.baidu.com',
		},
	2:	{
			'appId':2,
			'appName':'sina',
			'appIcon':'http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png',
			'remark':'desc for app',
			'appUrl':'https://sina.cn',
			'recommend':2,
			'isGroup':false,
			'appType':2,
			'isCustom':false,
			'iconList':['a','a'],
			'sourceScope':'scope',
			"appRegisterId": 27566,
			"userId": 0,
			"feedId": "c_1520042507770196",
			"linkType": 0,
			"registerType": 1,
			"updateUrl": "111?9edf116b62b0f72a55acc393a9adfcb2",
			"deleteUrl": "111?9edf116b62b0f72a55acc393a9adfcb2",
			"objectId": 1520042507770196,
			"objectType": 1,
			"title": "sina",
			'icon':'http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png',
			'url':'https://sina.cn',
		},
	3:{
			'code':'HC+JgCAYv1uCvkOUIk1BF8hXnSPvyy5Cn/i2xFRLFioxTxmZ+XFrpR83BZlN4rM8qUhPSuTvJiZwcBzp96ztOWf8Uw3+ju8MZLu5DLG6KfozcpwqyxeAguMe9QLfBfvdmjPfUPXFEC90CUEdKOb+elUcoCvJwYDtDQVM773NG3lPZQvp6442r9uxpvsueJtm8mK4IQlR3oHwaULnWygeJrmaFkCPeY0VIdVwWuyLBc/m0DBhluoYPw==',
			'appId':3,
			'appName':'新活动',
			'appIcon':'http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png',
			'remark':'desc for app',
			'appUrl':'/src/index.html',
			'recommend':2,
			'isGroup':false,
			'appType':3,
			'isCustom':false,
			'iconList':['a','a'],
			'sourceScope':'scope',
    		'minToongineVersion':0,
		  	'downloadUrl':'http://p100activities.toon.mobi/716.zip',
		  	'md5':'3540ebc6f309a4e11bcde6e0e0cb8675',
			"appRegisterId": 27566,
			"userId": 0,
			"feedId": "c_1520042507770196",
			"linkType": 0,
			"registerType": 1,
			"updateUrl": "111?9edf116b62b0f72a55acc393a9adfcb2",
			"deleteUrl": "111?9edf116b62b0f72a55acc393a9adfcb2",
			"objectId": 1520042507770196,
			"objectType": 1,
			"title": "新活动",
			'icon':'http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png',
			'url':'/src/index.html',
		},
	716:{
			'code':'HC+JgCAYv1uCvkOUIk1BF8hXnSPvyy5Cn/i2xFRLFioxTxmZ+XFrpR83BZlN4rM8qUhPSuTvJiZwcBzp96ztOWf8Uw3+ju8MZLu5DLG6KfozcpwqyxeAguMe9QLfBfvdmjPfUPXFEC90CUEdKOb+elUcoCvJwYDtDQVM773NG3lPZQvp6442r9uxpvsueJtm8mK4IQlR3oHwaULnWygeJrmaFkCPeY0VIdVwWuyLBc/m0DBhluoYPw==',
			'appId':716,
			'appName':'活动',
			'appIcon':'http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png',
			'remark':'desc for app',
			'appUrl':'/src/index.html',
			'recommend':2,
			'isGroup':false,
			'appType':3,
			'isCustom':false,
			'iconList':['a','a'],
			'sourceScope':'scope',
    		'minToongineVersion':0,
		  	'downloadUrl':'http://p100activities.toon.mobi/716.zip',
		  	'md5':'3540ebc6f309a4e11bcde6e0e0cb8675',
			"appRegisterId": 27566,
			"userId": 0,
			"feedId": "c_1520042507770196",
			"linkType": 0,
			"registerType": 1,
			"updateUrl": "111?9edf116b62b0f72a55acc393a9adfcb2",
			"deleteUrl": "111?9edf116b62b0f72a55acc393a9adfcb2",
			"objectId": 1520042507770196,
			"objectType": 1,
			"title": "活动",
			'icon':'http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png',
			'url':'/src/index.html',
		},
	437:{
		'appType':1,
		"appRegisterId": 27566,
		"userId": 0,
		"appId": 437,
		"feedId": "c_1512722142069869",
		"linkType": 0,
		"registerType": 1,
		"title": "个人应用示例",
		"icon": "http://scloud.toon.mobi/f/zE6pDktIt08G7IUyTK6m6KoldWlom-VBSgmGd3zvlqMfG.png",
		"url": "http://www.baidu.com?key=9edf116b62b0f72a55acc393a9adfcb2",
		"updateUrl": "111?9edf116b62b0f72a55acc393a9adfcb2",
		"deleteUrl": "111?9edf116b62b0f72a55acc393a9adfcb2",
		"objectId": 1512722142069869,
		"objectType": 1
	},
};


var specialPaths = {
    '/user/getNewAppLib': function(req, res) {
        writeData(res, [
        	appInfoMap[1],
        	appInfoMap[2],
        	appInfoMap[3],
        	appInfoMap[716],
        	{
        		'appId':3,
        		'appName':'group',
        		'appIcon':'http://scloud.toon.mobi/f/ox68rNUn8-nOToFzgDTtPf-rkysyxnp1s+d4sE-FrBYfG.png',
        		'remark':'desc for app',
        		'appUrl':'https://m.baidu.com',
        		'isGroup':true,
        		'infoList':[
		        	appInfoMap[1],
		        	appInfoMap[2],
		        	appInfoMap[3],
		        	appInfoMap[716],
		        ],
        	},
        ]);
    },
    '/user/generateCypherTextForOpen': function(req, res) {
        var queryParams = common.parseQueryParams(req);
        var appId = queryParams['appId'];
        var appVersion = queryParams['appVersion'];
        var appInfo = appInfoMap[appId];
        writeData(res, {
        	'code':appInfo['code'],
    		'appId':appId,
    		'url':appInfo['appUrl'],
    		'appType':appInfo['appType'],
    		'version':Number(appVersion)+1,
    		'minToongineVersion':appInfo['minToongineVersion'],
		  	"downloadUrl":appInfo['downloadUrl'],
		  	"md5":appInfo['md5'],
        });
    },
    '/user/newRegisterApp': function(req, res) {
        writeData(res, {
    		'registerId':222222222,
        });
    },
    '/user/getRegisteredApps': function(req, res) {
        writeMetaData(res, [
		        	appInfoMap[1],
		        	appInfoMap[2],
		        	appInfoMap[3],
		        	appInfoMap[716],
		        	appInfoMap[437],
        	]
        );
    },
};

module.exports = specialPaths;