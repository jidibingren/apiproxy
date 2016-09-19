
var common = require('./common.js');
var randomSelect = common.randomSelect;
var writeData = common.writeData;
var url  = require('url');

var isBindingCard = 0;
var isHasUnreadMessage = false;
var specialPaths = {
    '/api/shihuaCard/myIC': function(req, res) {
        isBindingCard = isBindingCard ? 0 : 1;
        if (isBindingCard) {
            writeData(res, {
                "list": [
                    {
                        "shihuaICId": "9",
                        "cardNo": "6214111111110001",
                        "money": "10000",
                    },
                    {
                        "shihuaICId": "9",
                        "cardNo": "6214111111110002",
                        "money": "10000",
                    },
                ]
            });
        }else {
            writeData(res, {
                "list": [
                ]
            });
        }
    },
    '/api/ShihuaICRecharge/CanRecharge': function(req, res) {
        var isCanRecharge = Math.random() < 0.2 ? 1 : 0;
        writeData(res, {
                    "status": isCanRecharge
                })
    },
    '/api/ShihuaICRecharge/isCardRechargeable': function(req, res) {
        var reqUrl = url.parse(req.url);
        var queryParams = common.parseQueryParams(req);
        var isCardRechargeable = queryParams['cardNo'].substr(-1) == '1' ? 1 : 0;
        writeData(res, {
                    "status": isCardRechargeable
                })
    },
    '/api/ShihuaICRecharge/ICRecharge': function(req, res) {
        isHasUnreadMessage = true;
        writeData(res, {
                    "paymentTn": "201505121154500055892",
                    "orderSn": "150512115450237379",
                    "unionPayMode":"00"
                })
    },
    '/api/message/GetUnRead': function(req, res) {
        var count = isHasUnreadMessage == true ? 7 : 0;
        writeData(res, {
                    "count": count
                })
    },
    '/api/message/list': function(req, res) {
        if (isHasUnreadMessage == false) {
            writeData(res,[]);
            return;
        };
        isHasUnreadMessage = false;
        writeData(res, [
                {
                    "messageId": "00a946439c6b40136a2e7743c319b4df",
                    "title": "IC卡充值进度",
                    "content": "支付中",
                    "displayType": "0",//暂时都是0
                    "url": "scApp://icardChargeDetail?orderSn=2015050600001231",
                    "status": "0",//0-未读 1-已读
                    "addTime": "2014-09-11 22:30:48",
                    "pushScope": "0" //0-单播 1-广播（公共消息）
                },
                {
                    "messageId": "00a946439c6b40136a2e7743c319b4df",
                    "title": "IC卡充值进度",
                    "content": "支付失败",
                    "displayType": "0",//暂时都是0
                    "url": "scApp://icardChargeDetail?orderSn=2015050600001232",
                    "status": "0",//0-未读 1-已读
                    "addTime": "2014-09-11 22:30:48",
                    "pushScope": "0" //0-单播 1-广播（公共消息）
                },
                {
                    "messageId": "00a946439c6b40136a2e7743c319b4df",
                    "title": "IC卡充值进度",
                    "content": "充值中",
                    "displayType": "0",//暂时都是0
                    "url": "scApp://icardChargeDetail?orderSn=2015050600001233",
                    "status": "0",//0-未读 1-已读
                    "addTime": "2014-09-11 22:30:48",
                    "pushScope": "0" //0-单播 1-广播（公共消息）
                },
                {
                    "messageId": "00a946439c6b40136a2e7743c319b4df",
                    "title": "IC卡充值进度",
                    "content": "充值成功",
                    "displayType": "0",//暂时都是0
                    "url": "scApp://icardChargeDetail?orderSn=2015050600001234",
                    "status": "0",//0-未读 1-已读
                    "addTime": "2014-09-11 22:30:48",
                    "pushScope": "0" //0-单播 1-广播（公共消息）
                },
                {
                    "messageId": "00a946439c6b40136a2e7743c319b4df",
                    "title": "IC卡充值进度",
                    "content": "充值失败",
                    "displayType": "0",//暂时都是0
                    "url": "scApp://icardChargeDetail?orderSn=2015050600001235",
                    "status": "0",//0-未读 1-已读
                    "addTime": "2014-09-11 22:30:48",
                    "pushScope": "0" //0-单播 1-广播（公共消息）
                },
                {
                    "messageId": "00a946439c6b40136a2e7743c319b4df",
                    "title": "IC卡充值进度",
                    "content": "退款中",
                    "displayType": "0",//暂时都是0
                    "url": "scApp://icardChargeDetail?orderSn=2015050600001236",
                    "status": "0",//0-未读 1-已读
                    "addTime": "2014-09-11 22:30:48",
                    "pushScope": "0" //0-单播 1-广播（公共消息）
                },
                {
                    "messageId": "00a946439c6b40136a2e7743c319b4df",
                    "title": "IC卡充值进度",
                    "content": "退款成功",
                    "displayType": "0",//暂时都是0
                    "url": "scApp://icardChargeDetail?orderSn=2015050600001237",
                    "status": "0",//0-未读 1-已读
                    "addTime": "2014-09-11 22:30:48",
                    "pushScope": "0" //0-单播 1-广播（公共消息）
                },
                ])
    },
    '/api/ShihuaICRecharge/ICBillList': function(req, res) {
        writeData(res, {
            "list": [
                {
                    "cardNo": "1000001100000012458",
                    "money": 100,
                    "payTime": "2014-09-11 22:30:48",
                    "orderState": "1",
                    "orderSn": "2015050600000001",
                    "Id":11111
                },
                {
                    "cardNo": "1000001100000012458",
                    "money": 100,
                    "payTime": "2014-09-11 22:30:48",
                    "orderState": "1",
                    "orderSn": "2015050600001231",
                    "Id":11111
                },
                {
                    "cardNo": "1000001100000012458",
                    "money": 100,
                    "payTime": "2014-09-11 22:30:48",
                    "orderState": "2",
                    "orderSn": "2015050600001232",
                    "Id":11111
                },
                {
                    "cardNo": "1000001100000012458",
                    "money": 100,
                    "payTime": "2014-09-11 22:30:48",
                    "orderState": "3",
                    "orderSn": "2015050600001233",
                    "Id":11111
                },
                {
                    "cardNo": "1000001100000012458",
                    "money": 100,
                    "payTime": "2014-09-11 22:30:48",
                    "orderState": "4",
                    "orderSn": "2015050600001234",
                    "Id":11111
                },
                {
                    "cardNo": "1000001100000012458",
                    "money": 100,
                    "payTime": "2014-09-11 22:30:48",
                    "orderState": "5",
                    "orderSn": "2015050600001235",
                    "Id":11111
                },
                {
                    "cardNo": "1000001100000012458",
                    "money": 100,
                    "payTime": "2014-09-11 22:30:48",
                    "orderState": "6",
                    "orderSn": "2015050600001236",
                    "Id":11111
                },
                {
                    "cardNo": "1000001100000012458",
                    "money": 100,
                    "payTime": "2014-09-11 22:30:48",
                    "orderState": "7",
                    "orderSn": "2015050600001237",
                    "Id":11111
                }
            ].mul(randomSelect(0, 1, 20))
        });
    },
    '/api/ShihuaICRecharge/OrderStatus': function(req, res) {
        var reqUrl = url.parse(req.url);
        var queryParams = common.parseQueryParams(req);
        var orderStatus = queryParams['orderSn'].substr(-1);
        writeData(res, {
                    "orderSn": "2015050600001234",
                    "paySuccessTime": "2015-04-20 11:00",
                    "payFailedTime": "2015-04-20 11:00",
                    "chargeSuccessTime": "2015-04-20 11:00",
                    "chargeFailedTime": "2015-04-20 11:00",
                    "refundSuccessTime": "2015-04-20 11:00",
                    "cardNo": "1000001100000012458",
                    "money": 50000,
                    "payTime": "2014-09-11 22:30:48",
                    "orderState": orderStatus,
                    "canRefund": 1,
                    "showPayingText": queryParams['orderSn'] == '2015050600000001' ? 1 : 0
        });
    },
};

module.exports = specialPaths;