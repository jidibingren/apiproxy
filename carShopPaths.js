
var common = require('./common.js');
var randomSelect = common.randomSelect;
var writeData = common.writeData;
var url  = require('url');

var fs = require('fs');
var path = require('path');

var isBindingCard = 0;
var isHasUnreadMessage = false;
var isPayed = false;
var totalMoney = '110000';
var benefitMoney = '10000';
var bookMoney  = '10000';
var payidMoney = '10000';
var finalMoney = '90000';
var payList = [];
var username = '19012345569';

function getSubOrderSn(){
    var order = fs.readFileSync(path.join('carShopSubOrderSn'),'utf-8');
    var suffix = order.substring(14);
    var iSuffix = parseInt(suffix,10)+1;
    var strSuffix = iSuffix.toString();
    var newOrder = order.substring(0,order.length-strSuffix.length) + strSuffix;
    fs.writeFileSync(path.join('carShopSubOrderSn'),newOrder,'utf-8');

    return newOrder;
}

function CurentTime(){ 
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();          //秒
    var clock = year + "-";
   
    if(month < 10)
        clock += "0";
    clock += month + "-";

    if(day < 10)
        clock += "0";
    clock += day + " ";

    if(hh < 10)
        clock += "0";   
    clock += hh + ":";

    if (mm < 10) 
        clock += '0'; 
    clock += mm + ":";

    if (ss < 10) 
        clock += '0'; 
    clock += ss; 
    return(clock); 
} 

var specialPaths = {
    '/api/appManage/appUpdate': function(req, res) {
        writeData(res, {
            'version': '',
            'isForceUpdate': '0',
            'limitVersion': '1.1',
            'releaseNote': '        1.测试测试测试测试\n        2.一辆车一辆车一辆车\n',
        });
    },
    '/api/user/login': function(req, res) {

        var queryParams = common.parseQueryParams(req);
        username = queryParams['CyLoginForm']['username'];
        writeData(res, {
            "user": {
                'role':[
                    'shopUser'
                ],
            },
            'userId': '221212121111',
            'ud': '222222222222',
            'tel': username,
            'token': 'dkfjsifjjfsdfslfjsljfjifjjfs',
        });
    },
    '/api/user/logout': function(req, res) {
        writeData(res, {
        });
    },
    '/api/user/userInfo': function(req, res) {
        writeData(res, {
            'sumAmount': '10000',
            'freezedAmount': '10000',
            'alias': '张三',
            'mob': username,
        });
    },
    '/api/getCash/getMoneySet': function(req, res) {
        writeData(res, {
            'sumAmount': '10000',
            'freezedAmount': '10000',
        });
    },
    '/api/barCode/get': function(req, res) {
        var queryParams = common.parseQueryParams(req);
        var code = queryParams['code'];
        var type, orderType, status, orderStatus;
        if (code == '900201601280000') {
            type = '1';
            status = '0';
        }else if (code == '900201601280001') {
            type = '1';
            status = '1';
        }else if (code == '1100201601280000') {
            type = '2';
            orderType = '1';
            status = '0';
            orderStatus = '0';
        }else if (code == '1100201601280001') {
            type = '2';
            orderType = '1';
            status = '0';
            orderStatus = '4';
        }else if (code == '1100201601280002') {
            type = '2';
            orderType = '1';
            status = '2';
            orderStatus = '4';
        }else if (code == '1200201601280000') {
            type = '2';
            orderType = '3';
            status = '0';
            orderStatus = '0';
        }else if (code == '1200201601280001') {
            type = '2';
            orderType = '3';
            status = '0';
            orderStatus = '4';
        }else if (code == '1200201601280002') {
            type = '2';
            orderType = '3';
            status = '2';
            orderStatus = '4';
        }
        writeData(res, {
            'codeType' : type,
            'codeState': status,
            'orderType': orderType,
            'orderStatus': orderStatus,
            'orderId': code,
            'orderSn': code,
            'code': code,
        });
    },
    '/api/barCode/check': function(req, res) {
        writeData(res, {
        });
    },
    '/api/barCode/checklist': function(req, res) {
        writeData(res, {
            'list':[
                {
                    codeId : '110020160128000199999',
                    addTime : "2016-02-24 14:38:47",
                    code : '900201601280000',
                    codeType : '1',
                    codeState : '1',
                    orderStatus : '4',
                    orderType : '1',
                    orderSn : '900201601280000',
                    mob : '18610303170',
                    name : '卡券名称',
                    vin : '0',
                    mobile : username,
                },
                {
                    codeId : '110020160128000199999',
                    addTime : "2016-02-24 14:38:47",
                    code : '1100201601280000',
                    codeType : '2',
                    codeState : '0',
                    orderStatus : '0',
                    orderType : '1',
                    orderSn : '1100201601280000',
                    mob : '18610303170',
                    name : 'Hello',
                    vin : '0',
                    mobile : username,
                },
                {
                    codeId : '110020160128000199999',
                    addTime : "2016-02-24 14:38:47",
                    code : '1100201601280001',
                    codeType : '2',
                    codeState : '0',
                    orderStatus : '4',
                    orderType : '1',
                    orderSn : '1100201601280001',
                    mob : '18610303170',
                    name : 'Hello',
                    vin : '0',
                    mobile : username,
                },
                {
                    codeId : '110020160128000199999',
                    addTime : "2016-02-24 14:38:47",
                    code : '1100201601280002',
                    codeType : '2',
                    codeState : '2',
                    orderStatus : '4',
                    orderType : '1',
                    orderSn : '1100201601280002',
                    mob : '18610303170',
                    name : 'Hello',
                    vin : '1122121210',
                    mobile : username,
                },
                {
                    codeId : '110020160128000199999',
                    addTime : "2016-02-24 14:38:47",
                    code : '1200201601280000',
                    codeType : '2',
                    codeState : '0',
                    orderStatus : '0',
                    orderType : '3',
                    orderSn : '1200201601280000',
                    mob : '18610303170',
                    name : 'Hello',
                    vin : '121212122120',
                    mobile : username,
                },
                {
                    codeId : '110020160128000199999',
                    addTime : "2016-02-24 14:38:47",
                    code : '1200201601280001',
                    codeType : '2',
                    codeState : '0',
                    orderStatus : '4',
                    orderType : '3',
                    orderSn : '1200201601280001',
                    mob : '18610303170',
                    name : 'Hello',
                    vin : '0',
                    mobile : username,
                },
                {
                    codeId : '110020160128000199999',
                    addTime : "2016-02-24 14:38:47",
                    code : '1200201601280002',
                    codeType : '2',
                    codeState : '2',
                    orderStatus : '4',
                    orderType : '3',
                    orderSn : '1200201601280002',
                    mob : '18610303170',
                    name : 'Hello',
                    vin : '0',
                    mobile : username,
                },
            ],
        });
    },
    '/api/carOrder/getOrderByOrderSn': function(req, res) {
        var list, type, status;
        var queryParams = common.parseQueryParams(req);
        var orderSn = queryParams['orderSn'];
        var tempFinalMoney = finalMoney;
        var code = queryParams['orderSn'];
        if (finalMoney == totalMoney-bookMoney-benefitMoney) {
            payList = [];
        }
        if (finalMoney == 0) {
            finalMoney = totalMoney-bookMoney-benefitMoney;
            status = '4';
        }else{
            status = '0';
        }

        var orderType, status, orderStatus;
        if (code == '900201601280000') {
            type = '1';
            status = '0';
        }else if (code == '900201601280001') {
            type = '1';
            status = '1';
        }else if (code == '1100201601280000') {
            type = '2';
            orderType = '1';
            status = '0';
            orderStatus = tempFinalMoney == '0'? '4' :'0';
        }else if (code == '1100201601280001') {
            type = '2';
            orderType = '1';
            status = '0';
            orderStatus = '4';
        }else if (code == '1100201601280002') {
            type = '2';
            orderType = '1';
            status = '2';
            orderStatus = '4';
        }else if (code == '1200201601280000') {
            type = '2';
            orderType = '3';
            status = '0';
            orderStatus = tempFinalMoney == '0'? '4' :'0';
        }else if (code == '1200201601280001') {
            type = '2';
            orderType = '3';
            status = '0';
            orderStatus = '4';
        }else if (code == '1200201601280002') {
            type = '2';
            orderType = '3';
            status = '2';
            orderStatus = '4';
        }
        var payOrderSn = getSubOrderSn();
        writeData(res, {
            'orderSn': orderSn,
            'codeType' : type,
            'codeState': status,
            'orderMoney': totalMoney.toString(),
            'benefitMoney': benefitMoney,
            'bookMoney': bookMoney.toString(),
            'payMoney': totalMoney-finalMoney,
            'finalMoney': tempFinalMoney.toString(),
            'payOrderSn': payOrderSn.toString(),
            'orderType': orderType,
            'orderStatus': orderStatus,
            'type': type,
            'list': payList,
        });
    },
    '/api/carOrder/UnionPosAppCallback': function(req, res) {
        var queryParams = common.parseQueryParams(req);
        var isSuccessed = queryParams['status'];
        var money = queryParams['money']*100;
        var orderSn = queryParams['orderSn'];
        var payOrderSn = queryParams['payOrderSn'];
        var umsOrderNo = queryParams['ums_order_no'];
        if (isSuccessed == 1) {
            var myDate = new Date();
            finalMoney -= money;
            payList.push({
                'orderMoney':money.toString(),
                'payMoney':money.toString(),
                'payTime':CurentTime(),
                'addTime':CurentTime(),
                'orderSn':payOrderSn,
                'orderId':orderSn,
                'ums_order_no':umsOrderNo,
            });
        };
        writeData(res, {
        });
    },
    '/webapp/orderDetail': function(req, res) {
        writeData(res, {
        });
    },
    '/api/img/upload': function(req, res) {
        writeData(res, {
            'imgKey':'http://xxxxxxx',
        });
    },
    '/api/barCode/checkin': function(req, res) {
        writeData(res, {
        });
    },
    '/webapp/discovery/discovery': function(req, res) {
        writeData(res, {
        });
    },
    '/webapp/accountDetail/accountDetail': function(req, res) {
        writeData(res, {
        });
    },
    '/webapp/shareApp/shareApp': function(req, res) {
        writeData(res, {
        });
    },
    '/webapp/shareRecord/shareRecord': function(req, res) {
        writeData(res, {
        });
    },
    '/webapp/rankingList/rankingList': function(req, res) {
        writeData(res, {
        });
    },
    '/webapp/userOrder/orderDetail': function(req, res) {
        writeData(res, {
        });
    },
    '/api/message/GetUnRead': function(req, res) {
        writeData(res, {
        });
    },
    '/api/message/list': function(req, res) {
        writeData(res, {
        });
    },
    '/api/message/read': function(req, res) {
        writeData(res, {
        });
    },
};

module.exports = specialPaths;