    
var request = require('supertest')
var proxy = require('../proxy.js')
var util = require('util');

var common = require('../common.js');
var test = common.createTester(module);

proxy.serverOptions.target = 'http://e.o2obest.cn';

request = request(proxy.server);

function assertJson(assert, url, bodyChecker) {
    request.get(url)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            var json = res.body;
            assert.ok(json.status == 0);
            assert.ok(json.data);
            if (bodyChecker) {
                bodyChecker(assert, json);
            }
            assert.done();
        });
}
process.on('uncaughtException', function (err) {
    console.error(err.stack);
    process.exit(1);
});

test('specialPaths', function(assert) {
    assertJson(assert, '/api/shihuaCard/myIC', function(assert, body) {
        assert.ok(util.isArray(body.data.list));
    });
}, false);

test("specialPaths2", function(assert) {
    assertJson(assert, '/api/ShihuaICRecharge/CanRecharge');
}, false);

test("specialPaths3", function(assert) {
    assertJson(assert, '/api/ShihuaICRecharge/isCardRechargeable?cardNo=6214111111110001');
}, false);

test("specialPaths4", function(assert) {
    assertJson(assert, '/api/ShihuaICRecharge/ICRecharge');
}, false);

test('specialPaths5', function(assert) {
    assertJson(assert, '/api/message/GetUnRead');
}, false);

test('specialPaths5', function(assert) {
    assertJson(assert, '/api/message/list', function(assert, body) {
        assert.ok(util.isArray(body.data));
    });
}, false);

test('specialPaths6', function(assert) {
    assertJson(assert, '/api/ShihuaICRecharge/ICBillList', function(assert, body) {
        assert.ok(util.isArray(body.data.list));
    });
}, false);

test("specialPaths7", function(assert) {
    assertJson(assert, '/api/ShihuaICRecharge/OrderStatus?orderSn=6214111111110001&x=1');
}, false);

test("normal proxy", function(assert) {
    request.get('/')
      .expect(302)
      .end(function(err, res){
        assert.done();
        if (err) throw err;
      });
}, false);
