
var common = require('./common.js');
var randomSelect = common.randomSelect;
var writeJson = common.writeJson;
var url  = require('url');
var random = Math.random();

var fs = require('fs');
var path = require('path');

var type = 0;
var typeName = [
	'系统通知',
	'校园通知',
	'班级通知',
	'班级动态',
	'班级作业',
];
    
var namesArray = [
    "马云",
	"马化腾",
	"乔布斯",
	"雷军",
	"柳传志",
	"王江民",
	"丁磊",
	"鲍岳桥",
	"李彦宏",
	"张朝阳",
];
    
var textArray = [
	"1.此版本是有史以来Github上最牛逼的高仿微信项目没有之一,采用MVVM和MVC两种开发架构思想,纯代码开发,这是你们在培训机构学不到的.仅供大家学习使用,不得用于商业用途.最终解释权归作者二哥所有.",
	"https://github.com/nacker",
	"2.如果各位下客能帮我点STAR,半个月STAR500+,我会陆陆续续发布待实现功能其实已经做完,一个月STAR1000+我会把微信主要功能全部实现发布出来,两个月STAR2000+我会发布纯Swift版,纯Swift版采用纯代码开发已经做的差不多了.就看大伙的手能不能点STAR了.希望大家不要下完就跑了.作为作者的二哥会很心痛的.",
	"2.如果各位下客能帮我点STAR,半个月STAR500+,我会陆陆续续发布待实现功能其实已经做完,一个月STAR1000+我会把微信主要功能全部实现发布出来,两个月STAR2000+我会发布纯Swift版,纯Swift版采用纯代码开发已经做的差不多了.就看大伙的手能不能点STAR了.希望大家不要下完就跑了.作为作者的二哥会很心痛的.",
	"3.我之前接触过很多项目,就有一个项目中的朋友圈整个控制器4千行,尼玛4千行了这项目怎么迭代,二哥现在300行解决了朋友圈的问题,还在优化中..."
];
    
var commentsArray = [
	"社会主义好！👌👌👌👌",
	"帮二哥点STAR。。。",
	"你好，我好，大家好才是真的好",
	"有意思",
	"你瞅啥？",
	"瞅你咋地？？？！！！",
	"hello，看我",
	"曾经在幽幽暗暗反反复复中追问，才知道平平淡淡从从容容才是真，再回首恍然如梦，再回首我心依旧，只有那不变的长路伴着我",
	"帮二哥点STAR",
	"咯咯哒",
	"呵呵~~~~~~~~",
	"我勒个去，啥世道啊",
	"真有意思啊你"
];
    
var picImageNamesArray = [
	"http://h.hiphotos.baidu.com/image/w%3D2048/sign=e7e477224334970a4773172fa1f2d0c8/50da81cb39dbb6fd1d515a2b0b24ab18972b37b0.jpg",
	"http://d.hiphotos.baidu.com/image/w%3D2048/sign=d0f37d60fa1986184147e8847ed52f73/a1ec08fa513d26973a06f05c57fbb2fb4216d8de.jpg",
	"http://c.hiphotos.baidu.com/image/w%3D2048/sign=a0e078ee552c11dfded1b823571f63d0/eaf81a4c510fd9f91513ea64272dd42a2834a4b3.jpg",
	"http://a.hiphotos.baidu.com/image/w%3D2048/sign=091af36f9a22720e7bcee5fa4ff30b46/5243fbf2b2119313b093a9bd67380cd790238dee.jpg",
	"http://c.hiphotos.baidu.com/image/w%3D2048/sign=d8a403cd1c178a82ce3c78a0c23b728d/63d9f2d3572c11dff36e4622612762d0f703c270.jpg",
	"http://f.hiphotos.baidu.com/image/w%3D2048/sign=93cf6adecc1b9d168ac79d61c7e6b48f/a71ea8d3fd1f41347203fd7f271f95cad1c85eff.jpg",
	"http://a.hiphotos.baidu.com/image/w%3D2048/sign=aa593826bc096b6381195950380b8744/0dd7912397dda1440d2b93bbb0b7d0a20cf4869d.jpg",
	"http://g.hiphotos.baidu.com/image/w%3D2048/sign=6f0576085e6034a829e2bf81ff2b4854/71cf3bc79f3df8dc27207098cf11728b4710289e.jpg",
	"http://c.hiphotos.baidu.com/image/w%3D2048/sign=a0e078ee552c11dfded1b823571f63d0/eaf81a4c510fd9f91513ea64272dd42a2834a4b3.jpg"
];

var iconImageNamesArray =  picImageNamesArray;

function round(){
	return Math.round(Math.random()*100);
}


// function writeData(res, data) {
//     writeJson(res, {
//                 "data": data,
//                 "status": "1",
//                 "code": "00000",
//                 "msg": ""
//             });
// }

function writeDataCustom(res) {
	var dict = {};
	dict['status'] = '1';
	dict['code'] = '00000';
	dict['msg'] = '';
	for( var i = 1; i < arguments.length; i += 2 ){  
        dict[arguments[i]] = arguments[i+1]; 
    } 
    writeJson(res, dict);
}

function writeData(res, data) {
 	writeDataCustom(res, 'data', data);
}

function writeInfo(res, data) {
	writeDataCustom(res, 'info', data);
}


var specialPaths = {
    '/action/user/login/byPassword': function(req, res) {

        var queryParams = common.parseQueryParams(req);
        var username = queryParams['username'];
        writeDataCustom(res, 'info',{
            "username":'张三',
			"name":'test',
			"hxAccount":'jjwl_13370551576',
			"hxPasswd":'684ED7785270E77A99A998F617DE14AF',
			"signPhoto":'http://www.baidu.com',
			"userType":5, 
			"telphone":'15628986551',
			"othTelphone":'',

        },'children',[
        	{
        		"id":12345,
				"name":'zhangsan',
				"jmSchName":'tiantian',
				"jmsClassName":'math',
				"schName":'清华附中',
				"address":'dfadfadfd',
				"grade":'3',
				"tchUsername":'123456',
				"tchName":'lilaoshi',
        	},
        	{
        		"id":12345,
				"name":'zhangsan',
				"jmSchName":'tiantian',
				"jmsClassName":'math',
				"schName":'清华附中',
				"address":'dfadfadfd',
				"grade":'3',
				"tchUsername":'123456',
				"tchName":'lilaoshi',
        	},
        ]);
    },
    '/action/notice/list': function(req, res) {
        writeData(res, [
        	{
        		"id":'123456',
				"type":type,
				"typeName":typeName[type++],
				"title":'托尔斯泰',   //标题  根据不同的类型判断是否显示
				"content":'水电费就爱看的发放及案发时打发发水电费就爱看的发放及案发时打发发水电费就爱看的发放及案发时打发发水电费就爱看的发放及案发时打发发水电费就爱看的发放及案发时打发发打发打发方式方法',  //通知的文字内容
				"images":[{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},],
				"createTim":12345222222,	
				"likeCount":5,
				"replyCount":4,
				"isLike":1,
				"isRead":0, 
				"range":'dddd',
				"fromUser":'张三',
				"fromUsername":'张三',
				"fromUserImage":'http://www.baidu.com',
				"contentType":'dfadfadf',
				"contentId":'dfadfadf',

        	},
        ]);
        
        type %= 5;
    },
    '/action/notice/get': function(req, res) {
        writeInfo(res, {
        		"id":'12345222222',	
				"noticeId":'5',
				"range":'dddd',
				"rangeAll":[
					{
						"name":'dfafd', 
						"username":'dfadfdf',
						"userImage":'http://www.baidu.com',
						"isRead":0,
						"updateTime":12345678,
					},
					{
						"name":'dfafd', 
						"username":'dfadfdf',
						"userImage":'http://www.baidu.com',
						"isRead":1,
						"updateTime":12345678,
					},
					{
						"name":'dfafd', 
						"username":'dfadfdf',
						"userImage":'http://www.baidu.com',
						"isRead":0,
						"updateTime":12345678,
					},
				],
        });
    },
    '/action/contracts/list': function(req, res) {
        writeDataCustom(res, 
        	'classes', [
        		{
        			"username":'1234567',
					"name":'张老师',
					"signPhoto":'http://www.baidu.com',
					"hxAccount":'jjwl_13370555876',
					"telphone":'12345678',
					"className":'一年级三班',
					"classId":123456,
        		},
        		{
        			"username":'1234567',
					"name":'张老师',
					"signPhoto":'http://www.baidu.com',
					"hxAccount":'jjwl_13370555876',
					"telphone":'12345678',
					"className":'一年级三班',
					"classId":123456,
        		},
        	],
        	'teachers', [
        		{
        			"username":'1234567',
					"name":'张老师',
					"signPhoto":'http://www.baidu.com',
					"hxAccount":'jjwl_13370555876',
					"telphone":'12345678',
					"className":'一年级三班',

        		},
        		{
        			"username":'1234567',
					"name":'张老师',
					"signPhoto":'http://www.baidu.com',
					"hxAccount":'jjwl_13370555876',
					"telphone":'12345678',
					"className":'一年级三班',

        		},
        	],
        	'parents', [
        		{
        			"username":'1234567',
					"name":'李四父',
					"signPhoto":'http://www.baidu.com',
					"hxAccount":'jjwl_13330948281',
					"telphone":'12345678',
					"className":'一年级三班',

        		},
        		{
        			"username":'1234567',
					"name":'李四父',
					"signPhoto":'http://www.baidu.com',
					"hxAccount":'jjwl_13330948281',
					"telphone":'12345678',
					"className":'一年级三班',

        		},
        	]
        );
    },
    '/action/school/info/get': function(req, res) {
        writeInfo(res, {
        	"name":'test',
			"images":[
				{
					"imageUrl":'http://www.baidu.com',
					"imageHref":'http://www.baidu.com'
				},
			],
			"schoolDescs":'http://www.baidu.com',
			"address":'dfadfdfsdf',
			"webPages":'http://www.baidu.com',
			"contacts":'zhangsan',
			"contactsNum":'1234567',
			"leaflets":[
				{
					"imageUrl":'http://www.baidu.com',
					"imageHref":'http://www.baidu.com'
				},
				{
					"imageUrl":'http://www.baidu.com',
					"imageHref":'http://www.baidu.com'
				},
				{
					"imageUrl":'http://www.baidu.com',
					"imageHref":'http://www.baidu.com'
				},
			],

        });
    },
    '/action/transCard/list': function(req, res) {
        writeData(res, [
        	{
        		"id":'123456',
				"transCard":'1234567812345678',
				"name":'张三',
				"className":'三年级一班',
        	},
        	{
        		"id":'123456',
				"transCard":'1234567812345678',
				"name":'张三',
				"className":'三年级一班',
        	},
        ]);
    },
    '/action/notice/class/list': function(req, res) {
        writeData(res, [
        	{
        		"id":'123456',
				"type":2,
				"typeName":typeName[2],
				"title":'托尔斯泰',   //标题  根据不同的类型判断是否显示
				"content":textArray[round()%9],  //通知的文字内容
				"images":[{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},],
				"createTim":12345222222,	
				"likeCount":5,
				"replyCount":4,
				"isLike":1,
				"isRead":0, 
				"range":'dddd',
				"fromUser":'张三',
				"fromUsername":'张三',
				"fromUserImage":picImageNamesArray[round()%9],
				"contentType":'dfadfadf',
				"contentId":'dfadfadf',

        	},
        	{
        		"id":'123456',
				"type":2,
				"typeName":typeName[2],
				"title":'托尔斯泰',   //标题  根据不同的类型判断是否显示
				"content":textArray[round()%9],  //通知的文字内容
				"images":[{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},],
				"createTim":12345222222,	
				"likeCount":5,
				"replyCount":4,
				"isLike":1,
				"isRead":0, 
				"range":'dddd',
				"fromUser":'张三',
				"fromUsername":'张三',
				"fromUserImage":picImageNamesArray[round()%9],
				"contentType":'dfadfadf',
				"contentId":'dfadfadf',

        	},
        ]);
        
    },
    '/action/notice/classDynamics/list': function(req, res) {
        writeData(res, [
        	{
        		"id":'123456',
				"type":3,
				"typeName":typeName[3],
				"title":'托尔斯泰',   //标题  根据不同的类型判断是否显示
				"content":textArray[round()%9],  //通知的文字内容
				"images":[{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},],
				"createTim":12345222222,	
				"likeCount":5,
				"replyCount":4,
				"isLike":1,
				"isRead":0, 
				"range":'dddd',
				"fromUser":'张三',
				"fromUsername":'张三',
				"fromUserImage":picImageNamesArray[round()%9],
				"contentType":'dfadfadf',
				"contentId":'dfadfadf',

        	},
        	{
        		"id":'123456',
				"type":3,
				"typeName":typeName[3],
				"title":'托尔斯泰',   //标题  根据不同的类型判断是否显示
				"content":textArray[round()%9],  //通知的文字内容
				"images":[{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},
				{	//通知图片根据不同的类型判断是否显示
					"url":picImageNamesArray[round()%9],		//小图
					"urlB":picImageNamesArray[round()%9],		//大图
				},],
				"createTim":12345222222,	
				"likeCount":5,
				"replyCount":4,
				"isLike":1,
				"isRead":0, 
				"range":'dddd',
				"fromUser":'张三',
				"fromUsername":'张三',
				"fromUserImage":picImageNamesArray[round()%9],
				"contentType":'dfadfadf',
				"contentId":'dfadfadf',

        	},
        ]);
    },
    '/action/notice/reply/get': function(req, res) {
        writeInfo(res, {
        	"noticeId":'124',
			"likeCount":123,
			"replyCount":12345,
			"isLike":0,
			"reply": [
				{
					"id":'1234',
					"level":1,
					"replyId":'1234',
					"name":namesArray[round()%7], 
					"username":namesArray[round()%7],
					"userImage":picImageNamesArray[round()%9],					
					"replyName":namesArray[round()%7], 
					"replyUsername":namesArray[round()%7],
					"replyImage":picImageNamesArray[round()%9],
					"content":commentsArray[round()%12],
					"createTim":123453456,
				},
				{
					"id":'1234',
					"level":2,
					"replyId":'1234',
					"name":namesArray[round()%7], 
					"username":namesArray[round()%7],
					"userImage":picImageNamesArray[round()%9],					
					"replyName":namesArray[round()%7], 
					"replyUsername":namesArray[round()%7],
					"replyImage":picImageNamesArray[round()%9],
					"content":commentsArray[round()%12],
					"createTim":123453456,
				},
				{
					"id":'1234',
					"level":1,
					"replyId":'1234',
					"name":namesArray[round()%7], 
					"username":namesArray[round()%7],
					"userImage":picImageNamesArray[round()%9],					
					"replyName":namesArray[round()%7], 
					"replyUsername":namesArray[round()%7],
					"replyImage":picImageNamesArray[round()%9],
					"content":commentsArray[round()%12],
					"createTim":123453456,
				},
				{
					"id":'1234',
					"level":2,
					"replyId":'1234',
					"name":namesArray[round()%7], 
					"username":namesArray[round()%7],
					"userImage":picImageNamesArray[round()%9],					
					"replyName":namesArray[round()%7], 
					"replyUsername":namesArray[round()%7],
					"replyImage":picImageNamesArray[round()%9],
					"content":commentsArray[round()%12],
					"createTim":123453456,
				},

			],

        });
    },
    '/action/album/list': function(req, res) {
        writeData(res, [
				{
					"id":'1234',
					"images":[
						{
							"url":picImageNamesArray[0],
							"urlB":picImageNamesArray[0],
						},
					],
					"content":commentsArray[round()%12],
					"createTim":123453456,
				},
				{
					"id":'1234',
					"images":[
						{
							"url":picImageNamesArray[0],
							"urlB":picImageNamesArray[0],
						},

						{
							"url":picImageNamesArray[1],
							"urlB":picImageNamesArray[1],
						},

					],
					"content":commentsArray[round()%12],
					"createTim":123453456,
				},
				{
					"id":'1234',
					"images":[
						{
							"url":picImageNamesArray[0],
							"urlB":picImageNamesArray[0],
						},

						{
							"url":picImageNamesArray[1],
							"urlB":picImageNamesArray[1],
						},
						{
							"url":picImageNamesArray[2],
							"urlB":picImageNamesArray[2],
						},
					],
					"content":commentsArray[round()%12],
					"createTim":123453456,
				},
				{
					"id":'1234',
					"images":[
						{
							"url":picImageNamesArray[0],
							"urlB":picImageNamesArray[0],
						},

						{
							"url":picImageNamesArray[1],
							"urlB":picImageNamesArray[1],
						},
						{
							"url":picImageNamesArray[2],
							"urlB":picImageNamesArray[2],
						},

						{
							"url":picImageNamesArray[3],
							"urlB":picImageNamesArray[3],
						},
					],
					"content":commentsArray[round()%12],
					"createTim":123453456,
				},

			]
		);
    },
    '/action/work/check/list': function(req, res) {
        writeData(res, [
        	{
				"checkDate":123456,
				"morCheckStatus":1,
				"morCheckTime":234567888,
				"noonCheckStatus":1,
				"noonCheckTime":123456789,
				"afterCheckStatus":1,
				"afterCheckTime":12345678907,
			},
        	{
				"checkDate":123456,
				"morCheckStatus":0,
				"morCheckTime":234567888,
				"noonCheckStatus":0,
				"noonCheckTime":123456789,
				"afterCheckStatus":0,
				"afterCheckTime":12345678907,
			},
        	{
				"checkDate":123456,
				"morCheckStatus":1,
				"morCheckTime":234567888,
				"noonCheckStatus":0,
				"noonCheckTime":123456789,
				"afterCheckStatus":1,
				"afterCheckTime":12345678907,
			},
        	{
				"checkDate":123456,
				"morCheckStatus":0,
				"morCheckTime":234567888,
				"noonCheckStatus":1,
				"noonCheckTime":123456789,
				"afterCheckStatus":0,
				"afterCheckTime":12345678907,
			},
        ]);
    },
    '/action/child/leave/teacher/list': function(req, res) {
        writeData(res, [
        	{
				"id":'1234567',
				"createTim":23456787678,
				"stuId":123456,
				"stuName":'小明',
				"reason":'dfasfdfsa',
				"teacherId":123456,
				"teacherName":'张老师',
				"feedback":'同意'
			},
			{
				"id":'1234567',
				"createTim":23456787678,
				"stuId":123456,
				"stuName":'小明',
				"reason":'dfasfdfsa',
				"teacherId":123456,
				"teacherName":'张老师',
				"feedback":''
			},
			{
				"id":'1234567',
				"createTim":23456787678,
				"stuId":123456,
				"stuName":'小明',
				"reason":'dfasfdfsa',
				"teacherId":123456,
				"teacherName":'张老师',
				"feedback":'同意'
			},
		]);
    },
    '/action/child/leave/list': function(req, res) {
        writeData(res, [
        	{
				"id":'1234567',
				"createTim":23456787678,
				"stuId":123456,
				"stuName":'小明',
				"reason":'dfasfdfsa',
				"teacherId":123456,
				"teacherName":'张老师',
				"feedback":'同意'
			},
			{
				"id":'1234567',
				"createTim":23456787678,
				"stuId":123456,
				"stuName":'小明',
				"reason":'dfasfdfsa',
				"teacherId":123456,
				"teacherName":'张老师',
				"feedback":''
			},
			{
				"id":'1234567',
				"createTim":23456787678,
				"stuId":123456,
				"stuName":'小明',
				"reason":'dfasfdfsa',
				"teacherId":123456,
				"teacherName":'张老师',
				"feedback":'同意'
			},
		]);
    },
    '/action/school/food/list': function(req, res) {
        writeData(res, [
        	{
        		'mealDate':'2016-10-03 08:09:09',
        		'meals':[
        			{
        				'mealName':'qwerty',
        				'foods':[
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        				],
        			},

        			{
        				'mealName':'qwerty',
        				'foods':[
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        				],
        			},

        			{
        				'mealName':'qwerty',
        				'foods':[
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        				],
        			},
        		],
        	},
        	{
        		'mealDate':'2016-10-02 08:09:09',
        		'meals':[
        			{
        				'mealName':'qwerty',
        				'foods':[
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        				],
        			},

        			{
        				'mealName':'qwerty',
        				'foods':[
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        				],
        			},
        			
        			{
        				'mealName':'qwerty',
        				'foods':[
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        					{
        						'foodId':12345,
        						'foodImage':'http://www.baidu.com',
        						'foodName':'fdfdfdf',
        					},
        				],
        			},
        		],
        	},
        ]);
    },
    '/api/message/read': function(req, res) {
        writeData(res, {
        });
    },
    '/action/child/leave/teacher/deal': function(req, res) {
        writeData(res, {
        });
    },
    '/action/parent/leave': function(req, res) {
        writeData(res, {
        });
    },
};

module.exports = specialPaths;